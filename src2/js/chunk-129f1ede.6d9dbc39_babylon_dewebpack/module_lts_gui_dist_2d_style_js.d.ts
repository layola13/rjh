/**
 * Represents a style configuration for 2D GUI elements.
 * Manages font properties and notifies observers when style changes occur.
 */
export declare class Style {
  /**
   * Observable that triggers when any style property changes.
   * Subscribers will receive the Style instance as the notification payload.
   */
  readonly onChangedObservable: Observable<Style>;

  /**
   * The font size value with unit support (e.g., "18px", "1.5em").
   * When set, triggers onChangedObservable if the value differs from current.
   */
  fontSize: string;

  /**
   * The font family name (e.g., "Arial", "Helvetica, sans-serif").
   * Default: "Arial"
   * When set, triggers onChangedObservable if the value differs from current.
   */
  fontFamily: string;

  /**
   * The font style property (e.g., "normal", "italic", "oblique").
   * Default: ""
   * When set, triggers onChangedObservable if the value differs from current.
   */
  fontStyle: string;

  /**
   * The font weight property (e.g., "normal", "bold", "700").
   * Default: ""
   * When set, triggers onChangedObservable if the value differs from current.
   */
  fontWeight: string;

  /**
   * Internal storage for font size with unit mode support.
   * @internal
   */
  private _fontSize: ValueAndUnit;

  /**
   * Internal storage for font family.
   * @internal
   */
  private _fontFamily: string;

  /**
   * Internal storage for font style.
   * @internal
   */
  private _fontStyle: string;

  /**
   * Internal storage for font weight.
   * @internal
   */
  private _fontWeight: string;

  /**
   * Reference to the host GUI control that owns this style.
   * @internal
   */
  private _host: IStyleHost;

  /**
   * Creates a new Style instance.
   * @param host - The host control that owns this style, used for unit conversion context
   */
  constructor(host: IStyleHost);

  /**
   * Disposes the style instance and clears all observable subscriptions.
   * Should be called when the style is no longer needed to prevent memory leaks.
   */
  dispose(): void;
}

/**
 * Interface for GUI controls that can host style instances.
 * Provides context for unit conversion (e.g., percentage to pixel calculations).
 */
export interface IStyleHost {
  // Host interface members would be defined based on actual usage
}

/**
 * Observable pattern implementation for event notification.
 * @template T - The type of data passed to observers
 */
declare class Observable<T> {
  /**
   * Notifies all registered observers with the provided data.
   * @param eventData - The data to pass to observer callbacks
   */
  notifyObservers(eventData: T): void;

  /**
   * Clears all registered observers.
   */
  clear(): void;
}

/**
 * Represents a value with an associated unit of measurement.
 * Supports conversion between different unit modes (pixel, percentage, etc.).
 */
declare class ValueAndUnit {
  /**
   * Unit mode constant for pixel measurements.
   */
  static readonly UNITMODE_PIXEL: number;

  /**
   * Creates a ValueAndUnit instance.
   * @param value - The numeric value
   * @param unitMode - The unit mode (e.g., UNITMODE_PIXEL)
   * @param negativeValueAllowed - Whether negative values are permitted
   */
  constructor(value: number, unitMode: number, negativeValueAllowed: boolean);

  /**
   * Converts the value to a string representation in the context of a host.
   * @param host - The host control providing conversion context
   * @returns String representation with unit (e.g., "18px")
   */
  toString(host: IStyleHost): string;

  /**
   * Parses a string value and updates the internal value and unit.
   * @param value - String to parse (e.g., "18px", "50%")
   * @returns True if the value was successfully parsed and differs from current, false otherwise
   */
  fromString(value: string): boolean;
}