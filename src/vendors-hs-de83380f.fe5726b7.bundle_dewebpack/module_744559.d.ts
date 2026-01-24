/**
 * Icon configuration interface for SVG-based icons
 */
interface IconAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes for SVG rendering
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
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
 * SVG icon structure
 */
interface SvgIcon {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttributes;
  /** Array of child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Icon generator function type
 * @param primaryColor - Primary color for the icon (typically foreground)
 * @param secondaryColor - Secondary color for the icon (typically background/highlight)
 * @returns Complete SVG icon structure
 */
type IconFunction = (primaryColor: string, secondaryColor: string) => SvgIcon;

/**
 * Icon configuration object
 */
interface IconConfig {
  /** Function to generate the icon SVG structure with specified colors */
  icon: IconFunction;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: string;
}

/**
 * Bulb icon configuration (two-tone theme)
 * Represents a light bulb icon with customizable primary and secondary colors
 */
declare const bulbIcon: IconConfig;

export default bulbIcon;