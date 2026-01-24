/**
 * Drag icon component definition for Ant Design Icons
 * @module DragOutlined
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements array */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'drag';
  /** Icon visual theme variant */
  theme: 'outlined';
}

/**
 * Drag icon - represents a drag handle with four directional arrows
 * Used for draggable UI elements and reorderable lists
 */
declare const dragOutlinedIcon: IconConfig;

export default dragOutlinedIcon;