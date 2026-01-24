/**
 * Pushpin icon component definition (outlined theme)
 * SVG icon representing a pushpin/thumbtack symbol
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** SVG root element tag */
    tag: 'svg';
    /** SVG element attributes */
    attrs: {
      /** SVG viewBox dimensions */
      viewBox: string;
      /** Accessibility: whether the SVG is focusable */
      focusable: string;
    };
    /** Child elements of the SVG */
    children: Array<{
      /** Child element tag name */
      tag: string;
      /** Child element attributes */
      attrs: {
        /** SVG path data defining the shape */
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
 * Pushpin icon definition with outlined theme
 * Used for pinning or marking important items
 */
declare const pushpinOutlined: IconDefinition;

export default pushpinOutlined;