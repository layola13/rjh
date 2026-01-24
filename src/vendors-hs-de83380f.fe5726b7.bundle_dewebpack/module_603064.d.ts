/**
 * SVG icon attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** Fill color for the path */
  fill?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
  /** Child elements (optional, only for container elements) */
  children?: SvgNode[];
}

/**
 * Icon function parameters
 */
type IconFunction = (primaryColor: string, secondaryColor: string) => SvgNode;

/**
 * Icon definition object
 */
interface IconDefinition {
  /**
   * Function that generates the SVG icon structure
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for the icon (used in twotone theme)
   * @returns SVG node structure representing the icon
   */
  icon: IconFunction;
  
  /** Icon name identifier */
  name: string;
  
  /** Icon theme variant (e.g., "twotone", "filled", "outlined") */
  theme: string;
}

/**
 * HDD (Hard Disk Drive) icon definition
 * A twotone themed icon representing a server or storage device with three horizontal sections
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;