// Maquette 3D v2 : maison en coupe (façade avant ouverte, repère en mètres, emprise 10 × 8, RDC 0–2,8, étage 3,1–5,9).
// Chaque maillage fusionné porte l'id d'un corps de métier (= corps-metier.ts) dans userData.id.
// Au repos tout est gris ; au survol, chaque matériau du métier prend sa couleur (house-materials-v2.ts).
import {
  BoxGeometry,
  BufferGeometry,
  Color,
  CurvePath,
  CylinderGeometry,
  Euler,
  ExtrudeGeometry,
  Group,
  LineCurve3,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Quaternion,
  Shape,
  TubeGeometry,
  Vector3,
} from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { GLASS_OPACITY, MATERIAL_COLORS, type MaterialKey } from './house-materials-v2';

export interface Palette {
  base: Color;
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
type Range = [number, number];
type Pts = Vec3[];

const TUBE_RADIAL = 10;
const AXIS_Z = new Vector3(0, 0, 1);

class HouseBuilder {
  readonly group = new Group();
  readonly trades = new Map<string, Trade>();
  private readonly buckets = new Map<string, { trade: string; material: MaterialKey; geometries: BufferGeometry[] }>();
  private transform = new Matrix4();

  constructor(private readonly palette: Palette) {}

  /** Construit un sous-ensemble dans un repère local (position + rotation Y). */
  at(position: Vec3, rotationY: number, build: () => void): void {
    const previous = this.transform;
    this.transform = previous.clone().multiply(new Matrix4().compose(new Vector3(...position), new Quaternion().setFromEuler(new Euler(0, rotationY, 0)), new Vector3(1, 1, 1)));
    build();
    this.transform = previous;
  }

  private add(trade: string, material: MaterialKey, geometry: BufferGeometry, local?: Matrix4): void {
    const geo = geometry.index ? geometry.toNonIndexed() : geometry;
    geo.deleteAttribute('uv');
    geo.applyMatrix4(local ? this.transform.clone().multiply(local) : this.transform);
    const key = `${trade}:${material}`;
    let bucket = this.buckets.get(key);
    if (!bucket) {
      bucket = { trade, material, geometries: [] };
      this.buckets.set(key, bucket);
    }
    bucket.geometries.push(geo);
  }

  box(trade: string, material: MaterialKey, [x0, x1]: Range, [y0, y1]: Range, [z0, z1]: Range): void {
    const geometry = new BoxGeometry(Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0));
    this.add(trade, material, geometry, new Matrix4().makeTranslation((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2));
  }

  /** Poutre de section w × h entre deux points. */
  beam(trade: string, material: MaterialKey, p0: Vector3, p1: Vector3, w: number, h: number): void {
    const d = new Vector3().subVectors(p1, p0);
    const mid = p0.clone().addScaledVector(d, 0.5);
    const q = new Quaternion().setFromUnitVectors(AXIS_Z, d.clone().normalize());
    this.add(trade, material, new BoxGeometry(w, h, d.length()), new Matrix4().compose(mid, q, new Vector3(1, 1, 1)));
  }

  /** Boîte orientée par une rotation d'Euler (pans de toiture, pannes, limons). */
  oriented(trade: string, material: MaterialKey, size: Vec3, position: Vec3, rotation: Vec3): void {
    const q = new Quaternion().setFromEuler(new Euler(...rotation));
    this.add(trade, material, new BoxGeometry(...size), new Matrix4().compose(new Vector3(...position), q, new Vector3(1, 1, 1)));
  }

  cyl(trade: string, material: MaterialKey, radius: number, height: number, position: Vec3, rotation: Vec3 = [0, 0, 0], segments = 32): void {
    const q = new Quaternion().setFromEuler(new Euler(...rotation));
    this.add(trade, material, new CylinderGeometry(radius, radius, height, segments), new Matrix4().compose(new Vector3(...position), q, new Vector3(1, 1, 1)));
  }

  tube(trade: string, material: MaterialKey, points: Pts, radius: number): void {
    const path = new CurvePath<Vector3>();
    for (let i = 0; i < points.length - 1; i++) path.add(new LineCurve3(new Vector3(...points[i]), new Vector3(...points[i + 1])));
    this.add(trade, material, new TubeGeometry(path, Math.max(64, points.length * 12), radius, TUBE_RADIAL, false));
  }

  extrude(trade: string, material: MaterialKey, shape: Shape, depth: number, rotationY: number, position: Vec3): void {
    const q = new Quaternion().setFromEuler(new Euler(0, rotationY, 0));
    this.add(trade, material, new ExtrudeGeometry(shape, { depth, bevelEnabled: false }), new Matrix4().compose(new Vector3(...position), q, new Vector3(1, 1, 1)));
  }

