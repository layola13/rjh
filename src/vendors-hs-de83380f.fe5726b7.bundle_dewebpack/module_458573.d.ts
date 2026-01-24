/**
 * Property Safety Icon Component
 * A filled theme icon representing property safety with a shield and checkmark design
 */

/**
 * SVG icon attributes configuration
 */
interface IconAttrs {
  /** SVG viewBox coordinates defining the visible area */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes for SVG shapes
 */
interface PathAttrs {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** Root SVG element tag */
  tag: string;
  /** SVG element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Icon definition object
 */
interface PropertySafetyIcon {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Unique identifier name for the icon */
  name: string;
  /** Visual theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Default export: Property Safety icon definition
 * Used for displaying property/security related UI elements
 */
declare const propertySafetyIcon: PropertySafetyIcon;

export default propertySafetyIcon;