import { Line2d, Coordinate3, Vector3, Vector2, Polygon, Loop, Arc2d } from './geometry';
import { alg } from './algorithm';
import { NCustomizedStructure, NCustomizedStructre_IO } from './NCustomizedStructure';
import { Entity } from './Entity';

interface DumpOptions {
  [key: key]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface CurveUserData {
  curveid: string;
  index: number;
}

interface BrepCacheResult {
  bottomFace: { tag: string };
  topFace: { tag: string };
  sideFaces: Array<Array<{ tag: string }>>;
}

interface FaceWithSurface {
  surfaceObj: {
    surface: {
      isPlane(): boolean;
    };
  };
  rawPath: {
    outer: Array<{
      getStartPt(): { z: number };
      getEndPt(): { z: number };
      getLength(): number;
    }>;
  };
}

const EPSILON = 1e-6;
const MAX_DISCRETE_COUNT = 100;
const DISCRETE_LENGTH_UNIT = 0.012;
const DEFAULT_DISCRETE_COUNT = 20;
const FULL_CIRCLE_RADIANS = 2 * Math.PI;

export class NCustomizedCircleColumn_IO extends NCustomizedStructre_IO {
  private static _instance?: NCustomizedCircleColumn_IO;

  public static instance(): NCustomizedCircleColumn_IO {
    if (!this._instance) {
      this._instance = new NCustomizedCircleColumn_IO();
    }
    return this._instance;
  }

  public dump(
    entity: NCustomizedCircleColumn,
    callback?: (data: unknown, entity: NCustomizedCircleColumn) => void,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): unknown {
    const data = super.dump(entity, undefined, includeMetadata, options);
    callback?.(data, entity);
    return data;
  }

  public load(
    data: unknown,
    callback?: (entity: NCustomizedCircleColumn) => void,
    options: LoadOptions = {}
  ): void {
    super.load(data, callback, options);
  }
}

export class NCustomizedCircleColumn extends NCustomizedStructure {
  private brepcache?: unknown;

  constructor(id: string = "") {
    super(id);
  }

  public initByMeta(metadata: unknown): void {
    super.initByMeta(metadata);
  }

  public get path(): Array<unknown> {
    const profile = this.calcProfile();
    return profile ? profile[0] : [];
  }

  public get height3d(): number {
    return this.ZLength * this.ZScale;
  }

  public set height3d(value: number) {
    this.ZLength = value / this.ZScale;
  }

  public get radius(): number {
    return this.XLength * this.XScale;
  }

  public get curve(): Line2d {
    const line = new Line2d(
      { x: -this.radius / 2, y: 0 },
      { x: this.radius / 2, y: 0 }
    );
    const transform = this.get2DTransform();
    line.transform(transform);
    return line;
  }

  public generateBrep(forceRegenerate: boolean = false, applyTransform: boolean = false): unknown {
    if (forceRegenerate) {
      this.brepcache = undefined;
    }

    if (this.brepcache) {
      return this.brepcache;
    }

    const height = this.ZSize;
    if (height < EPSILON) {
      return undefined;
    }

    const coordinate = new Coordinate3(Vector3.O(), Vector3.X(), Vector3.Y());
    const profile = this.calcProfile(applyTransform);

    if (!profile) {
      return undefined;
    }

    const polygon = new Polygon(new Loop(profile[0]));
    const results: BrepCacheResult[] = [];

    this.brepcache = alg.BodyBuilder.extrude(
      coordinate,
      polygon,
      Vector3.Z(),
      0,
      height,
      true,
      results
    );

    results[0].bottomFace.tag = "bottom";
    results[0].topFace.tag = "top";
    results[0].sideFaces[0][0].tag = "circle";

    return this.brepcache;
  }

  public calcProfile(applyTransform: boolean = true): Array<Array<Arc2d>> | undefined {
    const arc = Arc2d.makeArcByStartEndAngles(
      Vector2.O(),
      this.radius / 2,
      0,
      FULL_CIRCLE_RADIANS,
      true
    );

    arc.userData = {
      curveid: "circle",
      index: 0
    } as CurveUserData;

    if (applyTransform) {
      const transform = this.get2DTransform();
      arc.transform(transform);
    }

    return [[arc]];
  }

  public getFaceDiscreteCount(face: FaceWithSurface): number {
    let count = DEFAULT_DISCRETE_COUNT;

    if (face.surfaceObj.surface.isPlane()) {
      return count;
    }

    const edge = face.rawPath.outer.find(
      (edge) =>
        Math.abs(edge.getStartPt().z) < EPSILON &&
        Math.abs(edge.getEndPt().z) < EPSILON
    );

    if (!edge) {
      return count;
    }

    count = edge.getLength() / DISCRETE_LENGTH_UNIT;

    return count > MAX_DISCRETE_COUNT ? MAX_DISCRETE_COUNT : Math.ceil(count);
  }

  public newSelf(): NCustomizedCircleColumn {
    return new NCustomizedCircleColumn();
  }

  public getIO(): NCustomizedCircleColumn_IO {
    return NCustomizedCircleColumn_IO.instance();
  }
}

Entity.registerClass(HSConstants.ModelClass.NCustomizedCircleColumn, NCustomizedCircleColumn);