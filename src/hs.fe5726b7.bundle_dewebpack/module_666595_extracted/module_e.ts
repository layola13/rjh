interface Size {
  width: number;
  height: number;
}

interface ResizeContext {
  originalSize: Size;
}

function calculateWidth(this: ResizeContext, e: unknown, t: number): { width: number } {
  return {
    width: this.originalSize.width + t
  };
}