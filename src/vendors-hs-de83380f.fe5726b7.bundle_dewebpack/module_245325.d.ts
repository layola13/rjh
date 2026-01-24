/**
 * Ant Design Icon: DeliveredProcedure (Outlined)
 * 
 * This module exports the SVG icon definition for the "delivered-procedure" icon
 * in the outlined theme style from Ant Design Icons.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
  /** SVG path data for drawing shapes */
  d?: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Nested child elements (optional) */
  children?: SvgChild[];
}

/**
 * Icon definition structure following Ant Design Icons specification
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: 'svg';
    /** SVG root element attributes */
    attrs: SvgAttributes;
    /** Child elements including defs and paths */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant (outlined, filled, or two-tone) */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * DeliveredProcedure icon definition
 * 
 * Represents a delivery or procedure completion icon with an arrow
 * pointing right into a document/folder shape.
 */
declare const deliveredProcedureIcon: IconDefinition;

export default deliveredProcedureIcon;