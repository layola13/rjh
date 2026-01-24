/**
 * Caret Left Icon Definition
 * A filled-style left-pointing caret icon component configuration
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewport dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
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
 * Icon configuration structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** SVG root attributes */
    attrs: SvgAttributes;
    /** Child elements (paths, shapes, etc.) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: string;
}

/**
 * Caret Left Icon - Filled theme
 * A left-pointing triangular caret icon with rounded edges
 */
declare const caretLeftIcon: IconDefinition;

export default caretLeftIcon;

export type { IconDefinition, SvgAttributes, SvgChild, PathAttributes };