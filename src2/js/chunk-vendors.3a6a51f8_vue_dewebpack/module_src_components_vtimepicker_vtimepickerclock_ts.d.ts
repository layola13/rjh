import Vue, { VNode, PropType } from 'vue';
import { VueConstructor } from 'vue/types/vue';

/**
 * Point coordinates in 2D space
 */
interface Point {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * CSS transform style object
 */
interface TransformStyle {
  /** Left position in percentage */
  left: string;
  /** Top position in percentage */
  top: string;
}

/**
 * Component data state
 */
interface VTimePickerClockData {
  /** Current input value */
  inputValue: number | null;
  /** Whether the user is currently dragging */
  isDragging: boolean;
  /** Value when mouse down event occurred */
  valueOnMouseDown: number | null;
  /** Value when mouse up event occurred */
  valueOnMouseUp: number | null;
}

/**
 * Props for VTimePickerClock component
 */
interface VTimePickerClockProps {
  /** Function to determine which values are allowed/selectable */
  allowedValues?: (value: number) => boolean;
  /** Whether to use AM/PM format */
  ampm?: boolean;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Whether to display inner and outer ring (for 24-hour format) */
  double?: boolean;
  /** Function to format displayed values */
  format?: (value: number) => string | number;
  /** Maximum value */
  max: number;
  /** Minimum value */
  min: number;
  /** Whether the picker is scrollable with mouse wheel */
  scrollable?: boolean;
  /** Whether the picker is readonly */
  readonly?: boolean;
  /** Rotation offset in degrees */
  rotate?: number;
  /** Step increment between values */
  step?: number;
  /** Current selected value */
  value?: number;
}

/**
 * Computed properties for VTimePickerClock
 */
interface VTimePickerClockComputed {
  /** Total count of values from min to max */
  count: number;
  /** Degrees per unit value */
  degreesPerUnit: number;
  /** Degrees in radians */
  degrees: number;
  /** Currently displayed value (defaults to min if value is null) */
  displayedValue: number;
  /** Scale factor for inner radius in double mode */
  innerRadiusScale: number;
  /** Count of values in one ring (half of total in double mode) */
  roundCount: number;
}

/**
 * Methods for VTimePickerClock
 */
interface VTimePickerClockMethods {
  /**
   * Handle mouse wheel scroll event
   * @param event - Wheel event
   */
  wheel(event: WheelEvent): void;

  /**
   * Check if a value is on the inner ring (for double/24-hour mode)
   * @param value - Value to check
   * @returns True if value is on inner ring
   */
  isInner(value: number): boolean;

  /**
   * Get the hand scale factor for a value
   * @param value - Value to get scale for
   * @returns Scale factor (innerRadiusScale for inner values, 1 for outer)
   */
  handScale(value: number): number;

  /**
   * Check if a value is allowed by the allowedValues function
   * @param value - Value to check
   * @returns True if value is allowed
   */
  isAllowed(value: number): boolean;

  /**
   * Generate VNodes for all clock values
   * @returns Array of value VNodes
   */
  genValues(): VNode[];

  /**
   * Generate VNode for the clock hand
   * @returns Clock hand VNode
   */
  genHand(): VNode;

  /**
   * Get CSS transform style for a value's position
   * @param value - Value to position
   * @returns Transform style object with left and top
   */
  getTransform(value: number): TransformStyle;

  /**
   * Calculate position coordinates for a value on the clock face
   * @param value - Value to calculate position for
   * @returns Point with x, y coordinates
   */
  getPosition(value: number): Point;

  /**
   * Handle mouse down event to start dragging
   * @param event - Mouse or touch event
   */
  onMouseDown(event: MouseEvent | TouchEvent): void;

  /**
   * Handle mouse up event to end dragging
   * @param event - Mouse or touch event
   */
  onMouseUp(event: MouseEvent | TouchEvent): void;

  /**
   * Handle drag move event to update value
   * @param event - Mouse or touch event
   */
  onDragMove(event: MouseEvent | TouchEvent): void;

  /**
   * Convert angle and ring position to a value
   * @param angle - Angle in degrees
   * @param inner - Whether on inner ring
   * @returns Calculated value
   */
  angleToValue(angle: number, inner: boolean): number;

  /**
   * Set value during mouse down/drag
   * @param value - Value to set
   */
  setMouseDownValue(value: number): void;

  /**
   * Update the input value and emit input event
   * @param value - New value
   */
  update(value: number): void;

  /**
   * Calculate Euclidean distance between two points
   * @param point1 - First point
   * @param point2 - Second point
   * @returns Distance between points
   */
  euclidean(point1: Point, point2: Point): number;

  /**
   * Calculate angle between two points
   * @param center - Center point
   * @param target - Target point
   * @returns Angle in degrees
   */
  angle(center: Point, target: Point): number;
}

/**
 * VTimePickerClock component
 * 
 * A circular clock face for selecting time values.
 * Supports both 12-hour and 24-hour formats with inner/outer rings.
 * Provides mouse and touch interaction with drag support.
 */
declare const VTimePickerClock: VueConstructor<
  Vue & 
  VTimePickerClockData & 
  VTimePickerClockComputed & 
  VTimePickerClockMethods & {
    /** Component props */
    readonly $props: VTimePickerClockProps;
  }
>;

export default VTimePickerClock;

/**
 * Events emitted by VTimePickerClock
 * 
 * @event input - Emitted when value changes during interaction
 * @param value - New value
 * 
 * @event change - Emitted when user completes selection (mouse up)
 * @param value - Final selected value
 */
export interface VTimePickerClockEvents {
  /** Emitted during value changes (real-time) */
  input: number;
  /** Emitted when selection is complete */
  change: number;
}