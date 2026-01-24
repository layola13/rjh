/**
 * Converts various CSS units to pixel values
 * @param element - The DOM element context for relative unit calculations
 * @returns The computed pixel value, or 0 if no value is present
 */
declare function toPixels(element: HTMLElement): number;

/**
 * CSS unit conversion constants and helpers
 */
declare namespace CSSUnits {
  /**
   * Points to pixels conversion ratio
   * 1pt = 1.25px
   */
  const PT_TO_PX_RATIO = 1.25;

  /**
   * Picas to pixels conversion ratio
   * 1pc = 15px
   */
  const PC_TO_PX_RATIO = 15;

  /**
   * Centimeters to inches conversion ratio
   */
  const CM_TO_INCH_RATIO = 2.54;

  /**
   * Millimeters to inches conversion ratio
   */
  const MM_TO_INCH_RATIO = 25.4;

  /**
   * Ex to Em ratio (approximation)
   * 1ex ≈ 0.5em
   */
  const EX_TO_EM_RATIO = 0.5;

  /**
   * Supported CSS unit types
   */
  type CSSUnit = 'em' | 'ex' | 'px' | 'pt' | 'pc' | 'cm' | 'mm' | 'in' | '%';

  /**
   * Get the font-size in pixels for em-based calculations
   * @param element - The DOM element context
   * @returns The computed font-size in pixels
   */
  function EM(element: HTMLElement): number;

  /**
   * Get the device DPI (dots per inch)
   * @param element - The DOM element context
   * @returns The device DPI value
   */
  function DPI(element: HTMLElement): number;
}

/**
 * Viewport-related utilities
 */
declare namespace ViewPort {
  /**
   * Compute viewport size for percentage-based calculations
   * @param element - The DOM element context
   * @returns The relevant viewport dimension in pixels
   */
  function ComputeSize(element: HTMLElement): number;
}

/**
 * Value holder interface for CSS property values
 */
interface CSSValue {
  /**
   * Check if a value is present
   * @returns True if value exists and is not empty
   */
  hasValue(): boolean;

  /**
   * The raw CSS value string (e.g., "16px", "2em", "50%")
   */
  value: string;

  /**
   * Extract the numeric part of the CSS value
   * @returns The numeric value without the unit
   */
  numValue(): number;
}