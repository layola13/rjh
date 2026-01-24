/**
 * Dollar icon component for Ant Design icon library (two-tone theme)
 * Represents a dollar sign within a circle, commonly used for currency or financial features
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinate system */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChildElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon rendering result structure
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Array of child elements (paths) */
  children: SvgChildElement[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Icon render function
   * @param primaryColor - Primary color for the icon (outer paths)
   * @param secondaryColor - Secondary color for the icon (inner paths/details)
   * @returns Complete icon definition with SVG structure
   */
  icon(primaryColor: string, secondaryColor: string): IconDefinition;
  
  /** Icon identifier name */
  name: 'dollar';
  
  /** Icon theme variant */
  theme: 'twotone';
}

/**
 * Dollar icon module export
 * Two-tone dollar sign icon with circular border
 */
declare const dollarIcon: IconConfig;

export default dollarIcon;