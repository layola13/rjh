/**
 * Ant Design Icon: File PDF (Two-tone theme)
 * 
 * A PDF file icon component configuration for Ant Design icon system.
 * Supports customizable primary and secondary colors for the two-tone theme.
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG is focusable for accessibility */
  focusable: string;
}

/**
 * SVG child element (path) definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: SvgPathAttrs;
}

/**
 * SVG icon structure returned by the icon function
 */
interface IconSvg {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Array of SVG child elements (paths) */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generate the icon SVG structure
   * 
   * @param primaryColor - Primary color for the icon (typically for outlines)
   * @param secondaryColor - Secondary color for the icon (typically for fills in two-tone theme)
   * @returns SVG structure object representing the PDF file icon
   */
  icon(primaryColor: string, secondaryColor: string): IconSvg;
  
  /** Icon identifier name */
  name: 'file-pdf';
  
  /** Icon theme variant */
  theme: 'twotone';
}

/**
 * File PDF icon configuration for Ant Design icon system
 * 
 * This icon represents a PDF document with two-tone styling.
 * The icon includes detailed SVG paths for rendering a stylized PDF file icon.
 */
declare const filePdfIcon: IconConfig;

export default filePdfIcon;