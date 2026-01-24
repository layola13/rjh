/**
 * Stop icon component definition for Ant Design icon library.
 * Represents a circular stop/prohibition symbol in outlined style.
 */
export interface IconDefinition {
  /** The root SVG element configuration */
  icon: {
    /** SVG element tag name */
    tag: 'svg';
    /** SVG element attributes */
    attrs: {
      /** SVG viewBox coordinates defining the canvas area */
      viewBox: string;
      /** Indicates the element should not receive focus */
      focusable: 'false' | 'true';
    };
    /** Child elements of the SVG */
    children: Array<{
      /** Path element tag name */
      tag: 'path';
      /** Path element attributes */
      attrs: {
        /** SVG path data string defining the shape */
        d: string;
      };
    }>;
  };
  /** Icon identifier name */
  name: string;
  /** Visual style theme of the icon */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Stop icon definition.
 * A circular icon with a diagonal line, commonly used to indicate prohibition or stop actions.
 */
declare const stopIconDefinition: IconDefinition;

export default stopIconDefinition;