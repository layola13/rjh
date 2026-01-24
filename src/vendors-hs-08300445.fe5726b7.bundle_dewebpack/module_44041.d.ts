/**
 * Range Slider Component Type Definitions
 * A multi-handle slider component for selecting ranges
 */

/**
 * Slider mark configuration
 */
export interface SliderMarks {
  [key: number]: React.ReactNode | string | number;
}

/**
 * Props for individual handle component
 */
export interface HandleProps {
  /** CSS class name */
  className: string;
  /** Component prefix for styling */
  prefixCls: string;
  /** Whether the slider is vertical */
  vertical: boolean;
  /** Whether this handle is currently being dragged */
  dragging: boolean;
  /** Position offset percentage (0-100) */
  offset: number;
  /** Current value of the handle */
  value: number;
  /** Index of the handle in the handles array */
  index: number;
  /** Tab index for keyboard navigation */
  tabIndex: number | null;
  /** Minimum value allowed */
  min: number;
  /** Maximum value allowed */
  max: number;
  /** Whether the slider is reversed */
  reverse: boolean;
  /** Whether the handle is disabled */
  disabled: boolean;
  /** Custom inline styles */
  style: React.CSSProperties;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** ARIA labelledby for accessibility */
  ariaLabelledBy?: string;
  /** Formatter for ARIA value text */
  ariaValueTextFormatter?: (value: number) => string;
}

/**
 * Props for the Range component
 */
export interface RangeProps {
  /** Number of handles (creates count+1 handles total) */
  count?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment for values */
  step?: number | null;
  /** Default values for handles */
  defaultValue?: number[];
  /** Controlled values for handles */
  value?: number[];
  /** Marks to display on the slider */
  marks?: SliderMarks;
  /** Whether handles can cross each other */
  allowCross?: boolean;
  /** Minimum distance between handles (number) or whether pushing is enabled (boolean) */
  pushable?: boolean | number;
  /** Whether the track can be dragged */
  draggableTrack?: boolean;
  /** Whether the slider is vertical */
  vertical?: boolean;
  /** Whether the slider is reversed */
  reverse?: boolean;
  /** Whether to include the track between handles */
  included?: boolean;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** CSS class prefix */
  prefixCls?: string;
  /** Tab indices for each handle */
  tabIndex?: (number | null)[];
  /** ARIA labels for each handle */
  ariaLabelGroupForHandles?: string[];
  /** ARIA labelledby values for each handle */
  ariaLabelledByGroupForHandles?: string[];
  /** ARIA value text formatters for each handle */
  ariaValueTextFormatterGroupForHandles?: ((value: number) => string)[];
  /** Styles for each track segment */
  trackStyle?: React.CSSProperties[];
  /** Styles for each handle */
  handleStyle?: React.CSSProperties[];
  /** Callback fired when value changes */
  onChange?: (values: number[]) => void;
  /** Callback fired before change starts */
  onBeforeChange?: (values: number[]) => void;
  /** Callback fired after change completes */
  onAfterChange?: (values: number[]) => void;
  /** Custom handle render function */
  handle?: (props: HandleProps) => React.ReactElement;
}

/**
 * Internal state for the Range component
 */
export interface RangeState {
  /** Index of the currently active handle (null if none) */
  handle: number | null;
  /** Index of the most recently moved handle */
  recent: number;
  /** Current values for all handles */
  bounds: number[];
}

/**
 * Parameters for trimming and aligning values
 */
interface TrimAlignValueParams {
  /** The value to trim/align */
  value: number;
  /** Index of the handle being adjusted */
  handle: number | null;
  /** Current bounds of all handles */
  bounds?: number[];
  /** Component props for validation */
  props: RangeProps;
}

/**
 * Render output containing tracks and handles
 */
interface RangeRenderOutput {
  /** Array of track elements between handles */
  tracks: React.ReactElement[];
  /** Array of handle elements */
  handles: React.ReactElement[];
}

/**
 * Cache for internal points calculation
 */
interface InternalPointsCache {
  /** Cached marks object */
  marks: SliderMarks;
  /** Cached step value */
  step: number | null;
  /** Calculated points array */
  points: number[];
}

/**
 * Multi-handle range slider component
 * Supports multiple draggable handles for selecting value ranges
 */
export default class Range extends React.Component<RangeProps, RangeState> {
  /** Display name for React DevTools */
  static displayName: string;
  
  /** Default prop values */
  static defaultProps: Partial<RangeProps>;
  
  /**
   * Derives state from props when they change
   * @param props - Next props
   * @param state - Current state
   * @returns New state or null if no update needed
   */
  static getDerivedStateFromProps(
    props: RangeProps,
    state: RangeState
  ): Partial<RangeState> | null;

