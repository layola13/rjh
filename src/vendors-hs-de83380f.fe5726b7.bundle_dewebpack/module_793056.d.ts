/**
 * Ant Design Icon: Vertical Align Middle (Outlined)
 * 
 * This module exports the icon definition for a vertical align middle icon,
 * typically used in rich text editors or alignment controls.
 */

/**
 * SVG attributes interface for viewBox and focusable properties
 */
interface SvgAttributes {
  /** Defines the position and dimension of the SVG viewport */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Vertical align middle icon definition
 * 
 * Represents an icon showing vertical alignment to the middle,
 * with up and down arrows and a horizontal line in the center.
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;