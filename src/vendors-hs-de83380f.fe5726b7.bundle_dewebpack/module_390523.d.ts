/**
 * Camera icon component definition for Ant Design Icons
 * Represents a camera outline icon with viewBox coordinates and SVG path data
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element interface
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon structure interface
 */
interface IconStructure {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements array */
  children: SvgChild[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Camera outlined icon definition
 * Used in Ant Design icon system for representing camera/photo functionality
 */
declare const cameraOutlinedIcon: IconDefinition;

export default cameraOutlinedIcon;