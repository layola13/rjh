/**
 * Icon definition for the "one-to-one" outlined icon.
 * Represents a one-to-one relationship or connection symbol.
 */
interface IconDefinition {
  /** Icon configuration object */
  icon: {
    /** SVG tag name */
    tag: 'svg';
    /** SVG root element attributes */
    attrs: {
      /** SVG viewBox coordinates */
      viewBox: string;
      /** Whether the SVG is focusable */
      focusable: string;
    };
    /** Child elements of the SVG */
    children: Array<IconElement>;
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Represents an SVG element (path, defs, style, etc.)
 */
interface IconElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: Record<string, string>;
  /** Optional child elements */
  children?: Array<IconElement>;
}

/**
 * One-to-one icon definition.
 * Displays a visual representation of a one-to-one relationship with vertical bars and dots.
 */
declare const oneToOneIcon: IconDefinition;

export default oneToOneIcon;