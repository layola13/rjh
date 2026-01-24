/**
 * SVG icon configuration for the "snippets" icon in outlined theme.
 * Represents a document/code snippet icon commonly used in UI components.
 */

/**
 * Attributes for SVG elements
 */
interface SvgAttrs {
  /** SVG viewBox coordinates defining the canvas area */
  viewBox?: string;
  /** Whether the SVG element is focusable for accessibility */
  focusable?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
  /** Child elements (only present on parent nodes) */
  children?: SvgNode[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /** SVG icon structure */
  icon: SvgNode;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: string;
}

/**
 * Default export containing the snippets icon configuration.
 * This icon typically represents code snippets, documents, or file copying functionality.
 */
declare const snippetsIcon: IconConfig;

export default snippetsIcon;