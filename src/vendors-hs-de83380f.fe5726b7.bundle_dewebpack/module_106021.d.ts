/**
 * Customer Service Icon (Two-tone theme)
 * Ant Design Icons - Headset/Customer Service icon definition
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Whether the element is focusable */
  focusable?: string;
  /** SVG path data */
  d?: string;
  /** Fill color */
  fill?: string;
}

/**
 * SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Child elements (optional) */
  children?: SvgNode[];
}

/**
 * Icon render function result
 */
interface IconDefinition {
  /** Root SVG element configuration */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child SVG elements */
  children: SvgNode[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Icon render function
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for two-tone effect
   * @returns SVG element definition with paths and attributes
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /**
   * Icon identifier name
   * @default "customer-service"
   */
  name: string;
  
  /**
   * Icon theme variant
   * @default "twotone"
   */
  theme: string;
}

/**
 * Customer Service icon definition (two-tone variant)
 * Represents a headset icon commonly used for customer support features
 */
declare const customerServiceIcon: IconConfig;

export default customerServiceIcon;