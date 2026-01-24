/**
 * SVG icon definition for a picture center alignment icon.
 * This icon represents centered image/picture alignment in UI components.
 */

/**
 * Attributes for SVG elements
 */
interface SvgElementAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
  /** SVG path data for drawing shapes */
  d?: string;
}

/**
 * SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgElementAttrs;
  /** Child elements (optional) */
  children?: SvgNode[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: SvgNode;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Picture center alignment icon definition.
 * Displays an icon representing centered picture/image alignment.
 * 
 * @remarks
 * - Theme: outlined
 * - ViewBox: 64 64 896 896
 * - Contains three horizontal bars with a centered rectangle
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;