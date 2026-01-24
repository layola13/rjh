/**
 * Node Expand Icon Definition
 * An outlined-themed icon representing a node expansion control
 */

/**
 * SVG attributes interface for defining element properties
 */
interface SVGAttributes {
  /** ViewBox coordinates and dimensions for SVG viewport */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
  /** SVG path data defining the shape geometry */
  d?: string;
}

/**
 * Represents a node in the SVG element tree
 */
interface SVGElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SVGAttributes;
  /** Child elements (optional) */
  children?: SVGElement[];
}

/**
 * Icon configuration object structure
 */
interface IconDefinition {
  /** Root SVG element configuration */
  icon: SVGElement;
  /** Icon identifier name */
  name: string;
  /** Visual style theme variant */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Default export: Node Expand icon definition
 * Used to render an expandable node control icon in UI components
 */
declare const nodeExpandIcon: IconDefinition;

export default nodeExpandIcon;