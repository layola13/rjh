/**
 * Euro circle icon (filled theme)
 * An SVG icon representing a euro symbol inside a circle
 */
export interface IconDefinition {
  /** The root SVG element configuration */
  icon: {
    /** SVG element tag name */
    tag: 'svg';
    /** SVG root attributes */
    attrs: {
      /** SVG viewBox defining the coordinate system */
      viewBox: string;
      /** Whether the element can receive focus */
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
  /** The icon's identifier name */
  name: string;
  /** The icon's visual theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Euro circle filled icon definition
 * Displays a euro currency symbol (€) centered within a circular background
 */
declare const euroCircleFilledIcon: IconDefinition;

export default euroCircleFilledIcon;