/**
 * Message icon component definition (filled theme)
 * Represents a chat or messaging interface icon
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** SVG tag name */
    tag: 'svg';
    /** SVG root attributes */
    attrs: {
      /** SVG viewport coordinates and dimensions */
      viewBox: string;
      /** Whether the SVG can receive focus */
      focusable: string;
    };
    /** Child elements of the SVG */
    children: Array<{
      /** Element tag name */
      tag: string;
      /** Element attributes */
      attrs: {
        /** SVG path data defining the icon shape */
        d: string;
      };
    }>;
  };
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Message icon definition with filled theme
 * Contains SVG path data for rendering a message/chat bubble icon
 */
declare const messageFilledIcon: IconDefinition;

export default messageFilledIcon;