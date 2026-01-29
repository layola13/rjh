export interface Point {
  x: number;
  y: number;
}

export type Path = Point[];
export type Paths = Path[];

export enum PolyFillType {
  EvenOdd = 0,
  NonZero = 1,
  Positive = 2,
  Negative = 3
}

interface NativePath {
  delete(): void;
  isDeleted(): boolean;
}

interface NativePaths {
  delete(): void;
  isDeleted(): boolean;
}

interface PolyNode {
  contour: Path;
  childs: PolyNode[];
  isOpen: boolean;
}

interface ClipperLib {
  Paths: new () => NativePaths;
  cleanPolygon(path: NativePath, distance: number): void;
  cleanPolygons(paths: NativePaths, distance: number): void;
  minkowskiDiff(pattern: NativePath, path: NativePath, solution: NativePaths): void;
  minkowskiSumPath(pattern: NativePath, path: NativePath, solution: NativePaths, pathIsClosed: boolean): void;
  minkowskiSumPaths(pattern: NativePath, paths: NativePaths, solution: NativePaths, pathIsClosed: boolean): void;
  simplifyPolygon(path: NativePath, solution: NativePaths, fillType: number): void;
  simplifyPolygonsOverwrite(paths: NativePaths, fillType: number): void;
}

const pathHelpers = {
  pathToNativePath: (clipper: ClipperLib, path: Path): NativePath => {
    throw new Error('Not implemented');
  },
  nativePathToPath: (clipper: ClipperLib, nativePath: NativePath, shouldDelete: boolean): Path => {
    throw new Error('Not implemented');
  }
};

const pathsHelpers = {
  pathsToNativePaths: (clipper: ClipperLib, paths: Paths): NativePaths => {
    throw new Error('Not implemented');
  },
  nativePathsToPaths: (clipper: ClipperLib, nativePaths: NativePaths, shouldDelete: boolean): Paths => {
    throw new Error('Not implemented');
  }
};

const conversionHelpers = {
  polyFillTypeToNative: (clipper: ClipperLib, fillType: PolyFillType): number => {
    return fillType;
  }
};

function cleanupNativeObjects(...objects: Array<NativePath | NativePaths | undefined>): void {
  for (const obj of objects) {
    if (obj && !obj.isDeleted()) {
      obj.delete();
    }
  }
}

export function area(path: Path): number {
  const length = path.length;
  if (length < 3) {
    return 0;
  }

  let totalArea = 0;
  let currentIndex = 0;
  let previousIndex = length - 1;

  while (currentIndex < length) {
    totalArea += (path[previousIndex].x + path[currentIndex].x) * (path[previousIndex].y - path[currentIndex].y);
    previousIndex = currentIndex;
    currentIndex++;
  }

  return -0.5 * totalArea;
}

export function cleanPolygon(clipper: ClipperLib, path: Path, distance: number = 1.1415): Path {
  const nativePath = pathHelpers.pathToNativePath(clipper, path);
  try {
    clipper.cleanPolygon(nativePath, distance);
    return pathHelpers.nativePathToPath(clipper, nativePath, true);
  } finally {
    cleanupNativeObjects(nativePath);
  }
}

export function cleanPolygons(clipper: ClipperLib, paths: Paths, distance: number = 1.1415): Paths {
  const nativePaths = pathsHelpers.pathsToNativePaths(clipper, paths);
  try {
    clipper.cleanPolygons(nativePaths, distance);
    return pathsHelpers.nativePathsToPaths(clipper, nativePaths, true);
  } finally {
    cleanupNativeObjects(nativePaths);
  }
}

function collectPathsFromPolyTree(node: PolyNode, mode: number, result: Paths): void {
  let shouldAddContour = true;

  switch (mode) {
    case 1:
      return;
    case 2:
      shouldAddContour = !node.isOpen;
      break;
  }

  if (node.contour.length > 0 && shouldAddContour) {
    result.push(node.contour);
  }

  for (let i = 0, length = node.childs.length; i < length; i++) {
    collectPathsFromPolyTree(node.childs[i], mode, result);
  }
}

export function closedPathsFromPolyTree(polyTree: PolyNode): Paths {
  const result: Paths = [];
  collectPathsFromPolyTree(polyTree, 2, result);
  return result;
}

export function minkowskiDiff(clipper: ClipperLib, pattern: Path, path: Path): Paths {
  const nativePattern = pathHelpers.pathToNativePath(clipper, pattern);
  const nativePath = pathHelpers.pathToNativePath(clipper, path);
  const solution = new clipper.Paths();

  try {
    clipper.minkowskiDiff(nativePattern, nativePath, solution);
    cleanupNativeObjects(nativePattern, nativePath);
    return pathsHelpers.nativePathsToPaths(clipper, solution, true);
  } finally {
    cleanupNativeObjects(nativePattern, nativePath, solution);
  }
}

