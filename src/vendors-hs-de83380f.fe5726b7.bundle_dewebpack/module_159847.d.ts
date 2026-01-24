/**
 * Environment icon component definition (Ant Design Icons)
 * Represents a location/environment pin icon in outlined theme
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
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
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
 * Icon SVG structure definition
 */
interface IconSvg {
  /** HTML/SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: string;
}

/**
 * Environment/Location icon definition
 * Displays a map pin marker icon in outlined style
 */
declare const environmentIcon: IconDefinition;

export default environmentIcon;