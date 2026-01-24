/**
 * Converter configuration options
 */
export interface ConverterOptions {
  [key: string]: unknown;
}

/**
 * Object attributes
 */
export interface Attributes {
  [key: string]: unknown;
}

/**
 * Class or module containing the withConverter method
 */
export interface WithConverterModule {
  /**
   * Converter configuration
   */
  readonly converter: ConverterOptions;

  /**
   * Object attributes
   */
  readonly attributes: Attributes;

  /**
   * Merges converter options with provided options and applies attributes
   * @param options - Additional converter options to merge
   * @returns Merged result with converter options and attributes applied
   */
  withConverter(options: ConverterOptions): unknown;
}

/**
 * Module: module_withConverter
 * Original ID: withConverter
 * 
 * Provides functionality to merge converter options with attributes
 */
declare const moduleWithConverter: WithConverterModule;

export default moduleWithConverter;