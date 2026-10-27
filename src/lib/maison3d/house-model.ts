// Maquette 3D procédurale d'une maison toulousaine en coupe (façon « maison de poupée », façade avant ouverte).
// Chaque mesh porte l'id d'un corps de métier (= corps-metier.ts) dans userData.id.
// Au repos tout est gris ; au survol, chaque matériau du métier prend sa couleur (house-materials.ts).
import {
  BoxGeometry,
  BufferGeometry,
  Color,
  CylinderGeometry,
  EdgesGeometry,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Path,
  Shape,
} from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { DEFAULT_TONE, MATERIAL_COLORS, type MaterialKey } from './house-materials';

export interface Palette {
  base: Color;
  edge: Color;
}

export interface Trade {
  id: string;
  meshes: Mesh[];
  materials: MeshStandardMaterial[];
  /** 0 = repos (gris), 1 = couleurs réelles ; animé par le viewer. */
  mix: number;
  target: number;
}

type Vec3 = [number, number, number];
type Side = 1 | -1;

const WIDTH = 10;
const DEPTH = 8;
const STOREY = 3;
const WALL = 0.3;
const HALF_W = WIDTH / 2;
const HALF_D = DEPTH / 2;
const WALL_TOP = STOREY * 2;
const RISE = 1.6;
const RIDGE = WALL_TOP + RISE;
const OVERHANG = 0.6;
const FLOOR_1 = STOREY + WALL / 2;
const INNER_BACK_Z = -HALF_D + WALL;
const INNER_HALF_W = HALF_W - WALL;
const INNER_DEPTH = HALF_D - INNER_BACK_Z;
const INNER_CENTER_Z = (HALF_D + INNER_BACK_Z) / 2;
const SLOPE = Math.atan(RISE / HALF_W);
const EAVE_X = HALF_W + OVERHANG;
const EAVE_Y = WALL_TOP - OVERHANG * Math.tan(SLOPE);
const ROOF_LEN = Math.hypot(EAVE_X, RIDGE - EAVE_Y);
const ROOF_MID: [number, number] = [EAVE_X / 2, (EAVE_Y + RIDGE) / 2];
const ROOF_THICKNESS = 0.15;
const TRUSS_Z = [-3.5, -1.17, 1.17, 3.5];
const WALL_Z = -HALF_D + WALL / 2;
const PLATE = 0.04;
const STAIR_X = -4.1;
const STAIR_STEPS = 12;
const STAIR_RUN = 0.27;
const STAIR_WIDTH = 0.9;
const STAIR_START_Z = 3.5;

interface Opening {
  x: number;
  y0: number;
  w: number;
  h: number;
  door?: boolean;
}

const OPENINGS: Opening[] = [
  { x: -3, y0: 0.9, w: 1.4, h: 1.4 },
  { x: 3, y0: 0.9, w: 1.4, h: 1.4 },
  { x: 0, y0: 0.05, w: 1.1, h: 2.2, door: true },
  { x: -3, y0: 3.9, w: 1.4, h: 1.4 },
  { x: 0, y0: 3.9, w: 1.4, h: 1.4 },
  { x: 3, y0: 3.9, w: 1.4, h: 1.4 },
];

const SIDE_WINDOWS_Z = [-1.8, 1.8];
const SIDE_OPENINGS = { left: [0.9, 3.9], right: [3.9] } as const;
const SIDE_WINDOW = { w: 1.2, h: 1.4 };

const BRICK_H = 0.06;
const BRICK_PITCH = 0.07;
const BRICK_L = 0.3;
const BRICK_DEPTH = 0.04;

interface BrickPatch {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  z: number;
  seed: number;
  /** Part de l'extension perdue vers le haut (enduit qui reprend le dessus : bord irrégulier). */
  taper?: number;
  /** Harpage d'angle : rangs alternés long/court calés sur un bord. */
  quoin?: 'left' | 'right';
}

interface PlaceOptions {
  tone?: MaterialKey;
  glass?: boolean;
  edges?: boolean;
  rotation?: Vec3;
  /** false = purement décoratif, exclu du survol (gros maillages fusionnés). */
  pick?: boolean;
}

class HouseBuilder {
  readonly group = new Group();
  readonly trades = new Map<string, Trade>();
  private parent: Object3D = this.group;
  private readonly edgeMaterial: LineBasicMaterial;
  private readonly materials = new Map<string, MeshStandardMaterial>();

