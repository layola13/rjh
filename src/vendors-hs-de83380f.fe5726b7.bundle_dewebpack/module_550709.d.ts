/**
 * Like icon configuration for Ant Design icon system
 * Represents a thumbs-up/like symbol in filled theme
 */
export interface IconDefinition {
  /** Icon SVG structure */
  icon: {
    /** SVG tag name */
    tag: 'svg';
    /** SVG root attributes */
    attrs: {
      /** SVG viewBox coordinates and dimensions */
      viewBox: string;
      /** Whether the SVG can receive focus */
      focusable: string;
    };
    /** Child SVG elements */
    children: Array<{
      /** SVG element tag name */
      tag: string;
      /** SVG element attributes */
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
 * Like (thumbs-up) icon definition in filled theme
 * @module LikeFilledIcon
 */
declare const LikeFilledIcon: IconDefinition;

export default LikeFilledIcon;