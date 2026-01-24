/**
 * Draggable widget manager for creating draggable UI elements
 * Manages mouse events and position constraints for draggable containers
 */

/**
 * Position configuration for the draggable element
 */
interface InitialPosition {
  /** Distance from left edge in pixels */
  left?: number;
  /** Distance from right edge in pixels */
  right?: number;
  /** Distance from top edge in pixels */
  top?: number;
  /** Distance from bottom edge in pixels */
  bottom?: number;
}

/**
 * Boundary constraints for dragging
 */
interface DragBounding {
  /** Top boundary height in pixels */
  topHeight: number;
  /** Left boundary width in pixels */
  leftWidth: number;
  /** Right boundary width in pixels */
  rightWidth: number;
  /** Bottom boundary height in pixels */
  bottomHeight: number;
}

/**
 * Current position of the draggable element
 */
interface Position {
  /** X coordinate (left offset) in pixels */
  left: number;
  /** Y coordinate (top offset) in pixels */
  top: number;
}

/**
 * Configuration options for showing the draggable widget
 */
interface ShowOptions {
  /** CSS class name for the widget container */
  widgetClassName: string;
  /** React element to render inside the widget */
  renderElement: React.ReactElement;
  /** Initial position of the widget */
  initialPosition: InitialPosition;
  /** Boundary constraints for dragging */
  dragBounding: DragBounding;
  /** Callback invoked when the widget is moved */
  moveCallback?: (position: Position) => void;
  /** Callback invoked after the widget is rendered */
  renderCallback?: (element: HTMLElement) => void;
}

/**
 * Manages a draggable widget with React rendering and mouse event handling
 * Provides methods to show/hide the widget and handles drag operations within boundaries
 */
declare class DraggableWidget {
  /** The main draggable DOM container element */
  private draggableDom: HTMLElement | null;
  
  /** Horizontal distance between mouse and element edge during drag */
  private distanceX: number;
  
  /** Vertical distance between mouse and element edge during drag */
  private distanceY: number;
  
  /** CSS class name of the current widget */
  private widgetClassName: string;
  
  /** Boundary constraints for the current drag operation */
  private dragBounding: DragBounding;
  
  /** Callback function invoked when widget position changes */
  private moveCallback?: (position: Position) => void;
  
  /** The rendered React component instance */
  private renderElement?: React.Component;

  /**
   * Creates a new DraggableWidget instance
   * Initializes DOM references and binds event handlers
   */
  constructor();

  /**
   * Displays the draggable widget with specified configuration
   * @param options - Configuration options for the widget
   */
  show(options: ShowOptions): void;

  /**
   * Hides and unmounts the draggable widget
   * Cleans up event listeners and removes rendered React component
   */
  hide(): void;

  /**
   * Handles mouse move events during dragging
   * Constrains movement within specified boundaries
   * @param event - Mouse event object
   */
  private _onMouseMove(event: MouseEvent): void;

  /**
   * Handles mouse up events to end dragging
   * Removes move and up event listeners
   * @param event - Mouse event object
   */
  private _onMouseUp(event: MouseEvent): void;

  /**
   * Handles mouse down events to start dragging
   * Calculates initial offset and attaches move/up listeners
   * @param event - Mouse event object
   */
  private _onMouseDown(event: MouseEvent): void;
}

export default DraggableWidget;