/**
 * SVG icon component definition for Fund Projection Screen icon
 * @module FundProjectionScreenIcon
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** SVG path data attribute */
  d?: string;
}

/**
 * SVG child element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Nested child elements (optional) */
  children?: SvgNode[];
}

/**
 * Icon configuration object structure
 */
interface IconConfig {
  /** SVG icon definition */
  icon: {
    /** Root SVG tag */
    tag: "svg";
    /** SVG root attributes */
    attrs: SvgAttributes;
    /** Child elements (defs, paths, etc.) */
    children: SvgNode[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: "outlined" | "filled" | "two-tone";
}

/**
 * Fund Projection Screen icon configuration
 * Represents a projection screen with a fund/chart symbol
 */
declare const fundProjectionScreenIcon: IconConfig;

export default fundProjectionScreenIcon;