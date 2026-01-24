/**
 * Ant Design Icon - Amazon Logo
 * 
 * This module exports an icon configuration object for the Amazon logo in outlined theme.
 * The icon is designed to be used with Ant Design's icon system.
 * 
 * @module AmazonOutlined
 */

/**
 * SVG element attributes interface
 */
interface SVGAttributes {
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
 * SVG child element configuration
 */
interface SVGChildElement {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure configuration
 */
interface IconSVG {
  /** Root SVG tag name */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SVGAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SVGChildElement[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconSVG;
  /** Icon identifier name */
  name: 'amazon';
  /** Visual style theme variant */
  theme: 'outlined';
}

/**
 * Default export: Amazon icon configuration object
 * 
 * Contains the complete SVG path data and metadata for rendering
 * the Amazon logo in outlined style at any size.
 * 
 * @example
 *