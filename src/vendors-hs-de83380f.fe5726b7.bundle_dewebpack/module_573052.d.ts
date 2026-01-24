/**
 * Monitor icon component configuration (outlined theme)
 * Represents a magnifying glass with an X mark inside, typically used for monitoring or search-related features
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** SVG element tag name */
    tag: 'svg';
    /** SVG root attributes */
    attrs: {
      /** SVG viewBox coordinates */
      viewBox: string;
      /** Whether the SVG can receive focus */
      focusable: string;
    };
    /** Child SVG elements */
    children: Array<{
      /** SVG child element tag name */
      tag: string;
      /** SVG child element attributes */
      attrs: {
        /** SVG path data */
        d: string;
      };
    }>;
  };
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Default export: Monitor icon definition
 * An outlined icon showing a magnifying glass with a close/cancel symbol
 */
declare const monitorIcon: IconDefinition;

export default monitorIcon;