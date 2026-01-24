/**
 * SVG icon attributes interface
 */
interface IconAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
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
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * SVG icon structure interface
 */
interface IconStructure {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: IconAttributes;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Icon definition interface for Ant Design icon system
 */
interface IconDefinition {
  /** SVG icon structure containing tag, attributes and children */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant (outlined, filled, two-tone) */
  theme: string;
}

/**
 * Border top icon definition (outlined theme)
 * Represents a border-top styling icon with a solid top line and grid pattern below
 */
declare const BorderTopOutlined: IconDefinition;

export default BorderTopOutlined;