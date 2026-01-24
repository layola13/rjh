/**
 * Icon definition for the Format Painter icon component
 * @module FormatPainterIconDefinition
 */

/**
 * SVG attributes interface
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element should be focusable */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * Generic SVG element node structure
 */
interface SVGElementNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: Record<string, unknown>;
  /** Child elements */
  children?: SVGElementNode[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag name */
    tag: "svg";
    /** SVG root attributes */
    attrs: SVGAttributes;
    /** Child SVG elements */
    children: SVGElementNode[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: "outlined" | "filled" | "twotone";
}

/**
 * Format Painter icon definition
 * Represents a format painter tool icon commonly used in text editors
 */
declare const formatPainterIcon: IconDefinition;

export default formatPainterIcon;