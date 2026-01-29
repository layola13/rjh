interface OriginalSize {
  width: number;
  height?: number;
}

interface OriginalPosition {
  left: number;
  top?: number;
}

interface ResizeResult {
  left: number;
  width: number;
}

interface ResizeContext {
  originalSize: OriginalSize;
  originalPosition: OriginalPosition;
}

function resizeFromLeft(
  this: ResizeContext,
  event: unknown,
  offset: number
): ResizeResult {
  const size = this.originalSize;
  
  return {
    left: this.originalPosition.left + offset,
    width: size.width - offset
  };
}

export { resizeFromLeft, ResizeContext, ResizeResult, OriginalSize, OriginalPosition };