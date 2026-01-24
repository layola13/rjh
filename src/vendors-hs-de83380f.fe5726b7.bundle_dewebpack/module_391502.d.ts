/**
 * Issues Close icon configuration for Ant Design icon library
 * Represents a closed issue status with checkmark symbol
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox defining the coordinate system and aspect ratio */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element (path) definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path-specific attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element configuration */
  icon: {
    /** HTML tag name */
    tag: 'svg';
    /** SVG root element attributes */
    attrs: SvgAttrs;
    /** Child elements (paths) defining the icon graphics */
    children: SvgChild[];
  };
  /** Semantic name of the icon */
  name: string;
  /** Visual theme variant */
  theme: 'outlined' | 'filled' | 'twoTone';
}

/**
 * Issues Close outlined icon
 * Used to indicate closed or resolved issue status
 */
declare const IssuesCloseOutlined: IconDefinition;

export default IssuesCloseOutlined;