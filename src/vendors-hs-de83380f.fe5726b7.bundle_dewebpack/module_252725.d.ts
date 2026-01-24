/**
 * Funnel plot icon definition for filled theme
 * Represents a funnel chart visualization icon
 */
export interface IconAttrs {
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Accessibility: whether element can receive focus */
  focusable?: string;
  /** SVG path data */
  d?: string;
}

/**
 * Icon node structure representing an SVG element or path
 */
export interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Child nodes (optional, only for container elements) */
  children?: IconNode[];
}

/**
 * Complete icon definition structure
 */
export interface IconDefinition {
  /** Root SVG icon structure */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Funnel plot filled icon
 * Used to represent funnel charts in data visualization contexts
 */
declare const funnelPlotFilledIcon: IconDefinition;

export default funnelPlotFilledIcon;