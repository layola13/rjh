/**
 * Close Circle Icon Definition
 * An outlined close/cancel icon in a circular shape
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes for the root container
 */
interface SvgAttrs {
  /** Fill rule for SVG rendering */
  'fill-rule': string;
  /** ViewBox coordinates defining the canvas area */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Represents a child SVG element (e.g., path)
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon configuration object structure
 */
interface IconDefinition {
  /** SVG icon element definition */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** SVG root attributes */
    attrs: SvgAttrs;
    /** Child elements (paths, shapes, etc.) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Close Circle Icon - Outlined theme
 * A circular icon with an X/close symbol inside
 */
declare const closeCircleOutlined: IconDefinition;

export default closeCircleOutlined;