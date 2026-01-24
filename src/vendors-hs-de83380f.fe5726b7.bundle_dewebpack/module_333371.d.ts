/**
 * Icon definition for the "delete-row" outlined icon.
 * Represents a delete row action, typically used in table operations.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d?: string;
}

/**
 * Generic SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs | PathAttrs | Record<string, unknown>;
  /** Nested children elements (optional) */
  children?: SvgChild[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG icon configuration */
  icon: {
    /** SVG tag name */
    tag: string;
    /** SVG root attributes */
    attrs: SvgAttrs;
    /** Child elements within the SVG */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Delete row icon definition
 * @description An outlined icon representing a delete row action with an "X" symbol
 */
declare const deleteRowIcon: IconDefinition;

export default deleteRowIcon;