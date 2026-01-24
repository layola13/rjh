/**
 * Fast Forward Icon Component Definition
 * Ant Design Icons - Filled theme
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinate system */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** HTML tag name for root element */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements array */
  children: SvgChild[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme */
  theme: string;
}

/**
 * Fast Forward icon definition (Filled theme)
 * Contains two triangle shapes pointing right and a vertical bar
 */
declare const FastForwardFilledIcon: IconDefinition;

export default FastForwardFilledIcon;