/**
 * Eye icon component definition (outlined theme)
 * Represents a visibility/view icon commonly used for password visibility toggles or view actions
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** SVG root element tag */
    tag: 'svg';
    /** SVG root element attributes */
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
        /** SVG path data defining the icon shape */
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
 * Eye icon definition for Ant Design icon library
 * Used to indicate visibility, view, or watch functionality
 */
declare const eyeIcon: IconDefinition;

export default eyeIcon;