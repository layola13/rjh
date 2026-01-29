import { Entity, Entity_IO } from './Entity';
import { EntityEventType } from './EntityEvent';
import { Util } from '../utils/Util';
import { EntityField } from './decorators';

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadContext {
  [key: string]: unknown;
}

interface DumpResult {
  [key: string]: unknown;
}

interface Bounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface BoundingBox {
  x: number;
  x2: number;
  y: number;
  y2: number;
}

interface Point2d {
  x: number;
  y: number;
  isbackground?: boolean;
}

interface Curve2d {
  isbackground?: boolean;
}

interface Wire2d extends Entity {
  id: string;
  getPath(): Point2d[];
  getDiscretePoints(): Point2d[];
  curves: Curve2d[];
}

export class Face2d_IO extends Entity_IO {
  private static _Face2d_IO_instance: Face2d_IO | null = null;

  static instance(): Face2d_IO {
    if (!Face2d_IO._Face2d_IO_instance) {
      Face2d_IO._Face2d_IO_instance = new Face2d_IO();
    }
    return Face2d_IO._Face2d_IO_instance;
  }

  dump(
    entity: Face2d,
    callback?: (result: [DumpResult, ...unknown[]], entity: Face2d) => void,
    includeDefaults: boolean = true,
    options: DumpOptions = {}
  ): [DumpResult, ...unknown[]] {
    const result = super.dump(entity, undefined, includeDefaults, options);
    const dumpData = result[0];

    if (entity.__outerLoop) {
      dumpData.outerLoop = entity.__outerLoop.id;
    }

    const innerLoopIds = Object.keys(entity.__innerLoops || {});
    if (innerLoopIds.length > 0) {
      dumpData.innerLoops = innerLoopIds;
    }

    if (callback) {
      callback(result, entity);
    }

    return result;
  }

  load(entity: Face2d, data: DumpResult, context: LoadContext = {}): void {
    super.load(entity, data, context);

    entity.__outerLoop = Entity.loadFromDumpById(
      (data.outerLoop || data.outterLoop) as string,
      context
    ) as Wire2d | null;

    const innerLoops: Record<string, Wire2d> = {};
    const innerLoopIds = data.innerLoops as string[] | undefined;

    if (innerLoopIds) {
      innerLoopIds.forEach((loopId: string) => {
        const loop = Entity.loadFromDumpById(loopId, context) as Wire2d | null;
        if (loop) {
          innerLoops[loop.id] = loop;
        }
      });
    }

    entity.__innerLoops = innerLoops;
  }
}

export class Face2d extends Entity {
  __outerLoop: Wire2d | null = null;
  __innerLoops: Record<string, Wire2d> = {};

  constructor(id: string = "", tag?: string) {
    super(id, tag);
  }

  init(outerLoop: Wire2d, innerLoops: Wire2d[]): this {
    this.__outerLoop = outerLoop;
    this.addChild(outerLoop);

    for (const innerLoop of innerLoops) {
      this.__innerLoops[innerLoop.id] = innerLoop;
      this.addChild(innerLoop);
    }

    return this;
  }

  getIO(): Face2d_IO {
    return Face2d_IO.instance();
  }

  setOuterLoop(loop: Wire2d | null): void {
    const previousLoop = this.__outerLoop;
    if (previousLoop) {
      this.removeChild(previousLoop);
    }
    this.outerLoop = loop;
    if (loop) {
      this.addChild(loop);
    }
  }

  @EntityField({
    partialSet(this: Face2d, value: Wire2d | null) {
      this.__outerLoop = value;
    }
  })
  outerLoop!: Wire2d | null;

  get points(): Point2d[] {
    return this.outerLoop ? this.outerLoop.getPath() : [];
  }

  onChildDirty(child: Entity, event?: { type: string }): void {
    if (event?.type === EntityEventType.Geometry) {
      this.dirtyGeometry();
    }
    super.onChildDirty(child, event);
  }

  setInnerLoops(loops: Wire2d[]): void {
    const previousLoops = this.innerLoops;
    this.innerLoops = loops;
    this.replaceChildren(previousLoops, loops);
  }

  @EntityField({
    get(this: Face2d): Wire2d[] {
      return Object.values(this.__innerLoops);
    },
    partialSet(this: Face2d, value: Wire2d[]) {
      this.__innerLoops = {};
      for (const loop of value) {
        this.__innerLoops[loop.id] = loop;
      }
    }
  })
  innerLoops!: Wire2d[];

