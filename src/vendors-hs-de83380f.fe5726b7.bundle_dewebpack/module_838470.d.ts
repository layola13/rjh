/**
 * Ant Design Icon Definition
 * Icon: Form (Outlined theme)
 * Represents a form or edit action icon
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG path element definition
 */
interface PathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * SVG root element attributes
 */
interface SvgAttrs {
  /** SVG viewport coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG icon structure definition
 */
interface IconSvg {
  /** HTML tag name for the root element */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child path elements that compose the icon */
  children: PathElement[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Semantic name of the icon */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Form icon definition (outlined variant)
 * Displays a document with edit pen overlay, commonly used for forms and editing actions
 */
declare const formOutlinedIcon: IconDefinition;

export default formOutlinedIcon;