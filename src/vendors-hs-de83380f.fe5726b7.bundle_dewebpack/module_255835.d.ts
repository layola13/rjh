/**
 * Check Circle Icon (Outlined Theme)
 * 
 * An SVG icon representing a check mark inside a circle.
 * Commonly used to indicate success, completion, or confirmation states.
 * 
 * @module CheckCircleOutlined
 */

/**
 * Represents SVG element attributes
 */
interface SvgAttributes {
  /** The viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * Represents attributes for SVG path elements
 */
interface PathAttributes {
  /** The SVG path data string */
  d: string;
}

/**
 * Represents a child element within the SVG
 */
interface SvgChild {
  /** The HTML/SVG tag name */
  tag: string;
  /** Attributes for the path element */
  attrs: PathAttributes;
}

/**
 * Represents the complete icon structure
 */
interface IconDefinition {
  /** The SVG icon configuration */
  icon: {
    /** The root SVG tag name */
    tag: string;
    /** Attributes for the root SVG element */
    attrs: SvgAttributes;
    /** Array of child elements (paths) that compose the icon */
    children: SvgChild[];
  };
  /** The semantic name of the icon */
  name: string;
  /** The visual theme variant of the icon */
  theme: string;
}

/**
 * Default export containing the check-circle icon definition
 * 
 * The icon consists of two paths:
 * 1. The checkmark symbol
 * 2. The outer circle outline
 */
declare const checkCircleOutlined: IconDefinition;

export default checkCircleOutlined;