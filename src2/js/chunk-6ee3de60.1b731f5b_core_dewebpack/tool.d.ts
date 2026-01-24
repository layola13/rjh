/**
 * Geometry point utility type
 */
interface Point {
  x: number;
  y: number;
}

/**
 * Geometry segment representing a line or curve between two points
 */
interface Segment {
  start: Point;
  end: Point;
  tangentInStart(): Vector;
  projectionOn(line: Line): Point;
}

/**
 * Geometry arc
 */
interface Arc {
  start: Point;
  end: Point;
}

/**
 * Geometry line
 */
interface Line {
  start: Point;
  end: Point;
}

/**
 * Geometry vector
 */
interface Vector {
  rotate90CW(): Vector;
}

/**
 * Canvas/stage object with transformation and rendering capabilities
 */
interface Canvas {
  scaleX(): number;
  getPointerPosition(): Point;
  x(): number;
  y(): number;
  scale(scale: { x: number; y: number }): void;
  position(position: Point): void;
  batchDraw(): void;
}

/**
 * Layer containing drawable shapes
 */
interface Layer {
  destroyChildren(): void;
  find(predicate: (node: ShapeNode) => boolean): ShapeNode[];
  add(node: ShapeNode): void;
}

/**
 * Shape node in the canvas
 */
interface ShapeNode {
  attrs: {
    data?: {
      poly?: WinPolygon;
      stroke?: string;
      strokeWidth?: number;
      dashed?: boolean;
      snap?: boolean;
    };
    [key: string]: unknown;
  };
  hide(): void;
  moveToTop(): void;
  setAttr(key: string, value: unknown): void;
}

/**
 * Tool manager handling mouse/touch events and tool state
 */
interface ToolManager {
  mousePosition: Point;
}

/**
 * Shape manager for geometric operations and snapping
 */
interface ShapeManager {
  snapEdge(segment: Segment, point: Point, threshold: number): Segment | Arc | null;
}

/**
 * Editor view containing canvas, layers, and managers
 */
interface EditorView {
  canvas: Canvas;
  tmpLayer: Layer;
  activeLayer: Layer;
  toolManager: ToolManager;
  shapeManager: ShapeManager;
  refresh(): void;
}

/**
 * Polygon shape wrapper
 */
declare class WinPolygon {
  constructor(segments?: Segment[]);
  addCircle(center: Point, radius: number): void;
}

/**
 * Direction for expanding/modifying shapes
 */
export enum ExpandDirection {
  /** Left or Down direction */
  LeftOrDown = 1,
  /** Right or Up direction */
  RightOrDown = 2,
  /** Both directions */
  BothSide = 3,
}

/**
 * Editor input style modes
 */
export enum EditorStyle {
  /** Normal input mode */
  Normal = 0,
  /** Directional input mode (left/right or up/down) */
  Direction = 1,
  /** Directional input with both sides option */
  DirectionWithBoth = 2,
}

/**
 * Tool operation states
 */
export enum ToolStep {
  /** No operation in progress */
  None = 0,
  /** Operation started */
  Start = 1,
  /** Operation continuing */
  Continue = 2,
  /** Operation completed */
  Done = 3,
}

/**
 * Mouse event wrapper
 */
interface MouseEvent {
  evt: {
    pageX: number;
    pageY: number;
    deltaY?: number;
    changedTouches?: Array<{ pageX: number; pageY: number }>;
  };
  type: string;
}

/**
 * Touch event wrapper
 */
interface TouchEvent {
  touches: Array<{ clientX: number; clientY: number }>;
}

/**
 * Base abstract tool class for editor interactions
 * Handles mouse/touch events, snapping, and UI editing
 */
export declare abstract class Tool {
  /** Unique tool identifier */
  readonly name: string;
  
  /** Associated editor view */
  readonly view: EditorView;
  
  /** First point captured in operation */
  protected firstPt: Point;
  
  /** Current cursor/pointer position */
  protected curPt: Point;
  
  /** Current tool operation state */
  protected toolStep: ToolStep;
  
  /** Device pixel ratio for retina displays */
  protected readonly retinaPxielRatio: number;
  
  /** Last touch distance for pinch-zoom gestures */
  protected lastDist: number;

  /**
   * Creates a new tool instance
   * @param name - Unique tool identifier
   * @param view - Editor view instance
   */
  constructor(name: string, view: EditorView);

  /**
   * Whether this tool operates on frames (determined by name prefix)
   */
  readonly isFrameTool: boolean;

  /**
   * Mouse down event handler
   * @param event - Mouse event data
   */
  mousedown(event: MouseEvent): void;

  /**
   * Mouse move event handler
   * Updates cursor position and tool manager state
   * @param event - Mouse event data
   */
  mousemove(event: MouseEvent): void;

  /**
   * Mouse up event handler
   * @param event - Mouse event data
   */
  mouseup(event: MouseEvent): void;

  /**
   * Mouse wheel event handler for zooming
   * @param event - Mouse event with deltaY
   */
  mousewheel(event: MouseEvent): void;

