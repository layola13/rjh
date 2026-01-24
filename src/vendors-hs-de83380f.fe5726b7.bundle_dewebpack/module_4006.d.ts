/**
 * File PPT Icon Component Definition
 * Two-tone themed SVG icon representing a PowerPoint file
 */

/**
 * Icon render function parameters
 */
interface IconRenderParams {
  /** Primary color for the icon (typically the main fill color) */
  primaryColor: string;
  /** Secondary color for the icon (typically for highlights/accents) */
  secondaryColor: string;
}

/**
 * SVG element attributes
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Whether the element is focusable */
  focusable?: string;
  /** Fill color for path elements */
  fill?: string;
  /** Path data for SVG path elements */
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
  /** Child elements (for container nodes) */
  children?: SvgNode[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /**
   * Render function that generates SVG structure
   * @param primaryColor - Primary color for the icon
   * @param secondaryColor - Secondary color for highlights
   * @returns SVG node structure
   */
  icon(primaryColor: string, secondaryColor: string): SvgNode;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * File PPT icon definition (two-tone theme)
 * Represents a PowerPoint document file icon
 */
declare const filePptIcon: IconDefinition;

export default filePptIcon;