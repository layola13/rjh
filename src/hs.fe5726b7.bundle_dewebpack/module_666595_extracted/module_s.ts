interface Size {
  height: number;
}

interface ResizeResult {
  height: number;
}

function calculateResizedHeight(
  this: { originalSize: Size },
  offset: number
): ResizeResult {
  return {
    height: this.originalSize.height + offset
  };
}