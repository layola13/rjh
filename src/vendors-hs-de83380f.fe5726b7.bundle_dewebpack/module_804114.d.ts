/**
 * SVG icon attributes interface
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element interface
 */
interface SVGChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration interface
 */
interface IconConfig {
  /** HTML/SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements of the SVG */
  children: SVGChild[];
}

/**
 * Unordered list icon definition
 */
interface UnorderedListIcon {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme style */
  theme: string;
}

/**
 * Default export: Unordered list icon configuration
 * Represents a bullet list icon with three horizontal lines and three dots
 */
declare const unorderedListIcon: UnorderedListIcon;

export default unorderedListIcon;