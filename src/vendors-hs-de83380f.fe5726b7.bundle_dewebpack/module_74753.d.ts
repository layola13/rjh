/**
 * Icon definition for the 'up' icon with outlined theme.
 * Represents an upward-pointing arrow/chevron icon.
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Represents attributes for an SVG path element
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * Represents a child element within an SVG structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Defines the structure of an SVG icon
 */
interface SvgIcon {
  /** HTML/SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: SvgIcon;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Default export: Up arrow icon definition
 * 
 * This icon depicts an upward-pointing chevron/arrow, commonly used for:
 * - Scroll to top actions
 * - Collapse/expand controls
 * - Sort ascending indicators
 * - Navigation upward in hierarchies
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;