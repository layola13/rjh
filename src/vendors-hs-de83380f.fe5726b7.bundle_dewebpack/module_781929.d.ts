/**
 * Tags icon component definition (outlined theme)
 * Represents a tag/label icon commonly used for categorization and labeling
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** SVG root element tag */
    tag: 'svg';
    /** SVG root attributes */
    attrs: {
      /** SVG viewBox coordinates */
      viewBox: string;
      /** Whether the SVG is focusable */
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
  /** Visual theme variant */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Default export: Tags icon definition with outlined theme
 * SVG viewBox: 64 64 896 896
 */
declare const tagsOutlinedIcon: IconDefinition;

export default tagsOutlinedIcon;