  constructor(private readonly palette: Palette) {
    this.edgeMaterial = new LineBasicMaterial({ color: palette.edge });
  }

  private trade(id: string): Trade {
    let t = this.trades.get(id);
    if (!t) {
      t = { id, meshes: [], materials: [], mix: 0, target: 0 };
      this.trades.set(id, t);
    }
    return t;
  }

  private material(trade: Trade, tone: MaterialKey, glass: boolean): MeshStandardMaterial {
    const key = `${trade.id}:${tone}:${glass}`;
    let m = this.materials.get(key);
    if (!m) {
      m = new MeshStandardMaterial({
        color: this.palette.base,
        roughness: 1,
        metalness: 0,
        transparent: glass,
        opacity: glass ? 0.4 : 1,
        depthWrite: !glass,
      });
      m.userData.reveal = new Color(MATERIAL_COLORS[tone]);
      this.materials.set(key, m);
      trade.materials.push(m);
    }
    return m;
  }

  place(id: string, geometry: BufferGeometry, position: Vec3, opts: PlaceOptions = {}): Mesh {
    const t = this.trade(id);
    const tone = opts.tone ?? DEFAULT_TONE[id];
    const mesh = new Mesh(geometry, this.material(t, tone, opts.glass ?? false));
    mesh.position.set(...position);
    if (opts.rotation) mesh.rotation.set(...opts.rotation);
    mesh.userData.id = id;
    if (opts.edges !== false) mesh.add(new LineSegments(new EdgesGeometry(geometry), this.edgeMaterial));
    if (opts.pick !== false) t.meshes.push(mesh);
    this.parent.add(mesh);
    return mesh;
  }

  box(id: string, size: Vec3, position: Vec3, opts?: PlaceOptions): Mesh {
    return this.place(id, new BoxGeometry(...size), position, opts);
  }

  pipe(id: string, radius: number, length: number, position: Vec3, axis: 'x' | 'y' | 'z', opts: PlaceOptions = {}): Mesh {
    const rotation: Vec3 = axis === 'x' ? [0, 0, Math.PI / 2] : axis === 'z' ? [Math.PI / 2, 0, 0] : [0, 0, 0];
    return this.place(id, new CylinderGeometry(radius, radius, length, 10), position, { ...opts, rotation, edges: false });
  }

  /** Briques foraines apparentes : un rang = une planche fusionnée, joints verticaux en traits, bord irrégulier. */
  brickPatch(spec: BrickPatch): void {
    const random = seeded(spec.seed);
    const rows = Math.max(1, Math.floor((spec.y1 - spec.y0) / BRICK_PITCH));
    const span = spec.x1 - spec.x0;
    const zFace = spec.z + BRICK_DEPTH + 0.004;
    const courses: BufferGeometry[] = [];
    const joints: number[] = [];
    for (let r = 0; r < rows; r++) {
      const y = spec.y0 + r * BRICK_PITCH + BRICK_H / 2;
      let a = spec.x0;
      let c = spec.x1;
      if (spec.quoin) {
        const length = r % 2 ? 0.42 : 0.22;
        if (spec.quoin === 'left') c = a + length;
        else a = c - length;
      } else {
        const wear = (spec.taper ?? 0) * (r / rows) * span;
        a += 0.04 * random() + wear * random();
        c -= 0.04 * random() + wear * random();
      }
      if (c - a < 0.1) continue;
      courses.push(new BoxGeometry(c - a, BRICK_H, BRICK_DEPTH).translate((a + c) / 2, y, spec.z + BRICK_DEPTH / 2));
      for (let x = a + BRICK_L * (r % 2 ? 0.5 : 1); x < c - 0.05; x += BRICK_L) {
        joints.push(x, y - BRICK_H / 2, zFace, x, y + BRICK_H / 2, zFace);
      }
    }
    if (!courses.length) return;
    const mesh = this.place('facade', mergeGeometries(courses), [0, 0, 0], { tone: 'brique', pick: false });
    const jointGeometry = new BufferGeometry().setAttribute('position', new Float32BufferAttribute(joints, 3));
    mesh.add(new LineSegments(jointGeometry, this.edgeMaterial));
  }

