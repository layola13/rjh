import { Entity } from './Entity';
import { NCustomizedStructure, NCustomizedStructre_IO, StructureMode } from './NCustomizedStructure';
import { Line2d, Arc2d, Loop, Polygon, Coordinate3, Vector2, Vector3 } from './geometry';
import { alg } from './algorithm';

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

type DumpCallback = (result: unknown, entity: unknown) => void;

interface CurveUserData {
  curveid: string;
  index: number;
}

interface BrepCache {
  bottomFace: { tag: string };
  topFace: { tag: string };
  sideFaces: Array<Array<{ tag: string }>>;
}

class NCustomizedOutlet_IO extends NCustomizedStructre_IO {
  dump(
    entity: unknown,
    callback?: DumpCallback,
    serialize: boolean = true,
    options: DumpOptions = {}
  ): unknown {
    const result = super.dump(entity, undefined, serialize, options);
    if (callback) {
      callback(result, entity);
    }
    return result;
  }

  load(data: unknown, target: unknown, options: LoadOptions = {}): void {
    super.load(data, target, options);
  }

  static instance(): NCustomizedOutlet_IO {
    return new NCustomizedOutlet_IO();
  }
}

class NCustomizedOutlet extends NCustomizedStructure {
  private brepcache?: unknown;
  protected XLength: number = 0;
  protected XScale: number = 1;
  protected ZLength: number = 0;
  protected ZScale: number = 1;
  protected ZSize: number = 0;

  constructor(id: string = "") {
    super(id);
    this.structureMode = StructureMode.independent;
  }

  get path(): unknown[] {
    const profile = this.calcProfile();
    return profile ? profile[0] : [];
  }

  get height3d(): number {
    return this.ZLength * this.ZScale;
  }

  set height3d(value: number) {
    this.ZLength = value / this.ZScale;
  }

  get curve(): Line2d {
    const line = new Line2d(
      { x: -this.radius / 2, y: 0 },
      { x: this.radius / 2, y: 0 }
    );
    const transform = this.get2DTransform();
    line.transform(transform);
    return line;
  }

  get radius(): number {
    return this.XLength * this.XScale;
  }

  setStructureMode(mode: StructureMode): void {
    // Intentionally empty
  }

  generateBrep(forceRegenerate: boolean = false, transformed: boolean = false): unknown | undefined {
    if (forceRegenerate) {
      this.brepcache = undefined;
    }

    if (this.brepcache) {
      return this.brepcache;
    }

    const MIN_SIZE_THRESHOLD = 1e-6;
    const size = this.ZSize;

    if (size < MIN_SIZE_THRESHOLD) {
      return undefined;
    }

    const coordinate = new Coordinate3(Vector3.O(), Vector3.X(), Vector3.Y());
    const profile = this.calcProfile(transformed);

    if (!profile) {
      return undefined;
    }

    const loops = profile.map(curves => new Loop(curves));
    const polygon = new Polygon(loops);
    const brepResults: BrepCache[] = [];

    this.brepcache = alg.BodyBuilder.extrude(
      coordinate,
      polygon,
      Vector3.Z(),
      0,
      size,
      true,
      brepResults
    );

    brepResults[0].bottomFace.tag = "bottom";
    brepResults[0].topFace.tag = "top";
    brepResults[0].sideFaces[0][0].tag = "circle";
    brepResults[0].sideFaces[1][0].tag = "circle_inner";

    return this.brepcache;
  }

  calcProfile(applyTransform: boolean = true): unknown[][] | undefined {
    const FULL_CIRCLE = 2 * Math.PI;
    const INNER_RADIUS_RATIO = 0.9;

    const outerArc = Arc2d.makeArcByStartEndAngles(
      Vector2.O(),
      this.radius / 2,
      0,
      FULL_CIRCLE,
      true
    );
    outerArc.userData = {
      curveid: "circle",
      index: 0
    } as CurveUserData;

    const innerArc = Arc2d.makeArcByStartEndAngles(
      Vector2.O(),
      INNER_RADIUS_RATIO * this.radius / 2,
      0,
      FULL_CIRCLE,
      false
    );
    innerArc.userData = {
      curveid: "circle_inner",
      index: 0
    } as CurveUserData;

    if (applyTransform) {
      const transform = this.get2DTransform();
      outerArc.transform(transform);
      innerArc.transform(transform);
    }

    return [[outerArc], [innerArc]];
  }

  getFaceDiscreteCount(face: { 
    surfaceObj: { surface: { isPlane: () => boolean } }; 
    rawPath: { outer: Array<{ getStartPt: () => { z: number }; getEndPt: () => { z: number }; getLength: () => number }> } 
  }): number {
    const DEFAULT_COUNT = 20;
    const MAX_COUNT = 100;
    const SEGMENT_LENGTH = 0.012;
    const Z_TOLERANCE = 1e-6;

    if (face.surfaceObj.surface.isPlane()) {
      return DEFAULT_COUNT;
    }

    const flatCurve = face.rawPath.outer.find(
      curve => Math.abs(curve.getStartPt().z) < Z_TOLERANCE && Math.abs(curve.getEndPt().z) < Z_TOLERANCE
    );

    if (!flatCurve) {
      return DEFAULT_COUNT;
    }

    const calculatedCount = flatCurve.getLength() / SEGMENT_LENGTH;
    return calculatedCount > MAX_COUNT ? MAX_COUNT : Math.ceil(calculatedCount);
  }

  syncLayerHeight(): void {
    // Intentionally empty
  }

  newSelf(): NCustomizedOutlet {
    return new NCustomizedOutlet();
  }

  getIO(): NCustomizedOutlet_IO {
    return NCustomizedOutlet_IO.instance();
  }

  protected get2DTransform(): unknown {
    // Must be implemented by parent class
    throw new Error("get2DTransform must be implemented");
  }
}

Entity.registerClass(HSConstants.ModelClass.NCustomizedOutlet, NCustomizedOutlet);

export { NCustomizedOutlet, NCustomizedOutlet_IO };