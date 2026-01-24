/**
 * Ant Design Icon Definition
 * Icon name: layout
 * Theme: outlined
 */

/**
 * SVG attributes interface for icon elements
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** SVG path data attribute */
  d?: string;
}

/**
 * Icon child element structure
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SVGAttributes;
  /** Nested child elements (optional) */
  children?: IconChild[];
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SVGAttributes;
  /** Child elements array */
  children: IconChild[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Layout icon definition (outlined theme)
 * Represents a layout/grid structure commonly used in UI design systems
 */
declare const layoutOutlinedIcon: IconDefinition;

export default layoutOutlinedIcon;