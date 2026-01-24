/**
 * Icon definition for the "insert-row-above" icon in outlined theme.
 * Represents a table operation to insert a row above the current selection.
 */
export interface IconDefinition {
  /** The icon's visual representation */
  icon: IconNode;
  /** The unique name identifier for this icon */
  name: string;
  /** The visual theme style of the icon */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Represents an SVG element node in the icon tree structure.
 */
export interface IconNode {
  /** The SVG/HTML tag name */
  tag: string;
  /** Element attributes as key-value pairs */
  attrs: Record<string, string | number>;
  /** Optional child nodes */
  children?: IconNode[];
}

/**
 * The "insert-row-above" icon definition.
 * Displays a table grid with emphasis on inserting a row above.
 * 
 * @remarks
 * This icon uses an outlined theme style with a 896x896 viewBox.
 * The visual design shows a table structure with multiple cells and a top bar.
 */
declare const insertRowAboveIcon: IconDefinition;

export default insertRowAboveIcon;