/**
 * Save icon component definition (outlined theme)
 * Represents a save/floppy disk icon in the Ant Design icon system
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** SVG element tag */
    tag: 'svg';
    /** SVG root attributes */
    attrs: {
      /** SVG viewBox coordinates */
      viewBox: string;
      /** Whether the SVG is focusable */
      focusable: string;
    };
    /** Child SVG elements */
    children: Array<{
      /** SVG child element tag */
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
  /** Visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Save icon definition with outlined theme
 * Contains the SVG path data for rendering a save icon
 */
declare const saveOutlined: IconDefinition;

export default saveOutlined;