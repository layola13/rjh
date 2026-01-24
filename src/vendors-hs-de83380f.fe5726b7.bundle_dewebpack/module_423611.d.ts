/**
 * Solution icon component configuration (outlined theme)
 * Represents a document with a user avatar, typically used for solution/profile features
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG path element structure
 */
interface PathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path attributes */
  attrs: PathAttrs;
}

/**
 * SVG root element attributes
 */
interface SvgAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * SVG icon structure
 */
interface IconSvg {
  /** HTML tag name */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child path elements */
  children: PathElement[];
}

/**
 * Icon configuration object
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Solution icon definition with outlined theme
 * Icon displays a document with horizontal lines and a user profile circle
 */
declare const solutionIcon: IconDefinition;

export default solutionIcon;