  /** Fusion par corps de métier × matériau : ~1700 pièces → quelques dizaines d'appels de rendu. */
  build(): { group: Group; trades: Map<string, Trade> } {
    for (const { trade, material, geometries } of this.buckets.values()) {
      const t = this.trade(trade);
      const opacity = GLASS_OPACITY[material];
      const m = new MeshStandardMaterial({
        color: this.palette.base,
        roughness: 1,
        metalness: 0,
        transparent: opacity !== undefined,
        opacity: opacity ?? 1,
        depthWrite: opacity === undefined,
      });
      m.userData.reveal = new Color(MATERIAL_COLORS[material]);
      t.materials.push(m);
      const mesh = new Mesh(mergeGeometries(geometries, false), m);
      mesh.userData.id = trade;
      t.meshes.push(mesh);
      this.group.add(mesh);
      geometries.forEach((g) => g.dispose());
    }
    return { group: this.group, trades: this.trades };
  }

  private trade(id: string): Trade {
    let t = this.trades.get(id);
    if (!t) {
      t = { id, meshes: [], materials: [], mix: 0, target: 0 };
      this.trades.set(id, t);
    }
    return t;
  }
}

// ── Dimensions (m)
const WT = 6.1;
const RIDGE = 8.7;
const A = Math.atan2(RIDGE - WT, 4);
const L0 = Math.hypot(4, RIDGE - WT);
const LMAX = L0 + 0.45;
const P = (s: number, side: number) => new Vector3(0, RIDGE - s * Math.sin(A), side * s * Math.cos(A));
const N = (side: number) => new Vector3(0, Math.cos(A), side * Math.sin(A));
const sortPair = (a: number, b: number): Range => (a < b ? [a, b] : [b, a]);

let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// Ouverture du RDC vers l'extension (mur est) et emprise de l'extension.
const OPENING: Range = [-1.2, 1.2];
const OPENING_TOP = 2.2;
const EXT_X1 = 8.6;
const EXT_Z: Range = [-2.8, 2.4];
const SKYLIGHT_X: Range = [6.2, 7.8];
const SKYLIGHT_Z: Range = [-1, 0.8];

const buildFoundations = (b: HouseBuilder) => {
  const f = (x: Range, y: Range, z: Range) => b.box('maconnerie', 'beton', x, y, z);
  f([-5, 5], [-0.35, 0], [-4, 4]);
  f([-5.1, 5.1], [-1, -0.35], [-4.1, -3.5]);
  f([-5.1, 5.1], [-1, -0.35], [3.5, 4.1]);
  f([-5.1, -4.5], [-1, -0.35], [-3.5, 3.5]);
  f([4.5, 5.1], [-1, -0.35], [-3.5, 3.5]);
  // Extension : dallage et semelles
  f([5, EXT_X1], [-0.35, 0], EXT_Z);
  f([5, 8.7], [-1, -0.35], [-2.9, -2.3]);
  f([8.1, 8.7], [-1, -0.35], [-2.3, 2.5]);
  f([5, 8.7], [-1, -0.35], [1.9, 2.5]);
};

const buildTerrain = (b: HouseBuilder) => {
  const ground = (x: Range, z: Range) => {
    b.box('maconnerie', 'terre', x, [-1.3, -0.04], z);
    b.box('maconnerie', 'herbe', x, [-0.04, 0], z);
  };
  ground([-8.2, -5], [-5, 4.6]);
  ground([-5, 9.6], [-5, -4]);
  ground([5, 9.6], [-4, -2.9]);
  ground([8.7, 9.6], [-2.9, 2.5]);
  ground([-5, -1.5], [4, 4.6]);
  b.box('maconnerie', 'terre', [-5, 5], [-1.3, -1], [-4, 4]);
  b.box('maconnerie', 'terre', [-4.5, 4.5], [-1, -0.35], [-3.5, 3.5]);
  b.box('maconnerie', 'terre', [5, 8.7], [-1.3, -1], [-2.9, 2.5]);
  b.box('maconnerie', 'terre', [5, 8.1], [-1, -0.35], [-2.3, 1.9]);
};

const buildWalls = (b: HouseBuilder) => {
  const wall = (x: Range, y: Range, z: Range) => b.box('facade', 'enduit', x, y, z);
  wall([-5, 5], [0, WT], [-4, -3.7]);
  wall([-5, -4.7], [0, WT], [-3.7, 4]);
  wall([4.7, 5], [0, WT], [-3.7, OPENING[0]]);
  wall([4.7, 5], [0, WT], [OPENING[1], 3.7]);
  wall([4.7, 5], [OPENING_TOP, WT], OPENING);
  wall([-4.7, -1.5], [0, WT], [3.7, 4]);

  const gable = new Shape();
  gable.moveTo(-4, 0);
  gable.lineTo(4, 0);
  gable.lineTo(0, RIDGE - WT);
  gable.closePath();
  for (const x of [-5, 4.7]) b.extrude('facade', 'enduit', gable, 0.3, Math.PI / 2, [x, WT, 0]);

  // chaînages d'angle (harpage alterné)
  const quoin = (cx: number, cz: number, sx: number, sz: number) => {
    for (let i = 0; i * 0.3 < WT - 0.01; i++) {
      const w = i % 2 ? 0.45 : 0.28;
      const y0 = i * 0.3;
      const y1 = Math.min(WT, y0 + 0.3) - 0.012;
      b.box('facade', 'brique', sortPair(cx - sx * w, cx + sx * 0.025), [y0, y1], sortPair(cz - sz * 0.3, cz + sz * 0.025));
      b.box('facade', 'brique', sortPair(cx - sx * 0.3, cx + sx * 0.025), [y0, y1], sortPair(cz - sz * w, cz + sz * 0.025));
    }
  };
  quoin(-5, -4, -1, -1);
  quoin(5, -4, 1, -1);
  quoin(-5, 4, -1, 1);
  for (let i = 0; i * 0.3 < WT - 0.01; i++) {
    const w = i % 2 ? 0.42 : 0.26;
    b.box('facade', 'brique', [-1.5 - w, -1.5], [i * 0.3, Math.min(WT, i * 0.3 + 0.3) - 0.012], [3.7, 4.025]);
  }
  for (const [y0, y1] of [[2.82, 3.08], [5.86, WT]]) {
    b.box('facade', 'brique', [-5.03, 5.03], [y0, y1], [-4.03, -3.98]);
    b.box('facade', 'brique', [4.98, 5.03], [y0, y1], [-3.98, 3.7]);
    b.box('facade', 'brique', [-5.03, -4.98], [y0, y1], [-3.98, 4.03]);
    b.box('facade', 'brique', [-4.98, -1.5], [y0, y1], [3.98, 4.03]);
  }

  // doublages intérieurs, cloisons, soubassement peint : finitions
  const lining = (x: Range, y: Range, z: Range, material: MaterialKey = 'platre') => b.box('finitions', material, x, y, z);
  lining([-4.7, 0.425], [0.12, 2.8], [-3.7, -3.685]);
  lining([0.575, 4.7], [0.12, 2.8], [-3.7, -3.685]);
  lining([-4.7, 0.425], [3.1, 4.0], [-3.7, -3.685], 'peinture_orange');
  lining([-4.7, 0.425], [4.0, 5.88], [-3.7, -3.685]);
  lining([-4.7, -4.685], [0.12, 5.88], [-3.685, 3.7]);
  lining([4.685, 4.7], [0.12, 2.8], [-3.685, OPENING[0]]);
  lining([4.685, 4.7], [0.12, 2.8], [OPENING[1], 3.7]);
  for (const [y0, y1, lintel] of [[0.12, 2.8, 2.15], [3.1, 5.88, 5.2]]) {
    lining([0.425, 0.575], [y0, y1], [-3.685, 1.3]);
    lining([0.425, 0.575], [y0, y1], [2.2, 3.7]);
    lining([0.425, 0.575], [lintel, y1], [1.3, 2.2]);
  }
};

const buildOpenings = (b: HouseBuilder) => {
  const windowAt = (x: number, y: number, z: number, rotationY: number, w = 0.9, h = 1.4) =>
    b.at([x, y, z], rotationY, () => {
      b.box('menuiseries', 'menuiserie', [-w / 2 - 0.06, w / 2 + 0.06], [-h / 2 - 0.06, h / 2 + 0.06], [0, 0.04]);
      b.box('menuiseries', 'vitrage', [-w / 2, w / 2], [-h / 2, h / 2], [0.04, 0.05]);
      b.box('menuiseries', 'menuiserie', [-0.025, 0.025], [-h / 2, h / 2], [0.04, 0.07]);
      b.box('menuiseries', 'menuiserie', [-w / 2, w / 2], [h * 0.2 - 0.02, h * 0.2 + 0.02], [0.04, 0.07]);
      b.box('menuiseries', 'brique', [-w / 2 - 0.12, w / 2 + 0.12], [-h / 2 - 0.14, -h / 2 - 0.06], [0, 0.1]);
      b.box('menuiseries', 'brique', [-w / 2 - 0.12, w / 2 + 0.12], [h / 2 + 0.06, h / 2 + 0.26], [0, 0.03]);
      const sw = w / 2 + 0.02;
      for (const side of [-1, 1]) {
        const x0 = side < 0 ? -w / 2 - 0.1 - sw : w / 2 + 0.1;
        b.box('menuiseries', 'volet', [x0, x0 + sw], [-h / 2 - 0.04, h / 2 + 0.04], [0.01, 0.045]);
        for (let i = 0; i < 12; i++) {
          const yy = -h / 2 + 0.05 + (i * (h - 0.1)) / 11;
          b.box('menuiseries', 'volet_fonce', [x0 + 0.04, x0 + sw - 0.04], [yy - 0.012, yy + 0.012], [0.045, 0.055]);
        }
      }
    });
  for (const y of [1.45, 4.45]) {
    windowAt(-3.25, y, 4, 0);
    for (const z of [-1.7, 1.7]) {
      if (y > 3) windowAt(5, y, z, Math.PI / 2); // RDC côté est : remplacé par l'ouverture vers l'extension
      windowAt(-5, y, z, -Math.PI / 2);
    }
    for (const x of [-2.6, 2.6]) windowAt(x, y, -4, Math.PI);
  }
};

const buildFloors = (b: HouseBuilder) => {
  const wood = (x: Range, y: Range, z: Range) => b.box('maconnerie', 'bois_charpente', x, y, z);
  const finish = (x: Range, y: Range, z: Range, material: MaterialKey) => b.box('finitions', material, x, y, z);
  finish([-4.7, 4.7], [0.1, 0.12], [-3.7, 2.6], 'parquet');
  for (let x = -4.55; x <= 4.6; x += 0.45) wood([x - 0.035, x + 0.035], [2.8, 3.02], [x < -0.5 ? -2.7 : -3.7, 3.7]);
  wood([-4.7, -0.5], [2.8, 3.02], [-2.78, -2.7]);
  wood([-4.7, 4.7], [3.02, 3.08], [-2.7, 3.7]);
  wood([-0.5, 4.7], [3.02, 3.08], [-3.7, -2.7]);
  finish([-4.7, 0.425], [3.08, 3.1], [-2.7, 3.7], 'parquet');
  finish([-0.5, 0.425], [3.08, 3.1], [-3.7, -2.7], 'parquet');
  finish([-4.7, 4.7], [5.88, 5.9], [-3.7, 3.7], 'platre');
  for (let x = -4.4; x <= 4.5; x += 0.6) wood([x - 0.03, x + 0.03], [5.9, 6.1], [-3.7, 3.7]);
  b.box('isolation', 'laine', [-4.7, 4.7], [5.9, 6.28], [-3.7, 3.7]);
};

const buildFrame = (b: HouseBuilder) => {
  const wood = (p0: Vector3, p1: Vector3, w: number, h: number) => b.beam('charpente', 'bois_charpente', p0, p1, w, h);
  for (let i = 0; i <= 10; i++) {
    const x = -4.6 + i * 0.92;
    const at = (v: Vector3) => v.setX(x);
    for (const side of [-1, 1]) {
      wood(at(P(0.05, side).addScaledVector(N(side), -0.1)), at(P(LMAX - 0.1, side).addScaledVector(N(side), -0.1)), 0.07, 0.18);
      wood(new Vector3(x, 6.35, 0), at(P(L0 * 0.5, side).addScaledVector(N(side), -0.18)), 0.06, 0.12);
    }
    wood(new Vector3(x, 6.28, -4), new Vector3(x, 6.28, 4), 0.07, 0.18);
    wood(new Vector3(x, 6.2, 0), new Vector3(x, RIDGE - 0.12, 0), 0.1, 0.1);
  }
  b.box('charpente', 'bois_charpente', [-5.3, 5.3], [RIDGE - 0.32, RIDGE - 0.1], [-0.06, 0.06]);
  for (const side of [-1, 1]) {
    const p = P(L0 * 0.5, side).addScaledVector(N(side), -0.04);
    b.oriented('charpente', 'bois_charpente', [10.6, 0.16, 0.12], [0, p.y, p.z], [side * A, 0, 0]);
  }
};

const buildRoof = (b: HouseBuilder) => {
  const onRoof = (material: MaterialKey, x0: number, x1: number, s0: number, s1: number, offset: number, thickness: number, side: number, tilt = 0) => {
    const c = P((s0 + s1) / 2, side).addScaledVector(N(side), offset);
    b.oriented('toiture', material, [x1 - x0, thickness, s1 - s0], [(x0 + x1) / 2, c.y, c.z], [side * (A - tilt), 0, 0]);
  };
  const tileZone = (x0: number, x1: number, side: number) => {
    onRoof('pare_pluie', x0, x1, 0, LMAX, 0.006, 0.006, side);
    for (let s = 0.1; s < LMAX - 0.05; s += 0.3) onRoof('tuile', x0, x1, s, Math.min(LMAX, s + 0.36), 0.085, 0.04, side, 0.06);
  };
  tileZone(-5.4, 5.4, -1);
  tileZone(-5.4, -1.5, 1);
  tileZone(3.8, 5.4, 1);
  // pan avant déposé entre -1,5 et 3,8 : liteaux et pare-pluie visibles
  onRoof('pare_pluie', -1.5, 0.8, 0.2, LMAX, 0.006, 0.006, 1);
  for (let s = 0.25; s < LMAX; s += 0.35) onRoof('bois_charpente', -1.5, 0.8, s, s + 0.045, 0.03, 0.03, 1);
  for (let s = 0.3; s < LMAX - 0.3; s += 0.3) onRoof('tuile', -1.5, -0.6, s, s + 0.36, 0.085, 0.04, 1, 0.06);
  b.cyl('toiture', 'tuile', 0.13, 10.9, [0, RIDGE + 0.08, 0], [0, 0, Math.PI / 2], 24);
  const gutter = (x0: number, x1: number, side: number) => {
    const p = P(LMAX, side);
    b.cyl('toiture', 'zinc', 0.065, x1 - x0, [(x0 + x1) / 2, p.y - 0.02, p.z + side * 0.03], [0, 0, Math.PI / 2], 20);
  };
  gutter(-5.4, 5.4, -1);
  gutter(-5.4, -1.5, 1);
  gutter(3.8, 5.4, 1);
  b.cyl('toiture', 'zinc', 0.045, WT - 0.2, [-5.25, (WT - 0.2) / 2, 4.42], [0, 0, 0], 16);
};

const buildHeating = (b: HouseBuilder) => {
  b.box('chauffage', 'beton', [-4.7, 4.7], [0, 0.1], [-3.7, 3.7]);
  const serpentine = (x0: number, x1: number, y: number, z0: number, z1: number, material: MaterialKey, step = 0.28) => {
    const points: Pts = [];
    let flip = false;
    for (let x = x0; x <= x1 + 1e-6; x += step) {
      points.push([x, y, flip ? z1 : z0], [x, y, flip ? z0 : z1]);
      flip = !flip;
    }
    b.tube('chauffage', material, points, 0.024);
  };
  serpentine(-4.5, 0.2, 0.125, 2.72, 3.58, 'tube_chaud');
  serpentine(0.8, 4.5, 0.125, 2.72, 3.58, 'tube_froid');
  serpentine(0.8, 4.5, 3.105, 2.9, 3.58, 'tube_chaud', 0.3);

  // pompe à chaleur et liaisons frigorifiques
  b.box('chauffage', 'beton', [-6.7, -5.5], [0, 0.1], [2.65, 3.4]);
  b.box('chauffage', 'blanc', [-6.6, -5.65], [0.18, 0.9], [2.8, 3.16]);
  for (const x of [-6.5, -5.75]) b.box('chauffage', 'sombre', [x - 0.04, x + 0.04], [0.1, 0.18], [2.8, 3.16]);
  b.cyl('chauffage', 'sombre', 0.25, 0.015, [-6.32, 0.54, 3.165], [Math.PI / 2, 0, 0], 40);
  b.cyl('chauffage', 'metal', 0.05, 0.02, [-6.32, 0.54, 3.175], [Math.PI / 2, 0, 0], 24);
  for (let i = 0; i < 6; i++) b.box('chauffage', 'sombre', [-5.95, -5.72], [0.3 + i * 0.09, 0.33 + i * 0.09], [3.16, 3.168]);
  const link = (dz: number, material: MaterialKey) =>
    b.tube('chauffage', material, [
      [-5.65, 0.32, 2.98 + dz], [-5.3, 0.32, 2.98 + dz], [-5.3, -0.6, 2.98 + dz], [-5.3, -0.6, 4.12 + dz],
      [0.75 + dz, -0.6, 4.12 + dz], [0.75 + dz, -0.6, 3.75], [0.75 + dz, -0.35, 3.75],
    ], 0.022);
  link(0, 'tube_chaud');
  link(0.07, 'tube_froid');
};

const buildUtilities = (b: HouseBuilder) => {
  b.cyl('electricite', 'pvc', 0.055, 7.2, [0.88, 2.6, 3.56], [0, 0, 0], 24);
  b.cyl('electricite', 'gaine_elec', 0.025, 6.6, [1.0, 2.9, 3.6]);
  b.cyl('electricite', 'tube_chaud', 0.02, 6.2, [0.66, 2.9, 3.4]);
  b.cyl('electricite', 'tube_froid', 0.02, 6.2, [0.73, 2.9, 3.4]);
  for (const [y0, y1] of [[1.25, 2.0], [4.05, 4.65]]) {
    b.box('electricite', 'tableau', [0.575, 0.69], [y0, y1], [2.55, 3.2]);
    for (let y = y0 + 0.12; y < y1 - 0.05; y += 0.17) b.box('electricite', 'sombre', [0.69, 0.705], [y - 0.045, y + 0.045], [2.62, 3.13]);
  }
};

const buildStairs = (b: HouseBuilder) => {
  const rise = (3.1 - 0.12) / 14;
  const run = 0.25;
  for (let i = 0; i < 14; i++) {
    const x0 = -4.0 + i * run;
    const top = 0.12 + (i + 1) * rise;
    b.box('finitions', 'parquet', [x0, x0 + run + 0.03], [top - 0.04, top], [-3.68, -2.8]);
    b.box('finitions', 'blanc', [x0, x0 + 0.02], [top - rise, top - 0.04], [-3.66, -2.82]);
  }
  const rail = (material: MaterialKey, x0: number, y0: number, x1: number, y1: number, z: number, h: number, w: number) => {
    const length = Math.hypot(x1 - x0, y1 - y0);
    b.oriented('finitions', material, [length, h, w], [(x0 + x1) / 2, (y0 + y1) / 2, z], [0, 0, Math.atan2(y1 - y0, x1 - x0)]);
  };
  rail('blanc', -4.0, 0.1, -0.5, 3.08 - 0.02, -2.77, 0.28, 0.05);
  rail('parquet', -4.0, 1.05, -0.6, 3.95, -2.77, 0.05, 0.06);
  for (let i = 1; i < 14; i += 2) {
    const x = -4.0 + i * run + 0.12;
    const base = 0.12 + (i + 1) * rise;
    b.box('finitions', 'blanc', [x - 0.015, x + 0.015], [base, base + 0.88], [-2.785, -2.755]);
  }
  for (let x = -4.6; x <= -0.55; x += 0.58) b.box('finitions', 'metal', [x - 0.02, x + 0.02], [3.1, 4.1], [-2.7, -2.66]);
  b.box('finitions', 'metal', [-4.62, -0.53], [4.08, 4.12], [-2.71, -2.65]);
  for (const y of [3.35, 3.6, 3.85]) b.box('finitions', 'metal', [-4.62, -0.53], [y - 0.012, y + 0.012], [-2.7, -2.66]);
};

const buildKitchen = (b: HouseBuilder) => {
  const k = (material: MaterialKey, x: Range, y: Range, z: Range) => b.box('cuisine', material, x, y, z);
  k('meuble', [1.3, 4.68], [0.12, 0.98], [-3.685, -3.1]);
  k('sombre', [1.3, 4.68], [0.12, 0.2], [-3.1, -3.08]);
  k('plan_travail', [1.3, 4.68], [0.98, 1.02], [-3.685, -3.05]);
  for (let x = 1.9; x < 4.6; x += 0.6) k('sombre', [x - 0.006, x + 0.006], [0.22, 0.96], [-3.1, -3.09]);
  k('meuble', [0.6, 1.3], [0.12, 2.3], [-3.685, -3.08]);
  k('electromenager', [0.68, 1.22], [0.95, 1.5], [-3.08, -3.065]);
  k('electromenager', [0.68, 1.22], [1.58, 1.92], [-3.08, -3.065]);
  k('meuble', [1.3, 2.6], [1.55, 2.3], [-3.685, -3.34]);
  k('meuble', [3.4, 4.68], [1.55, 2.3], [-3.685, -3.34]);
  k('metal', [2.65, 3.35], [1.66, 1.8], [-3.685, -3.2]);
  k('metal', [2.86, 3.14], [1.8, 2.8], [-3.685, -3.45]);
  k('electromenager', [2.7, 3.3], [1.02, 1.03], [-3.6, -3.15]);
  k('metal', [3.8, 4.4], [1.02, 1.032], [-3.58, -3.2]);
  b.cyl('cuisine', 'metal', 0.015, 0.3, [4.1, 1.17, -3.6], [0, 0, 0], 16);
  k('meuble', [2.2, 3.9], [0.12, 0.92], [-0.5, 0.4]);
  k('plan_travail', [2.1, 4.0], [0.92, 0.97], [-0.6, 0.6]);
  for (const x of [2.77, 3.33]) k('sombre', [x - 0.006, x + 0.006], [0.16, 0.9], [0.4, 0.41]);
};

const buildBathroom = (b: HouseBuilder) => {
  const s = (material: MaterialKey, x: Range, y: Range, z: Range) => b.box('salle-de-bain', material, x, y, z);
  s('carrelage', [0.575, 4.7], [3.08, 3.11], [-3.7, 2.82]);
  s('faience', [0.575, 4.685], [3.11, 5.88], [-3.685, -3.67]);
  s('faience', [4.67, 4.685], [3.11, 5.88], [-3.67, 3.7]);
  s('blanc', [3.3, 4.67], [3.11, 3.15], [-3.67, -2.3]);
  s('verre', [3.29, 3.31], [3.15, 5.2], [-3.67, -2.3]);
  s('verre', [3.3, 4.05], [3.15, 5.2], [-2.31, -2.29]);
  s('metal', [3.28, 3.32], [3.15, 5.2], [-2.32, -2.28]);
  b.cyl('salle-de-bain', 'metal', 0.015, 1.25, [4.1, 4.5, -3.64], [0, 0, 0], 16);
  b.beam('salle-de-bain', 'metal', new Vector3(4.1, 5.12, -3.64), new Vector3(4.1, 5.12, -3.35), 0.03, 0.03);
  b.cyl('salle-de-bain', 'metal', 0.13, 0.02, [4.1, 5.1, -3.3], [0, 0, 0], 40);
  s('metal', [4.0, 4.2], [4.15, 4.25], [-3.67, -3.6]);
  s('meuble', [0.575, 1.12], [3.11, 3.95], [-1.6, -0.4]);
  s('blanc', [0.575, 1.18], [3.95, 4.03], [-1.65, -0.35]);
  s('vitrage', [0.575, 0.6], [4.3, 5.1], [-1.5, -0.5]);
  s('blanc', [4.62, 4.67], [3.6, 4.8], [0.5, 1.1]);
};

const buildStoneWall = (b: HouseBuilder) => {
  const topAt = (z: number) => (z < -1 ? 2.6 : 2.6 - (z + 1) * 0.62) + (rnd() - 0.5) * 0.25;
  for (let row = 0; row < 10; row++) {
    const y0 = row * 0.27;
    let z = -3.6 + (row % 2 ? 0.2 : 0);
    if (row % 2 && y0 < topAt(-3.5)) b.box('maconnerie', 'pierre', [-7.28, -6.82], [y0 + 0.01, y0 + 0.26], [-3.6, -3.42]);
    while (z < 1.55) {
      const len = Math.min(0.35 + rnd() * 0.3, 1.6 - z);
      if (y0 < topAt(z + len / 2)) {
        b.box('maconnerie', 'mortier', [-7.22, -6.88], [y0, y0 + 0.27], [z, z + len]);
        const j = (rnd() - 0.5) * 0.05;
        b.box('maconnerie', rnd() > 0.5 ? 'pierre' : 'pierre_sombre', [-7.3 + j, -6.8 + j], [y0 + 0.012, y0 + 0.26], [z + 0.012, z + len - 0.012]);
      }
      z += len;
    }
  }
  b.box('maconnerie', 'brique', [-7.35, -6.75], [0, 1.4], [1.6, 2.15]);
  b.box('maconnerie', 'beton', [-7.4, -6.7], [1.4, 1.48], [1.55, 2.2]);
};

/** Extension de plain-pied côté pignon est : pièce de vie vitrée, toit plat à lanterneau. */
const buildExtension = (b: HouseBuilder) => {
  const e = (material: MaterialKey, x: Range, y: Range, z: Range) => b.box('extension', material, x, y, z);
  const withHole = (material: MaterialKey, y: Range, x: Range, z: Range) => {
    e(material, [x[0], SKYLIGHT_X[0]], y, z);
    e(material, [SKYLIGHT_X[1], x[1]], y, z);
    e(material, SKYLIGHT_X, y, [z[0], SKYLIGHT_Z[0]]);
    e(material, SKYLIGHT_X, y, [SKYLIGHT_Z[1], z[1]]);
  };

  // gros œuvre : mur arrière, linteau, dalle de toit étanchée
  e('enduit', [5, EXT_X1], [0, 2.8], [EXT_Z[0], -2.5]);
  e('enduit', [8.45, EXT_X1], [2.5, 2.8], [EXT_Z[0], EXT_Z[1]]);
  withHole('beton', [2.8, 2.95], [5, 8.7], [-2.9, 2.6]);
  withHole('etancheite', [2.95, 2.97], [5, 8.7], [-2.9, 2.6]);
  // lanterneau
  const [sx0, sx1] = SKYLIGHT_X;
  const [sz0, sz1] = SKYLIGHT_Z;
  e('beton', [sx0, sx1], [2.97, 3.1], [sz0 - 0.08, sz0]);
  e('beton', [sx0, sx1], [2.97, 3.1], [sz1, sz1 + 0.08]);
  e('beton', [sx0 - 0.08, sx0], [2.97, 3.1], [sz0 - 0.08, sz1 + 0.08]);
  e('beton', [sx1, sx1 + 0.08], [2.97, 3.1], [sz0 - 0.08, sz1 + 0.08]);
  e('verre', [sx0, sx1], [3.1, 3.12], [sz0, sz1]);

  // sol et intérieur
  e('beton', [5, EXT_X1], [0, 0.1], [-2.5, EXT_Z[1]]);
  e('parquet', [5, 8.45], [0.1, 0.12], [-2.5, EXT_Z[1]]);
  e('platre', [5, 8.45], [0.12, 2.8], [-2.5, -2.485]);
  withHole('platre', [2.78, 2.8], [5, 8.45], [-2.5, EXT_Z[1]]);

  // baie vitrée coulissante sur le pignon est
  e('sombre', [8.48, EXT_X1], [0.1, 0.16], [-2.5, EXT_Z[1]]);
  e('sombre', [8.48, EXT_X1], [2.44, 2.5], [-2.5, EXT_Z[1]]);
  e('sombre', [8.48, EXT_X1], [0.1, 2.5], [-2.5, -2.44]);
  e('sombre', [8.48, EXT_X1], [0.1, 2.5], [2.34, EXT_Z[1]]);
  for (const z of [-0.7, 1.05]) e('sombre', [8.5, 8.56], [0.16, 2.44], [z - 0.03, z + 0.03]);
  e('verre', [8.52, 8.54], [0.16, 2.44], [-2.44, 2.34]);

  // éclairage encastré
  for (const [x, z] of [[5.6, -1.5], [5.6, 0.9], [8.1, -1.5], [8.1, 0.9], [7.0, -1.8], [7.0, 1.5]]) {
    b.cyl('extension', 'spot', 0.07, 0.03, [x, 2.765, z], [0, 0, 0], 20);
  }

  // mobilier : canapé, table basse, tapis, table à manger
  e('tapis', [5.8, 7.6], [0.12, 0.125], [-1.5, -0.2]);
  e('canape', [5.7, 7.7], [0.12, 0.5], [-2.45, -1.6]);
  e('canape', [5.7, 7.7], [0.5, 0.9], [-2.45, -2.2]);
  e('canape', [5.7, 5.95], [0.5, 0.65], [-2.2, -1.6]);
  e('canape', [7.45, 7.7], [0.5, 0.65], [-2.2, -1.6]);
  e('plan_travail', [6.2, 7.2], [0.38, 0.42], [-1.2, -0.5]);
  for (const x of [6.25, 7.15]) for (const z of [-1.15, -0.55]) e('sombre', [x - 0.025, x + 0.025], [0.12, 0.38], [z - 0.025, z + 0.025]);
  e('plan_travail', [7.4, 8.1], [0.72, 0.76], [0.4, 1.6]);
  for (const x of [7.45, 8.05]) for (const z of [0.45, 1.55]) e('sombre', [x - 0.025, x + 0.025], [0.12, 0.72], [z - 0.025, z + 0.025]);
  for (const z of [0.6, 1.4]) {
    for (const [x, side] of [[7.1, 1], [8.4, -1]]) {
      e('meuble', [x - 0.2, x + 0.2], [0.42, 0.46], [z - 0.2, z + 0.2]);
      e('meuble', side > 0 ? [x - 0.2, x - 0.17] : [x + 0.17, x + 0.2], [0.46, 0.9], [z - 0.2, z + 0.2]);
      for (const dx of [-0.17, 0.17]) for (const dz of [-0.17, 0.17]) e('sombre', [x + dx - 0.015, x + dx + 0.015], [0.12, 0.42], [z + dz - 0.015, z + dz + 0.015]);
    }
  }
};

export const buildHouse = (palette: Palette): { group: Group; trades: Map<string, Trade> } => {
  const b = new HouseBuilder(palette);
  buildFoundations(b);
  buildTerrain(b);
  buildWalls(b);
  buildOpenings(b);
  buildFloors(b);
  buildFrame(b);
  buildRoof(b);
  buildHeating(b);
  buildUtilities(b);
  buildStairs(b);
  buildKitchen(b);
  buildBathroom(b);
  buildStoneWall(b);
  buildExtension(b);
  return b.build();
};

export const applyMix = (trade: Trade, palette: Palette): void => {
  for (const m of trade.materials) m.color.copy(palette.base).lerp(m.userData.reveal as Color, trade.mix);
};

/** Cadrage de la maquette : centre et demi-étendue (largeur, hauteur) pour le calcul de distance caméra. */
export const HOUSE_FRAME = {
  center: [0.7, 3.5, 0] as Vec3,
  halfWidth: 9.4,
  halfHeight: 5.8,
};
