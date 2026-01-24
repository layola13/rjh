/**
 * Medium Square filled icon definition for Ant Design Icons
 * @module MediumSquareFilled
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
  /** SVG path data for drawing shapes */
  d?: string;
}

/**
 * SVG element node interface
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
  /** Child elements (optional) */
  children?: SvgNode[];
}

/**
 * Icon definition structure for Ant Design icon system
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: SvgNode;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Medium (social media platform) square filled icon
 * Displays the Medium logo in a square container with filled style
 */
declare const MediumSquareFilled: IconDefinition;

export default MediumSquareFilled;