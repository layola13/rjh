/**
 * Ant Design Icons - File PPT Filled Icon
 * 
 * A PowerPoint file icon component definition with filled theme style.
 * This icon displays a document with PPT branding, commonly used to represent
 * PowerPoint files in file management interfaces.
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgElementAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
}

/**
 * SVG child element definition
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconDefinition {
  /** Root SVG element configuration */
  icon: {
    /** Root element tag name */
    tag: string;
    /** SVG root attributes */
    attrs: SvgElementAttributes;
    /** Child elements array */
    children: SvgChildElement[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * File PPT filled icon definition
 * 
 * @remarks
 * This icon definition follows the Ant Design Icons specification.
 * The viewBox is set to "64 64 896 896" which is standard for Ant Design icons.
 * 
 * @example
 *