/**
 * Ant Design Icon: Money Collect (Two-tone theme)
 * 
 * A two-tone icon representing money collection, featuring a document/receipt
 * with a currency symbol (¥) in the center.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG is focusable for accessibility */
  focusable?: string;
  /** Fill color for the path */
  fill?: string;
  /** SVG path data describing the shape */
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
  /** Nested child elements (optional) */
  children?: SvgChild[];
}

/**
 * Icon rendering result structure
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child path elements that compose the icon */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates the icon SVG structure with customizable colors
   * 
   * @param primaryColor - Primary color for the main icon paths
   * @param secondaryColor - Secondary color for background/accent paths (two-tone effect)
   * @returns Complete SVG icon definition with paths
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** 
   * Icon identifier name
   * @example "money-collect"
   */
  name: string;
  
  /** 
   * Icon theme variant
   * @example "twotone"
   */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Money Collect icon configuration
 * 
 * This icon uses a two-tone color scheme where:
 * - Primary color: Main outlines and currency symbol
 * - Secondary color: Inner fill areas for depth
 */
declare const MoneyCollectIcon: IconConfig;

export default MoneyCollectIcon;