/**
 * Copy icon component definition (filled theme)
 * Ant Design Icons - Copy Filled
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, groups, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon export structure
 */
interface CopyFilledIcon {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'copy';
  /** Icon theme variant */
  theme: 'filled';
}

/**
 * Copy icon (filled variant)
 * Represents a copy/duplicate action icon with two overlapping rectangles
 */
declare const CopyFilled: CopyFilledIcon;

export default CopyFilled;