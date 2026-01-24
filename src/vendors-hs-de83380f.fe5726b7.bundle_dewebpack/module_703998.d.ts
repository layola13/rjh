/**
 * Format Painter Icon Configuration
 * Ant Design filled icon representing a format painter tool
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape geometry */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Generic SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: Record<string, unknown>;
  /** Child nodes (optional) */
  children?: SvgNode[];
}

/**
 * Root SVG icon configuration
 */
interface SvgIconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child SVG elements */
  children: SvgNode[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: SvgIconNode;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Format Painter filled icon definition
 * Used for applying formatting from one element to another
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;