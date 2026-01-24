/**
 * Safety icon component definition (outlined theme)
 * Represents a shield with a checkmark, commonly used for security and safety indicators
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** HTML tag name */
    tag: 'svg';
    /** SVG element attributes */
    attrs: SvgAttributes;
    /** Child elements (paths) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Safety icon definition with shield and checkmark design
 * @remarks
 * This icon uses two paths:
 * - First path: Shield outline (384px radius circle inscribed in shield)
 * - Second path: Checkmark inside the shield
 */
const SafetyOutlinedIcon: IconDefinition = {
  icon: {
    tag: 'svg',
    attrs: {
      viewBox: '0 0 1024 1024',
      focusable: 'false'
    },
    children: [
      {
        tag: 'path',
        attrs: {
          d: 'M512 64L128 192v384c0 212.1 171.9 384 384 384s384-171.9 384-384V192L512 64zm312 512c0 172.3-139.7 312-312 312S200 748.3 200 576V246l312-110 312 110v330z'
        }
      },
      {
        tag: 'path',
        attrs: {
          d: 'M378.4 475.1a35.91 35.91 0 00-50.9 0 35.91 35.91 0 000 50.9l129.4 129.4 2.1 2.1a33.98 33.98 0 0048.1 0L730.6 434a33.98 33.98 0 000-48.1l-2.8-2.8a33.98 33.98 0 00-48.1 0L483 579.7 378.4 475.1z'
        }
      }
    ]
  },
  name: 'safety',
  theme: 'outlined'
};

export default SafetyOutlinedIcon;