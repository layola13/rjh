/**
 * Dollar Circle Filled Icon
 * Ant Design Icons - Dollar sign within a circle icon (filled variant)
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttrs {
  /** SVG viewBox defining the coordinate system */
  viewBox: string;
  /** Whether the SVG is focusable for accessibility */
  focusable: string;
}

/**
 * Path element attributes for SVG paths
 */
interface PathAttrs {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element (typically a path)
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** SVG element attributes */
    attrs: SvgAttrs;
    /** Child elements (paths, groups, etc.) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Dollar Circle Filled icon definition
 * Represents a dollar sign ($) inside a filled circle
 * @module DollarCircleFilled
 */
declare const DollarCircleFilledIcon: IconDefinition;

export default DollarCircleFilledIcon;