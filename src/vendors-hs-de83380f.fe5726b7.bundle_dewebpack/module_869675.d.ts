/**
 * Fund icon component definition (outlined theme)
 * Represents a financial chart or fund performance icon
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** SVG path data */
  d?: string;
}

/**
 * Icon child element structure
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
  /** Nested children elements (optional) */
  children?: IconChild[];
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** Root SVG tag name */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child elements of the icon */
  children: IconChild[];
}

/**
 * Complete icon definition with metadata
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: string;
}

/**
 * Fund icon definition (outlined style)
 * Displays a chart/graph icon commonly used for financial data visualization
 */
declare const FundOutlinedIcon: IconDefinition;

export default FundOutlinedIcon;