  /** Cache for points calculation */
  private internalPointsCache?: InternalPointsCache;
  
  /** Starting value when drag begins */
  private startValue?: number;
  
  /** Starting position when drag begins */
  private startPosition?: number;
  
  /** Index of the previously moved handle */
  private prevMovedHandleIndex?: number;
  
  /** Whether track dragging is active */
  private dragTrack?: boolean;
  
  /** References to handle DOM elements */
  private handlesRefs: { [key: number]: any };

  /**
   * Calculates value based on position
   * @param position - Position value (pixels or percentage)
   * @returns Corresponding slider value
   */
  calcValueByPos(position: number): number;

  /**
   * Gets the total length of the slider
   * @returns Length in pixels
   */
  getSliderLength(): number;

  /**
   * Calculates offset percentage for a value
   * @param value - The value to calculate offset for
   * @returns Offset percentage (0-100)
   */
  calcOffset(value: number): number;

  /**
   * Saves reference to a handle element
   * @param index - Handle index
   * @param handle - Handle element reference
   */
  saveHandle(index: number, handle: any): void;

  /**
   * Removes document-level event listeners
   */
  removeDocumentEvents(): void;

  /**
   * Handles component updates
   * @param prevProps - Previous props
   * @param prevState - Previous state
   */
  componentDidUpdate(prevProps: RangeProps, prevState: RangeState): void;

  /**
   * Gets value from position during drag
   * @param position - Current position
   * @returns New values array or null if unchanged
   */
  positionGetValue(position: number): number[] | null;

  /**
   * Handles drag/interaction end
   * @param force - Whether to force end
   */
  onEnd(force?: boolean): void;

  /**
   * Handles state changes
   * @param state - Partial state to update
   */
  onChange(state: Partial<RangeState>): void;

  /**
   * Handles drag/interaction start
   * @param position - Starting position
   */
  onStart(position: number): void;

  /**
   * Handles movement during drag
   * @param event - Mouse/touch event
   * @param position - Current position
   * @param isDraggingTrack - Whether dragging the track
   * @param bounds - Current bounds when dragging track
   */
  onMove(
    event: React.MouseEvent | React.TouchEvent,
    position: number,
    isDraggingTrack: boolean,
    bounds?: number[]
  ): void;

  /**
   * Handles keyboard navigation
   * @param event - Keyboard event
   */
  onKeyboard(event: React.KeyboardEvent): void;

  /**
   * Gets current values of all handles
   * @returns Array of current values
   */
  getValue(): number[];

  /**
   * Finds the closest handle to a value
   * @param value - The value to find closest handle for
   * @returns Index of closest handle
   */
  getClosestBound(value: number): number;

  /**
   * Determines which handle needs to move for a given value
   * @param value - Target value
   * @param closestBound - Index of closest handle
   * @returns Index of handle that should move
   */
  getBoundNeedMoving(value: number, closestBound: number): number;

  /**
   * Gets the lower bound value
   * @returns Value of the first handle
   */
  getLowerBound(): number;

  /**
   * Gets the upper bound value
   * @returns Value of the last handle
   */
  getUpperBound(): number;

  /**
   * Gets all valid points on the slider (from marks and steps)
   * @returns Sorted array of valid values
   */
  getPoints(): number[];

  /**
   * Moves a handle to a specific value
   * @param value - Target value
   * @param isKeyboard - Whether triggered by keyboard
   */
  moveTo(value: number, isKeyboard?: boolean): void;

  /**
   * Pushes surrounding handles when pushable is enabled
   * @param bounds - Current bounds array
   * @param handleIndex - Index of handle being moved
   */
  pushSurroundingHandles(bounds: number[], handleIndex: number): void;

  /**
   * Recursively pushes a handle in a direction
   * @param bounds - Current bounds array
   * @param handleIndex - Index of handle to push
   * @param direction - Direction to push (1 or -1)
   * @param distance - Minimum distance to maintain
   * @returns Whether push was successful
   */
  pushHandle(
    bounds: number[],
    handleIndex: number,
    direction: number,
    distance: number
  ): boolean;

  /**
   * Pushes a handle by one point
   * @param bounds - Current bounds array
   * @param handleIndex - Index of handle to push
   * @param direction - Direction to push (1 or -1)
   * @returns Whether push was successful
   */
  pushHandleOnePoint(
    bounds: number[],
    handleIndex: number,
    direction: number
  ): boolean;

  /**
   * Trims and aligns a value according to step and bounds
   * @param value - Value to trim/align
   * @returns Trimmed and aligned value
   */
  trimAlignValue(value: number): number;

  /**
   * Renders the component
   * @returns Render output with tracks and handles
   */
  render(): RangeRenderOutput;
}