  /** Construit un sous-ensemble dans un repère local (position + rotation Y). */
  at(position: Vec3, rotationY: number, build: () => void): void {
    const unit = new Group();
    unit.position.set(...position);
    unit.rotation.y = rotationY;
    this.group.add(unit);
    const previous = this.parent;
    this.parent = unit;
    build();
    this.parent = previous;
  }
}

const slopeOrigin = (side: Side, offset: number): [number, number] => [
  side * (ROOF_MID[0] - offset * Math.sin(SLOPE)),
  ROOF_MID[1] - offset * Math.cos(SLOPE),
];

/** Planche posée sur un versant ; `offset` > 0 = sous la ligne médiane du toit, < 0 = au-dessus. */
const slope = (b: HouseBuilder, id: string, length: number, thickness: number, depth: number, offset: number, side: Side, z = 0, tone?: MaterialKey): Mesh => {
  const [x, y] = slopeOrigin(side, offset);
  return b.box(id, [length, thickness, depth], [x, y, z], { rotation: [0, 0, -side * SLOPE], tone });
};

const rectPath = (x0: number, y0: number, x1: number, y1: number): Path =>
  new Path().moveTo(x0, y0).lineTo(x1, y0).lineTo(x1, y1).lineTo(x0, y1).lineTo(x0, y0);

const rectShape = (x0: number, y0: number, x1: number, y1: number, holes: Path[] = []): Shape => {
  const shape = new Shape().moveTo(x0, y0).lineTo(x1, y0).lineTo(x1, y1).lineTo(x0, y1).lineTo(x0, y0);
  shape.holes.push(...holes);
  return shape;
};

const extruded = (shape: Shape, depth: number): ExtrudeGeometry => new ExtrudeGeometry(shape, { depth, bevelEnabled: false });

const backWallShape = (): Shape => {
  const shape = new Shape().moveTo(-HALF_W, 0).lineTo(HALF_W, 0).lineTo(HALF_W, WALL_TOP).lineTo(0, RIDGE).lineTo(-HALF_W, WALL_TOP).lineTo(-HALF_W, 0);
  for (const o of OPENINGS) shape.holes.push(rectPath(o.x - o.w / 2, o.y0, o.x + o.w / 2, o.y0 + o.h));
  return shape;
};

type Rect = [x0: number, x1: number, z0: number, z1: number];

/** Dalle horizontale (plan XZ) avec trémie optionnelle ; `y` = dessous de la dalle. */
const plate = (b: HouseBuilder, id: string, [x0, x1, z0, z1]: Rect, y: number, thickness: number, hole?: Rect): void => {
  const holes = hole ? [rectPath(hole[0], -hole[3], hole[1], -hole[2])] : [];
  b.place(id, extruded(rectShape(x0, -z1, x1, -z0, holes), thickness), [0, y, 0], { rotation: [-Math.PI / 2, 0, 0] });
};

const FLOOR_RECT: Rect = [-INNER_HALF_W, INNER_HALF_W, INNER_BACK_Z, HALF_D];
const STAIR_HOLE: Rect = [STAIR_X - STAIR_WIDTH / 2 - 0.05, STAIR_X + STAIR_WIDTH / 2 + 0.05, 0.3, 3.7];

const sideWall = (b: HouseBuilder, side: Side): void => {
  const heights = side === -1 ? SIDE_OPENINGS.left : SIDE_OPENINGS.right;
  const holes = SIDE_WINDOWS_Z.flatMap((z) => heights.map((y0) => rectPath(z - SIDE_WINDOW.w / 2, y0, z + SIDE_WINDOW.w / 2, y0 + SIDE_WINDOW.h)));
  const [u0, u1] = side === -1 ? [INNER_BACK_Z, HALF_D] : [-HALF_D, -INNER_BACK_Z];
  b.place('facade', extruded(rectShape(u0, 0, u1, WALL_TOP, holes), WALL), [side * (HALF_W - WALL), 0, 0], {
    rotation: [0, side === -1 ? -Math.PI / 2 : Math.PI / 2, 0],
  });
};

