/**
 * Caret Down Icon Component Definition
 * An outlined downward-pointing caret icon
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG root element attributes interface
 */
interface SvgRootAttrs {
  /** The viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag name */
    tag: string;
    /** Root SVG element attributes */
    attrs: SvgRootAttrs;
    /** Child elements (paths, shapes, etc.) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: string;
}

/**
 * Caret Down icon definition
 * A downward-pointing triangular caret commonly used for dropdown indicators
 */
declare const caretDownIcon: IconDefinition;

export default caretDownIcon;