  /**
   * Touch pinch-zoom event handler
   * @param event - Touch event with two touch points
   */
  touchwheel(event: TouchEvent): void;

  /**
   * Touch end event handler
   * Resets zoom tracking state
   * @param event - Touch event data
   */
  touchend(event: TouchEvent): void;

  /**
   * Operation completion handler
   * Resets tool and refreshes view
   * @param event - Mouse event data
   */
  mousedone(event: MouseEvent): void;

  /**
   * Drag start event handler
   * @param event - Mouse event data
   */
  dragstart(event: MouseEvent): void;

  /**
   * Drag move event handler
   * @param event - Mouse event data
   */
  dragmove(event: MouseEvent): void;

  /**
   * Double-click event handler
   * @param event - Mouse event data
   */
  dbclick(event: MouseEvent): void;

  /**
   * Cleans up temporary visual elements
   */
  cleanup(): void;

  /**
   * Initializes tool-specific state
   * Override in subclasses for custom initialization
   */
  initialTool(): void;

  /**
   * Resets tool to initial state
   */
  restart(): void;

  /**
   * Gets current pointer position in canvas coordinates
   * Accounts for canvas zoom and pan transformations
   * @returns Current position in canvas space
   */
  protected getPosition(): Point;

  /**
   * Detects and displays snap guides for geometric alignment
   * @param segment - Segment to snap to
   * @param threshold - Snap distance threshold
   * @param hideExisting - Whether to hide existing snaps first
   * @returns Snapped point if snap detected, undefined otherwise
   */
  protected detectSnaps(
    segment: Segment,
    threshold: number,
    hideExisting?: boolean
  ): Point | undefined;

  /**
   * Displays a linear snap guide between two points
   * @param startPoint - Snap line start point
   * @param endPoint - Snap line end point
   */
  protected displaySnap(startPoint: Point, endPoint: Point): void;

  /**
   * Displays a circular snap guide around a vertex
   * @param center - Circle center point
   * @param radius - Circle radius (defaults to snap vertex size)
   */
  protected displayCircleSnap(center: Point, radius?: number): void;

  /**
   * Hides all visible snap guides
   */
  protected hideSnaps(): void;

  /**
   * Shows a numeric input editor at mouse position
   * @param event - Mouse event for positioning
   * @param initialValue - Initial numeric value
   * @param onConfirm - Callback when value is confirmed
   * @param style - Editor display style
   * @param isVertical - Whether direction is vertical
   * @param showEditor - Whether to display the editor
   */
  protected showNumberEditor(
    event: MouseEvent,
    initialValue: number,
    onConfirm: (newValue: number, oldValue: number, direction: ExpandDirection) => void,
    style?: EditorStyle,
    isVertical?: boolean,
    showEditor?: boolean
  ): void;

  /**
   * Shows a text input editor at mouse position
   * @param event - Mouse event for positioning
   * @param initialText - Initial text value
   * @param onConfirm - Callback when text is confirmed
   */
  protected showTextEditor(
    event: MouseEvent,
    initialText: string,
    onConfirm: (newText: string, oldText: string) => void
  ): void;

  /**
   * Internal: Creates and displays an input editor
   * @param pageX - X position in page coordinates
   * @param pageY - Y position in page coordinates
   * @param initialValue - Initial input value
   * @param onConfirm - Confirmation callback
   * @param isNumeric - Whether input is numeric
   * @param style - Editor style
   * @param isVertical - Direction orientation
   * @param checkEquality - Whether to check value equality before confirming
   */
  protected showEditor(
    pageX: number,
    pageY: number,
    initialValue: string,
    onConfirm: (
      newValue: string,
      oldValue: string,
      direction: ExpandDirection
    ) => void,
    isNumeric: boolean,
    style: EditorStyle,
    isVertical: boolean,
    checkEquality: boolean
  ): void;

  /**
   * Creates full-screen overlay wrapper element
   * @returns Wrapper DOM element
   */
  protected uiWrap(): HTMLDivElement;

  /**
   * Creates editor form container
   * @param position - Position for the form
   * @returns Form DOM element
   */
  protected uiForm(position: Point): HTMLDivElement;

  /**
   * Creates input field element
   * @param value - Initial value
   * @param isNumeric - Whether input is numeric
   * @param style - Editor style
   * @param position - Position for input
   * @returns Input DOM element
   */
  protected uiInput(
    value: string,
    isNumeric: boolean,
    style: EditorStyle,
    position: Point
  ): HTMLInputElement;

  /**
   * Creates radio button with label
   * @param container - Parent container element
   * @param index - Radio button index
   * @param name - Radio group name
   * @param value - Radio button value
   * @param label - Display label text
   * @param checked - Whether radio is initially checked
   * @returns Radio input element
   */
  protected uiRadio(
    container: HTMLDivElement,
    index: number,
    name: string,
    value: string,
    label: string,
    checked?: boolean
  ): HTMLInputElement;
}