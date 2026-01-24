/**
 * Icon definition for a plus-square filled icon
 * Represents a square with a plus symbol inside, commonly used for add/create actions
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates if the element can receive focus */
  focusable?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * Icon node structure supporting nested SVG elements
 */
interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Optional child nodes */
  children?: IconNode[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Plus square filled icon - a square containing a centered plus symbol
 * Typically used for add, create, or expand actions in UI
 */
declare const PlusSquareFilledIcon: IconDefinition;

export default PlusSquareFilledIcon;