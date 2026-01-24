/**
 * Funnel plot icon definition for two-tone theme
 * @module FunnelPlotTwoTone
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG element child node
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * SVG root attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Icon render result structure
 */
interface IconRenderResult {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Icon definition interface
 */
interface IconDefinition {
  /**
   * Renders the icon with specified colors
   * @param primaryColor - Primary fill color for main icon shapes
   * @param secondaryColor - Secondary fill color for decorative elements
   * @returns SVG icon structure
   */
  icon(primaryColor: string, secondaryColor: string): IconRenderResult;
  
  /** Icon identifier name */
  name: 'funnel-plot';
  
  /** Icon theme variant */
  theme: 'twotone';
}

/**
 * Funnel plot icon in two-tone style
 * Used for representing data filtering or conversion funnels
 */
declare const FunnelPlotTwoTone: IconDefinition;

export default FunnelPlotTwoTone;