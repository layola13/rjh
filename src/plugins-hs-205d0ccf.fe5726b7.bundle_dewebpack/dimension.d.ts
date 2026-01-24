/**
 * Dimension module for displaying and editing dimensional annotations
 * Supports both arc angles and linear distances with configurable offsets
 */

import { InputBoxComp, InputBoxType } from './InputBoxComp';
import { TextItem } from './TextItem';
import { PathItem } from './PathItem';
import { Vector2, Arc2d, Line2d, MathUtil } from './MathTypes';
import { MarkerItem, IMarkerType } from './MarkerItem';
import { DimensionAttr, DimensionShadowAttr, InvalidDimensionAttr, InvalidTextAttr, TextAttr } from './Attributes';
import { getUnitParam } from './UnitUtils';

/** Default offset in pixels for dimension lines */
const DEFAULT_ARC_THRESHOLD = 30;

/** Scale factor for small dimensions */
const DEFAULT_LINE_THRESHOLD = 0.8;

/** Adjustment offset for small dimension text */
const DEFAULT_TEXT_ADJUSTMENT = 30;

/**
 * Settings for dimension display behavior
 */
interface DimensionSetting {
  /** Offset distance from the measured geometry */
  offset: number;
  /** Whether offset is calculated in screen space (true) or model space (false) */
  offsetByScreen: boolean;
}

/**
 * Callback when Enter key is pressed in dimension input
 */
type OnEnterCallback = (value: number, event: KeyboardEvent, dimension: Dimension) => void;

/**
 * Callback when Tab key is pressed in dimension input
 */
type OnTabCallback = (value: number, event: KeyboardEvent, dimension: Dimension) => void;

/**
 * Callback for keyboard events in dimension input
 */
type OnKeyDownCallback = (event: KeyboardEvent) => void;

/**
 * Properties for configuring a Dimension instance
 */
interface DimensionProps {
  /** Input box type (Number, etc.) */
  type?: InputBoxType;
  /** Initial value to display */
  value?: number;
  /** Whether the dimension is editable */
  editable?: boolean;
  /** Callback when Enter is pressed */
  onEnter?: OnEnterCallback;
  /** Callback when Tab is pressed */
  onTab?: OnTabCallback;
  /** Callback for key down events */
  onKeyDown?: OnKeyDownCallback;
}

/**
 * Data update parameters for dimension
 */
interface DimensionUpdateData {
  /** The curve to measure (Arc2d or Line2d) */
  curve?: Arc2d | Line2d;
  /** Offset distance from geometry */
  offset?: number;
  /** Maximum allowed value */
  max?: number;
}

/**
 * SVG rendering context interface
 */
interface SVGContext {
  // Context-specific methods and properties
  [key: string]: unknown;
}

/**
 * Wrapper managing both editable input and read-only text display
 * Only one component is visible at a time based on editable state
 */
declare class EditableTextWrapper {
  private readonly inputComponent: InputBoxComp;
  private readonly textItem: TextItem;
  private _editable: boolean;

  /**
   * Creates an editable text wrapper
   * @param inputComponent - Input component for editing
   * @param textItem - Text item for read-only display
   * @param editable - Initial editable state
   */
  constructor(inputComponent: InputBoxComp, textItem: TextItem, editable: boolean);

  /**
   * Changes editable state and optionally shows appropriate component
   * @param editable - New editable state
   * @param shouldShow - Whether to show the active component
   */
  setEditable(editable: boolean, shouldShow: boolean): void;

  /** Current editable state */
  get editable(): boolean;

  /** Shows the currently active component (input or text) */
  show(): void;

  /** Hides the currently active component */
  hide(): void;

  /** Cleans up resources */
  dispose(): void;
}

/**
 * Dimension class for displaying and editing dimensional annotations
 * Supports arc angles and linear distances with visual feedback
 */
export declare class Dimension {
  /** Default settings for all dimensions */
  static readonly defaultSetting: DimensionSetting;

