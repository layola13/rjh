/**
 * Drag and Drop Manager
 * 
 * Manages dragging behavior for interactive nodes in the canvas.
 * Handles mouse and touch events for drag operations.
 */

/**
 * Represents the status of a drag operation
 */
type DragStatus = 'dragging' | 'stopped' | 'ready';

/**
 * Pointer position with identifier
 */
interface PointerPosition {
  /** Unique identifier for the pointer */
  id: number;
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Drag event data passed to event handlers
 */
interface DragEventData {
  /** Event type */
  type: 'dragmove' | 'dragend' | 'dragstart';
  /** Target node being dragged */
  target: Node;
  /** Original browser event */
  evt: MouseEvent | TouchEvent | PointerEvent;
}

/**
 * Internal drag element state
 */
interface DragElementState {
  /** The node being dragged */
  node: Node;
  /** Current drag status */
  dragStatus: DragStatus;
  /** Pointer ID tracking this drag */
  pointerId?: number;
  /** Initial pointer position when drag started */
  startPointerPos: PointerPosition;
}

/**
 * Stage interface with drag-related methods
 */
interface Stage {
  /** Set pointer positions from event */
  setPointersPositions(event: Event): void;
  /** Changed pointer positions since last update */
  _changedPointerPositions: PointerPosition[];
  /** Get minimum distance required to start drag */
  dragDistance(): number;
  /** Start drag operation */
  startDrag(options: { evt: Event }): void;
  /** Check if currently dragging */
  isDragging(): boolean;
  /** Get the layer this stage belongs to */
  getLayer(): Layer | null;
  /** Batch draw optimization */
  batchDraw(): void;
  /** Fire event on node */
  fire(eventType: string, eventData: DragEventData, bubble: boolean): void;
}

/**
 * Node interface for draggable elements
 */
interface Node {
  /** Get the stage this node belongs to */
  getStage(): Stage;
  /** Get the layer this node belongs to */
  getLayer(): Layer | null;
  /** Fire event on node */
  fire(eventType: string, eventData: DragEventData, bubble: boolean): void;
  /** Internal method to set drag position */
  _setDragPosition(event: Event, state: DragElementState): void;
  /** Check if node is dragging */
  isDragging(): boolean;
}

/**
 * Layer interface for rendering
 */
interface Layer {
  /** Batch draw optimization */
  batchDraw(): void;
}

/**
 * Global drag and drop manager
 * 
 * Singleton object that coordinates all drag operations across the application.
 * Tracks multiple simultaneous drag operations and manages their lifecycle.
 */
export declare const DragManager: {
  /**
   * Check if any element is currently being dragged
   * @returns True if at least one element has 'dragging' status
   */
  readonly isDragging: boolean;

  /**
   * Flag indicating if a drag operation just completed
   * Used to prevent click events immediately after drag
   */
  justDragged: boolean;

  /**
   * Get the most recently registered drag node
   * @returns The last node in the drag elements map
   */
  readonly node: Node | undefined;

  /**
   * Internal map of all elements currently in drag state
   * Key is an identifier, value is the drag state
   * @internal
   */
  readonly _dragElements: Map<unknown, DragElementState>;

  /**
   * Handle drag movement
   * Called on mousemove/touchmove events
   * @param event - Mouse or touch event
   * @internal
   */
  _drag(event: MouseEvent | TouchEvent): void;

  /**
   * Handle drag end (before phase)
   * Called on mouseup/touchend during capture phase
   * @param event - Mouse or touch event (optional)
   * @internal
   */
  _endDragBefore(event?: MouseEvent | TouchEvent): void;

  /**
   * Handle drag end (after phase)
   * Called on mouseup/touchend during bubble phase
   * Fires 'dragend' events and cleans up drag state
   * @param event - Mouse or touch event (optional)
   * @internal
   */
  _endDragAfter(event?: MouseEvent | TouchEvent): void;
};

/**
 * Global DD namespace (legacy compatibility)
 * @deprecated Use DragManager instead
 */
export declare const DD: typeof DragManager;