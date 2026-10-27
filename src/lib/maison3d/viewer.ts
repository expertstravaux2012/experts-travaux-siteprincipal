// Viewer Three.js de la maison : rendu à la demande, rotation libre à 360°, zoom/déplacement, survol/sélection par corps de métier.
import { Color, DirectionalLight, HemisphereLight, PerspectiveCamera, Raycaster, Scene, Vector2, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { applyMix, buildHouse, HOUSE_FRAME, type Palette } from './house-model-v2';

export interface HouseViewer {
  /** Surbrillance temporaire (ex. survol d'un élément de la légende). */
  setActive(id: string | null): void;
  /** Sélection persistante, conservée tant qu'une autre n'est pas choisie. */
  setSelected(id: string | null): void;
}

export interface HouseViewerOptions {
  /** Appelé uniquement pour les changements de survol provoqués par le pointeur sur la scène. */
  onHover(id: string | null, previous: string | null): void;
  /** Clic ou toucher sans glissement : `id` du métier touché, `null` si le vide. */
  onSelect(id: string | null): void;
  /** Premier geste de l'utilisateur (glisser ou toucher) : l'animation d'invitation s'arrête. */
  onInteract?(): void;
}

const FOV = 28;
const START_AZIMUTH = 0.35;
const START_POLAR = 1.38;
const CLICK_TOLERANCE_PX = 6;
const MIX_SPEED = 0.25;
const SWAY_LIMIT = 0.55;
const SWAY_SPEED = 1.1;
const SWAY_FRAME_MS = 32;
const MAX_DELTA_S = 0.05;
const SWAY_DURATION_MS = 20000;
const MAX_PIXEL_RATIO = 2;
const CAMERA_NEAR = 0.5;
const CAMERA_FAR = 200;
const FIT_MARGIN = 1.05;
const POLAR_MIN = 0.2;
const POLAR_MAX = 1.75;
const ZOOM_MIN = 0.3;
const ZOOM_MAX = 1.5;
const SKY_INTENSITY = 1.6;
const SUN_INTENSITY = 1.9;
const SUN_POSITION: [number, number, number] = [6, 12, 9];

const readPalette = (): Palette & { sky: Color; ground: Color } => {
  const css = getComputedStyle(document.documentElement);
  const token = (name: string) => new Color(css.getPropertyValue(name).trim());
  return {
    base: token('--color-surface-container-high'),
    edge: token('--color-outline'),
    sky: token('--color-surface-container-lowest'),
    ground: token('--color-outline-variant'),
  };
};

export function createHouseViewer(host: HTMLElement, { onHover, onSelect, onInteract }: HouseViewerOptions): HouseViewer {
  const palette = readPalette();
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO));
  renderer.setClearAlpha(0);
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cursor = 'grab';

  const scene = new Scene();
  scene.add(new HemisphereLight(palette.sky, palette.ground, SKY_INTENSITY));
  const sun = new DirectionalLight(palette.sky, SUN_INTENSITY);
  sun.position.set(...SUN_POSITION);
  scene.add(sun);

  const { group, trades } = buildHouse(palette);
  scene.add(group);
  const meshes = [...trades.values()].flatMap((t) => t.meshes);

  const target = new Vector3(...HOUSE_FRAME.center);
  const camera = new PerspectiveCamera(FOV, 1, CAMERA_NEAR, CAMERA_FAR);
  // Molette : le scroll de la page reste natif sauf avec Ctrl/⌘ (zoom). Doit précéder OrbitControls.
  canvas.addEventListener(
    'wheel',
    (e) => {
      if (!e.ctrlKey && !e.metaKey) e.stopImmediatePropagation();
    },
    { capture: true },
  );
  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(target);
  controls.enableDamping = !reducedMotion;
  controls.minPolarAngle = POLAR_MIN;
  controls.maxPolarAngle = POLAR_MAX;
  // Le glissement vertical d'un doigt fait défiler la page ; pincement et glissement horizontal pilotent la maquette.
  canvas.style.touchAction = 'pan-y';

  // Un métier est affiché en surbrillance s'il est survolé, à défaut s'il est sélectionné.
  let hover: string | null = null;
  let legendActive: string | null = null;
  let selected: string | null = null;
  let shown: string | null = null;

  // Balancement d'invitation : la maison oscille doucement tant que l'utilisateur ne l'a pas prise en main.
  let userControl = false;
  let hovered = false;
  let visible = false;
  let dragging = false;
  let swaySign = 1;
  let swayElapsed = 0;
  let lastTick = performance.now();
  let lastSway = 0;
  const swaying = () => !reducedMotion && swayElapsed < SWAY_DURATION_MS && !userControl && !hovered && !dragging && visible && shown === null;

  let frame = 0;
  const invalidate = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };

  function render() {
    frame = 0;
    const now = performance.now();
    const sway = swaying();
    if (sway && now - lastSway < SWAY_FRAME_MS) {
      invalidate();
      return;
    }
    const dt = Math.min((now - lastTick) / 1000, MAX_DELTA_S);
    lastTick = now;
    controls.autoRotate = sway;
    if (sway) {
      lastSway = now;
      swayElapsed += dt * 1000;
      const az = controls.getAzimuthalAngle();
      if (az <= -SWAY_LIMIT) swaySign = -1;
      else if (az >= SWAY_LIMIT) swaySign = 1;
      controls.autoRotateSpeed = swaySign * SWAY_SPEED;
    }
    let animating = controls.update(dt) || sway;
    for (const t of trades.values()) {
      if (t.mix === t.target) continue;
      const delta = t.target - t.mix;
      t.mix = reducedMotion || Math.abs(delta) < 0.02 ? t.target : t.mix + delta * MIX_SPEED;
      applyMix(t, palette);
      animating = true;
    }
    renderer.render(scene, camera);
    if (animating) invalidate();
  }

  const fit = () => {
    const { clientWidth: w, clientHeight: h } = host;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const tanHalf = Math.tan((FOV * Math.PI) / 360);
    const distance = Math.max(HOUSE_FRAME.halfHeight / tanHalf, HOUSE_FRAME.halfWidth / (tanHalf * camera.aspect)) * FIT_MARGIN;
    const dir = camera.position.lengthSq() ? camera.position.clone().sub(target).normalize() : null;
    const offset = dir ?? new Vector3().setFromSphericalCoords(1, START_POLAR, START_AZIMUTH);
    camera.position.copy(target).addScaledVector(offset, distance);
    controls.minDistance = distance * ZOOM_MIN;
    controls.maxDistance = distance * ZOOM_MAX;
    camera.updateProjectionMatrix();
    controls.autoRotate = false;
    controls.update();
    invalidate();
  };

  new ResizeObserver(fit).observe(host);
  new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      lastTick = performance.now();
      invalidate();
    },
    { threshold: 0.15 },
  ).observe(host);
  controls.addEventListener('change', invalidate);

  const refresh = () => {
    const next = hover ?? legendActive ?? selected;
    if (next === shown) return;
    const prev = shown ? trades.get(shown) : undefined;
    const upcoming = next ? trades.get(next) : undefined;
    if (prev) prev.target = 0;
    if (upcoming) upcoming.target = 1;
    shown = next;
    canvas.style.cursor = hover ? 'pointer' : 'grab';
    invalidate();
  };

  const ray = new Raycaster();
  const ndc = new Vector2();
  const pick = (e: PointerEvent): string | null => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(meshes, false)[0];
    return hit ? (hit.object.userData.id as string) : null;
  };

  let downAt: { x: number; y: number } | null = null;

  canvas.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (!userControl) {
      userControl = true;
      onInteract?.();
    }
    dragging = true;
    downAt = { x: e.clientX, y: e.clientY };
    canvas.style.cursor = 'grabbing';
  });
  canvas.addEventListener('pointerup', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragging = false;
    canvas.style.cursor = hover ? 'pointer' : 'grab';
    const moved = downAt ? Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) : Infinity;
    downAt = null;
    if (moved > CLICK_TOLERANCE_PX) return;
    selected = pick(e);
    refresh();
    onSelect(selected);
  });
  canvas.addEventListener('pointercancel', () => {
    dragging = false;
    downAt = null;
    canvas.style.cursor = hover ? 'pointer' : 'grab';
  });
  canvas.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || dragging) return;
    const id = pick(e);
    if (id === hover) return;
    const previous = hover;
    hover = id;
    refresh();
    onHover(id, previous);
  });
  canvas.addEventListener('pointerenter', () => {
    hovered = true;
  });
  canvas.addEventListener('pointerleave', () => {
    hovered = false;
    invalidate();
    if (!hover) return;
    const previous = hover;
    hover = null;
    refresh();
    onHover(null, previous);
  });

  host.appendChild(canvas);
  fit();
  return {
    setActive(id) {
      legendActive = id;
      refresh();
    },
    setSelected(id) {
      selected = id;
      refresh();
    },
  };
}
