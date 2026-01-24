/**
 * Switcher icon component definition (filled theme)
 * Provides SVG icon data for UI rendering libraries
 */

/**
 * SVG element attributes
 */
interface SVGAttributes {
  /** SVG viewBox coordinate system */
  viewBox: string;
  /** Accessibility: prevents focus on decorative SVG */
  focusable: string;
}

/**
 * SVG path element attributes
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path, circle, etc.)
 */
interface SVGChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: string;
  /** SVG root attributes */
  attrs: SVGAttributes;
  /** Child elements (paths, shapes) */
  children: SVGChildElement[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** Icon visual definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Switcher icon configuration
 * Represents a copy/duplicate document icon in filled style
 */
declare const switcherIcon: IconConfig;

export default switcherIcon;