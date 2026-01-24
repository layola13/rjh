/**
 * SVG icon definition for a "down" arrow icon
 * Theme: outlined
 */

/**
 * Attributes for SVG elements
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Whether the SVG is focusable */
  focusable?: string;
  /** Path data for SVG path elements */
  d?: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
  /** Nested child elements */
  children?: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** SVG root attributes */
    attrs: SvgAttrs;
    /** Child elements of the SVG */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Down arrow icon definition with outlined theme
 * Exported as default from the module
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;