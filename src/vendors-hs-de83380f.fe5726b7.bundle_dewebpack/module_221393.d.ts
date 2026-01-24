/**
 * Icon configuration for a wallet icon component
 * Defines an SVG-based two-tone wallet icon with customizable colors
 */

/**
 * Represents the attributes for an SVG element or path element
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** SVG path data string */
  d?: string;
  /** Fill color for the path */
  fill?: string;
}

/**
 * Represents a child element within the SVG structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Nested children elements (optional) */
  children?: SvgChild[];
}

/**
 * Return type for the icon function, representing a complete SVG structure
 */
interface IconSvg {
  /** Root tag name */
  tag: string;
  /** Root element attributes */
  attrs: SvgAttributes;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Configuration object for an icon component
 */
interface IconConfig {
  /**
   * Generates the SVG structure for the icon
   * @param primaryColor - Primary color for the icon (usually the outline)
   * @param secondaryColor - Secondary color for the icon (usually the fill)
   * @returns SVG structure definition
   */
  icon: (primaryColor: string, secondaryColor: string) => IconSvg;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme style of the icon */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Wallet icon configuration with two-tone theme
 * Provides a credit card/wallet visual representation
 */
declare const walletIcon: IconConfig;

export default walletIcon;