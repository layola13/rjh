/**
 * Ant Design Icon: Smile (Two-tone theme)
 * Represents a smiling face icon with customizable primary and secondary colors
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** Fill color for the SVG path */
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
  /** Nested child elements (optional) */
  children?: SvgNode[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /** SVG root element configuration */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Array of SVG path elements defining the icon shape */
  children: SvgNode[];
}

/**
 * Icon definition with theme support
 */
interface IconDefinition {
  /**
   * Generates the SVG icon configuration
   * @param primaryColor - Primary fill color for the icon (typically the outline)
   * @param secondaryColor - Secondary fill color for the icon (typically the fill)
   * @returns SVG configuration object with paths for rendering
   */
  icon(primaryColor: string, secondaryColor: string): IconConfig;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Default export: Smile icon definition (two-tone theme)
 * Circle-shaped smiley face with eyes and smile
 */
declare const smileIcon: IconDefinition;

export default smileIcon;