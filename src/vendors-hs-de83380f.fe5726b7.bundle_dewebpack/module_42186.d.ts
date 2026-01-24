/**
 * Stop icon definition for filled theme
 * Represents a stop/prohibition symbol with a diagonal line through a circle
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: {
    /** SVG element tag name */
    tag: 'svg';
    /** SVG root element attributes */
    attrs: {
      /** SVG viewport coordinates and dimensions */
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
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Stop icon in filled theme style
 * Displays a circular prohibition symbol with diagonal strike-through
 */
declare const stopFilledIcon: IconDefinition;

export default stopFilledIcon;