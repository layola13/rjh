/**
 * SVG icon definition for a "build" icon in filled theme.
 * Represents a build/construction tool icon commonly used in UI libraries.
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
      /** Whether the SVG is focusable (accessibility) */
      focusable: string;
    };
    /** Child elements of the SVG */
    children: Array<{
      /** Path element tag name */
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
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Build icon definition with filled theme.
 * Default export containing SVG path data and metadata.
 */
declare const buildIconDefinition: IconDefinition;

export default buildIconDefinition;