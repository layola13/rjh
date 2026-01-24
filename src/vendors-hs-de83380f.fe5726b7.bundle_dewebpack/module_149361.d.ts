/**
 * WiFi icon component definition for Ant Design icon library.
 * Represents a wireless network signal indicator with multiple signal strength waves.
 */
interface IconDefinition {
  /** The root icon configuration object */
  icon: {
    /** SVG element tag name */
    tag: 'svg';
    /** SVG root element attributes */
    attrs: {
      /** SVG viewBox coordinates defining the visible area */
      viewBox: string;
      /** Whether the SVG should receive keyboard focus */
      focusable: string;
    };
    /** Child elements array containing the icon paths */
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
  /** The icon identifier name */
  name: string;
  /** The icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * WiFi outlined icon definition.
 * Displays a standard WiFi symbol with signal waves and a central dot.
 */
declare const wifiIcon: IconDefinition;

export default wifiIcon;