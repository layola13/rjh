/**
 * File Image Icon - Two-tone theme
 * Ant Design icon component definition for a file with image representation
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
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon render result structure
 */
interface IconRenderResult {
  /** Root SVG tag */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Icon definition interface for Ant Design icons
 */
interface IconDefinition {
  /**
   * Icon render function
   * @param primaryColor - Primary color for the icon (main elements)
   * @param secondaryColor - Secondary color for the icon (background/highlight elements)
   * @returns SVG structure object
   */
  icon: (primaryColor: string, secondaryColor: string) => IconRenderResult;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * File Image icon definition (two-tone theme)
 * Represents a document/file with an image/photo inside
 */
declare const fileImageIcon: IconDefinition;

export default fileImageIcon;