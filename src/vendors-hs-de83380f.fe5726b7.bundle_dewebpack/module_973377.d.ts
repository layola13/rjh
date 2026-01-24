/**
 * SVG icon configuration for a schedule/calendar icon with two-tone theme
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** Fill color for the SVG path */
  fill?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Nested child elements */
  children?: SvgNode[];
}

/**
 * Icon render result structure
 */
interface IconRenderResult {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child path elements */
  children: SvgNode[];
}

/**
 * Icon configuration object
 */
interface IconDefinition {
  /**
   * Icon render function
   * @param primaryColor - Primary color for the icon (typically the main fill color)
   * @param secondaryColor - Secondary color for the icon (used for accents/highlights)
   * @returns SVG element structure representing the schedule icon
   */
  icon: (primaryColor: string, secondaryColor: string) => IconRenderResult;
  
  /** Icon identifier name */
  name: 'schedule';
  
  /** Visual theme variant */
  theme: 'twotone';
}

declare const scheduleIcon: IconDefinition;

export default scheduleIcon;