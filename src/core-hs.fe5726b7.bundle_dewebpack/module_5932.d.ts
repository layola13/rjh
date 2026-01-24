/**
 * Assembly filter configuration module.
 * Provides filtering options for content processing pipelines.
 */

/**
 * Configuration object for assembly-level filtering.
 * Used to control which content types are processed or excluded during assembly operations.
 */
export interface PAssemblyFilter {
  /**
   * Array of content type filters to apply during assembly.
   * Empty array means no content type filtering is applied.
   * 
   * @example
   *