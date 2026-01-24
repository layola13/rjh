/**
 * Euro currency icon component definition (outlined theme)
 * Represents a euro symbol (€) within a circle
 */

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
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** HTML tag name for the root element */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements within the SVG */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface EuroIconConfig {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'euro';
  /** Icon visual theme variant */
  theme: 'outlined';
}

/**
 * Euro currency icon configuration (outlined style)
 * Displays a € symbol centered within a circular border
 */
declare const euroOutlinedIcon: EuroIconConfig;

export default euroOutlinedIcon;