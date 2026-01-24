/**
 * Ant Design Icon: File Markdown (Filled)
 * Represents a markdown file icon component definition
 */

/**
 * SVG attributes interface for the root element
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element definition
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** Root SVG element tag name */
  tag: string;
  /** Root SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements array */
  children: SvgChildElement[];
}

/**
 * Complete icon definition including metadata
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * File Markdown icon definition (filled theme)
 * Used to represent markdown document files in UI
 */
declare const FileMarkdownFilledIcon: IconDefinition;

export default FileMarkdownFilledIcon;