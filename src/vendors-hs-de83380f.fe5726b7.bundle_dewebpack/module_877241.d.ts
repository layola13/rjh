/**
 * Ant Design Icon Definition
 * Icon name: expand-alt
 * Theme: outlined
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** HTML tag name for the root element */
    tag: string;
    /** SVG element attributes */
    attrs: SvgAttrs;
    /** Array of child elements (paths, shapes, etc.) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme style */
  theme: string;
}

/**
 * Expand Alt Icon Definition
 * An outlined icon representing expand/fullscreen functionality
 * Displays diagonal arrows pointing outward from corners
 */
declare const expandAltIcon: IconDefinition;

export default expandAltIcon;