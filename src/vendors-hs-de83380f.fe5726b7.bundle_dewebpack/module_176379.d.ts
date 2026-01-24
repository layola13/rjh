/**
 * Ant Design Icon: Insert Row Right (Outlined)
 * 
 * This module exports an icon definition for the "insert-row-right" icon
 * in the outlined theme, commonly used in table manipulation operations.
 */

/**
 * Represents the attributes for an SVG element or its children
 */
interface SvgAttributes {
  /** The viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** The path data for SVG path elements */
  d?: string;
}

/**
 * Represents a node in the SVG tree structure
 */
interface SvgNode {
  /** The SVG tag name (e.g., 'svg', 'path', 'defs') */
  tag: string;
  /** Attributes to be applied to the SVG element */
  attrs: SvgAttributes;
  /** Optional child nodes */
  children?: SvgNode[];
}

/**
 * Icon definition structure following Ant Design icon specification
 */
interface IconDefinition {
  /** The SVG icon structure */
  icon: SvgNode;
  /** The identifier name of the icon */
  name: string;
  /** The visual theme variant of the icon */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Insert Row Right icon definition
 * 
 * Represents an icon for inserting a row to the right in table operations.
 * Uses the outlined theme with a 896x896 viewBox coordinate system.
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;