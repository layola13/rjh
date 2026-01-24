/**
 * Ant Design Icon: Vertical Align Bottom (Outlined)
 * 
 * This icon represents the vertical align bottom action, typically used in
 * text editors or layout tools to align content to the bottom.
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path definition string */
  d: string;
}

/**
 * SVG path element structure
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
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: PathElement[];
}

/**
 * Ant Design icon definition
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Vertical Align Bottom icon definition
 * 
 * Used to represent bottom alignment functionality in UI components.
 * The icon depicts an arrow pointing down towards a horizontal line.
 */
declare const VerticalAlignBottomOutlined: IconDefinition;

export default VerticalAlignBottomOutlined;