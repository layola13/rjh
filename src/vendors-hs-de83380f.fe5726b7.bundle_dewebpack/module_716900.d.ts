/**
 * Ant Design Icon Definition - CI (Outlined)
 * Represents a circular icon with "C" letter, commonly used for CI/CD or copyright symbols
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Array of child SVG elements */
  children: SvgChildElement[];
}

/**
 * Complete icon export structure
 */
interface IconExport {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'ci';
  /** Icon theme variant */
  theme: 'outlined';
}

/**
 * CI Icon (Outlined theme)
 * A circular badge icon with the letter "C" commonly used for:
 * - Continuous Integration indicators
 * - Copyright symbols
 * - Circle indicators in UI
 */
declare const ciOutlined: IconExport;

export default ciOutlined;