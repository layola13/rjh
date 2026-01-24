/**
 * Represents a value with its associated unit (pixel or percentage).
 * Supports adaptive scaling and unit conversion for GUI systems.
 */
export declare class ValueAndUnit {
  /**
   * Unit mode for percentage values (0-1 range represents 0%-100%)
   */
  static readonly UNITMODE_PERCENTAGE: 0;

  /**
   * Unit mode for pixel values
   */
  static readonly UNITMODE_PIXEL: 1;

  /**
   * Regular expression for parsing value and unit strings
   * Matches formats like: "10", "10px", "50%", "-5.5px"
   */
  private static readonly _Regex: RegExp;

  private static readonly _UNITMODE_PERCENTAGE: 0;
  private static readonly _UNITMODE_PIXEL: 1;

  /**
   * Whether negative values are allowed for this instance
   */
  readonly negativeValueAllowed: boolean;

  /**
   * If true, adaptive scaling based on ideal dimensions will be ignored
   */
  ignoreAdaptiveScaling: boolean;

  /**
   * Observable that fires when the value or unit changes
   */
  readonly onChangedObservable: Observable<void>;

  private _value: number;
  private _unit: 0 | 1;
  private readonly _originalUnit: 0 | 1;

  /**
   * Creates a new ValueAndUnit instance
   * @param value - The numeric value
   * @param unit - The unit mode (UNITMODE_PIXEL or UNITMODE_PERCENTAGE), defaults to UNITMODE_PIXEL
   * @param negativeValueAllowed - Whether negative values are permitted, defaults to true
   */
  constructor(value: number, unit?: 0 | 1, negativeValueAllowed?: boolean);

  /**
   * Checks if the current unit is percentage
   */
  get isPercentage(): boolean;

  /**
   * Checks if the current unit is pixel
   */
  get isPixel(): boolean;

  /**
   * Gets the raw internal value without any scaling or conversion
   */
  get internalValue(): number;

  /**
   * Gets the current value
   */
  get value(): number;

  /**
   * Sets the value and notifies observers if changed
   */
  set value(newValue: number);

  /**
   * Gets the current unit mode
   */
  get unit(): 0 | 1;

  /**
   * Sets the unit mode and notifies observers if changed
   */
  set unit(newUnit: 0 | 1);

  /**
   * Converts and returns the value in pixels
   * @param host - The host container providing context for adaptive scaling
   * @param refValue - Reference value used for percentage calculations
   * @returns The value converted to pixels
   */
  getValueInPixel(host: IValueAndUnitHost, refValue: number): number;

  /**
   * Updates both value and unit in a single operation
   * @param value - The new numeric value
   * @param unit - The new unit mode, defaults to UNITMODE_PIXEL
   * @returns This instance for chaining
   */
  updateInPlace(value: number, unit?: 0 | 1): this;

  /**
   * Gets the value with adaptive scaling applied based on host's ideal dimensions
   * @param host - Optional host container providing ideal width/height for scaling
   * @returns The scaled value
   */
  getValue(host?: IValueAndUnitHost): number;

  /**
   * Converts the value to a string representation with unit suffix
   * @param host - Optional host for scaling calculations
   * @param decimalPlaces - Number of decimal places to format, if specified
   * @returns String like "10px" or "50%"
   */
  toString(host?: IValueAndUnitHost, decimalPlaces?: number): string;

  /**
   * Parses a string to update the value and unit
   * @param source - String like "10px", "50%", or "10"
   * @returns True if parsing succeeded and value changed, false otherwise
   */
  fromString(source: string): boolean;
}

/**
 * Interface for containers that host ValueAndUnit instances
 * Provides context for adaptive scaling calculations
 */
export interface IValueAndUnitHost {
  /**
   * Ideal width for adaptive scaling
   */
  idealWidth?: number;

  /**
   * Ideal height for adaptive scaling
   */
  idealHeight?: number;

  /**
   * If true, uses the smallest scaling ratio when both idealWidth and idealHeight are set
   */
  useSmallestIdeal?: boolean;

  /**
   * Gets the current size of the host
   */
  getSize(): { width: number; height: number };
}

/**
 * Observable class for event notification
 */
declare class Observable<T> {
  /**
   * Notifies all registered observers with the provided data
   */
  notifyObservers(eventData?: T): void;
}