/**
 * Icon definition for the "down" icon in outlined theme.
 * Represents a downward-pointing chevron/arrow icon.
 */
export interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** Path data for SVG path element */
  d?: string;
}

/**
 * Icon node structure representing an SVG element or its children.
 */
export interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Child nodes (optional for leaf elements like path) */
  children?: IconNode[];
}

/**
 * Complete icon definition structure.
 */
export interface IconDefinition {
  /** Root SVG structure */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: string;
}

/**
 * Down arrow icon definition.
 * 
 * @remarks
 * This icon displays a downward-pointing chevron commonly used for:
 * - Dropdown indicators
 * - Expandable sections
 * - Scroll hints
 * - Sorting indicators
 * 
 * @example
 *