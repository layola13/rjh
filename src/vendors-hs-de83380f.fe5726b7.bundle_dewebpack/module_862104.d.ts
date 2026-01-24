/**
 * Ant Design Icon: Compress (Outlined)
 * 
 * SVG icon definition for a compress/minimize icon with four corner brackets
 * pointing inward, commonly used to represent fullscreen exit or content compression.
 * 
 * @module CompressOutlined
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Whether the SVG element is focusable */
  focusable?: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d?: string;
}

/**
 * Generic SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes | PathAttributes | Record<string, never>;
  /** Child elements (optional) */
  children?: SvgNode[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** Root SVG element configuration */
  icon: {
    /** SVG tag name */
    tag: 'svg';
    /** SVG root attributes */
    attrs: SvgAttributes;
    /** Child elements including defs and paths */
    children: SvgNode[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Compress icon definition (Outlined theme)
 * 
 * Displays four corner brackets pointing inward, representing a compress
 * or exit-fullscreen action. The icon is rendered at 896x896 logical units
 * with a 64-unit offset.
 */
declare const compressOutlinedIcon: IconDefinition;

export default compressOutlinedIcon;