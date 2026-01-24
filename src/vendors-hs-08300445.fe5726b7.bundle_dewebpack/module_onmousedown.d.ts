/**
 * Mouse down event handler for drag operations.
 * Prevents default behavior, stops event propagation, and initializes drag state.
 * 
 * @param e - The mouse event triggered on mouse down
 */
type OnMouseDownHandler = (e: MouseEvent) => void;

/**
 * Drag state reference object containing delta and origin coordinates.
 */
interface DragStateRef {
  /** The current drag state */
  current: {
    /** Horizontal distance moved from origin */
    deltaX: number;
    /** Vertical distance moved from origin */
    deltaY: number;
    /** Initial X coordinate when drag started */
    originX: number;
    /** Initial Y coordinate when drag started */
    originY: number;
  };
}

/**
 * Position coordinates object.
 */
interface Position {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Creates a mouse down event handler for drag interactions.
 * 
 * @param dragStateRef - Reference object storing drag state (deltaX, deltaY, originX, originY)
 * @param currentPosition - Current position object with x and y coordinates
 * @param setDragging - State setter function to update dragging status
 * @returns Mouse down event handler function
 */
declare function onMouseDown(
  dragStateRef: DragStateRef,
  currentPosition: Position,
  setDragging: (isDragging: boolean) => void
): OnMouseDownHandler;