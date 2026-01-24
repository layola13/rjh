/**
 * Icon definition for the "global" icon in outlined theme.
 * Represents a globe/world symbol commonly used for internationalization or global settings.
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Prevents the SVG from receiving focus */
  focusable?: string;
  /** SVG path data for drawing the icon */
  d?: string;
}

/**
 * Represents a child element within the SVG structure
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
}

/**
 * Icon configuration structure
 */
interface Icon {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: IconChild[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** Icon visual structure */
  icon: Icon;
  /** Semantic name of the icon */
  name: string;
  /** Visual style theme */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Global icon in outlined style - represents internationalization, world, or global settings
 * @public
 */
declare const globalIcon: IconDefinition;

export default globalIcon;