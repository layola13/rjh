/**
 * Alipay Square filled icon configuration
 * Represents the Alipay brand logo in a square format with filled style
 */
interface IconAttrs {
  /** SVG fill rule for path rendering */
  'fill-rule'?: string;
  /** SVG viewBox defining the coordinate system */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * Icon child element definition
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
}

/**
 * Icon structure definition
 */
interface Icon {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: IconChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** Icon SVG structure and attributes */
  icon: Icon;
  /** Icon identifier name */
  name: string;
  /** Visual theme style */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Alipay Square filled icon
 * 
 * A filled square icon representing the Alipay brand logo.
 * Used for displaying Alipay payment options or branding.
 * 
 * @property {Icon} icon - SVG structure with paths defining the Alipay logo
 * @property {string} name - Icon identifier: "alipay-square"
 * @property {string} theme - Visual style: "filled"
 */
declare const alipaySquareIcon: IconConfig;

export default alipaySquareIcon;