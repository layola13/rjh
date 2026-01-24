/**
 * Forward icon component definition (outlined theme)
 * Represents a double forward arrow icon pointing to the right
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
  /** SVG viewBox coordinate system */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** SVG root element attributes */
    attrs: SvgAttrs;
    /** Child elements (paths, shapes, etc.) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: string;
}

/**
 * Forward icon definition
 * A double chevron/arrow pointing right, commonly used for skip forward or fast forward actions
 */
declare const forwardIcon: IconDefinition;

export default forwardIcon;