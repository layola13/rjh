/**
 * Gold icon component definition (filled theme)
 * Represents an icon configuration for an Ant Design icon component
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG path element configuration
 */
interface SvgPathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: SvgPathAttrs;
}

/**
 * SVG root element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
}

/**
 * SVG icon element configuration
 */
interface SvgIconElement {
  /** HTML tag name */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) */
  children: SvgPathElement[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon element configuration */
  icon: SvgIconElement;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Gold icon (filled theme) - Represents gold/currency related visual element
 * @description An icon depicting gold ingots or currency in filled style
 */
declare const goldFilledIcon: IconDefinition;

export default goldFilledIcon;