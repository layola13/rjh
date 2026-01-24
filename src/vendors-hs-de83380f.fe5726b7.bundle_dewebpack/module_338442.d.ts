/**
 * Icon configuration for a "read" (book) icon in filled theme.
 * This represents an SVG icon definition with path data for rendering.
 */

/**
 * Attributes for SVG elements (path, svg, etc.)
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Whether the element is focusable */
  focusable?: string;
  /** SVG path data */
  d?: string;
  [key: string]: string | undefined;
}

/**
 * Represents an SVG element node (svg, path, etc.)
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Child elements (optional) */
  children?: SvgNode[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: SvgNode;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Read/Book icon in filled theme style.
 * Displays an open book with text lines on both pages.
 */
declare const readFilledIcon: IconDefinition;

export default readFilledIcon;