  getPath(): Point2d[][] {
    return this.getWires().map(wire => wire.getPath());
  }

  getWires(): Wire2d[] {
    if (!this.outerLoop) {
      return [];
    }
    const innerLoops = this.innerLoops;
    return [this.outerLoop, ...innerLoops];
  }

  getAllPoints(): Point2d[] {
    return Array.from(Util.getChildPoint2d(this));
  }

  getAllCurves(): Curve2d[] {
    return Array.from(Util.getChildCurves(this));
  }

  bounding(): BoundingBox {
    return this.getBounding();
  }

  getBounding(): BoundingBox {
    const bounds = this.bound as Bounds;
    return {
      x: bounds.left,
      x2: bounds.left + bounds.width,
      y: bounds.top,
      y2: bounds.top + bounds.height
    };
  }

  refreshBoundInternal(): void {
    if (this.outerLoop) {
      this.boundInternal = this.outerLoop.bound;
    }
  }

  isPointInside(point: Point2d): boolean {
    if (!this.outerLoop) {
      return false;
    }

    if (!HSCore.Util.Math.isPointInPolygon(point, this.outerLoop.getPath())) {
      return false;
    }

    const innerLoops = this.innerLoops;
    for (let i = 0; i < innerLoops.length; i++) {
      if (HSCore.Util.Math.isPointInPolygon(point, innerLoops[i].getPath())) {
        return false;
      }
    }

    return true;
  }

  hasBackgroundPoint(): boolean {
    for (const point of Util.getChildPoint2d(this)) {
      if (point.isbackground) {
        return true;
      }
    }
    return false;
  }

  hasBackgroundCurve(): boolean {
    for (const curve of Util.getChildCurves(this)) {
      if (curve.isbackground) {
        return true;
      }
    }
    return false;
  }

  isBackground(): boolean {
    if (!this.outerLoop) {
      return false;
    }

    for (const curve of this.outerLoop.curves) {
      if (!curve.isbackground) {
        return false;
      }
    }

    return true;
  }

  isOuterLoopContainsCircle(): boolean {
    let containsCircle = false;

    if (this.outerLoop) {
      for (const curve of this.outerLoop.curves) {
        if (curve instanceof HSCore.Model.Circle2d) {
          containsCircle = true;
          break;
        }
      }
    }

    return containsCircle;
  }

  isOuterLoopContainsCircleArc(): boolean {
    let containsCircleArc = false;

    if (this.outerLoop) {
      for (const curve of this.outerLoop.curves) {
        if (curve instanceof HSCore.Model.CircleArc2d) {
          containsCircleArc = true;
          break;
        }
      }
    }

    return containsCircleArc;
  }

  clone(): Face2d {
    const cloneData = Util.getClonedDumpData(this);
    const clonedFace = new Face2d();
    clonedFace.load(cloneData.dumps[0], cloneData.context);
    return clonedFace;
  }

  verify(): boolean {
    if (!this.outerLoop || !this.hasChild(this.outerLoop)) {
      log.error(
        `${this.tag}: invalid outerLoop.`,
        'HSCore.Verify.Error',
        true
      );
      return false;
    }

    if (HSCore.Util.Math.isClockwise(this.outerLoop.getDiscretePoints())) {
      log.warning(
        `${this.tag}: outerLoop ${this.outerLoop.tag} is clockwise`,
        'HSCore.Verify.Error'
      );
    }

    const innerLoops = this.innerLoops;
    if (innerLoops.some(loop => !this.hasChild(loop))) {
      log.error(
        `${this.tag}: innerLoop is not a child.`,
        'HSCore.Verify.Error',
        true
      );
      return false;
    }

    for (const loop of innerLoops) {
      if (!HSCore.Util.Math.isClockwise(loop.getDiscretePoints())) {
        log.warning(
          `${this.tag}: innerLoop ${loop.tag} is not clockwise`,
          'HSCore.Verify.Error'
        );
      }
    }

    return super.verify();
  }

  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void {
    if (['outerLoop', 'innerLoop'].includes(fieldName)) {
      this.dirtyGeometry();
    }
    super.onFieldChanged(fieldName, oldValue, newValue);
  }
}

Entity.registerClass(HSConstants.ModelClass.Face2d, Face2d);