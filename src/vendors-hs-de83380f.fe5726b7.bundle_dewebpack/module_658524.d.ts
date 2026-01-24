/**
 * Picture icon component definition (outlined theme)
 * Represents an image/picture icon with a mountain and sun landscape
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
      /** Whether the SVG can receive focus */
      focusable: string;
    };
    /** Child elements of the SVG */
    children: Array<{
      /** Child element tag name */
      tag: 'path';
      /** Path element attributes */
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
 * Picture icon definition in outlined style
 * Displays a rectangular frame with a mountain landscape and circular sun/moon
 */
declare const pictureIconDefinition: IconDefinition;

export default pictureIconDefinition;