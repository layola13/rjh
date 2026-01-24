/**
 * Ant Design Icon: Pound Circle (Two-tone theme)
 * A circular icon with a pound (£) currency symbol inside
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
  /** Fill color for the SVG path */
  fill?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
}

/**
 * Icon render function return type
 */
interface IconDefinition {
  /** SVG root tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child SVG elements (paths) */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Icon render function
   * @param primaryColor - Primary fill color for the icon outline
   * @param secondaryColor - Secondary fill color for the icon inner details
   * @returns SVG icon definition object
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Pound Circle icon (two-tone theme)
 * Displays a pound sterling symbol (£) inside a circle
 */
declare const PoundCircleIcon: IconConfig;

export default PoundCircleIcon;