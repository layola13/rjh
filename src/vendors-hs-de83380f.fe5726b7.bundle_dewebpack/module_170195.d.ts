/**
 * Borderless table icon definition for Ant Design Icons
 * @module BorderlessTableIcon
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  viewBox: string;
  focusable: string;
}

/**
 * SVG element attributes (generic)
 */
interface ElementAttributes {
  d?: string;
  [key: string]: unknown;
}

/**
 * SVG child element structure
 */
interface SvgElement {
  tag: string;
  attrs: ElementAttributes;
  children?: SvgElement[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /**
   * Icon SVG structure
   */
  icon: {
    /**
     * SVG root tag name
     */
    tag: string;
    /**
     * SVG root attributes (viewBox, focusable, etc.)
     */
    attrs: SvgAttributes;
    /**
     * Child SVG elements (defs, paths, etc.)
     */
    children: SvgElement[];
  };
  /**
   * Icon identifier name
   */
  name: string;
  /**
   * Icon theme variant
   */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Borderless table icon definition
 * 
 * Represents a table without borders in the outlined theme style.
 * Contains SVG path data for rendering the icon.
 */
declare const BorderlessTableIcon: IconDefinition;

export default BorderlessTableIcon;