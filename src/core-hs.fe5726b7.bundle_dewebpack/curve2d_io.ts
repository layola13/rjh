import { Entity_IO, Entity } from './Entity';
import { EntityField } from './decorators';
import { Logger } from './Logger';

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface SerializedCurve2d {
  isbk?: boolean;
  isbackground?: boolean;
  [key: string]: unknown;
}

type DumpCallback = (result: unknown[], entity: Curve2d) => void;

class Curve2d_IO extends Entity_IO {
  private static _Curve2d_IO_instance?: Curve2d_IO;

  static instance(): Curve2d_IO {
    if (!Curve2d_IO._Curve2d_IO_instance) {
      Curve2d_IO._Curve2d_IO_instance = new Curve2d_IO();
    }
    return Curve2d_IO._Curve2d_IO_instance;
  }

  dump(
    entity: Curve2d,
    callback?: DumpCallback,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const result = super.dump(entity, undefined, includeMetadata, options);
    const serialized = result[0] as SerializedCurve2d;

    if (entity.isbackground) {
      serialized.isbk = entity.isbackground;
    }

    if (callback) {
      callback(result, entity);
    }

    return result;
  }

  load(entity: Curve2d, data: SerializedCurve2d, options: LoadOptions = {}): void {
    super.load(entity, data, options);
    entity.__isbackground = data.isbk != null ? !!data.isbk : !!data.isbackground;
  }
}

class Curve2d extends Entity {
  @EntityField()
  isbackground!: boolean;

  __isbackground: boolean = false;

  constructor(id: string = "", parent?: unknown) {
    super(id, parent);
    this.__isbackground = false;
  }

  get from(): unknown {
    return this.start;
  }

  get to(): unknown {
    return this.end;
  }

  get direction(): unknown {
    return undefined;
  }

  get key(): string {
    return "";
  }

  toTHREECurve(): unknown {
    Logger.console.error("Curve2d toTHREECurve() should not be called!");
    return undefined;
  }

  createSubCurve(startParam: unknown, endParam: unknown): Curve2d | null {
    return null;
  }

  isBackground(): boolean {
    return this.isbackground;
  }

  getIO(): Curve2d_IO {
    return Curve2d_IO.instance();
  }

  getOuterWires(): unknown[] {
    return Object.values(this.parents).filter((parent: any) => parent.isOuter());
  }

  get threeCurve(): unknown {
    if (DEBUG) {
      Logger.console.warn("use toTHREECurve() instead.");
    }
    return this.toTHREECurve();
  }

  getPolygons(): Set<unknown> {
    const polygons = new Set<unknown>();
    for (const wire of Object.values(this.parents)) {
      for (const polygon of Object.values((wire as any).parents)) {
        polygons.add(polygon);
      }
    }
    return polygons;
  }

  onChildDirty(child: unknown, timestamp: unknown): void {
    this.dirtyGeometry();
    super.onChildDirty(child, timestamp);
  }

  verify(): boolean {
    const wireParents = Object.values(this.parents).filter(
      (parent: any) => parent instanceof HSCore.Model.Wire
    );

    if (wireParents.length < 1) {
      log.error(`${this.tag} has no parents.`, "HSCore.Verify.Error", true);
      return false;
    }

    if (wireParents.length > 2) {
      Logger.console.warn(`${this.tag} has ${wireParents.length} parents.`);
    }

    return super.verify();
  }

  getArcPoints(startParam: unknown, endParam: unknown): unknown {
    return HSCore.Util.Geometry.getArcPoints(startParam, endParam);
  }
}

Entity.registerClass(HSConstants.ModelClass.Curve2d, Curve2d);

export { Curve2d_IO, Curve2d };