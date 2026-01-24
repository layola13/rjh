/**
 * Car icon component definition for Ant Design Icons
 * @module CarOutlined
 */

/**
 * SVG attributes interface for icon elements
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Prevents the SVG from receiving focus */
  focusable?: string;
  /** SVG path data for drawing shapes */
  d?: string;
}

/**
 * Represents a single SVG element node in the icon tree
 */
interface SVGElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SVGAttributes;
  /** Nested child elements (optional) */
  children?: SVGElement[];
}

/**
 * Icon definition structure used by Ant Design icon system
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: SVGElement;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant (outlined, filled, two-tone) */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Car outlined icon definition
 * Represents a car/vehicle symbol in the outlined style
 */
declare const CarOutlinedIcon: IconDefinition;

export default CarOutlinedIcon;