import { ClipperError } from './940626';
import { ClipperOffset } from './639189';

export interface OffsetInput {
  data: number[][] | number[][][];
  joinType: number;
  endType: number;
}

export interface OffsetOptions {
  delta: number;
  arcTolerance?: number;
  miterLimit?: number;
  offsetInputs?: OffsetInput[];
  cleanDistance?: number;
}

export interface PolyTree {
  // Define PolyTree structure based on your needs
  [key: string]: unknown;
}

const DEFAULT_ARC_TOLERANCE = 0.25;
const DEFAULT_MITER_LIMIT = 2;

function addInputsToOffset(
  clipperOffset: ClipperOffset,
  offsetInputs: OffsetInput[] | undefined
): void {
  if (offsetInputs === undefined) {
    return;
  }

  for (let index = 0, length = offsetInputs.length; index < length; index++) {
    const input = offsetInputs[index];
    const data = input.data;

    if (!data || data.length <= 0) {
      continue;
    }

    if (Array.isArray(data[0])) {
      clipperOffset.addPaths(data as number[][][], input.joinType, input.endType);
    } else {
      clipperOffset.addPath(data as number[][], input.joinType, input.endType);
    }
  }
}

function performOffset(
  returnPolyTree: boolean,
  miterLimit: number,
  options: OffsetOptions
): number[][][] | PolyTree | undefined {
  const mergedOptions = {
    arcTolerance: DEFAULT_ARC_TOLERANCE,
    miterLimit: DEFAULT_MITER_LIMIT,
    ...options
  };

  const clipperOffset = new ClipperOffset(
    miterLimit,
    mergedOptions.miterLimit,
    mergedOptions.arcTolerance
  );

  try {
    addInputsToOffset(clipperOffset, options.offsetInputs);

    if (returnPolyTree) {
      if (options.cleanDistance !== undefined) {
        throw new ClipperError('cleaning is not available for poly tree results');
      }
      return clipperOffset.executeToPolyTree(options.delta);
    }

    return clipperOffset.executeToPaths(options.delta, options.cleanDistance);
  } catch (error) {
    return undefined;
  } finally {
    clipperOffset.dispose();
  }
}

export function offsetToPaths(
  miterLimit: number,
  options: OffsetOptions
): number[][][] | undefined {
  return performOffset(false, miterLimit, options) as number[][][] | undefined;
}

export function offsetToPolyTree(
  miterLimit: number,
  options: OffsetOptions
): PolyTree | undefined {
  return performOffset(true, miterLimit, options) as PolyTree | undefined;
}