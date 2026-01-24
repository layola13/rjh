/**
 * Options for applying styles
 */
interface ApplyStylesOptions {
  /** Target DOM element to apply styles to. Defaults to document.body */
  element?: HTMLElement;
}

/**
 * Style properties map (CSS property name to value)
 */
type StyleMap = Record<string, string>;

/**
 * Applies CSS styles to a target element and returns the previous style values.
 * 
 * @param styles - Object containing CSS property-value pairs to apply
 * @param options - Configuration options
 * @param options.element - Target element (defaults to document.body)
 * @returns Object containing the previous values of the modified styles
 * 
 * @example
 *