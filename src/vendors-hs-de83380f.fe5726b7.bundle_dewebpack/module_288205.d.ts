/**
 * SVG icon component definition for Schedule icon (outlined theme)
 * Represents a calendar/schedule symbol with checkmark elements
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinate system */
  viewBox: string;
  /** Whether the element can receive focus */
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
 * SVG child element (path) definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path-specific attributes */
  attrs: PathAttrs;
}

/**
 * Icon structure definition
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Array of child elements (paths) */
  children: SvgChild[];
}

/**
 * Complete icon object structure
 */
interface ScheduleIconDefinition {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'schedule';
  /** Icon visual theme style */
  theme: 'outlined';
}

/**
 * Schedule icon definition (outlined theme)
 * A calendar icon with checkmark indicating completed or scheduled items
 */
declare const scheduleIcon: ScheduleIconDefinition;

export default scheduleIcon;