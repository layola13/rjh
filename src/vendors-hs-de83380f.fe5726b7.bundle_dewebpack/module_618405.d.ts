/**
 * Copy icon component definition (outlined theme)
 * Represents a document copy/duplicate action icon
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
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG icon structure
 */
interface IconSvg {
  /** HTML tag name */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: PathElement[];
}

/**
 * Icon definition interface
 * Describes the complete structure of an Ant Design icon
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Copy icon definition (outlined variant)
 * Used for copy/duplicate document actions in UI
 */
declare const copyOutlinedIcon: IconDefinition;

export default copyOutlinedIcon;