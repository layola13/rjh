/**
 * Ant Design Icon: Ordered List (Outlined)
 * 
 * Represents an ordered list icon with numbered list items (1, 2, 3).
 * Commonly used in text editors and content management interfaces.
 * 
 * @module OrderedListOutlined
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, groups, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon object structure
 */
interface OrderedListIcon {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'ordered-list';
  /** Icon theme variant */
  theme: 'outlined';
}

/**
 * Ordered List Icon Definition
 * 
 * Exports the complete SVG icon configuration for an ordered list.
 * The icon displays three horizontal lines with numbers 1, 2, and 3 on the left.
 */
declare const orderedListIcon: OrderedListIcon;

export default orderedListIcon;