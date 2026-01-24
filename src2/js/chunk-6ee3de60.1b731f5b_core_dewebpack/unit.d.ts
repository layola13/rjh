/**
 * Unit types supported for measurements
 */
export enum Unit {
  /** Millimeters unit */
  Millimeters = "Millimeters",
  /** Centimeters unit */
  Centimeters = "Centimeters",
  /** Inches unit */
  Inches = "Inches"
}

/**
 * Singleton class for unit conversion operations
 * Handles conversion between different measurement units (mm, cm, inches)
 */
export declare class UnitConvertion {
  /**
   * Default decimal digits for each unit type
   */
  private readonly defaultDigits: Map<Unit, number>;

  /**
   * Conversion factors for length measurements (relative to millimeters)
   */
  private readonly lengthConvertion: Map<Unit, number>;

  /**
   * Conversion factors for area measurements (relative to square meters)
   */
  private readonly areaConvertion: Map<Unit, number>;

  /**
   * Singleton instance
   */
  private static _ins?: UnitConvertion;

  /**
   * Get singleton instance
   */
  static get Ins(): UnitConvertion;

  /**
   * Constructor - initializes conversion maps with default values
   */
  constructor();

  /**
   * Convert length to output unit with proper rounding based on unit digits
   * @param length - Length value to convert
   * @returns Converted and rounded length value
   * @throws Error if unitDigits is out of range (0-6)
   */
  lengthForOutput(length: number): number;

  /**
   * Convert area value to current unit
   * @param area - Area value in base unit (square meters)
   * @returns Area in current unit
   */
  area(area: number): number;

  /**
   * Convert length value to current unit
   * @param length - Length value in base unit (millimeters)
   * @returns Length in current unit
   */
  length(length: number): number;

  /**
   * Convert length from current unit back to base unit (millimeters)
   * @param length - Length value in current unit
   * @returns Length in millimeters
   */
  unitlessLength(length: number): number;

  /**
   * Convert area from current unit back to base unit (square meters)
   * @param area - Area value in current unit
   * @returns Area in square meters
   */
  unitlessArea(area: number): number;
}