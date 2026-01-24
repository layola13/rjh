/**
 * Java programming language icon configuration
 * SVG-based icon definition for Ant Design icon system
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** Fill rule for SVG rendering */
  'fill-rule': string;
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path) configuration
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure configuration
 */
interface IconSvg {
  /** Root SVG tag name */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) that compose the icon */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Java programming language icon definition
 * Represents the official Java logo in outlined style
 */
declare const javaIcon: IconDefinition;

export default javaIcon;