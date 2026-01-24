/**
 * Play Square icon component definition (outlined theme)
 * Represents a play button within a square frame
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG path element definition
 */
interface PathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path attributes */
  attrs: PathAttrs;
}

/**
 * SVG root element attributes
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * SVG icon structure definition
 */
interface SvgIcon {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child path elements */
  children: PathElement[];
}

/**
 * Icon definition object
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: SvgIcon;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Play Square icon - outlined variant
 * Contains a play triangle symbol centered within a square border
 */
declare const playSquareOutlined: IconDefinition;

export default playSquareOutlined;