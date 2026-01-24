/**
 * User icon definition for Ant Design Icons
 * Represents a user/person avatar icon in outlined theme
 */
export interface IconDefinition {
  /** Icon rendering configuration */
  icon: {
    /** SVG tag name */
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
      /** Path tag name */
      tag: 'path';
      /** Path attributes */
      attrs: {
        /** SVG path data defining the icon shape */
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
 * Default export: User icon definition
 * An outlined user avatar icon showing a person silhouette
 */
declare const userIconDefinition: IconDefinition;

export default userIconDefinition;