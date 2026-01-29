export enum ClipType {
  Intersection = 0,
  Union = 1,
  Difference = 2,
  Xor = 3
}

export enum EndType {
  ClosedPolygon = 0,
  ClosedLine = 1,
  OpenButt = 2,
  OpenSquare = 3,
  OpenRound = 4
}

export enum JoinType {
  Square = 0,
  Round = 1,
  Miter = 2
}

export enum PolyFillType {
  EvenOdd = 0,
  NonZero = 1,
  Positive = 2,
  Negative = 3
}

export enum PointInPolygonResult {
  Outside = 0,
  OnBoundary = 1,
  Inside = 2
}

export enum NativeClipperLibRequestedFormat {
  WasmWithAsmJsFallback = 0,
  WasmOnly = 1,
  AsmJsOnly = 2
}

export enum NativeClipperLibLoadedFormat {
  Wasm = 0,
  AsmJs = 1
}

export interface Point {
  x: number;
  y: number;
}

export type Path = Point[];
export type Paths = Path[];

export class ClipperError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClipperError';
    Object.setPrototypeOf(this, ClipperError.prototype);
  }
}

export class PolyNode {
  public parent: PolyNode | null = null;
  public contour: Path = [];
  public children: PolyNode[] = [];
  public isOpen: boolean = false;

  public isHole(): boolean {
    let result = true;
    let node: PolyNode | null = this.parent;
    while (node !== null) {
      result = !result;
      node = node.parent;
    }
    return result;
  }

  public getChildCount(): number {
    return this.children.length;
  }
}

export class PolyTree extends PolyNode {
  public allNodes: PolyNode[] = [];

  public clear(): void {
    this.children = [];
    this.allNodes = [];
  }

  public getFirst(): PolyNode | null {
    if (this.children.length > 0) {
      return this.children[0];
    }
    return null;
  }

  public getTotal(): number {
    let result = this.allNodes.length;
    if (result > 0 && this.children[0] !== this.allNodes[0]) {
      result--;
    }
    return result;
  }
}

export interface ClipParams {
  clipType: ClipType;
  subjectFillType?: PolyFillType;
  clipFillType?: PolyFillType;
  subjectInputs: Paths;
  clipInputs?: Paths;
  strictlySimple?: boolean;
  preserveCollinear?: boolean;
  reverseSolution?: boolean;
}

export interface OffsetParams {
  delta: number;
  joinType?: JoinType;
  endType?: EndType;
  miterLimit?: number;
  arcTolerance?: number;
  offsetInputs: Paths;
}

interface NativeClipperInstance {
  noExitRuntime: boolean;
  preRun?: () => void;
  quit?: (status: number, error: Error) => void;
}

type NativeClipperInit = (config: NativeClipperInstance) => NativeClipperInstance | undefined;

let cachedWasmInstance: NativeClipperInstance | Error | undefined;
let cachedAsmJsInstance: NativeClipperInstance | Error | undefined;

const HIGH_RANGE = 4503599627370496;

export class ClipperLibWrapper {
  public static readonly hiRange = HIGH_RANGE;

  private readonly instance: NativeClipperInstance;
  public readonly format: NativeClipperLibLoadedFormat;

  constructor(instance: NativeClipperInstance, format: NativeClipperLibLoadedFormat) {
    this.instance = instance;
    this.format = format;
  }

  public clipToPaths(params: ClipParams): Paths {
    return clipToPaths(this.instance, params);
  }

  public clipToPolyTree(params: ClipParams): PolyTree {
    return clipToPolyTree(this.instance, params);
  }

  public offsetToPaths(params: OffsetParams): Paths {
    return offsetToPaths(this.instance, params);
  }

  public offsetToPolyTree(params: OffsetParams): PolyTree {
    return offsetToPolyTree(this.instance, params);
  }

  public area(path: Path): number {
    return area(path);
  }

  public cleanPolygon(path: Path, distance: number = 1.1415): Path {
    return cleanPolygon(this.instance, path, distance);
  }

  public cleanPolygons(paths: Paths, distance: number = 1.1415): Paths {
    return cleanPolygons(this.instance, paths, distance);
  }

  public closedPathsFromPolyTree(polyTree: PolyTree): Paths {
    return closedPathsFromPolyTree(polyTree);
  }

  public minkowskiDiff(pattern: Path, path: Path): Paths {
    return minkowskiDiff(this.instance, pattern, path);
  }

  public minkowskiSumPath(pattern: Path, path: Path, pathIsClosed: boolean): Paths {
    return minkowskiSumPath(this.instance, pattern, path, pathIsClosed);
  }

  public minkowskiSumPaths(pattern: Path, paths: Paths, pathIsClosed: boolean): Paths {
    return minkowskiSumPaths(this.instance, pattern, paths, pathIsClosed);
  }

  public openPathsFromPolyTree(polyTree: PolyTree): Paths {
    return openPathsFromPolyTree(polyTree);
  }

  public orientation(path: Path): boolean {
    return orientation(path);
  }

  public pointInPolygon(point: Point, path: Path): PointInPolygonResult {
    return pointInPolygon(point, path);
  }

