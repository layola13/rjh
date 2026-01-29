const registeredCurveClasses = new Map<string, new () => Curve>();

interface CurveDumpData {
  Class: string;
}

interface CurveLoadContext {
  [key: string]: unknown;
}

interface CurveDumpOptions {
  [key: string]: unknown;
}

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
    context: unknown,
    includeMetadata: boolean = true,
    options: CurveDumpOptions = {}
  ): CurveDumpData {
    return {
      Class: curve.Class
    };
  }

  load(
    curve: Curve,
    data: CurveDumpData,
    context: unknown,
    options?: unknown
  ): void {}
}

class Curve {
  Class!: string;

  static registerClass(className: string, curveClass: new () => Curve): void {
    curveClass.prototype.Class = className;
    registeredCurveClasses.set(className, curveClass);
  }

  load(data: CurveDumpData, context: unknown): void {
    this.getIO().load(this, data, context);
  }

  dump(context: unknown, includeMetadata: boolean = true, options: CurveDumpOptions = {}): CurveDumpData {
    return this.getIO().dump(this, context, includeMetadata, options);
  }

  getIO(): Curve_IO {
    return Curve_IO.instance();
  }

  static buildCurveFromDump(
    data: CurveDumpData | undefined,
    context: unknown,
    additionalParam?: unknown
  ): Curve | undefined {
    if (!data) {
      return undefined;
    }

    let className = HSConstants.ClassSNameToLName.get(data.Class);
    if (!className) {
      className = data.Class;
    }

    const CurveClass = registeredCurveClasses.get(className);
    if (!CurveClass) {
      assert(false, "unkown curve type", "HSCore.Verify.Error");
      return undefined;
    }

    const curveInstance = new CurveClass();
    curveInstance.load(data, context);
    return curveInstance;
  }
}

declare const HSConstants: {
  ClassSNameToLName: Map<string, string>;
};

declare function assert(condition: boolean, message: string, errorType: string): void;

export { Curve_IO, Curve };