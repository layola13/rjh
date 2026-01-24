/**
 * Webpack Bundle Index - Type Definitions
 * 
 * This module contains type definitions for various utility functions
 * related to DOM manipulation, unit conversion, and configuration management.
 */

/**
 * Module 703519
 * Core module containing primary functionality
 */
export interface Module703519 {
  // Add specific type definitions based on module implementation
  [key: string]: unknown;
}

/**
 * Get utility function
 * Retrieves a value from a data structure or configuration
 * 
 * @template T - The type of value to retrieve
 * @param source - The source object to get the value from
 * @param path - The path or key to the desired value
 * @param defaultValue - Optional default value if path is not found
 * @returns The retrieved value or default value
 */
export function get<T = unknown>(
  source: Record<string, unknown> | unknown,
  path: string | string[],
  defaultValue?: T
): T;

/**
 * Convert a value to its string representation
 * 
 * @param value - The value to convert to string
 * @returns String representation of the value
 */
export function toString(value: unknown): string;

/**
 * EM unit utilities
 * Handles EM (relative to font-size) unit calculations and conversions
 */
export interface EMUtils {
  /**
   * Convert EM value to pixels
   * @param emValue - The EM value to convert
   * @param baseFontSize - Optional base font size in pixels
   * @returns Pixel value
   */
  toPixels(emValue: number, baseFontSize?: number): number;
  
  /**
   * Convert pixels to EM value
   * @param pixels - The pixel value to convert
   * @param baseFontSize - Optional base font size in pixels
   * @returns EM value
   */
  fromPixels(pixels: number, baseFontSize?: number): number;
}

export const EM: EMUtils;

/**
 * Convert various CSS unit values to pixels
 * 
 * @param value - The value to convert (can include unit suffix)
 * @param context - Optional context element for relative unit calculations
 * @returns Pixel value as number
 */
export function toPixels(
  value: string | number,
  context?: HTMLElement
): number;

/**
 * Set a value in a data structure or configuration
 * 
 * @template T - The type of value to set
 * @param target - The target object to set the value in
 * @param path - The path or key where the value should be set
 * @param value - The value to set
 * @returns The modified target object
 */
export function set<T = unknown>(
  target: Record<string, unknown>,
  path: string | string[],
  value: T
): Record<string, unknown>;

/**
 * Process configuration or data
 * Applies transformations or validations to input data
 * 
 * @template TInput - Input data type
 * @template TOutput - Output data type
 * @param input - The input data to process
 * @param options - Optional processing options
 * @returns Processed output
 */
export function process<TInput = unknown, TOutput = unknown>(
  input: TInput,
  options?: ProcessOptions
): TOutput;

/**
 * Options for the process function
 */
export interface ProcessOptions {
  /** Enable strict mode processing */
  strict?: boolean;
  /** Transform function to apply */
  transform?: (value: unknown) => unknown;
  /** Validation function */
  validate?: (value: unknown) => boolean;
  [key: string]: unknown;
}

/**
 * Get the root element or root value
 * 
 * @param element - Optional element to find root for
 * @returns Root element (typically document or shadow root)
 */
export function root(element?: HTMLElement): Document | ShadowRoot | HTMLElement;

/**
 * DPI (Dots Per Inch) utilities
 * Handles screen DPI detection and pixel density calculations
 */
export interface DPIUtils {
  /**
   * Get the current device DPI
   * @returns DPI value
   */
  get(): number;
  
  /**
   * Get the device pixel ratio
   * @returns Pixel ratio (e.g., 2 for Retina displays)
   */
  getPixelRatio(): number;
  
  /**
   * Convert physical pixels to CSS pixels
   * @param physicalPixels - Physical pixel value
   * @returns CSS pixel value
   */
  toCSSPixels(physicalPixels: number): number;
  
  /**
   * Convert CSS pixels to physical pixels
   * @param cssPixels - CSS pixel value
   * @returns Physical pixel value
   */
  toPhysicalPixels(cssPixels: number): number;
}

export const DPI: DPIUtils;

/**
 * Default export containing all utilities
 */
export default interface BundleExports {
  get: typeof get;
  toString: typeof toString;
  EM: typeof EM;
  toPixels: typeof toPixels;
  set: typeof set;
  process: typeof process;
  root: typeof root;
  DPI: typeof DPI;
}