/**
 * Environment icon component definition (filled theme)
 * Represents a location/environment marker icon from Ant Design Icons
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data defining the shape */
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
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Array of child SVG elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** SVG icon definition including structure and paths */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Environment icon configuration (filled theme)
 * Displays a map pin/location marker icon commonly used to represent places or environmental settings
 */
declare const environmentFilledIcon: IconConfig;

export default environmentFilledIcon;