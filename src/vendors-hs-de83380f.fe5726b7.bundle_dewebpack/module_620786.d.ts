/**
 * SVG icon node attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Controls keyboard focus behavior for accessibility */
  focusable?: string;
  /** SVG path data defining the shape */
  d?: string;
  /** Fill color for the path */
  fill?: string;
}

/**
 * SVG icon node structure
 */
interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Optional nested child nodes */
  children?: IconNode[];
}

/**
 * Icon function return type representing the complete SVG structure
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: string;
  /** Root SVG attributes */
  attrs: SvgAttributes;
  /** Child SVG nodes (paths, shapes, etc.) */
  children: IconNode[];
}

/**
 * Two-tone icon configuration
 */
interface TwoToneIcon {
  /**
   * Generates the SVG icon structure with customizable colors
   * @param primaryColor - Primary fill color for the icon outline
   * @param secondaryColor - Secondary fill color for the icon details
   * @returns Complete SVG icon definition
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme type */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Plus circle icon in two-tone theme
 * Displays a circular outline with a plus symbol in the center
 */
declare const plusCircleIcon: TwoToneIcon;

export default plusCircleIcon;