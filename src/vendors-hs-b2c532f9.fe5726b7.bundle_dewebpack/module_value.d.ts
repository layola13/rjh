/**
 * Module: module_value
 * Provides value normalization functionality
 */

/**
 * Represents a value that can be normalized
 */
type NormalizableValue = string | number | boolean | null | undefined;

/**
 * Configuration options for value normalization
 */
interface NormalizationOptions {
  strict?: boolean;
  defaultValue?: unknown;
  transform?: (value: unknown) => unknown;
}

/**
 * Context information for normalization process
 */
interface NormalizationContext {
  source?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Value normalization module interface
 */
export interface ValueNormalizer {
  /**
   * Normalizes a value according to specified parameters
   * @param value - The value to normalize
   * @param type - The target type for normalization
   * @param options - Optional normalization configuration
   * @param context - Optional context information
   * @param metadata - Additional metadata for the normalization process
   * @returns The normalized value
   */
  normalizeValue<T = unknown>(
    value: NormalizableValue,
    type: string,
    options?: NormalizationOptions,
    context?: NormalizationContext,
    metadata?: Record<string, unknown>
  ): T;
}

/**
 * Default export function that delegates to normalizeValue
 * @param value - The value to normalize
 * @param type - The target type for normalization
 * @param options - Optional normalization configuration
 * @param context - Optional context information
 * @param metadata - Additional metadata for the normalization process
 * @returns The normalized value
 */
export default function<T = unknown>(
  this: ValueNormalizer,
  value: NormalizableValue,
  type: string,
  options?: NormalizationOptions,
  context?: NormalizationContext,
  metadata?: Record<string, unknown>
): T;