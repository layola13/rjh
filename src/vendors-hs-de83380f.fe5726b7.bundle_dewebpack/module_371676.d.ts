/**
 * QQ Circle Icon Definition
 * Ant Design filled theme icon component
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element child node
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * SVG root element attributes
 */
interface SvgAttributes {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: IconChild[];
}

/**
 * Complete icon configuration object
 */
interface QqCircleIconConfig {
  /** Icon SVG structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * QQ Circle filled icon configuration
 * Represents a QQ logo within a circular shape
 */
declare const qqCircleIcon: QqCircleIconConfig;

export default qqCircleIcon;