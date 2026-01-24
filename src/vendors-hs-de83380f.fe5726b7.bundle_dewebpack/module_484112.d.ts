/**
 * Icon configuration object for a REST-themed two-tone icon
 */
interface IconConfig {
  /**
   * Function that generates the icon's SVG structure
   * @param primaryColor - The primary color for the icon (typically used for main paths)
   * @param secondaryColor - The secondary color for the icon (typically used for fill/background)
   * @returns SVG structure object containing tag, attributes, and children elements
   */
  icon: (primaryColor: string, secondaryColor: string) => IconSvgStructure;
  
  /**
   * The name identifier for this icon
   */
  name: string;
  
  /**
   * The visual theme of the icon
   */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * SVG element structure
 */
interface SvgElement {
  /**
   * HTML/SVG tag name
   */
  tag: string;
  
  /**
   * Element attributes
   */
  attrs: Record<string, string | boolean>;
  
  /**
   * Child elements (optional)
   */
  children?: SvgElement[];
}

/**
 * Root SVG structure returned by the icon function
 */
interface IconSvgStructure extends SvgElement {
  tag: 'svg';
  attrs: {
    viewBox: string;
    focusable: string;
  };
  children: SvgPathElement[];
}

/**
 * SVG path element with specific attributes
 */
interface SvgPathElement {
  tag: 'path';
  attrs: {
    d: string;
    fill: string;
  };
}

/**
 * REST icon configuration with two-tone theme
 * Represents a REST API or service icon with dual-color styling
 */
declare const iconConfig: IconConfig;

export default iconConfig;