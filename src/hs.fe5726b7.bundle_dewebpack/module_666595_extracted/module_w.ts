interface Size {
  width: number;
  height: number;
}

interface Position {
  left: number;
  top: number;
}

interface ResizeResult {
  left: number;
  width: number;
}

interface ResizableElement {
  originalSize: Size;
  originalPosition: Position;
  handleWestResize(event: unknown, deltaX: number): ResizeResult;
}

function handleWestResize(this: ResizableElement, event: unknown, deltaX: number): ResizeResult {
  const originalSize = this.originalSize;
  
  return {
    left: this.originalPosition.left + deltaX,
    width: originalSize.width - deltaX
  };
}