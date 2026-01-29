interface Position {
  top: number;
}

interface Size {
  height: number;
}

interface ResizeResult {
  top: number;
  height: number;
}

interface ResizableElement {
  originalSize: Size;
  originalPosition: Position;
}

function resizeFromTop(this: ResizableElement, offset: number): ResizeResult {
  const originalSize = this.originalSize;
  
  return {
    top: this.originalPosition.top + offset,
    height: originalSize.height - offset
  };
}