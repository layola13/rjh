/**
 * Dropbox Circle Icon Definition
 * @description Ant Design icon component definition for a filled Dropbox circle icon
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
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** HTML/SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Icon definition structure for Ant Design icons
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Dropbox Circle filled icon definition
 * @constant
 */
declare const dropboxCircleFilledIcon: IconDefinition;

export default dropboxCircleFilledIcon;