const windowUnit = (b: HouseBuilder, o: Opening, shutters: boolean): void => {
  const bar = 0.1;
  const depth = WALL + 0.04;
  const cy = o.y0 + o.h / 2;
  b.box('menuiseries', [o.w, bar, depth], [0, o.y0 + bar / 2, 0]);
  b.box('menuiseries', [o.w, bar, depth], [0, o.y0 + o.h - bar / 2, 0]);
  b.box('menuiseries', [bar, o.h, depth], [-o.w / 2 + bar / 2, cy, 0]);
  b.box('menuiseries', [bar, o.h, depth], [o.w / 2 - bar / 2, cy, 0]);
  if (o.door) {
    b.box('menuiseries', [o.w - bar * 2, o.h - bar * 2, 0.08], [0, cy, 0], { tone: 'bois' });
    return;
  }
  b.box('menuiseries', [bar / 2, o.h - bar * 2, depth], [0, cy, 0]);
  b.box('menuiseries', [o.w - bar * 2, o.h - bar * 2, 0.04], [0, cy, 0], { glass: true, tone: 'verre' });
  if (!shutters) return;
  const leaf = o.w / 2;
  for (const s of [1, -1]) b.box('menuiseries', [leaf, o.h, 0.05], [s * (o.w / 2 + leaf / 2 + 0.02), cy, WALL / 2 + 0.075], { tone: 'volet' });
  b.box('facade', [o.w + 0.3, 0.08, 0.22], [0, o.y0 - 0.04, WALL / 2 + 0.07], { tone: 'brique' });
};

/** Façade toulousaine : harpages d'angle, bandeau d'étage, encadrements briques, soubassement dégradé. */
const decorateSideWall = (b: HouseBuilder, side: Side): void => {
  const heights = side === -1 ? SIDE_OPENINGS.left : SIDE_OPENINGS.right;
  b.at([side * (HALF_W - WALL / 2), 0, 0], side === -1 ? -Math.PI / 2 : Math.PI / 2, () => {
    const z = WALL / 2;
    const corner = 0.42;
    b.brickPatch({ x0: -HALF_D, x1: -HALF_D + corner, y0: 0, y1: WALL_TOP, z, seed: 1, quoin: 'left' });
    b.brickPatch({ x0: HALF_D - corner, x1: HALF_D, y0: 0, y1: WALL_TOP, z, seed: 2, quoin: 'right' });
    b.brickPatch({ x0: -HALF_D + corner, x1: HALF_D - corner, y0: STOREY - 0.15, y1: STOREY + 0.15, z, seed: 3 });
    b.brickPatch({ x0: -3.4, x1: -0.5, y0: 0, y1: 0.8, z, seed: 4, taper: 0.6 });
    let seed = 10;
    for (const wz of SIDE_WINDOWS_Z) {
      for (const y0 of heights) {
        const half = SIDE_WINDOW.w / 2;
        const top = y0 + SIDE_WINDOW.h;
        b.brickPatch({ x0: wz - half - 0.25, x1: wz + half + 0.25, y0: top, y1: top + 0.28, z, seed: seed++ });
        b.brickPatch({ x0: wz - half - 0.22, x1: wz - half, y0, y1: top, z, seed: seed++ });
        b.brickPatch({ x0: wz + half, x1: wz + half + 0.22, y0, y1: top, z, seed: seed++ });
      }
    }
  });
};

const decorateExtension = (b: HouseBuilder): void => {
  b.at([HALF_W + 3.85, 0, 0], Math.PI / 2, () => {
    const z = WALL / 2;
    const corner = 0.42;
    b.brickPatch({ x0: -HALF_D, x1: -HALF_D + corner, y0: 0, y1: STOREY, z, seed: 31, quoin: 'left' });
    b.brickPatch({ x0: HALF_D - corner, x1: HALF_D, y0: 0, y1: STOREY, z, seed: 32, quoin: 'right' });
    b.brickPatch({ x0: -HALF_D + corner, x1: HALF_D - corner, y0: STOREY - 0.35, y1: STOREY - 0.07, z, seed: 33 });
    b.brickPatch({ x0: -2.6, x1: 0.6, y0: 0, y1: 0.9, z, seed: 34, taper: 0.6 });
  });
};

