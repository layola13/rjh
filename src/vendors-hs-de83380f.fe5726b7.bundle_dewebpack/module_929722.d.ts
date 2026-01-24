/**
 * Caret Up icon component configuration
 * Represents an upward-pointing caret/triangle icon
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG root attributes interface
 */
interface SvgRootAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
}

/**
 * SVG child element configuration
 */
interface SvgChildElement {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfiguration {
  /** SVG icon definition */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** Root SVG attributes */
    attrs: SvgRootAttributes;
    /** Child elements (paths, shapes, etc.) */
    children: SvgChildElement[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Caret Up filled icon configuration
 * A filled upward-pointing caret used for indicating collapsed/expandable content
 */
declare const caretUpIcon: IconConfiguration;

export default caretUpIcon;