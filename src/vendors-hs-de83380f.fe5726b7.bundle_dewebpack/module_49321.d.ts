/**
 * Ant Design Icon Definition - Message (Two-tone theme)
 * 
 * This module exports an icon configuration object for the "message" icon
 * with a two-tone color scheme.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** Fill color for the path */
  fill?: string;
  /** SVG path data */
  d?: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
}

/**
 * Icon definition structure returned by the icon function
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /**
   * Icon rendering function
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for two-tone effect
   * @returns SVG icon definition object
   */
  icon(primaryColor: string, secondaryColor: string): IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Message icon configuration with two-tone theme
 * 
 * Represents a chat/message bubble icon with multiple circular dots inside,
 * commonly used for messaging or communication features.
 */
declare const iconConfig: IconConfig;

export default iconConfig;