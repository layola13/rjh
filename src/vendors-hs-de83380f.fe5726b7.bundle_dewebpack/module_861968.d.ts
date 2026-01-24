/**
 * Filter icon component configuration for Ant Design Icons
 * @module FilterTwoTone
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
  /** Fill color for the path */
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
  /** Nested children elements (optional) */
  children?: SvgChild[];
}

/**
 * Icon render function return type
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Two-tone icon configuration
 */
interface TwoToneIconConfig {
  /**
   * Icon render function
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for two-tone effect
   * @returns SVG icon definition object
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon visual theme variant */
  theme: string;
}

/**
 * Filter icon in two-tone theme
 * Represents a funnel/filter symbol commonly used for filtering operations
 */
declare const FilterTwoToneIcon: TwoToneIconConfig;

export default FilterTwoToneIcon;