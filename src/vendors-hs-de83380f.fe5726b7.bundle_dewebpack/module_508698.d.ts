/**
 * Shopping icon configuration (filled theme)
 * Represents a shopping bag/cart icon for e-commerce interfaces
 */
export interface IconDefinition {
  /** SVG icon structure */
  icon: {
    /** SVG element tag name */
    tag: 'svg';
    /** SVG root element attributes */
    attrs: {
      /** SVG viewBox coordinates defining the canvas */
      viewBox: string;
      /** Whether the SVG can receive focus */
      focusable: string;
    };
    /** Child elements of the SVG */
    children: Array<{
      /** SVG child element tag name */
      tag: string;
      /** SVG path element attributes */
      attrs: {
        /** SVG path data defining the shape */
        d: string;
      };
    }>;
  };
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Shopping icon definition with filled theme
 * Icon displays a shopping bag with handles, commonly used in e-commerce UIs
 */
declare const shoppingIcon: IconDefinition;

export default shoppingIcon;