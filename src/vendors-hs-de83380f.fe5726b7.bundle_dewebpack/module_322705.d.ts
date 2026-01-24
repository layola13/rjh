/**
 * Shrink icon component definition (outlined theme)
 * Represents a shrink/minimize icon with two diagonal arrows pointing inward
 */
export interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** SVG element tag name */
    tag: 'svg';
    /** SVG root attributes */
    attrs: {
      /** SVG viewBox coordinates and dimensions */
      viewBox: string;
      /** Whether the SVG can receive focus */
      focusable: string;
    };
    /** Child elements of the SVG */
    children: Array<{
      /** Path element tag name */
      tag: 'path';
      /** Path element attributes */
      attrs: {
        /** SVG path data defining the shape */
        d: string;
      };
    }>;
  };
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: 'outlined' | 'filled' | 'twoTone';
}

/**
 * Shrink icon definition with outlined theme
 * Used for minimize/collapse UI actions
 */
declare const shrinkIcon: IconDefinition;

export default shrinkIcon;