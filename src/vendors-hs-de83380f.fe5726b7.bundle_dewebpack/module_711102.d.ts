/**
 * Compass icon component configuration (outlined theme)
 * Represents a compass navigation icon in the Ant Design icon set
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
      /** Whether the SVG element can receive focus */
      focusable: string;
    };
    /** Child elements of the SVG */
    children: Array<{
      /** Child element tag name */
      tag: string;
      /** Child element attributes */
      attrs: {
        /** SVG path data string defining the shape */
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
 * Compass icon definition with outlined theme
 * Displays a circular compass with directional indicators
 */
declare const compassOutlined: IconDefinition;

export default compassOutlined;