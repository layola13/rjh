/**
 * Represents a value with its associated unit (pixel or percentage).
 * Supports adaptive scaling based on ideal dimensions.
 */
export declare class ValueAndUnit {
  /**
   * Unit mode for percentage values (0-1 range internally, displayed as 0-100%)
   */
  static readonly UNITMODE_PERCENTAGE: 0;

  /**
   * Unit mode for pixel values
   */
  static readonly UNITMODE_PIXEL: 1;

  /**
   * Regular expression to parse value and unit strings.
   * Matches patterns like: "100", "50%", "200px", "-10.5px"
   */
  private static readonly _Regex: RegExp;

  /**
   * Internal storage for the unit mode
   */
  private _unit: 0 | 1;

  /**
   * Internal storage for the numeric value
   */
  private _value: number;

  /**
   * The original unit mode set during construction
   */
  private _originalUnit: 0 | 1;

  /**
   * Whether negative values are allowed for this instance
   */
  readonly negativeValueAllowed: boolean;

  /**
   * When true, adaptive scaling based on ideal dimensions is disabled
   */
  ignoreAdaptiveScaling: boolean;

  /**
   * Observable that notifies when value or unit changes
   */
  readonly onChangedObservable: Observable<void>;

  /**
   * Creates a new ValueAndUnit instance
   * @param value - The numeric value
   * @param unit - The unit mode (UNITMODE_PIXEL or UNITMODE_PERCENTAGE), defaults to UNITMODE_PIXEL
   * @param negativeValueAllowed - Whether negative values are permitted, defaults to true
   */
  constructor(value: number, unit?: 0 | 1, negativeValueAllowed?: boolean);

  /**
   * Checks if the unit is percentage
   */
  get isPercentage(): boolean;

  /**
   * Checks if the unit is pixel
   */
  get isPixel(): boolean;

  /**
   * Gets the raw internal value without any scaling
   */
  get internalValue(): number;

  /**
   * Gets or sets the numeric value. Setting triggers onChangedObservable
   */
  get value(): number;
  set value(value: number);

  /**
   * Gets or sets the unit mode. Setting triggers onChangedObservable
   */
  get unit(): 0 | 1;
  set unit(unit: 0 | 1);

  /**
   * Calculates the value in pixels
   * @param host - The host container with dimension information
   * @param parentSize - The parent dimension size for percentage calculations
   * @returns The value converted to pixels
   */
  getValueInPixel(host: IValueAndUnitHost, parentSize: number): number;

  /**
   * Updates both value and unit in a single operation
   * @param value - The new numeric value
   * @param unit - The new unit mode, defaults to UNITMODE_PIXEL
   * @returns This instance for method chaining
   */
  updateInPlace(value: number, unit?: 0 | 1): this;

  /**
   * Gets the computed value with adaptive scaling applied if applicable
   * @param host - The host container providing ideal dimensions and scaling context
   * @returns The scaled value
   */
  getValue(host?: IValueAndUnitHost): number;

  /**
   * Converts the value to a string representation with unit suffix
   * @param host - The host container for computing scaled values
   * @param decimals - Number of decimal places for formatting
   * @returns Formatted string like "100px" or "50%"
   */
  toString(host?: IValueAndUnitHost, decimals?: number): string;

  /**
   * Parses a string and updates the value and unit
   * @param source - String to parse (e.g., "100px", "50%", "200")
   * @returns True if the value or unit changed, false otherwise
   */
  fromString(source: string): boolean;
}

/**
 * Interface for containers that host ValueAndUnit instances.
 * Provides dimension information for adaptive scaling.
 */
export interface IValueAndUnitHost {
  /**
   * Gets the current size of the host
   */
  getSize(): { width: number; height: number };

  /**
   * Ideal width for adaptive scaling calculations
   */
  idealWidth?: number;

  /**
   * Ideal height for adaptive scaling calculations
   */
  idealHeight?: number;

  /**
   * When true and both ideal dimensions are set, uses the smallest scaling factor
   * based on window orientation (portrait vs landscape)
   */
  useSmallestIdeal?: boolean;
}

/**
 * Observable pattern implementation for change notifications
 */
export interface Observable<T> {
  /**
   * Notifies all observers with the provided data
   */
  notifyObservers(eventData?: T): void;
}