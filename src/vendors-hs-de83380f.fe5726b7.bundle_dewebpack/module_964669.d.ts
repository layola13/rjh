/**
 * SVG icon definition for a file-text outlined icon
 * Module: module_964669
 * Original ID: 964669
 */

/**
 * Attributes for SVG elements
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** Path data for SVG path elements */
  d?: string;
}

/**
 * Represents a child element within an SVG structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
  /** Nested child elements (optional) */
  children?: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** Root SVG icon configuration */
  icon: {
    /** Root element tag name */
    tag: string;
    /** Root element attributes */
    attrs: SvgAttrs;
    /** Child elements of the icon */
    children: SvgChild[];
  };
  /** Human-readable icon name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * File text icon definition with outlined theme
 * Represents a document/file icon commonly used in UI
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;