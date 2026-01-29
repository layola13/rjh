import { Clipper } from './clipper';
import { ClipperError } from './clipper-error';
import { PolyType } from './poly-type';

export interface PathData {
  data: number[][] | number[][][];
  closed?: boolean;
}

export interface ClipperInput {
  subjectInputs?: PathData[];
  clipInputs?: PathData[];
  clipType: ClipType;
  subjectFillType: PolyFillType;
  clipFillType?: PolyFillType;
  cleanDistance?: number;
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

export interface PolyTree {
  childs: PolyNode[];
}

export interface PolyNode {
  contour: number[][];
  childs: PolyNode[];
  parent?: PolyNode;
  isOpen: boolean;
}

const VALIDATE_OPEN_PATHS = false;

function addPathsToClipper(
  clipper: Clipper,
  inputs: PathData[] | undefined,
  polyType: PolyType
): void {
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
      if (!clipper.addPaths(pathData as number[][][], polyType, isClosed)) {
        throw new ClipperError('invalid paths');
      }
    } else {
      if (!clipper.addPath(pathData as number[][], polyType, isClosed)) {
        throw new ClipperError('invalid path');
      }
    }
  }
}

export function clipToPathsOrPolyTree(
  returnPolyTree: boolean,
  initOptions: number,
  options: ClipperInput
): number[][][] | PolyTree {
  if (
    VALIDATE_OPEN_PATHS &&
    !returnPolyTree &&
    options.subjectInputs &&
    options.subjectInputs.some((input) => !input.closed)
  ) {
    throw new Error('clip to a PolyTree (not to a Path) when using open paths');
  }

  const clipper = new Clipper(initOptions, options);

  try {
    addPathsToClipper(clipper, options.subjectInputs, PolyType.Subject);
    addPathsToClipper(clipper, options.clipInputs, PolyType.Clip);

    let result: number[][][] | PolyTree;
    const clipFillType = options.clipFillType === undefined 
      ? options.subjectFillType 
      : options.clipFillType;

    if (returnPolyTree) {
      if (options.cleanDistance !== undefined) {
        throw new ClipperError('cleaning is not available for poly tree results');
      }
      result = clipper.executeToPolyTee(
        options.clipType,
        options.subjectFillType,
        clipFillType
      );
    } else {
      result = clipper.executeToPaths(
        options.clipType,
        options.subjectFillType,
        clipFillType,
        options.cleanDistance
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

export function clipToPaths(initOptions: number, options: ClipperInput): number[][][] {
  return clipToPathsOrPolyTree(false, initOptions, options) as number[][][];
}

export function clipToPolyTree(initOptions: number, options: ClipperInput): PolyTree {
  return clipToPathsOrPolyTree(true, initOptions, options) as PolyTree;
}