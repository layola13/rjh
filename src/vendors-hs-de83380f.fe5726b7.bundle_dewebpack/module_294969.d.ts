/**
 * Icon configuration for a filled close-circle icon
 * Represents a circle with an X (close) symbol inside
 */
interface IconConfig {
  /** SVG icon definition */
  icon: {
    /** SVG element tag name */
    tag: 'svg';
    /** SVG element attributes */
    attrs: {
      /** Fill rule for SVG rendering */
      'fill-rule': 'evenodd';
      /** ViewBox coordinates defining the SVG canvas */
      viewBox: string;
      /** Whether the SVG element is focusable */
      focusable: 'false';
    };
    /** Child elements of the SVG */
    children: Array<{
      /** Path element tag name */
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
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Close circle icon configuration with filled theme
 * A circular icon containing an X mark for close/dismiss actions
 */
declare const iconConfig: IconConfig;

export default iconConfig;