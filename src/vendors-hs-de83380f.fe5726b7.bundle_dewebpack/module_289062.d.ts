/**
 * Trophy icon component definition (outlined theme)
 * Represents a trophy/award symbol in SVG format
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the trophy shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon component structure
 */
interface TrophyIcon {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'trophy';
  /** Icon visual theme variant */
  theme: 'outlined';
}

/**
 * Trophy icon component (outlined theme)
 * Used to display achievement, awards, or success indicators
 */
declare const trophyOutlined: TrophyIcon;

export default trophyOutlined;