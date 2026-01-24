/**
 * Ant Design Icon: Rocket (Outlined)
 * 
 * A rocket icon component definition used in Ant Design's icon system.
 * This represents an outlined style rocket icon, typically used to indicate
 * launch, deployment, speed, or progress actions in UI.
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** ViewBox coordinates and dimensions for the SVG canvas */
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
  attrs: SvgPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface RocketIconConfig {
  /** SVG icon definition including structure and paths */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme style */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Rocket icon configuration (Outlined theme)
 * 
 * Defines a rocket icon in outlined style with complete SVG path data.
 * Used in Ant Design's icon system for consistent icon rendering.
 */
declare const RocketOutlinedIcon: RocketIconConfig;

export default RocketOutlinedIcon;