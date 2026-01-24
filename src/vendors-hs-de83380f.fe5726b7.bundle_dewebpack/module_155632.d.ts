/**
 * Instagram filled icon component definition
 * Provides SVG path data and metadata for the Instagram logo icon
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path) interface
 */
interface SvgChild {
  /** HTML tag name */
  tag: "path";
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure interface
 */
interface IconDefinition {
  /** HTML tag name for root element */
  tag: "svg";
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Array of child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon object interface
 */
interface InstagramIcon {
  /** Icon visual definition containing SVG structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: "instagram";
  /** Icon style theme variant */
  theme: "filled";
}

/**
 * Instagram filled icon
 * Contains the complete SVG path data and metadata for rendering the Instagram logo
 */
declare const instagramFilledIcon: InstagramIcon;

export default instagramFilledIcon;