/**
 * Edit icon configuration (filled theme)
 * Represents an edit/pencil icon typically used for editing actions
 */
export interface IconDefinition {
  /** SVG icon structure */
  icon: {
    /** SVG element tag name */
    tag: string;
    /** SVG root attributes */
    attrs: {
      /** SVG viewBox coordinates */
      viewBox: string;
      /** Whether the SVG is focusable */
      focusable: string;
    };
    /** Child elements of the SVG */
    children: Array<{
      /** Child element tag name */
      tag: string;
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
  theme: string;
}

/**
 * Edit icon definition with filled theme
 * Contains SVG path data for rendering an edit/pencil icon
 */
declare const editFilledIcon: IconDefinition;

export default editFilledIcon;