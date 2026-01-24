/**
 * Icon definition for the "file-gif" outlined icon.
 * Represents a GIF file type icon with document outline and "GIF" text.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** SVG path data for drawing shapes */
  d?: string;
}

/**
 * SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
  /** Child nodes (optional) */
  children?: SvgNode[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: 'svg';
    /** SVG root attributes */
    attrs: SvgAttrs;
    /** Child SVG elements */
    children: SvgNode[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * File GIF icon definition
 * An outlined icon representing a GIF file document
 */
declare const fileGifIcon: IconDefinition;

export default fileGifIcon;