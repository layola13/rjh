/**
 * Heart icon component definition (filled theme)
 * Ant Design Icons - Heart Filled
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Prevents the SVG from receiving focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Heart icon (filled variant)
 * Represents a filled heart shape commonly used for likes, favorites, or love actions
 */
declare const HeartFilledIcon: IconDefinition;

export default HeartFilledIcon;