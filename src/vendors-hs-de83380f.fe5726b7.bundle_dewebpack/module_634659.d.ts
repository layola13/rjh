/**
 * Safety Certificate Icon - TwoTone Theme
 * 
 * An icon component representing a safety certificate with a checkmark.
 * This is a twotone themed icon from Ant Design icon library.
 */

/**
 * SVG element tag type
 */
type SvgTag = 'svg' | 'path';

/**
 * SVG element attributes
 */
interface SvgAttributes {
  /** SVG viewBox coordinate system */
  viewBox?: string;
  /** Whether the element can receive focus */
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
  tag: SvgTag;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Child nodes (only for container elements) */
  children?: SvgNode[];
}

/**
 * Icon render function parameters
 */
interface IconRenderFunction {
  /**
   * Generates the icon SVG structure
   * 
   * @param primaryColor - Primary color for the icon (outline/main paths)
   * @param secondaryColor - Secondary color for the icon (fill/background paths)
   * @returns SVG node structure representing the icon
   */
  (primaryColor: string, secondaryColor: string): SvgNode;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /**
   * Function that renders the icon with specified colors
   */
  icon: IconRenderFunction;
  
  /**
   * Unique identifier name for the icon
   */
  name: 'safety-certificate';
  
  /**
   * Visual theme style of the icon
   */
  theme: 'twotone';
}

/**
 * Safety Certificate Icon Definition
 * 
 * Default export containing the complete icon definition
 * including render function, name, and theme information.
 */
declare const SafetyCertificateIcon: IconDefinition;

export default SafetyCertificateIcon;