interface NativeModule {
  Paths: new () => NativePaths;
  toPaths(paths: NativePaths, byteOffset: number): void;
  fromPaths(paths: NativePaths): Float64Array;
  mallocDoubleArray?(length: number): Float64Array;
  freeTypedArray?(array: TypedArray): void;
}

interface NativePaths {
  delete(): void;
}

type TypedArray = Float64Array | Int32Array | Uint8Array;

type Path = number[][];

interface PathConversionResult {
  path: Path;
  ptrEnd: number;
}

function getNofItemsForPath(path: Path): number {
  let count = 1;
  for (const segment of path) {
    count += segment.length + 1;
  }
  return count;
}

function writePathToDoubleArray(
  path: Path,
  array: Float64Array,
  startIndex: number
): number {
  let index = startIndex;
  array[index++] = path.length;
  
  for (const segment of path) {
    array[index++] = segment.length;
    for (const value of segment) {
      array[index++] = value;
    }
  }
  
  return index;
}

function mallocDoubleArray(module: NativeModule, length: number): Float64Array {
  if (module.mallocDoubleArray) {
    return module.mallocDoubleArray(length);
  }
  return new Float64Array(length);
}

function freeTypedArray(module: NativeModule, array: TypedArray): void {
  if (module.freeTypedArray) {
    module.freeTypedArray(array);
  }
}

function doubleArrayToPath(
  module: NativeModule,
  array: Float64Array,
  shouldFree: boolean,
  startIndex: number
): PathConversionResult {
  let index = startIndex;
  const segmentCount = array[index++];
  const path: Path = [];
  
  for (let i = 0; i < segmentCount; i++) {
    const segmentLength = array[index++];
    const segment: number[] = [];
    
    for (let j = 0; j < segmentLength; j++) {
      segment.push(array[index++]);
    }
    
    path.push(segment);
  }
  
  return { path, ptrEnd: index };
}

export function pathsToDoubleArray(module: NativeModule, paths: Path[]): Float64Array {
  const pathCount = paths.length;
  let totalLength = 1;
  
  for (let i = 0; i < pathCount; i++) {
    totalLength += getNofItemsForPath(paths[i]);
  }
  
  const array = mallocDoubleArray(module, totalLength);
  array[0] = pathCount;
  
  let currentIndex = 1;
  for (let i = 0; i < pathCount; i++) {
    const path = paths[i];
    currentIndex = writePathToDoubleArray(path, array, currentIndex);
  }
  
  return array;
}

export function doubleArrayToNativePaths(
  module: NativeModule,
  array: Float64Array,
  shouldFree: boolean
): NativePaths {
  const nativePaths = new module.Paths();
  module.toPaths(nativePaths, array.byteOffset);
  
  if (shouldFree) {
    freeTypedArray(module, array);
  }
  
  return nativePaths;
}

export function pathsToNativePaths(module: NativeModule, paths: Path[]): NativePaths {
  return doubleArrayToNativePaths(module, pathsToDoubleArray(module, paths), true);
}

export function nativePathsToDoubleArray(
  module: NativeModule,
  nativePaths: NativePaths,
  shouldDelete: boolean
): Float64Array {
  const array = module.fromPaths(nativePaths);
  
  if (shouldDelete) {
    nativePaths.delete();
  }
  
  return array;
}

export function doubleArrayToPaths(
  module: NativeModule,
  array: Float64Array,
  shouldFree: boolean
): Path[] {
  const pathCount = array[0];
  const paths: Path[] = [];
  paths.length = pathCount;
  
  let currentIndex = 1;
  for (let i = 0; i < pathCount; i++) {
    const result = doubleArrayToPath(module, array, false, currentIndex);
    paths[i] = result.path;
    currentIndex = result.ptrEnd;
  }
  
  if (shouldFree) {
    freeTypedArray(module, array);
  }
  
  return paths;
}

export function nativePathsToPaths(
  module: NativeModule,
  nativePaths: NativePaths,
  shouldDelete: boolean
): Path[] {
  return doubleArrayToPaths(module, nativePathsToDoubleArray(module, nativePaths, shouldDelete), true);
}