/**
 * Picture icon component definition (filled theme)
 * @module IconDefinition
 */

/**
 * SVG attributes interface
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
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
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
 * Picture icon definition with filled theme
 * Represents an image/photo icon with a mountain and sun motif
 */
declare const pictureIconDefinition: IconDefinition;

export default pictureIconDefinition;