export function minkowskiSumPath(clipper: ClipperLib, pattern: Path, path: Path, pathIsClosed: boolean): Paths {
  const nativePattern = pathHelpers.pathToNativePath(clipper, pattern);
  const nativePath = pathHelpers.pathToNativePath(clipper, path);
  const solution = new clipper.Paths();

  try {
    clipper.minkowskiSumPath(nativePattern, nativePath, solution, pathIsClosed);
    cleanupNativeObjects(nativePattern, nativePath);
    return pathsHelpers.nativePathsToPaths(clipper, solution, true);
  } finally {
    cleanupNativeObjects(nativePattern, nativePath, solution);
  }
}

export function minkowskiSumPaths(clipper: ClipperLib, pattern: Path, paths: Paths, pathIsClosed: boolean): Paths {
  const nativePattern = pathHelpers.pathToNativePath(clipper, pattern);
  const nativePaths = pathsHelpers.pathsToNativePaths(clipper, paths);

  try {
    clipper.minkowskiSumPaths(nativePattern, nativePaths, nativePaths, pathIsClosed);
    cleanupNativeObjects(nativePattern);
    return pathsHelpers.nativePathsToPaths(clipper, nativePaths, true);
  } finally {
    cleanupNativeObjects(nativePattern, nativePaths);
  }
}

export function openPathsFromPolyTree(polyTree: PolyNode): Paths {
  const result: Paths = [];
  const childCount = polyTree.childs.length;
  result.length = childCount;

  let openPathIndex = 0;
  for (let i = 0; i < childCount; i++) {
    if (polyTree.childs[i].isOpen) {
      result[openPathIndex++] = polyTree.childs[i].contour;
    }
  }

  result.length = openPathIndex;
  return result;
}

export function orientation(path: Path): boolean {
  return area(path) >= 0;
}

export function pointInPolygon(point: Point, polygon: Path): number {
  let result = 0;
  const polygonLength = polygon.length;

  if (polygonLength < 3) {
    return 0;
  }

  let previousPoint = polygon[0];

  for (let i = 1; i <= polygonLength; i++) {
    const currentPoint = i === polygonLength ? polygon[0] : polygon[i];

    if (currentPoint.y === point.y) {
      if (currentPoint.x === point.x || (previousPoint.y === point.y && ((currentPoint.x > point.x) === (previousPoint.x < point.x)))) {
        return -1;
      }
    }

    if ((previousPoint.y < point.y) !== (currentPoint.y < point.y)) {
      if (previousPoint.x >= point.x) {
        if (currentPoint.x > point.x) {
          result = 1 - result;
        } else {
          const crossProduct = (previousPoint.x - point.x) * (currentPoint.y - point.y) - (currentPoint.x - point.x) * (previousPoint.y - point.y);
          if (crossProduct === 0) {
            return -1;
          }
          if ((crossProduct > 0) === (currentPoint.y > previousPoint.y)) {
            result = 1 - result;
          }
        }
      } else if (currentPoint.x > point.x) {
        const crossProduct = (previousPoint.x - point.x) * (currentPoint.y - point.y) - (currentPoint.x - point.x) * (previousPoint.y - point.y);
        if (crossProduct === 0) {
          return -1;
        }
        if ((crossProduct > 0) === (currentPoint.y > previousPoint.y)) {
          result = 1 - result;
        }
      }
    }

    previousPoint = currentPoint;
  }

  return result;
}

export function polyTreeToPaths(polyTree: PolyNode): Paths {
  const result: Paths = [];
  collectPathsFromPolyTree(polyTree, 0, result);
  return result;
}

export function reversePath(path: Path): void {
  path.reverse();
}

export function reversePaths(paths: Paths): void {
  for (let i = 0, length = paths.length; i < length; i++) {
    reversePath(paths[i]);
  }
}

export function simplifyPolygon(clipper: ClipperLib, path: Path, fillType: PolyFillType = PolyFillType.EvenOdd): Paths {
  const nativePath = pathHelpers.pathToNativePath(clipper, path);
  const solution = new clipper.Paths();

  try {
    clipper.simplifyPolygon(nativePath, solution, conversionHelpers.polyFillTypeToNative(clipper, fillType));
    cleanupNativeObjects(nativePath);
    return pathsHelpers.nativePathsToPaths(clipper, solution, true);
  } finally {
    cleanupNativeObjects(nativePath, solution);
  }
}

export function simplifyPolygons(clipper: ClipperLib, paths: Paths, fillType: PolyFillType = PolyFillType.EvenOdd): Paths {
  const nativePaths = pathsHelpers.pathsToNativePaths(clipper, paths);

  try {
    clipper.simplifyPolygonsOverwrite(nativePaths, conversionHelpers.polyFillTypeToNative(clipper, fillType));
    return pathsHelpers.nativePathsToPaths(clipper, nativePaths, true);
  } finally {
    cleanupNativeObjects(nativePaths);
  }
}

export function scalePath(path: Path, scale: number): Path {
  const result: Path = [];
  
  for (let i = path.length - 1; i >= 0; i--) {
    const point = path[i];
    result.push({
      x: Math.round(point.x * scale),
      y: Math.round(point.y * scale)
    });
  }

  return result;
}

export function scalePaths(paths: Paths, scale: number): Paths {
  if (scale === 0) {
    return [];
  }

  const result: Paths = [];

  for (let i = paths.length - 1; i >= 0; i--) {
    const path = paths[i];
    result.push(scalePath(path, scale));
  }

  return result;
}