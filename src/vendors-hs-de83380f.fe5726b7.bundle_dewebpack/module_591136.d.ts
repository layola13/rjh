/**
 * Sliders icon component configuration (Outlined theme)
 * Represents a sliders/adjustment control icon with three vertical sliders
 */
interface IconComponentConfig {
  /** Icon definition containing SVG structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * SVG icon definition structure
 */
interface IconDefinition {
  /** SVG root tag name */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child SVG elements (paths, groups, etc.) */
  children: SvgChildElement[];
}

/**
 * SVG root element attributes
 */
interface SvgAttributes {
  /** SVG viewport coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive keyboard focus */
  focusable: 'false' | 'true';
}

/**
 * SVG child element (path, circle, rect, etc.)
 */
interface SvgChildElement {
  /** SVG element tag name */
  tag: string;
  /** Element attributes */
  attrs: Record<string, string>;
}

/**
 * Sliders icon configuration (Outlined theme)
 * Contains three vertical slider controls for adjustment interfaces
 */
declare const slidersOutlinedIcon: IconComponentConfig;

export default slidersOutlinedIcon;