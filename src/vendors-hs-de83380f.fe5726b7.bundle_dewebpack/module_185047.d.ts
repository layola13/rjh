/**
 * Login icon component definition (Ant Design outlined theme)
 * Represents a login/sign-in action with an arrow entering a circle
 */

/**
 * SVG attributes interface for element properties
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** Path data for SVG drawing commands */
  d?: string;
}

/**
 * SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Child elements (optional) */
  children?: SvgNode[];
}

/**
 * Icon definition structure following Ant Design icon specification
 */
interface IconDefinition {
  /** Root SVG icon configuration */
  icon: {
    /** Root tag type */
    tag: "svg";
    /** SVG root attributes */
    attrs: {
      /** Coordinate system for the SVG canvas */
      viewBox: string;
      /** Accessibility focus control */
      focusable: string;
    };
    /** Child SVG elements */
    children: SvgNode[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: "outlined" | "filled" | "twotone";
}

/**
 * Login icon definition with outlined theme
 * Contains SVG path data for rendering a login/sign-in icon
 */
declare const loginIcon: IconDefinition;

export default loginIcon;