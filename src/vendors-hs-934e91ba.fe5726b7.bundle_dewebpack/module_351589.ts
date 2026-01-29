import { mallocDoubleArray, freeTypedArray } from './module_941910';

interface Point {
  x: number;
  y: number;
}

type Path = Point[];

interface NativePath {
  delete(): void;
}

interface WasmModule {
  Path: new () => NativePath;
  toPath(path: NativePath, byteOffset: number): void;
  fromPath(path: NativePath): Float64Array;
}

interface DoubleArrayToPathResult {
  path: Path;
  ptrEnd: number;
}

const COORDINATES_PER_POINT = 2;

export function getNofItemsForPath(path: Path): number {
  return 1 + path.length * COORDINATES_PER_POINT;
}

export function writePathToDoubleArray(
  path: Path,
  targetArray: Float64Array,
  offset: number
): number {
  const pointCount = path.length;
  targetArray[offset] = pointCount;

  let writeIndex = 1 + offset;
  for (let i = 0; i < pointCount; i++) {
    targetArray[writeIndex++] = path[i].x;
    targetArray[writeIndex++] = path[i].y;
  }

  return writeIndex;
}

export function pathToDoubleArray(wasmModule: WasmModule, path: Path): Float64Array {
  const arraySize = getNofItemsForPath(path);
  const doubleArray = mallocDoubleArray(wasmModule, arraySize);
  writePathToDoubleArray(path, doubleArray, 0);
  return doubleArray;
}

export function doubleArrayToNativePath(
  wasmModule: WasmModule,
  doubleArray: Float64Array,
  shouldFreeArray: boolean
): NativePath {
  const nativePath = new wasmModule.Path();
  wasmModule.toPath(nativePath, doubleArray.byteOffset);

  if (shouldFreeArray) {
    freeTypedArray(wasmModule, doubleArray);
  }

  return nativePath;
}

export function pathToNativePath(wasmModule: WasmModule, path: Path): NativePath {
  return doubleArrayToNativePath(wasmModule, pathToDoubleArray(wasmModule, path), true);
}

export function nativePathToDoubleArray(
  wasmModule: WasmModule,
  nativePath: NativePath,
  shouldDeletePath: boolean
): Float64Array {
  const doubleArray = wasmModule.fromPath(nativePath);

  if (shouldDeletePath) {
    nativePath.delete();
  }

  return doubleArray;
}

export function doubleArrayToPath(
  wasmModule: WasmModule,
  doubleArray: Float64Array,
  shouldFreeArray: boolean,
  offset: number
): DoubleArrayToPathResult {
  const pointCount = doubleArray[offset];
  const path: Path = new Array(pointCount);

  let readIndex = 1 + offset;
  for (let i = 0; i < pointCount; i++) {
    path[i] = {
      x: doubleArray[readIndex++],
      y: doubleArray[readIndex++]
    };
  }

  if (shouldFreeArray) {
    freeTypedArray(wasmModule, doubleArray);
  }

  return {
    path,
    ptrEnd: readIndex
  };
}

export function nativePathToPath(
  wasmModule: WasmModule,
  nativePath: NativePath,
  shouldDeletePath: boolean
): Path {
  return doubleArrayToPath(
    wasmModule,
    nativePathToDoubleArray(wasmModule, nativePath, shouldDeletePath),
    true,
    0
  ).path;
}