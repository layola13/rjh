/**
 * Star icon component configuration for Ant Design icon system.
 * Provides a two-tone star icon with customizable primary and secondary colors.
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the icon is focusable for accessibility */
  focusable?: string;
  /** Fill color for the path element */
  fill?: string;
  /** Path data defining the shape */
  d?: string;
}

/**
 * SVG element configuration
 */
interface SvgElement {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Child elements (optional) */
  children?: SvgElement[];
}

/**
 * Icon render function parameters
 */
interface IconRenderParams {
  /**
   * Primary color for the icon (typically the outline)
   */
  primaryColor: string;
  /**
   * Secondary color for the icon (typically the fill)
   */
  secondaryColor: string;
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Renders the icon SVG structure with specified colors
   * @param primaryColor - Primary color for icon outline
   * @param secondaryColor - Secondary color for icon fill
   * @returns SVG element configuration
   */
  icon: (primaryColor: string, secondaryColor: string) => SvgElement;
  
  /**
   * Icon identifier name
   */
  name: string;
  
  /**
   * Icon theme variant
   */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Two-tone star icon configuration.
 * Exports a star icon with separate primary (outline) and secondary (fill) colors.
 */
declare const starTwoToneIcon: IconConfig;

export default starTwoToneIcon;