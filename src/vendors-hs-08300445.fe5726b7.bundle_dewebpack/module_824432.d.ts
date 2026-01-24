/**
 * Merges CSS class definitions from a stylesheet object based on specified class names.
 * Combines default styles with named variant styles.
 */

/**
 * Stylesheet object containing default and variant class definitions
 */
export interface StyleSheet {
  /** Default base styles applied to all variants */
  default?: Record<string, React.CSSProperties>;
  /** Named variant styles that extend or override defaults */
  [variantName: string]: Record<string, React.CSSProperties> | undefined;
}

/**
 * Merged result containing combined class definitions
 */
export type MergedClasses = Record<string, React.CSSProperties>;

/**
 * Merges class definitions from a stylesheet object.
 * 
 * @param styleSheet - Object containing default and variant class definitions
 * @param classNames - Array of variant names to merge with defaults
 * @returns Merged object with combined class definitions for each class name
 * 
 * @example
 *