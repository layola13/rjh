/**
 * Ant Design Icon: FileProtect (Outlined)
 * Represents a file protection icon with a checkmark/shield symbol
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG path element configuration
 */
interface PathElement {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * SVG root element attributes
 */
interface SvgAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * SVG icon structure
 */
interface IconStructure {
  /** SVG root tag */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) that make up the icon */
  children: PathElement[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** SVG icon structure and configuration */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * File protection icon with outlined theme
 * Shows a document with a protective shield/checkmark symbol
 */
declare const fileProtectOutlined: IconDefinition;

export default fileProtectOutlined;