  private readonly _context: SVGContext;
  private _props?: DimensionProps;
  private _pathItem: PathItem;
  private _pathShadowItem: PathItem;
  private _inputObj: EditableTextWrapper;
  private _curve?: Arc2d | Line2d;
  private _setting: DimensionSetting;
  private _inputPosition: Vector2;
  private _isShow: boolean;

  /**
   * Creates a dimension instance
   * @param context - SVG rendering context
   * @param props - Configuration properties
   * @param setting - Display settings (uses defaults if not provided)
   */
  constructor(context: SVGContext, props?: DimensionProps, setting?: DimensionSetting);

  /**
   * Whether this dimension can be activated (visible and editable)
   */
  supportActive(): boolean;

  /**
   * Updates dimension data (curve, offset, max value)
   * @param data - Data to update
   */
  updateData(data: DimensionUpdateData): void;

  /**
   * Updates dimension properties (callbacks, editable state)
   * @param props - Properties to update
   */
  updateProps(props: Partial<DimensionProps>): void;

  /**
   * Sets invalid state with visual feedback
   * @param isInvalid - Whether dimension is invalid
   */
  setInvalid(isInvalid: boolean): void;

  /** Sets whether dimension is editable */
  set editable(value: boolean);

  /** Sets the path to measure (alias for updateData) */
  set path(value: Arc2d | Line2d);

  /** Gets the current measured curve */
  get curve(): Arc2d | Line2d | undefined;

  /** Whether the input box currently has focus */
  get isFocus(): boolean;

  /** Whether this dimension can receive focus */
  get canFocus(): boolean;

  /** Screen position of the input box */
  get inputPosition(): Vector2;

  /** Whether dimension is currently visible */
  get isShow(): boolean;

  /** Type of input box used */
  get inputBoxType(): InputBoxType | undefined;

  /**
   * Recalculates and redraws dimension line and text
   */
  update(): void;

  /**
   * Gives focus to the input box (if editable)
   */
  focus(): void;

  /**
   * Removes focus from the input box
   */
  blur(): void;

  /**
   * Shows all dimension elements
   */
  show(): void;

  /**
   * Hides all dimension elements
   */
  hide(): void;

  /**
   * Cleans up all resources
   */
  dispose(): void;

  /**
   * Sorts dimensions by position (top-to-bottom, left-to-right)
   * @param dimensions - Array of dimensions to sort in-place
   */
  static sort(dimensions: Dimension[]): void;

  /**
   * Finds the next dimension in tab order
   * @param dimensions - Array of all dimensions
   * @param current - Currently focused dimension
   * @returns Next dimension to focus, or first if current not found
   */
  static getNextDimension(dimensions: Dimension[], current?: Dimension): Dimension | undefined;

  /**
   * Internal: Handles Enter key press
   */
  private _onEnter(value: number, event: KeyboardEvent): void;

  /**
   * Internal: Handles Tab key press
   */
  private _onTab(value: number, event: KeyboardEvent): void;

  /**
   * Internal: Handles general key down events
   */
  private _onKeyDown(event: KeyboardEvent): void;

  /**
   * Internal: Creates offset curve for dimension line
   * @param curve - Original curve to offset
   * @param offset - Offset distance
   * @returns Offset curve
   */
  private _getExtendCurve(curve: Arc2d | Line2d, offset: number): Arc2d | Line2d;

  /**
   * Internal: Updates input box position and value
   * @param curve - Curve to measure
   */
  private _updateInputItem(curve: Arc2d | Line2d): void;

  /**
   * Internal: Calculates optimal text position accounting for small dimensions
   * @param curve - Curve to position text on
   * @returns Optimal position for input box
   */
  private _getFitMiddlePoint(curve: Arc2d | Line2d): Vector2;

  /**
   * Internal: Extracts angle in degrees from arc
   * @param arc - Arc curve
   * @returns Angle in degrees
   */
  private _getArcAngle(arc: Arc2d): number;
}