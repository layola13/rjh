/**
 * Customer Service icon definition (filled theme)
 * Ant Design Icons - Customer Service
 */

/**
 * SVG path attributes interface
 */
interface SVGPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SVGAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SVGChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: SVGPathAttrs;
}

/**
 * Icon SVG structure definition
 */
interface IconSVG {
  /** HTML tag name for the root element */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SVGAttrs;
  /** Child elements (paths) of the SVG */
  children: SVGChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSVG;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Customer service icon with filled theme
 * Represents a headset/headphone symbol commonly used for customer support
 */
declare const customerServiceFilledIcon: IconDefinition;

export default customerServiceFilledIcon;