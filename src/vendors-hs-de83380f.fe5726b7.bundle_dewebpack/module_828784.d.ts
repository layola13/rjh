/**
 * Video camera icon definition (filled theme)
 * Ant Design Icons - Video Camera Filled
 */

/**
 * SVG attributes interface for viewBox and focusable properties
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
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
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path-specific attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure containing SVG configuration
 */
interface IconDefinition {
  /** Root SVG element configuration */
  icon: {
    /** HTML tag name */
    tag: 'svg';
    /** SVG element attributes */
    attrs: SvgAttributes;
    /** Child elements (paths) within the SVG */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Video camera icon (filled theme)
 * Represents a video camera or recording device
 */
declare const videoCameraFilled: IconDefinition;

export default videoCameraFilled;