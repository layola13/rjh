/**
 * Folder Add Icon Definition
 * Ant Design icon for adding/creating folders
 */

/**
 * SVG attributes for the root element
 */
interface SvgAttributes {
  /** SVG viewBox defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * Attributes for SVG path elements
 */
interface PathAttributes {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: 'svg';
    /** SVG element attributes */
    attrs: SvgAttributes;
    /** Child elements of the SVG */
    children: SvgChild[];
  };
  /** Semantic name of the icon */
  name: string;
  /** Visual style theme */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Folder Add icon configuration
 * Represents an icon for adding or creating new folders
 */
declare const folderAddIcon: IconDefinition;

export default folderAddIcon;