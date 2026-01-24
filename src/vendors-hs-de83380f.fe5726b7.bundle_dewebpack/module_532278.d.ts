/**
 * Pinterest filled icon definition for Ant Design Icons
 * @module PinterestFilledIcon
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** Fill rule for SVG rendering */
  'fill-rule': string;
  /** Viewbox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element (path) definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * SVG icon element definition
 */
interface SvgIcon {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: SvgIcon;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Pinterest filled icon definition
 * Contains the complete SVG structure for the Pinterest logo in filled style
 */
declare const pinterestFilledIcon: IconDefinition;

export default pinterestFilledIcon;