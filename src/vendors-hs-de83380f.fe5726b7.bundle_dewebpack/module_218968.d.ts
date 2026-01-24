/**
 * Retweet icon component definition
 * Provides an outlined retweet/swap icon in SVG format
 */

/**
 * SVG attributes interface for the root element
 */
interface SvgAttributes {
  /** The viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Attributes for SVG path elements
 */
interface PathAttributes {
  /** The path data string defining the shape */
  d: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** The SVG tag name */
  tag: string;
  /** Attributes for the SVG element */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** The root SVG tag name */
    tag: string;
    /** Attributes for the root SVG element */
    attrs: SvgAttributes;
    /** Child elements (paths, shapes, etc.) */
    children: SvgChild[];
  };
  /** The icon name identifier */
  name: string;
  /** The icon theme/style variant */
  theme: string;
}

/**
 * Retweet icon component
 * A bi-directional arrow icon commonly used for retweet, swap, or exchange actions
 */
declare const RetweetIcon: IconDefinition;

export default RetweetIcon;