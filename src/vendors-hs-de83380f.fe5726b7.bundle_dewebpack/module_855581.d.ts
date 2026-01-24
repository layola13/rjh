/**
 * Fast Forward Icon Component Definition
 * 
 * This module exports an icon configuration object that defines a "fast-forward" SVG icon
 * following the outlined theme. The icon consists of two triangular play shapes pointing
 * right and a vertical bar, commonly used to represent fast-forward functionality in media players.
 * 
 * @module FastForwardIcon
 */

/**
 * Attributes for SVG elements
 */
interface SvgAttributes {
  /** SVG viewBox coordinate system */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * Represents an SVG element node with tag name, attributes, and optional children
 */
interface SvgElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Optional child elements */
  children?: SvgElement[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: SvgElement;
  /** Icon identifier name */
  name: string;
  /** Visual theme style of the icon */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Fast Forward Icon Definition
 * 
 * Defines a media control icon representing fast-forward functionality.
 * The icon features:
 * - Two right-pointing triangular shapes (play symbols)
 * - A vertical pause/end bar on the right
 * - Outlined visual style
 * - 1024x1024 viewBox dimensions
 */
const fastForwardIcon: IconDefinition = {
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
          d: 'M793.8 499.3L506.4 273.5c-10.7-8.4-26.4-.8-26.4 12.7v451.6c0 13.5 15.7 21.1 26.4 12.7l287.4-225.8a16.14 16.14 0 000-25.4zm-320 0L186.4 273.5c-10.7-8.4-26.4-.8-26.4 12.7v451.5c0 13.5 15.7 21.1 26.4 12.7l287.4-225.8c4.1-3.2 6.2-8 6.2-12.7 0-4.6-2.1-9.4-6.2-12.6zM857.6 248h-51.2c-3.5 0-6.4 2.7-6.4 6v516c0 3.3 2.9 6 6.4 6h51.2c3.5 0 6.4-2.7 6.4-6V254c0-3.3-2.9-6-6.4-6z'
        }
      }
    ]
  },
  name: 'fast-forward',
  theme: 'outlined'
};

export default fastForwardIcon;