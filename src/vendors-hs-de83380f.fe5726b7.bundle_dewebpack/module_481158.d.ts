/**
 * Icon definition for the "check-circle" outlined icon.
 * Represents a checkmark inside a circle, commonly used for success states or confirmations.
 */
interface IconDefinition {
  /** The icon's visual structure and properties */
  icon: {
    /** The root SVG element tag */
    tag: 'svg';
    /** Attributes for the SVG element */
    attrs: {
      /** The SVG viewBox defining the coordinate system */
      viewBox: string;
      /** Whether the SVG can receive focus */
      focusable: string;
    };
    /** Child elements that compose the icon graphic */
    children: Array<{
      /** The element tag name */
      tag: 'path';
      /** Path element attributes */
      attrs: {
        /** SVG path data defining the shape */
        d: string;
      };
    }>;
  };
  /** The semantic name of the icon */
  name: string;
  /** The visual style theme of the icon */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Check circle outlined icon definition.
 * Contains SVG path data for rendering a checkmark within a circular outline.
 */
declare const checkCircleOutlined: IconDefinition;

export default checkCircleOutlined;