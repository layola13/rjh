/**
 * SVG icon definition for a frown/sad face icon
 * Used in icon libraries to render outlined frown emoticon
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
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
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon structure definition
 */
interface IconDefinition {
  /** SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** SVG icon definition containing structure and paths */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Visual style theme (outlined, filled, two-tone) */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Frown/sad face icon in outlined style
 * Displays a circular face with sad eyes and a downturned mouth
 */
declare const frownOutlinedIcon: IconConfig;

export default frownOutlinedIcon;