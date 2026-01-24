/**
 * Sort Descending Icon Definition
 * An outlined theme icon representing sort descending functionality (A→Z with down arrow)
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates the element should not receive focus */
  focusable: string;
}

interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

interface IconDefinition {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Child elements (paths) that compose the icon */
  children: IconChild[];
}

interface SortDescendingIconConfig {
  /** Complete icon SVG structure */
  icon: IconDefinition;
  /** Semantic name of the icon */
  name: string;
  /** Visual style theme */
  theme: string;
}

/**
 * Sort Descending Icon Configuration
 * Provides a complete SVG icon definition for sorting in descending order
 */
declare const sortDescendingIcon: SortDescendingIconConfig;

export default sortDescendingIcon;