  public polyTreeToPaths(polyTree: PolyTree): Paths {
    return polyTreeToPaths(polyTree);
  }

  public reversePath(path: Path): void {
    reversePath(path);
  }

  public reversePaths(paths: Paths): void {
    reversePaths(paths);
  }

  public simplifyPolygon(path: Path, fillType: PolyFillType = PolyFillType.EvenOdd): Paths {
    return simplifyPolygon(this.instance, path, fillType);
  }

  public simplifyPolygons(paths: Paths, fillType: PolyFillType = PolyFillType.EvenOdd): Paths {
    return simplifyPolygons(this.instance, paths, fillType);
  }

  public scalePath(path: Path, scale: number): Path {
    return scalePath(path, scale);
  }

  public scalePaths(paths: Paths, scale: number): Paths {
    return scalePaths(paths, scale);
  }
}

async function loadNativeClipperInstance(initFunction: NativeClipperInit): Promise<NativeClipperInstance> {
  return new Promise<NativeClipperInstance>((resolve, reject) => {
    let instanceRef: NativeClipperInstance | undefined;
    
    instanceRef = initFunction({
      noExitRuntime: true,
      preRun: () => {
        if (instanceRef) {
          resolve(instanceRef);
        } else {
          setTimeout(() => {
            resolve(instanceRef!);
          }, 1);
        }
      },
      quit: (_status: number, error: Error) => {
        reject(error);
      }
    });
  });
}

export async function loadNativeClipperLibInstanceAsync(
  format: NativeClipperLibRequestedFormat
): Promise<ClipperLibWrapper> {
  let tryWasm = false;
  let tryAsmJs = false;

  switch (format) {
    case NativeClipperLibRequestedFormat.WasmWithAsmJsFallback:
      tryWasm = true;
      tryAsmJs = true;
      break;
    case NativeClipperLibRequestedFormat.WasmOnly:
      tryWasm = true;
      tryAsmJs = false;
      break;
    case NativeClipperLibRequestedFormat.AsmJsOnly:
      tryWasm = false;
      tryAsmJs = true;
      break;
    default:
      throw new ClipperError('unknown native clipper format');
  }

  if (tryWasm && !(cachedWasmInstance instanceof Error)) {
    if (cachedWasmInstance !== undefined) {
      return new ClipperLibWrapper(cachedWasmInstance, NativeClipperLibLoadedFormat.Wasm);
    }

    try {
      const wasmInit = await import('./wasm-init');
      cachedWasmInstance = await loadNativeClipperInstance(wasmInit.init);
      return new ClipperLibWrapper(cachedWasmInstance, NativeClipperLibLoadedFormat.Wasm);
    } catch (error) {
      cachedWasmInstance = error as Error;
    }
  }

  if (tryAsmJs && !(cachedAsmJsInstance instanceof Error)) {
    if (cachedAsmJsInstance !== undefined) {
      return new ClipperLibWrapper(cachedAsmJsInstance, NativeClipperLibLoadedFormat.AsmJs);
    }

    try {
      const asmJsInit = await import('./asmjs-init');
      cachedAsmJsInstance = await loadNativeClipperInstance(asmJsInit.init);
      return new ClipperLibWrapper(cachedAsmJsInstance, NativeClipperLibLoadedFormat.AsmJs);
    } catch (error) {
      cachedAsmJsInstance = error as Error;
    }
  }

  throw new ClipperError('could not load native clipper in the desired format');
}

declare function clipToPaths(instance: NativeClipperInstance, params: ClipParams): Paths;
declare function clipToPolyTree(instance: NativeClipperInstance, params: ClipParams): PolyTree;
declare function offsetToPaths(instance: NativeClipperInstance, params: OffsetParams): Paths;
declare function offsetToPolyTree(instance: NativeClipperInstance, params: OffsetParams): PolyTree;
declare function area(path: Path): number;
declare function cleanPolygon(instance: NativeClipperInstance, path: Path, distance: number): Path;
declare function cleanPolygons(instance: NativeClipperInstance, paths: Paths, distance: number): Paths;
declare function closedPathsFromPolyTree(polyTree: PolyTree): Paths;
declare function minkowskiDiff(instance: NativeClipperInstance, pattern: Path, path: Path): Paths;
declare function minkowskiSumPath(instance: NativeClipperInstance, pattern: Path, path: Path, pathIsClosed: boolean): Paths;
declare function minkowskiSumPaths(instance: NativeClipperInstance, pattern: Path, paths: Paths, pathIsClosed: boolean): Paths;
declare function openPathsFromPolyTree(polyTree: PolyTree): Paths;
declare function orientation(path: Path): boolean;
declare function pointInPolygon(point: Point, path: Path): PointInPolygonResult;
declare function polyTreeToPaths(polyTree: PolyTree): Paths;
declare function reversePath(path: Path): void;
declare function reversePaths(paths: Paths): void;
declare function simplifyPolygon(instance: NativeClipperInstance, path: Path, fillType: PolyFillType): Paths;
declare function simplifyPolygons(instance: NativeClipperInstance, paths: Paths, fillType: PolyFillType): Paths;
declare function scalePath(path: Path, scale: number): Path;
declare function scalePaths(paths: Paths, scale: number): Paths;