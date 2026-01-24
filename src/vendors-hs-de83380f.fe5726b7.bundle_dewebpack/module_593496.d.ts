/**
 * Icon definition for a pay circle outlined icon
 * Represents a payment or currency symbol within a circular border
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** SVG element tag name */
    tag: 'svg';
    /** SVG root element attributes */
    attrs: {
      /** SVG viewBox defining the coordinate system */
      viewBox: string;
      /** Whether the SVG can receive focus */
      focusable: string;
    };
    /** Child elements of the SVG */
    children: Array<{
      /** SVG path element tag */
      tag: 'path';
      /** Path element attributes */
      attrs: {
        /** SVG path data defining the shape */
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
 * Pay circle outlined icon definition
 * Displays a Chinese Yuan (¥) symbol inside a circle outline
 */
declare const payCircleOutlined: IconDefinition;

export default payCircleOutlined;