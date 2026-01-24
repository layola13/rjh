/**
 * Left arrow icon component definition
 * Ant Design icon for left-pointing arrow in outlined theme
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the arrow shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** HTML tag name for root element */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements array */
  children: SvgChild[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** Icon SVG structure and configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: string;
}

/**
 * Left arrow icon definition
 * Provides an outlined left-pointing arrow icon for navigation
 */
declare const leftOutlinedIcon: IconDefinition;

export default leftOutlinedIcon;