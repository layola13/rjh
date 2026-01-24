/**
 * Bold icon configuration for Ant Design icon component
 * Represents a bold text formatting icon in outlined theme
 */
export interface IconDefinition {
  /** Icon SVG structure */
  icon: {
    /** SVG root tag */
    tag: 'svg';
    /** SVG root attributes */
    attrs: {
      /** SVG viewport dimensions */
      viewBox: string;
      /** Accessibility: whether the element can receive focus */
      focusable: string;
    };
    /** Child elements of the SVG */
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
  /** Human-readable name of the icon */
  name: string;
  /** Visual style theme of the icon */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Bold text formatting icon definition
 * Used for text editor toolbars and formatting controls
 */
declare const BoldOutlined: IconDefinition;

export default BoldOutlined;