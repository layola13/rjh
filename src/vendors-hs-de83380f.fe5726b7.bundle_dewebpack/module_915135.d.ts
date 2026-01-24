/**
 * Icon definition for a check-square filled icon
 * Represents a checkbox or confirmation square with a checkmark
 */
interface IconDefinition {
  /** Icon configuration object */
  icon: {
    /** SVG tag name */
    tag: 'svg';
    /** SVG root attributes */
    attrs: {
      /** SVG viewBox coordinates (minX minY width height) */
      viewBox: string;
      /** Whether the SVG can receive focus */
      focusable: string;
    };
    /** Child elements of the SVG */
    children: Array<{
      /** Child element tag name */
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
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Check square filled icon definition
 * A filled square with a checkmark inside, commonly used for completed tasks or selections
 */
declare const checkSquareFilledIcon: IconDefinition;

export default checkSquareFilledIcon;