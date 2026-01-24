/**
 * Icon definition for the "up-square" filled icon.
 * Represents an upward-pointing arrow within a square shape.
 * Typically used for scroll-to-top, collapse, or upward navigation actions.
 */
export interface IconDefinition {
  /** Icon rendering configuration */
  icon: IconNode;
  /** Human-readable icon identifier */
  name: string;
  /** Visual style variant of the icon */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * SVG node structure representing an icon element.
 */
export interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: Record<string, string | number | boolean>;
  /** Nested child elements */
  children?: IconNode[];
}

/**
 * Up Square Filled Icon
 * 
 * A filled square icon containing an upward-pointing chevron/arrow.
 * Commonly used in UI components for:
 * - Collapsing expanded sections
 * - Scrolling to top of page
 * - Indicating upward movement or hierarchy
 * 
 * @example
 *