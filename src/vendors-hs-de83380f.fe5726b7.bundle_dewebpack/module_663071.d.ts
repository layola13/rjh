/**
 * Fast Backward Icon Definition
 * 
 * An outlined icon representing a fast backward control, typically used in media players.
 * Contains SVG path data for rendering the icon with viewBox dimensions of 1024x1024.
 * 
 * @module FastBackwardOutlined
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
  /** SVG path data string */
  d?: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
}

/**
 * Icon configuration structure
 */
interface IconStructure {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Array of child SVG elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** Icon SVG structure configuration */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon visual style theme */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Fast Backward icon configuration object
 * 
 * Represents a media control icon with two backward-pointing triangles and a vertical bar.
 * Suitable for media player controls to skip backward or rewind.
 */
declare const fastBackwardOutlined: IconDefinition;

export default fastBackwardOutlined;