/**
 * Codepen Circle Icon - Filled Theme
 * 
 * This module exports an Ant Design icon configuration object
 * representing a filled Codepen circle icon.
 */

/**
 * SVG element attributes configuration
 */
interface SvgAttributes {
  /** SVG viewBox coordinates defining the visible area */
  viewBox: string;
  /** Controls whether the element can receive focus */
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
 * SVG child element configuration (path)
 */
interface SvgPathChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfiguration {
  /** SVG root element configuration */
  icon: {
    /** HTML/SVG tag name */
    tag: 'svg';
    /** SVG element attributes */
    attrs: SvgAttributes;
    /** Array of child elements (paths) */
    children: SvgPathChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Codepen Circle Icon (Filled)
 * 
 * A filled circle icon representing the Codepen logo.
 * Compatible with Ant Design icon system.
 * 
 * @example
 *