const buildStructure = (b: HouseBuilder): void => {
  b.box('maconnerie', [WIDTH + 0.6, 0.5, DEPTH + 0.6], [0, -0.25, 0], { tone: 'pierre' });
  plate(b, 'maconnerie', FLOOR_RECT, STOREY - WALL / 2, WALL, STAIR_HOLE);
  b.box('maconnerie', [0.8, 1.9, 0.8], [3.2, WALL_TOP + 0.95, -1.5], { tone: 'brique' });
  b.box('maconnerie', [0.45, 1.8, 2.8], [-6.3, 0.9, -1], { tone: 'pierre' });
  b.box('maconnerie', [0.55, 0.12, 2.9], [-6.3, 1.86, -1], { tone: 'brique' });

  b.place('facade', extruded(backWallShape(), WALL), [0, 0, -HALF_D]);
  sideWall(b, -1);
  sideWall(b, 1);
  for (const side of [1, -1] as const) {
    decorateSideWall(b, side);
    b.box('facade', [0.45, 0.16, DEPTH + 0.2], [side * (HALF_W + 0.1), WALL_TOP - 0.1, 0], { tone: 'brique' });
    b.box('facade', [0.3, 0.12, DEPTH + 0.2], [side * (HALF_W + 0.08), WALL_TOP - 0.24, 0], { tone: 'brique' });
    b.pipe('toiture', 0.07, DEPTH + 0.3, [side * (EAVE_X - 0.05), EAVE_Y - 0.2, 0], 'z', { tone: 'zinc' });
    b.pipe('toiture', 0.05, WALL_TOP - 0.3, [side * (HALF_W + 0.35), (WALL_TOP - 0.3) / 2 + 0.1, -HALF_D + 0.5], 'y', { tone: 'zinc' });
  }

  b.box('extension', [4.4, 0.5, DEPTH + 0.6], [HALF_W + 2.2, -0.25, 0], { tone: 'pierre' });
  b.box('extension', [4, STOREY, WALL], [HALF_W + 2, STOREY / 2, WALL_Z]);
  b.box('extension', [WALL, STOREY, DEPTH], [HALF_W + 3.85, STOREY / 2, 0]);
  b.box('extension', [4.6, 0.25, DEPTH + 0.6], [HALF_W + 2.1, STOREY + 0.125, 0], { tone: 'zinc' });
  decorateExtension(b);
};

const TILE_LEN = 0.52;
const TILE_STEP = 0.42;
const TILE_ROW = 0.36;
const AGED_RATIO = 0.18;

/** Générateur pseudo-aléatoire déterministe (même toit à chaque chargement). */
const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

/**
 * Tuiles canal « toulousaines » : rangs de couverts (demi-tuiles bombées) posés par éléments qui se chevauchent,
 * les canaux sombres sont la sous-couche. Une part de tuiles vieillies casse l'uniformité.
 * Retourne un maillage fusionné par teinte.
 */
const tileCourses = (side: Side): { couvert: BufferGeometry; patine: BufferGeometry } => {
  const [x, y] = slopeOrigin(side, -ROOF_THICKNESS / 2);
  const frame = new Matrix4().makeRotationZ(-side * SLOPE).setPosition(x, y, 0);
  const random = seeded(side === 1 ? 7 : 13);
  const parts = { couvert: [] as BufferGeometry[], patine: [] as BufferGeometry[] };
  const perRow = Math.floor((ROOF_LEN - TILE_LEN) / TILE_STEP) + 1;
  for (let z = -HALF_D - 0.2; z <= HALF_D + 0.2; z += TILE_ROW) {
    for (let k = 0; k < perRow; k++) {
      const tile = new CylinderGeometry(0.11, 0.085, TILE_LEN, 6, 1, true)
        .rotateZ((side * Math.PI) / 2)
        .translate(-ROOF_LEN / 2 + TILE_LEN / 2 + k * TILE_STEP, 0, z)
        .applyMatrix4(frame);
      parts[random() < AGED_RATIO ? 'patine' : 'couvert'].push(tile);
    }
  }
  return { couvert: mergeGeometries(parts.couvert), patine: mergeGeometries(parts.patine) };
};

/** Faîtières : pièces courtes alignées le long du faîtage. */
const ridgeCaps = (): BufferGeometry => {
  const caps: BufferGeometry[] = [];
  for (let z = -HALF_D - 0.3; z <= HALF_D + 0.3; z += 0.44) {
    caps.push(new CylinderGeometry(0.17, 0.15, 0.5, 8, 1, true).rotateX(Math.PI / 2).translate(0, RIDGE + 0.05, z));
  }
  return mergeGeometries(caps);
};

