/**
 * Woman icon component definition (Ant Design Icons)
 * @module WomanOutlined
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element interface
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure interface
 */
interface IconStructure {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Icon definition interface for Ant Design icon system
 */
export interface IconDefinition {
  /** SVG icon structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Woman outlined icon definition
 * Represents a female gender symbol icon in outlined style
 */
declare const WomanOutlinedIcon: IconDefinition;

export default WomanOutlinedIcon;