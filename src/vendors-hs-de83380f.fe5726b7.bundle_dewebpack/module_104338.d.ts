/**
 * Alipay Circle Icon Component Definition
 * 
 * This module exports an icon configuration object for rendering an Alipay circle logo
 * using SVG format. The icon follows the outlined theme design pattern.
 * 
 * @module AlipayCircleIcon
 */

/**
 * SVG element attributes interface
 */
export interface SVGAttributes {
  /** Fill rule for SVG rendering */
  'fill-rule'?: string;
  /** ViewBox coordinates and dimensions for SVG viewport */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** SVG path data for drawing shapes */
  d?: string;
}

/**
 * SVG child element structure
 */
export interface SVGChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SVGAttributes;
  /** Nested child elements (optional) */
  children?: SVGChild[];
}

/**
 * Icon structure definition
 */
export interface IconStructure {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SVGAttributes;
  /** Array of child SVG elements */
  children: SVGChild[];
}

/**
 * Complete icon configuration object
 */
export interface IconDefinition {
  /** SVG icon structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon design theme variant */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Alipay Circle Icon Configuration
 * 
 * Represents a circular Alipay logo in outlined style.
 * The icon is designed for a 896x896 viewport with a 64-unit offset.
 * 
 * @constant
 * @type {IconDefinition}
 * @default
 */
declare const alipayCircleIcon: IconDefinition;

export default alipayCircleIcon;