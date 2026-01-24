/**
 * Right arrow icon configuration for Ant Design Icons
 * @module RightOutlined
 */

/**
 * SVG attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure
 */
interface IconSvg {
  /** HTML tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Array of child elements */
  children: SvgChild[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Right outlined icon definition
 * Represents a right-pointing arrow icon in outlined style
 */
declare const rightOutlinedIcon: IconDefinition;

export default rightOutlinedIcon;