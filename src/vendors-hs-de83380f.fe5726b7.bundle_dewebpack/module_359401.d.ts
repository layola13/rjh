/**
 * Fullscreen Exit Icon Definition
 * 
 * Provides the SVG icon definition for a fullscreen exit button,
 * typically used to exit fullscreen mode in media players or applications.
 * 
 * @module FullscreenExitIcon
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox defining the coordinate system */
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
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag name */
    tag: string;
    /** SVG element attributes */
    attrs: SvgAttributes;
    /** Child elements (paths, shapes, etc.) */
    children: SvgChild[];
  };
  /** Human-readable icon name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Fullscreen exit icon definition with outlined theme
 * 
 * Contains SVG path data representing four arrows pointing inward,
 * the universal symbol for exiting fullscreen mode.
 */
declare const fullscreenExitIcon: IconDefinition;

export default fullscreenExitIcon;