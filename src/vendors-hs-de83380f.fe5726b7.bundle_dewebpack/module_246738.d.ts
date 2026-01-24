/**
 * Yahoo icon component definition (Outlined theme)
 * Defines the SVG structure and metadata for the Yahoo logo icon
 */

/**
 * Icon configuration object structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: {
    /** SVG tag name */
    tag: 'svg';
    /** SVG root attributes */
    attrs: {
      /** SVG viewBox coordinates */
      viewBox: string;
      /** Whether the SVG is focusable */
      focusable: string;
    };
    /** Child elements of the SVG */
    children: Array<{
      /** Child element tag name */
      tag: string;
      /** Child element attributes */
      attrs: {
        /** SVG path data */
        d: string;
      };
    }>;
  };
  /** Icon name identifier */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Yahoo icon definition with outlined theme
 * Contains SVG path data for rendering the Yahoo logo
 */
declare const yahooIcon: IconDefinition;

export default yahooIcon;