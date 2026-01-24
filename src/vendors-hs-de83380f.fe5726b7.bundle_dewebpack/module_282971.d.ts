/**
 * Cloud icon component configuration for Ant Design Icons
 * @module CloudTwoTone
 */

/**
 * Icon rendering function parameters
 */
interface IconRenderParams {
  /**
   * Primary color for the icon (outline)
   */
  primaryColor: string;
  
  /**
   * Secondary color for the icon (fill)
   */
  secondaryColor: string;
}

/**
 * SVG element attributes
 */
interface SvgAttrs {
  /**
   * SVG viewBox attribute defining the coordinate system
   */
  viewBox: string;
  
  /**
   * Whether the SVG element can receive focus
   */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /**
   * SVG path data string
   */
  d: string;
  
  /**
   * Fill color for the path
   */
  fill: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /**
   * HTML tag name
   */
  tag: string;
  
  /**
   * Element attributes
   */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /**
   * SVG root tag
   */
  tag: string;
  
  /**
   * SVG element attributes
   */
  attrs: SvgAttrs;
  
  /**
   * Child elements (paths)
   */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Function to generate icon definition with custom colors
   * @param primaryColor - Primary color for the icon outline
   * @param secondaryColor - Secondary color for the icon fill
   * @returns Icon definition object for rendering
   */
  icon(primaryColor: string, secondaryColor: string): IconDefinition;
  
  /**
   * Icon identifier name
   */
  name: string;
  
  /**
   * Icon theme variant
   */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Cloud icon in two-tone theme
 * Represents cloud computing, storage, or weather concepts
 */
declare const CloudTwoToneIcon: IconConfig;

export default CloudTwoToneIcon;