/**
 * Download icon component definition (outlined theme)
 * Represents a download arrow pointing downward with a platform at the bottom
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** SVG element tag name */
    tag: 'svg';
    /** SVG root attributes */
    attrs: {
      /** SVG viewport dimensions */
      viewBox: string;
      /** Whether the SVG should be focusable */
      focusable: string;
    };
    /** Child elements of the SVG */
    children: Array<{
      /** Child element tag name */
      tag: string;
      /** Child element attributes */
      attrs: {
        /** SVG path data defining the icon shape */
        d: string;
      };
    }>;
  };
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Download icon definition for Ant Design icon system
 * @default
 */
declare const downloadOutlined: IconDefinition;

export default downloadOutlined;