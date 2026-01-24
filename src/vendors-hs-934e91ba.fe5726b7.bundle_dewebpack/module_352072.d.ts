/**
 * Clipper library clipping operations module
 * Provides functions to clip paths using the Clipper algorithm
 */

import { Clipper } from './clipper';
import { ClipperError } from './clipper-error';
import { PolyType } from './poly-type';

/**
 * Input path data that can be either a single path or array of paths
 */
export interface PathInput {
  /** Path data - either array of points or array of path arrays */
  data: number[][] | number[][][];
  /** Whether the path is closed (default: true) */
  closed?: boolean;
}

/**
 * Clipping operation parameters
 */
export interface ClippingParams {
  /** Type of clipping operation (intersection, union, difference, xor) */
  clipType: ClipType;
  /** Subject (primary) path inputs */
  subjectInputs?: PathInput[];
  /** Clip (secondary) path inputs */
  clipInputs?: PathInput[];
  /** Fill type for subject paths */
  subjectFillType: PolyFillType;
  /** Fill type for clip paths (defaults to subjectFillType if not specified) */
  clipFillType?: PolyFillType;
  /** Distance for cleaning output paths (only for path results, not PolyTree) */
  cleanDistance?: number;
}

/**
 * Clipping operation type
 */
export enum ClipType {
  Intersection = 0,
  Union = 1,
  Difference = 2,
  Xor = 3
}

/**
 * Polygon fill type for clipping operations
 */
export enum PolyFillType {
  EvenOdd = 0,
  NonZero = 1,
  Positive = 2,
  Negative = 3
}

/**
 * Result of clipping operation as paths
 */
export type PathsResult = number[][][];

/**
 * Result of clipping operation as PolyTree structure
 */
export interface PolyTree {
  childs: PolyNode[];
}

/**
 * Node in a PolyTree structure
 */
export interface PolyNode {
  contour: number[][];
  childs: PolyNode[];
  parent?: PolyNode;
  isHole: boolean;
}

/**
 * Debug mode flag (currently disabled)
 */
const DEBUG_MODE = false;

/**
 * Adds paths from inputs to the clipper instance
 * 
 * @param clipper - The Clipper instance to add paths to
 * @param inputs - Array of path inputs to add
 * @param polyType - Type of polygon (Subject or Clip)
 * @throws {ClipperError} If paths are invalid
 */
const addPathsToClipper = (
  clipper: Clipper,
  inputs: PathInput[] | undefined,
  polyType: PolyType
): void => {
  if (inputs === undefined) {
    return;
  }

  for (let index = 0; index < inputs.length; index++) {
    const input = inputs[index];
    const pathData = input.data;

    if (!pathData || pathData.length <= 0) {
      continue;
    }

    const isClosed = input.closed === undefined || input.closed;

    if (Array.isArray(pathData[0])) {
      // Multiple paths
      if (!clipper.addPaths(pathData as number[][][], polyType, isClosed)) {
        throw new ClipperError('invalid paths');
      }
    } else {
      // Single path
      if (!clipper.addPath(pathData as number[][], polyType, isClosed)) {
        throw new ClipperError('invalid path');
      }
    }
  }
};

/**
 * Internal function to perform clipping operation and return either paths or PolyTree
 * 
 * @param usePolyTree - Whether to return result as PolyTree (true) or paths (false)
 * @param initializationMode - Clipper initialization mode
 * @param params - Clipping operation parameters
 * @returns Clipping result as either PathsResult or PolyTree
 * @throws {Error} If trying to clip open paths to PolyTree in debug mode
 * @throws {ClipperError} If cleaning is used with PolyTree or if clipping operation fails
 */
export function clipToPathsOrPolyTree(
  usePolyTree: boolean,
  initializationMode: number,
  params: ClippingParams
): PathsResult | PolyTree {
  if (
    DEBUG_MODE &&
    usePolyTree &&
    params.subjectInputs?.some((input) => !input.closed)
  ) {
    throw new Error('clip to a PolyTree (not to a Path) when using open paths');
  }

  const clipper = new Clipper(initializationMode, params);

  try {
    addPathsToClipper(clipper, params.subjectInputs, PolyType.Subject);
    addPathsToClipper(clipper, params.clipInputs, PolyType.Clip);

    let result: PathsResult | PolyTree | undefined;
    const clipFillType = params.clipFillType === undefined 
      ? params.subjectFillType 
      : params.clipFillType;

    if (usePolyTree) {
      if (params.cleanDistance !== undefined) {
        throw new ClipperError('cleaning is not available for poly tree results');
      }
      result = clipper.executeToPolyTree(params.clipType, params.subjectFillType, clipFillType);
    } else {
      result = clipper.executeToPaths(
        params.clipType,
        params.subjectFillType,
        clipFillType,
        params.cleanDistance
      );
    }

    if (result === undefined) {
      throw new ClipperError('error while performing clipping task');
    }

    return result;
  } finally {
    clipper.dispose();
  }
}

/**
 * Clips paths and returns the result as an array of paths
 * 
 * @param initializationMode - Clipper initialization mode
 * @param params - Clipping operation parameters
 * @returns Array of clipped paths
 */
export function clipToPaths(
  initializationMode: number,
  params: ClippingParams
): PathsResult {
  return clipToPathsOrPolyTree(false, initializationMode, params) as PathsResult;
}

/**
 * Clips paths and returns the result as a PolyTree structure
 * 
 * @param initializationMode - Clipper initialization mode
 * @param params - Clipping operation parameters
 * @returns PolyTree structure representing the clipped result
 */
export function clipToPolyTree(
  initializationMode: number,
  params: ClippingParams
): PolyTree {
  return clipToPathsOrPolyTree(true, initializationMode, params) as PolyTree;
}