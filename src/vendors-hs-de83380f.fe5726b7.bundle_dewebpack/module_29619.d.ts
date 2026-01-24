/**
 * Ant Design Icon: Notification (TwoTone Theme)
 * 
 * A notification icon component definition for Ant Design icon library.
 * This icon represents notifications or announcements in the UI.
 */

/**
 * Icon color configuration
 */
interface IconColors {
  /** Primary color for the main icon shape */
  primaryColor: string;
  /** Secondary color for the icon fill/accent */
  secondaryColor: string;
}

/**
 * SVG path element attributes
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG element attributes
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChildElement {
  /** HTML tag name */
  tag: 'path';
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * SVG icon definition structure
 */
interface SvgIconDefinition {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child path elements */
  children: SvgChildElement[];
}

/**
 * Icon component definition
 */
interface IconDefinition {
  /**
   * Generates the SVG icon structure
   * 
   * @param primaryColor - The primary color for the main icon outline
   * @param secondaryColor - The secondary color for icon fills and accents
   * @returns SVG icon definition object
   */
  icon(primaryColor: string, secondaryColor: string): SvgIconDefinition;
  
  /** Icon identifier name */
  name: 'notification';
  
  /** Icon theme variant */
  theme: 'twotone';
}

/**
 * Notification TwoTone Icon Definition
 * 
 * Exports a notification icon with customizable primary and secondary colors.
 * The icon depicts a megaphone/speaker symbol commonly used for announcements.
 */
declare const NotificationTwoTone: IconDefinition;

export default NotificationTwoTone;