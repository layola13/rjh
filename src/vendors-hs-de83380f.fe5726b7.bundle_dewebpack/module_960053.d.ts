/**
 * SVG icon definition for a message icon in outlined theme.
 * This module exports an Ant Design icon configuration object.
 */

/**
 * Represents the attributes of an SVG element or path element.
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
 * Represents a child element within an SVG icon structure.
 */
interface IconChild {
  /** The HTML/SVG tag name */
  tag: string;
  /** Attributes to apply to the element */
  attrs: SvgAttributes;
  /** Optional nested children elements */
  children?: IconChild[];
}

/**
 * Represents the root SVG icon structure.
 */
interface IconSvg {
  /** The HTML/SVG tag name */
  tag: string;
  /** Attributes to apply to the SVG element */
  attrs: SvgAttributes;
  /** Child elements within the SVG */
  children: IconChild[];
}

/**
 * Complete icon definition object following Ant Design icon structure.
 */
interface IconDefinition {
  /** The SVG icon configuration */
  icon: IconSvg;
  /** The unique name identifier for the icon */
  name: string;
  /** The visual style theme of the icon */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Default export containing the message icon definition.
 * 
 * The icon displays three horizontal dots representing a message or chat indicator.
 * It follows the Ant Design outlined icon theme specification.
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;