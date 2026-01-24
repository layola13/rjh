/**
 * Ant Design Icon: Disconnect (Outlined)
 * Represents a broken link or disconnected state icon
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element is focusable */
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
interface SvgChildElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure containing SVG configuration
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** HTML tag name */
    tag: 'svg';
    /** SVG element attributes */
    attrs: SvgAttributes;
    /** Child elements (paths) that make up the icon */
    children: SvgChildElement[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Disconnect icon definition
 * Displays a broken chain/link symbol commonly used to indicate disconnection
 */
declare const disconnectIcon: IconDefinition;

export default disconnectIcon;