/**
 * Rotate Right Icon Definition
 * An outlined icon representing a rotate-right action with a refresh arrow and rectangle
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** SVG path data */
  d?: string;
}

/**
 * SVG element node structure
 */
interface SvgElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
  /** Nested child elements */
  children?: SvgElement[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: SvgElement;
  /** Icon identifier name */
  name: string;
  /** Icon design theme variant */
  theme: string;
}

/**
 * Rotate Right icon definition
 * 
 * Displays a refresh/rotate icon with a curved arrow and rectangular frame,
 * commonly used for reload, refresh, or rotate-right actions in UI.
 * 
 * @example
 *