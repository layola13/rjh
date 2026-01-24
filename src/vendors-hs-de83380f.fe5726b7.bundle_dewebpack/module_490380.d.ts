/**
 * Calendar icon component definition (filled theme)
 * Represents a calendar UI icon with SVG path data
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttributes {
  /** SVG viewBox coordinates defining the visible area */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** HTML/SVG tag name for the root element */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Array of child SVG elements */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: string;
}

/**
 * Calendar icon definition with filled theme
 * Provides SVG path data for rendering a calendar icon
 */
declare const calendarFilledIcon: IconDefinition;

export default calendarFilledIcon;