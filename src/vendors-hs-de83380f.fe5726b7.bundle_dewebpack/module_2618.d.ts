/**
 * SVG icon attribute configuration
 */
interface SvgAttrs {
  viewBox?: string;
  focusable?: string;
  d?: string;
  fill?: string;
}

/**
 * SVG node structure representing a tag with attributes and optional children
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Tag attributes */
  attrs: SvgAttrs;
  /** Nested child nodes */
  children?: SvgNode[];
}

/**
 * Icon generator function that creates SVG structure with customizable colors
 * @param primaryColor - Primary fill color for the icon
 * @param secondaryColor - Secondary fill color for accent elements
 * @returns SVG node structure representing the complete icon
 */
type IconFunction = (primaryColor: string, secondaryColor: string) => SvgNode;

/**
 * Icon definition containing metadata and rendering function
 */
interface IconDefinition {
  /** Function to generate the SVG icon structure */
  icon: IconFunction;
  /** Semantic name of the icon */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Info circle icon (twotone theme)
 * Displays an information symbol within a circular outline
 */
declare const infoCircleIcon: IconDefinition;

export default infoCircleIcon;