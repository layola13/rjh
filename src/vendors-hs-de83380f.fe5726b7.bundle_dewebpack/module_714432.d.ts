/**
 * Icon definition for the "info" icon in outlined theme.
 * Represents an information symbol with a circle and vertical line.
 */
interface IconDefinition {
  /** The root SVG icon configuration */
  icon: {
    /** The SVG element tag name */
    tag: 'svg';
    /** SVG root element attributes */
    attrs: {
      /** The SVG viewBox defining the coordinate system */
      viewBox: string;
      /** Whether the SVG can receive focus */
      focusable: string;
    };
    /** Child elements that compose the icon */
    children: Array<{
      /** The child element tag name */
      tag: string;
      /** Child element attributes */
      attrs: {
        /** SVG path data defining the shape */
        d: string;
      };
    }>;
  };
  /** The semantic name of the icon */
  name: string;
  /** The visual theme/style of the icon */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Default export: Info icon definition in outlined style.
 * Used for displaying informational messages or help indicators.
 */
declare const _default: IconDefinition;

export default _default;