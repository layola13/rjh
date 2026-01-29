type DumpOptions = Record<string, unknown>;

interface CurveData {
  Class: string;
  [key: string]: unknown;
}

interface LoadContext {
  [key: string]: unknown;
}

const curveClassRegistry = new Map<string, new () => Curve>();

class Curve_IO {
  private static _instance: Curve_IO;

  static instance(): Curve_IO {
    if (!this.hasOwnProperty("_instance")) {
      this._instance = new this();
    }
    return this._instance;
  }

  dump(
    curve: Curve,
    data: unknown,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): CurveData {
    return {
      Class: curve.Class
    };
  }

  load(curve: Curve, data: CurveData, context: LoadContext): void {
    // Load implementation
  }
}

class Curve {
  Class!: string;

  static registerClass(className: string, curveConstructor: new () => Curve): void {
    curveConstructor.prototype.Class = className;
    curveClassRegistry.set(className, curveConstructor);
  }

  load(data: CurveData, context: LoadContext): void {
    this.getIO().load(this, data, context);
  }

  dump(data: unknown, includeMetadata: boolean = true, options: DumpOptions = {}): CurveData {
    return this.getIO().dump(this, data, includeMetadata, options);
  }

  getIO(): Curve_IO {
    return Curve_IO.instance();
  }

  static buildCurveFromDump(data: CurveData | undefined, context: LoadContext): Curve | undefined {
    if (!data) {
      return undefined;
    }

    let className = HSConstants.ClassSNameToLName.get(data.Class);
    if (!className) {
      className = data.Class;
    }

    const CurveConstructor = curveClassRegistry.get(className);
    if (!CurveConstructor) {
      assert(false, "unknown curve type", "HSCore.Model.Geom");
      return undefined;
    }

    const curve = new CurveConstructor();
    curve.load(data, context);
    return curve;
  }
}

export { Curve_IO, Curve };