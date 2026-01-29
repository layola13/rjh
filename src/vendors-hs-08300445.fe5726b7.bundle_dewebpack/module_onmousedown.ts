interface MouseDragState {
  deltaX: number;
  deltaY: number;
  originX: number;
  originY: number;
}

interface Position {
  x: number;
  y: number;
}

const dragState: React.MutableRefObject<MouseDragState> = { current: { deltaX: 0, deltaY: 0, originX: 0, originY: 0 } };
const currentPosition: Position = { x: 0, y: 0 };

function onMouseDown(event: MouseEvent): void {
  event.preventDefault();
  event.stopPropagation();
  
  dragState.current.deltaX = event.pageX - currentPosition.x;
  dragState.current.deltaY = event.pageY - currentPosition.y;
  dragState.current.originX = currentPosition.x;
  dragState.current.originY = currentPosition.y;
  
  setDragging(true);
}

function setDragging(isDragging: boolean): void {
  // Implementation needed
}