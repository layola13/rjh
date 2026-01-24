/**
 * Pinterest icon component definition (outlined theme)
 * Represents a Pinterest logo SVG icon with a circular design
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: {
    /** SVG tag name */
    tag: 'svg';
    /** SVG root element attributes */
    attrs: {
      /** Fill rule for SVG paths */
      'fill-rule': 'evenodd';
      /** ViewBox dimensions defining coordinate system */
      viewBox: string;
      /** Whether the SVG is focusable */
      focusable: 'false';
    };
    /** Child SVG elements */
    children: Array<{
      /** SVG path tag */
      tag: 'path';
      /** Path element attributes */
      attrs: {
        /** SVG path data string defining the icon shape */
        d: string;
      };
    }>;
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Pinterest icon definition (outlined variant)
 * Contains SVG path data for rendering a Pinterest logo icon
 */
declare const pinterestOutlined: IconDefinition;

export default pinterestOutlined;