/**
 * Behance Square filled icon definition
 * 
 * Represents the Behance logo within a square frame, typically used for
 * social media links or brand representation in filled style.
 */
interface IconDefinition {
  /** Icon configuration containing SVG structure */
  icon: {
    /** SVG tag name */
    tag: 'svg';
    /** SVG root element attributes */
    attrs: {
      /** SVG viewport coordinates and dimensions */
      viewBox: string;
      /** Indicates whether the element can receive focus */
      focusable: string;
    };
    /** Child elements of the SVG */
    children: Array<{
      /** SVG child element tag name */
      tag: string;
      /** SVG child element attributes */
      attrs: {
        /** SVG path data defining the shape */
        d: string;
      };
    }>;
  };
  /** Icon identifier name */
  name: string;
  /** Visual theme variant of the icon */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Behance Square icon with filled theme
 * 
 * @remarks
 * This icon represents Behance's brand logo in a square container,
 * rendered with a filled/solid style. Viewbox is set to 64 64 896 896
 * for proper scaling within icon systems.
 * 
 * @example
 *