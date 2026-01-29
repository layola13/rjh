export interface ClipperOptions {
  reverseSolutions?: boolean;
  strictlySimple?: boolean;
  preserveCollinear?: boolean;
}

export enum PolyType {
  Subject = 0,
  Clip = 1
}

export enum ClipType {
  Intersection = 0,
  Union = 1,
  Difference = 2,
  Xor = 3
}

export enum PolyFillType {
  EvenOdd = 0,
  NonZero = 1,
  Positive = 2,
  Negative = 3
}

export interface IntRect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface IntPoint {
  x: number;
  y: number;
}

export type Path = IntPoint[];
export type Paths = Path[];

interface NativeLib {
  InitOptions: {
    ReverseSolution: { value: number };
    StrictlySimple: { value: number };
    PreserveCollinear: { value: number };
  };
  Clipper: new (options: number) => NativeClipper;
  Paths: new () => NativePaths;
  PolyTree: new () => NativePolyTree;
  cleanPolygons(paths: NativePaths, distance: number): void;
}

interface NativeClipper {
  preserveCollinear: boolean;
  reverseSolution: boolean;
  strictlySimple: boolean;
  addPath(path: NativePath, polyType: number, closed: boolean): boolean;
  addPaths(paths: NativePaths, polyType: number, closed: boolean): boolean;
  clear(): void;
  getBounds(): NativeIntRect;
  executePathsWithFillTypes(
    clipType: number,
    solution: NativePaths,
    subjFillType: number,
    clipFillType: number
  ): boolean;
  executePolyTreeWithFillTypes(
    clipType: number,
    solution: NativePolyTree,
    subjFillType: number,
    clipFillType: number
  ): boolean;
  delete(): void;
  isDeleted(): boolean;
}

interface NativePath {
  delete(): void;
}

interface NativePaths {
  delete(): void;
  isDeleted(): boolean;
}

interface NativePolyTree {
  delete(): void;
  isDeleted(): boolean;
}

interface NativeIntRect {
  left: number;
  right: number;
  top: number;
  bottom: number;
  delete(): void;
}

declare const nativeFinalizationRegistry: FinalizationRegistry<NativeClipper> | undefined;

declare function pathToNativePath(nativeLib: NativeLib, path: Path): NativePath;
declare function pathsToNativePaths(nativeLib: NativeLib, paths: Paths): NativePaths;
declare function nativePathsToPaths(nativeLib: NativeLib, nativePaths: NativePaths, deleteNative: boolean): Paths;
declare function polyTypeToNative(nativeLib: NativeLib, polyType: PolyType): number;
declare function clipTypeToNative(nativeLib: NativeLib, clipType: ClipType): number;
declare function polyFillTypeToNative(nativeLib: NativeLib, fillType: PolyFillType): number;

declare class PolyTree {
  static fromNativePolyTree(nativeLib: NativeLib, nativePolyTree: NativePolyTree, deleteNative: boolean): PolyTree;
}

export class Clipper {
  private _nativeLib: NativeLib;
  private _clipper?: NativeClipper;

  constructor(nativeLib: NativeLib, options: ClipperOptions = {}) {
    this._nativeLib = nativeLib;

    const defaultOptions: Required<ClipperOptions> = {
      reverseSolutions: false,
      strictlySimple: false,
      preserveCollinear: false,
      ...options
    };

    let initFlags = 0;
    if (defaultOptions.reverseSolutions) {
      initFlags += nativeLib.InitOptions.ReverseSolution.value;
    }
    if (defaultOptions.strictlySimple) {
      initFlags += nativeLib.InitOptions.StrictlySimple.value;
    }
    if (defaultOptions.preserveCollinear) {
      initFlags += nativeLib.InitOptions.PreserveCollinear.value;
    }

    this._clipper = new nativeLib.Clipper(initFlags);

    if (nativeFinalizationRegistry !== null && nativeFinalizationRegistry !== undefined) {
      nativeFinalizationRegistry.register(this, this._clipper, this);
    }
  }

  get preserveCollinear(): boolean {
    return this._clipper!.preserveCollinear;
  }

  set preserveCollinear(value: boolean) {
    this._clipper!.preserveCollinear = value;
  }

  get reverseSolution(): boolean {
    return this._clipper!.reverseSolution;
  }

  set reverseSolution(value: boolean) {
    this._clipper!.reverseSolution = value;
  }

  get strictlySimple(): boolean {
    return this._clipper!.strictlySimple;
  }

  set strictlySimple(value: boolean) {
    this._clipper!.strictlySimple = value;
  }

  addPath(path: Path, polyType: PolyType, closed: boolean): boolean {
    const nativePath = pathToNativePath(this._nativeLib, path);
    try {
      return this._clipper!.addPath(nativePath, polyTypeToNative(this._nativeLib, polyType), closed);
    } finally {
      nativePath.delete();
    }
  }

  addPaths(paths: Paths, polyType: PolyType, closed: boolean): boolean {
    const nativePaths = pathsToNativePaths(this._nativeLib, paths);
    try {
      return this._clipper!.addPaths(nativePaths, polyTypeToNative(this._nativeLib, polyType), closed);
    } finally {
      nativePaths.delete();
    }
  }

  clear(): void {
    this._clipper!.clear();
  }

  getBounds(): IntRect {
    const nativeBounds = this._clipper!.getBounds();
    const bounds: IntRect = {
      left: nativeBounds.left,
      right: nativeBounds.right,
      top: nativeBounds.top,
      bottom: nativeBounds.bottom
    };
    nativeBounds.delete();
    return bounds;
  }

  executeToPaths(
    clipType: ClipType,
    subjFillType: PolyFillType,
    clipFillType: PolyFillType,
    cleanDistance?: number
  ): Paths | undefined {
    const solution = new this._nativeLib.Paths();
    try {
      const success = this._clipper!.executePathsWithFillTypes(
        clipTypeToNative(this._nativeLib, clipType),
        solution,
        polyFillTypeToNative(this._nativeLib, subjFillType),
        polyFillTypeToNative(this._nativeLib, clipFillType)
      );

      if (!success) {
        return undefined;
      }

      if (cleanDistance !== undefined) {
        this._nativeLib.cleanPolygons(solution, cleanDistance);
      }

      return nativePathsToPaths(this._nativeLib, solution, true);
    } finally {
      if (!solution.isDeleted()) {
        solution.delete();
      }
    }
  }

  executeToPolyTree(
    clipType: ClipType,
    subjFillType: PolyFillType,
    clipFillType: PolyFillType
  ): PolyTree | undefined {
    const polyTree = new this._nativeLib.PolyTree();
    try {
      const success = this._clipper!.executePolyTreeWithFillTypes(
        clipTypeToNative(this._nativeLib, clipType),
        polyTree,
        polyFillTypeToNative(this._nativeLib, subjFillType),
        polyFillTypeToNative(this._nativeLib, clipFillType)
      );

      if (!success) {
        return undefined;
      }

      return PolyTree.fromNativePolyTree(this._nativeLib, polyTree, true);
    } finally {
      if (!polyTree.isDeleted()) {
        polyTree.delete();
      }
    }
  }

  isDisposed(): boolean {
    return this._clipper === undefined || this._clipper.isDeleted();
  }

  dispose(): void {
    if (this._clipper) {
      this._clipper.delete();
      if (nativeFinalizationRegistry !== null && nativeFinalizationRegistry !== undefined) {
        nativeFinalizationRegistry.unregister(this);
      }
      this._clipper = undefined;
    }
  }
}