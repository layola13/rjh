/**
 * Icon definition for the 'key' icon in outlined theme.
 * Represents a key symbol, typically used for security, password, or authentication related UI elements.
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes for SVG rendering
 */
interface PathAttrs {
  /** SVG path data string defining the shape geometry */
  d: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon structure definition containing SVG configuration
 */
interface Icon {
  /** SVG root tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Array of child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition object
 */
interface KeyIconDefinition {
  /** Icon SVG structure and configuration */
  icon: Icon;
  /** Semantic name of the icon */
  name: string;
  /** Visual style theme variant */
  theme: string;
}

/**
 * Key icon definition in outlined theme style.
 * This icon depicts a traditional key shape and is commonly used for:
 * - Security settings
 * - Password input fields
 * - Authentication flows
 * - Access control UI elements
 */
declare const keyIcon: KeyIconDefinition;

export default keyIcon;