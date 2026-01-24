/**
 * Yuque (语雀) icon definition for Ant Design Icons
 * A filled theme SVG icon representing the Yuque logo/brand
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG path element structure
 */
interface PathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * SVG root element attributes
 */
interface SvgAttributes {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * SVG root element structure
 */
interface SvgIcon {
  /** HTML tag name */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: PathElement[];
}

/**
 * Icon definition structure used by Ant Design Icons
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: SvgIcon;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Yuque filled icon definition
 * Represents the Yuque (Alibaba's knowledge management platform) brand icon
 */
declare const YuqueFilledIcon: IconDefinition;

export default YuqueFilledIcon;