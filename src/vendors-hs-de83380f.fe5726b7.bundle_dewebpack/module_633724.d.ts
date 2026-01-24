/**
 * Printer icon component definition (filled theme)
 * Represents a printer symbol in the Ant Design icon library
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string defining the shape geometry */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the SVG can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface PrinterIconConfig {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Printer icon (filled theme) - Ant Design Icons
 * 
 * A filled-style printer icon commonly used to represent print actions,
 * printer settings, or document printing functionality.
 * 
 * @example
 *