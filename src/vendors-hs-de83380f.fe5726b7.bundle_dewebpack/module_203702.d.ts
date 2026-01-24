/**
 * X (Twitter) icon definition for outlined theme
 * @module XOutlined
 */

/**
 * SVG attributes interface for the icon path element
 */
interface PathAttributes {
  /** SVG path data defining the X logo shape */
  d: string;
}

/**
 * SVG attributes interface for the root SVG element
 */
interface SvgAttributes {
  /** Fill rule for SVG rendering */
  "fill-rule": string;
  /** ViewBox dimensions defining the coordinate system */
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
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * X (formerly Twitter) icon in outlined style
 * Contains the SVG path data and configuration for rendering the X logo
 */
declare const xOutlinedIcon: IconDefinition;

export default xOutlinedIcon;