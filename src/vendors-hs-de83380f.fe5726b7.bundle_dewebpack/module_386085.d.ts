/**
 * Code icon component definition (outlined theme)
 * Represents a code/programming symbol typically used in development UIs
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * Icon element node structure
 */
interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Child elements (optional) */
  children?: IconNode[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG icon configuration */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Default export: Code icon in outlined theme
 * 
 * This icon displays a code symbol with:
 * - A left-pointing chevron/arrow (< symbol)
 * - Horizontal lines representing code text
 * - A square border frame
 * 
 * Dimensions: 896x896 viewBox (offset by 64px)
 */
declare const codeOutlinedIcon: IconDefinition;

export default codeOutlinedIcon;