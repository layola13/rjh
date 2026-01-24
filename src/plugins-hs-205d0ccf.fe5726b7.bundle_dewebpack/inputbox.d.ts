/**
 * InputBox module providing input components for canvas-based editing
 */

/**
 * Type of input box
 */
export enum InputBoxType {
  /** Angle input (degrees) */
  Angle = "angle",
  /** Numeric input */
  Number = "number"
}

/**
 * Configuration for input box behavior and constraints
 */
export interface InputBoxConfig {
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Display unit (e.g., "°", "m", "cm") */
  unit?: string;
  /** Decimal precision */
  precision?: number;
}

/**
 * Position coordinates
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Data for updating input box state
 */
export interface InputBoxUpdateData {
  /** Screen position of the input box */
  position?: Position;
  /** Current input value */
  value?: number;
  /** Whether the input should be focused */
  focus?: boolean;
  /** Configuration settings */
  config?: Partial<InputBoxConfig>;
}

/**
 * Props for InputBox React component
 */
export interface InputBoxProps {
  /** Input type (angle or number) */
  type: InputBoxType;
  /** Initial value */
  value?: number;
  /** Maximum allowed value */
  max?: number;
  /** Whether to show the input box initially */
  show?: boolean;
  /** Callback when Enter key is pressed */
  onEnter?: (value: number, withModifier: boolean) => void;
  /** Callback when Tab key is pressed */
  onTab?: (value: number, withModifier: boolean) => void;
  /** Callback for key down events */
  onKeyDown?: (keyCode: number) => void;
}

/**
 * State for InputBox React component
 */
export interface InputBoxState {
  /** Current input value */
  value: number;
  /** Whether the input box is visible */
  show: boolean;
  /** Whether the input box has focus */
  focus: boolean;
  /** Current configuration */
  config: InputBoxConfig;
}

/**
 * Canvas rendering context interface
 */
export interface CanvasContext {
  /** Canvas DOM element */
  canvas: HTMLCanvasElement;
  /** Get canvas size */
  getSize(): { width: number; height: number } | undefined;
}

/**
 * InputBox React component for canvas-based numeric/angle input
 */
export class InputBox extends React.Component<InputBoxProps, InputBoxState> {
  /**
   * Creates an instance of InputBox
   * @param props - Component properties
   */
  constructor(props: InputBoxProps);

  /**
   * Get a cloned copy of the current configuration
   * @returns Cloned configuration object
   */
  getCloneConfig(): InputBoxConfig;

  /**
   * Whether the input box currently has focus
   */
  get focus(): boolean;

  /**
   * Render the component
   */
  render(): React.ReactElement | null;
}

/**
 * InputBox component wrapper managing DOM lifecycle and positioning
 */
export class InputBoxComp {
  /**
   * Creates an InputBox component instance
   * @param context - Canvas rendering context
   * @param props - InputBox component properties
   */
  constructor(context: CanvasContext, props: InputBoxProps);

  /**
   * DOM container element for the input box
   */
  readonly domContainer: HTMLDivElement;

  /**
   * Update input box data (position, value, focus, config)
   * @param data - Update data
   */
  updateData(data: InputBoxUpdateData): void;

  /**
   * Whether the input box currently has focus
   */
  get focus(): boolean;

  /**
   * Show the input box
   */
  show(): void;

  /**
   * Hide the input box and remove focus
   */
  hide(): void;

  /**
   * Dispose of the component and clean up DOM
   */
  dispose(): void;
}