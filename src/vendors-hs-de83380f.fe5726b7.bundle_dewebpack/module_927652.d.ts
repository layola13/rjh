/**
 * Icon configuration interface for SVG-based icons
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the icon can receive focus */
  focusable?: string;
  /** Fill color for the path */
  fill?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * SVG element node representation
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Child nodes (only present on root svg element) */
  children?: SvgNode[];
}

/**
 * Icon function parameters
 * @param primaryColor - Primary fill color for the icon
 * @param secondaryColor - Secondary fill color for the icon (used in twotone theme)
 */
type IconFunction = (primaryColor: string, secondaryColor: string) => SvgNode;

/**
 * Icon definition object
 */
interface IconDefinition {
  /** Function that generates the SVG structure with colors */
  icon: IconFunction;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Interaction icon (twotone theme)
 * Represents a bidirectional exchange or interaction symbol
 */
declare const interactionIcon: IconDefinition;

export default interactionIcon;