const buildRoof = (b: HouseBuilder): void => {
  const rafter = ROOF_LEN - 0.6;
  for (const side of [1, -1] as const) {
    slope(b, 'toiture', ROOF_LEN, ROOF_THICKNESS, DEPTH + 0.6, 0, side, 0, 'tuileFonce');
    const tiles = tileCourses(side);
    b.place('toiture', tiles.couvert, [0, 0, 0], { edges: false, pick: false });
    b.place('toiture', tiles.patine, [0, 0, 0], { edges: false, pick: false, tone: 'tuilePatine' });
    slope(b, 'isolation', ROOF_LEN - 1, 0.12, DEPTH - 0.4, 0.345, side);
    for (const z of TRUSS_Z) slope(b, 'charpente', rafter, 0.2, 0.2, 0.175, side, z);
  }
  b.place('toiture', ridgeCaps(), [0, 0, 0], { edges: false, pick: false });
  const post = RISE - 0.6;
  for (const z of TRUSS_Z) {
    b.box('charpente', [WIDTH - 1.6, 0.2, 0.2], [0, WALL_TOP + 0.1, z]);
    b.box('charpente', [0.18, post, 0.18], [0, WALL_TOP + 0.2 + post / 2, z]);
  }
  b.box('charpente', [0.22, 0.22, DEPTH - 0.2], [0, RIDGE - 0.3, 0]);
  b.box('isolation', [WIDTH - 3.6, 0.15, INNER_DEPTH - 0.1], [0, WALL_TOP + 0.275, INNER_CENTER_Z]);
};

const buildOpenings = (b: HouseBuilder): void => {
  for (const o of OPENINGS) b.at([o.x, 0, WALL_Z], 0, () => windowUnit(b, o, false));
  for (const side of [1, -1] as const) {
    const heights = side === -1 ? SIDE_OPENINGS.left : SIDE_OPENINGS.right;
    for (const z of SIDE_WINDOWS_Z) {
      for (const y0 of heights) {
        b.at([side * (HALF_W - WALL / 2), 0, z], side === -1 ? -Math.PI / 2 : Math.PI / 2, () => windowUnit(b, { x: 0, y0, ...SIDE_WINDOW }, true));
      }
    }
  }
};

const buildStairs = (b: HouseBuilder): void => {
  const rise = FLOOR_1 / STAIR_STEPS;
  for (let i = 0; i < STAIR_STEPS; i++) {
    const top = rise * (i + 1);
    b.box('finitions', [STAIR_WIDTH, top, STAIR_RUN], [STAIR_X, top / 2, STAIR_START_Z - STAIR_RUN * i], { tone: 'bois' });
  }
  const railX = STAIR_X + STAIR_WIDTH / 2 + 0.05;
  b.box('finitions', [0.05, 0.05, 3.4], [railX, FLOOR_1 + 0.95, 2], { tone: 'metal' });
  for (const z of [0.3, 1.4, 2.5, 3.6]) b.box('finitions', [0.04, 0.95, 0.04], [railX, FLOOR_1 + 0.475, z], { tone: 'metal' });
};

/** Plancher chauffant : serpentin posé à plat sur le sol du rez-de-chaussée. */
const buildHeatingFloor = (b: HouseBuilder): void => {
  const zs = [0.6, 1.2, 1.8, 2.4, 3.0];
  const tone = (i: number): MaterialKey => (i % 2 ? 'bleu' : 'rouge');
  zs.forEach((z, i) => b.box('chauffage', [5.8, 0.025, 0.07], [0.1, PLATE + 0.012, z], { tone: tone(i), edges: false }));
  [3, -2.8, 3, -2.8].forEach((x, i) => b.box('chauffage', [0.07, 0.025, 0.6], [x, PLATE + 0.012, zs[i] + 0.3], { tone: tone(i), edges: false }));
};

