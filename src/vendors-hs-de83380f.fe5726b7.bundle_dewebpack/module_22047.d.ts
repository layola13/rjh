/**
 * Tags filled icon configuration for Ant Design Icons
 * @module TagsFilledIcon
 */

/**
 * SVG path attributes interface
 */
interface SVGPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SVGAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SVGChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: SVGPathAttrs;
}

/**
 * Icon structure definition
 */
interface IconDefinition {
  /** Root SVG tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SVGAttrs;
  /** Child elements array */
  children: SVGChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** Icon SVG structure */
  icon: IconDefinition;
  /** Icon semantic name */
  name: 'tags';
  /** Icon theme variant */
  theme: 'filled';
}

/**
 * Tags filled icon - represents labeling and categorization functionality
 * Displays two overlapping tag shapes with a checkmark
 */
declare const TagsFilledIcon: IconConfig;

export default TagsFilledIcon;