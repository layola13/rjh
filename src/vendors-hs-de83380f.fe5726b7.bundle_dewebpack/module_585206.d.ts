/**
 * SVG icon attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Whether the element can receive focus */
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
  attrs: SvgAttrs;
  /** Child elements (only for container elements) */
  children?: SvgNode[];
}

/**
 * Icon configuration object returned by the icon function
 */
interface IconConfig {
  /** Root SVG element configuration */
  tag: string;
  /** SVG root attributes including viewBox and focusable */
  attrs: SvgAttrs;
  /** Array of child path elements */
  children: SvgNode[];
}

/**
 * Calculator icon definition for two-tone theme
 */
interface CalculatorIcon {
  /**
   * Generates the calculator icon SVG structure
   * @param primaryColor - Primary fill color for main paths
   * @param secondaryColor - Secondary fill color for detail paths
   * @returns SVG configuration object with paths and attributes
   */
  icon(primaryColor: string, secondaryColor: string): IconConfig;
  
  /** Icon identifier name */
  name: "calculator";
  
  /** Icon theme variant */
  theme: "twotone";
}

declare const calculatorIcon: CalculatorIcon;

export default calculatorIcon;