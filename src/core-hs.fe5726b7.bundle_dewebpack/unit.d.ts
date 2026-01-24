/**
 * Unit conversion utilities for length and area measurements
 * Provides conversion factors and methods for various unit systems
 */

/**
 * Enumeration of supported length unit types
 */
export enum LengthUnitTypeEnum {
  /** Foot unit */
  foot = "ft",
  /** Inch unit */
  inch = "in",
  /** Meter unit (SI base unit) */
  meter = "m",
  /** Centimeter unit */
  centimeter = "cm",
  /** Millimeter unit */
  millimeter = "mm",
  /** Kilometer unit */
  kilometer = "km"
}

/**
 * Enumeration of supported area unit types
 */
export enum AreaUnitTypeEnum {
  /** Square foot unit */
  foot = "ft",
  /** Square inch unit */
  inch = "in",
  /** Square meter unit (SI base unit) */
  meter = "m",
  /** Square centimeter unit */
  centimeter = "cm",
  /** Square millimeter unit */
  millimeter = "mm",
  /** Square kilometer unit */
  kilometer = "km"
}

/**
 * Unit string type for length conversions
 */
export type LengthUnitString = "feet" | "ft" | "inches" | "in" | "cm" | "m" | "km" | "mm" | "meters" | "centimeters" | "kilometers" | "millimeters";

/**
 * Unit string type for area conversions
 */
export type AreaUnitString = "feet" | "ft" | "inches" | "in" | "cm" | "m" | "km" | "mm" | "meters";

/**
 * Conversion factor map from various units to meters
 */
export type ConvertToMeterFactorMap = Readonly<Record<LengthUnitString, number>>;

/**
 * Conversion factor map from various units to square meters
 */
export type ConvertToSquareMeterFactorMap = Readonly<Record<AreaUnitString, number>>;

/**
 * Unit conversion utility interface
 */
export interface IUnit {
  /** Length unit type enumeration */
  readonly LengthUnitTypeEnum: typeof LengthUnitTypeEnum;
  
  /** Area unit type enumeration */
  readonly AreaUnitTypeEnum: typeof AreaUnitTypeEnum;
  
  /** Conversion factors from various length units to meters */
  readonly ConvertToMeterFactor: ConvertToMeterFactorMap;
  
  /** Conversion factors from various area units to square meters */
  readonly ConvertToSquareMeterFactor: ConvertToSquareMeterFactorMap;
  
  /**
   * Converts a length value to the database unit (meters)
   * @param value - The length value to convert
   * @param unit - The source unit
   * @returns The value in meters (database unit)
   */
  ConvertLengthToDatabaseUnit(value: number, unit: LengthUnitString): number;
  
  /**
   * Converts an area value to the database unit (square meters)
   * @param value - The area value to convert
   * @param unit - The source unit
   * @returns The value in square meters (database unit)
   */
  ConvertAreaToDatabaseUnit(value: number, unit: AreaUnitString): number;
  
  /**
   * Converts a length value from a specific unit to meters
   * @param unit - The source unit (case-insensitive)
   * @param value - The length value to convert
   * @returns The value in meters
   */
  ConvertToMeter(unit: string, value: string | number): number;
  
  /**
   * Converts a length value from meters to a custom unit
   * @param unit - The target unit (case-insensitive)
   * @param value - The length value in meters
   * @returns The value in the target unit
   */
  ConvertMeterToCustom(unit: string, value: string | number): number;
  
  /**
   * Converts a length value from database unit (meters) to display unit
   * @param value - The length value in meters
   * @param unit - The target display unit
   * @returns The value in the display unit, or 0 if value is zero
   */
  ConvertLengthToDisplayUnit(value: number, unit: LengthUnitString): number;
  
  /**
   * Converts an area value from database unit (square meters) to display unit
   * @param value - The area value in square meters
   * @param unit - The target display unit
   * @returns The value in the display unit, or 0 if value is zero
   */
  ConvertAreaToDisplayUnit(value: number | string, unit: AreaUnitString): number;
}

/**
 * Main Unit conversion utility export
 * Provides comprehensive unit conversion functionality for length and area measurements
 */
export declare const Unit: Readonly<IUnit>;