/** Climatisation : deux unités murales, liaisons frigorifiques cuivre, groupe extérieur fixé sur le pignon. */
const buildAirConditioning = (b: HouseBuilder): void => {
  const lineX = -INNER_HALF_W + 0.08;
  const unitZ = INNER_BACK_Z + 0.125;
  b.box('chauffage', [0.95, 0.3, 0.25], [-1.45, 2.35, unitZ], { tone: 'blanc' });
  b.box('chauffage', [0.95, 0.3, 0.25], [-1.5, WALL_TOP - 0.5, unitZ], { tone: 'blanc' });
  b.pipe('chauffage', 0.03, 3, [-1.95, 4, INNER_BACK_Z + 0.08], 'y', { tone: 'cuivre' });
  b.pipe('chauffage', 0.03, 2.8, [-3.35, 2.5, INNER_BACK_Z + 0.08], 'x', { tone: 'cuivre' });
  b.pipe('chauffage', 0.03, 6.6, [lineX, 2.5, -0.3], 'z', { tone: 'cuivre' });
  b.pipe('chauffage', 0.03, 0.6, [-HALF_W - 0.1, 2.5, 3], 'x', { tone: 'cuivre' });
  b.box('chauffage', [0.3, 0.55, 0.8], [-HALF_W - 0.35, 2.5, 3], { tone: 'blanc' });
  b.pipe('chauffage', 0.2, 0.04, [-HALF_W - 0.52, 2.5, 3], 'x', { tone: 'metal' });
};

