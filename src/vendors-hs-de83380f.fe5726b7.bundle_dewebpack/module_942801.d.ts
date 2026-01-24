/**
 * Eye icon component definition (filled theme)
 * Represents a visibility/view icon commonly used for password reveal or item preview
 */
interface IconDefinition {
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
    /** Child SVG elements */
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
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Eye icon definition with filled theme
 * Contains SVG path data for an eye symbol used to represent visibility
 */
declare const eyeFilledIcon: IconDefinition;

export default eyeFilledIcon;