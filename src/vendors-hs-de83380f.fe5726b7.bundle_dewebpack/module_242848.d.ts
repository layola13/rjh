/**
 * Zoom-in icon component definition for Ant Design Icons
 * @module ZoomInOutlined
 */

/**
 * SVG attributes interface
 */
interface SVGAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the element is focusable */
  focusable: string;
}

/**
 * SVG path element attributes
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element structure
 */
interface SVGChild {
  /** HTML tag name */
  tag: 'path';
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements of the SVG */
  children: SVGChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** Icon SVG structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'zoom-in';
  /** Icon visual theme variant */
  theme: 'outlined';
}

/**
 * Zoom-in outlined icon configuration
 * Provides a magnifying glass with a plus symbol for zoom-in functionality
 */
declare const zoomInOutlinedIcon: IconConfig;

export default zoomInOutlinedIcon;