const buildInterior = (b: HouseBuilder): void => {
  const zBack = INNER_BACK_Z + 0.05;

  b.box('salle-de-bain', [0.12, 2.6, 3], [1.4, FLOOR_1 + 1.3, -2.2], { tone: 'blanc' });
  b.box('salle-de-bain', [0.9, 0.8, 0.5], [2.2, FLOOR_1 + 0.4, -3.4], { tone: 'meuble' });
  b.box('salle-de-bain', [1.2, 0.08, 1.2], [4, FLOOR_1 + 0.04, -3.05]);
  b.box('salle-de-bain', [1.2, 2, 0.03], [4, FLOOR_1 + 1.08, -2.45], { glass: true, tone: 'verre' });
  b.box('salle-de-bain', [0.03, 2, 1.2], [3.4, FLOOR_1 + 1.08, -3.05], { glass: true, tone: 'verre' });
  b.box('salle-de-bain', [3.2, 0.04, 3], [3.05, FLOOR_1 + PLATE * 1.5, -2.2]);
  b.box('salle-de-bain', [3.2, 0.7, 0.03], [3.05, FLOOR_1 + 0.35, INNER_BACK_Z + 0.02]);
  b.box('salle-de-bain', [1.7, 0.55, 0.8], [2.4, FLOOR_1 + 0.3, -1.3], { tone: 'blanc' });
  b.box('salle-de-bain', [1.5, 0.04, 0.6], [2.4, FLOOR_1 + 0.57, -1.3], { tone: 'verre', glass: true });
  b.box('salle-de-bain', [0.2, 0.7, 0.4], [4.55, FLOOR_1 + 0.55, -1.2], { tone: 'blanc' });
  b.box('salle-de-bain', [0.5, 0.4, 0.4], [4.25, FLOOR_1 + 0.2, -1.2], { tone: 'blanc' });
  b.box('salle-de-bain', [0.8, 0.7, 0.03], [2.2, FLOOR_1 + 1.5, INNER_BACK_Z + 0.02], { glass: true, tone: 'verre' });
  b.box('salle-de-bain', [0.6, 0.06, 0.35], [2.2, FLOOR_1 + 0.83, -3.4], { tone: 'blanc' });
  b.pipe('salle-de-bain', 0.02, 1.8, [4.5, FLOOR_1 + 1.3, -3.62], 'y', { tone: 'metal' });
  b.pipe('salle-de-bain', 0.12, 0.03, [4.35, FLOOR_1 + 2.0, -3.45], 'y', { tone: 'metal' });
  b.box('chauffage', [0.5, 1.1, 0.06], [3.05, FLOOR_1 + 1.15, INNER_BACK_Z + 0.06], { tone: 'blanc' });

  b.box('cuisine', [2.6, 0.84, 0.7], [2.4, 0.42, -3.35]);
  b.box('cuisine', [2.6, 0.06, 0.72], [2.4, 0.87, -3.35], { tone: 'bois' });
  b.box('cuisine', [0.8, 2, 0.7], [4.2, 1, -3.35], { tone: 'blanc' });
  b.box('cuisine', [0.6, 0.02, 0.5], [1.7, 0.91, -3.35], { tone: 'cadre' });
  b.box('cuisine', [0.9, 0.35, 0.5], [1.7, 1.95, -3.45], { tone: 'metal' });
  b.box('cuisine', [0.5, 0.04, 0.4], [3.0, 0.91, -3.35], { tone: 'metal' });
  b.pipe('cuisine', 0.02, 0.3, [3.0, 1.05, -3.55], 'y', { tone: 'metal' });
  b.box('cuisine', [1.8, 0.84, 0.8], [2.9, 0.42, -1.4]);
  b.box('cuisine', [1.9, 0.06, 0.9], [2.9, 0.87, -1.4], { tone: 'bois' });

  b.pipe('electricite', 0.05, WALL_TOP, [0.9, WALL_TOP / 2, zBack], 'y');
  b.box('electricite', [0.5, 0.7, 0.15], [0.9, 1.6, zBack], { tone: 'blanc' });
  b.pipe('electricite', 0.04, WIDTH - 1, [0, 2.75, zBack], 'x', { tone: 'metal' });
  for (const y of [1.2, FLOOR_1 + 1.2]) b.box('electricite', [0.1, 0.1, 0.03], [-0.8, y, INNER_BACK_Z + 0.02], { tone: 'blanc' });
  for (const y of [0.3, FLOOR_1 + 0.3]) b.box('electricite', [0.1, 0.1, 0.03], [-0.8, y, INNER_BACK_Z + 0.02], { tone: 'blanc' });
  for (const x of [-2, 2]) {
    b.pipe('electricite', 0.18, 0.08, [x, STOREY - WALL / 2 - 0.04, 0], 'y', { tone: 'blanc' });
    b.pipe('electricite', 0.18, 0.08, [x, WALL_TOP - 0.14, 0], 'y', { tone: 'blanc' });
  }

  b.box('chauffage', [0.6, 1.2, 0.45], [-4.35, 0.6, -3.45], { tone: 'blanc' });
  b.pipe('chauffage', 0.04, 3.2, [-2.5, 0.2, zBack], 'x', { tone: 'bleu' });
  b.pipe('chauffage', 0.04, 2.7, [-4.35, 2.55, zBack], 'y');
  b.pipe('chauffage', 0.04, 4.65, [-2, FLOOR_1 + 0.2, zBack], 'x', { tone: 'bleu' });
  for (const x of [-3, -1.4]) b.box('chauffage', [1, 0.55, 0.1], [x, 0.4, -3.62], { tone: 'blanc' });
  for (const x of [-3, 0]) b.box('chauffage', [1, 0.55, 0.1], [x, FLOOR_1 + 0.4, -3.62], { tone: 'blanc' });
  b.box('chauffage', [0.35, 0.7, 0.9], [-5.8, 0.35, 2.75], { tone: 'blanc' });
  b.pipe('chauffage', 0.25, 0.04, [-5.99, 0.35, 2.75], 'x', { tone: 'metal' });
  buildHeatingFloor(b);
  buildAirConditioning(b);

  plate(b, 'finitions', FLOOR_RECT, 0, PLATE);
  plate(b, 'finitions', FLOOR_RECT, FLOOR_1, PLATE, STAIR_HOLE);
  for (const y of [PLATE / 2, FLOOR_1 + PLATE / 2]) {
    b.box('finitions', [INNER_HALF_W * 2, 0.12, 0.03], [0, y + 0.08, INNER_BACK_Z + 0.015], { tone: 'blanc' });
    for (const side of [1, -1] as const) {
      b.box('finitions', [0.03, 0.12, INNER_DEPTH], [side * (INNER_HALF_W - 0.015), y + 0.08, INNER_CENTER_Z], { tone: 'blanc' });
    }
  }
  buildStairs(b);
};

export const buildHouse = (palette: Palette): { group: Group; trades: Map<string, Trade> } => {
  const b = new HouseBuilder(palette);
  buildStructure(b);
  buildRoof(b);
  buildOpenings(b);
  buildInterior(b);
  return { group: b.group, trades: b.trades };
};

export const applyMix = (trade: Trade, palette: Palette): void => {
  for (const m of trade.materials) m.color.copy(palette.base).lerp(m.userData.reveal as Color, trade.mix);
};

/** Cadrage de la maquette : centre et demi-étendue (largeur, hauteur) pour le calcul de distance caméra. */
export const HOUSE_FRAME = {
  center: [1.4, 2.8, 1] as Vec3,
  halfWidth: 8.8,
  halfHeight: 5.6,
};
