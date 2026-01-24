/**
 * Icon definition for the "folder-open" icon in two-tone theme
 * @module FolderOpenTwoTone
 */

/**
 * SVG element tag type
 */
type SvgTag = 'svg' | 'path';

/**
 * SVG element attributes
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** SVG path data string */
  d?: string;
  /** Fill color for the SVG element */
  fill?: string;
}

/**
 * SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: SvgTag;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Child elements (only for container elements) */
  children?: SvgNode[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary color for the icon outline
   * @param secondaryColor - Secondary color for the icon fill
   * @returns SVG node structure representing the icon
   */
  icon: (primaryColor: string, secondaryColor: string) => SvgNode;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme of the icon */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Folder Open icon in two-tone theme
 * Represents an open folder with primary and secondary colors
 */
declare const FolderOpenTwoTone: IconDefinition;

export default FolderOpenTwoTone;