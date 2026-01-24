/**
 * Mail icon component definition (outlined theme)
 * Represents an envelope/mail symbol for email-related UI elements
 */
interface IconAttributes {
  /** SVG viewBox coordinates defining the visible area */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes for SVG drawing
 */
interface PathAttributes {
  /** SVG path data string defining the shape geometry */
  d: string;
}

/**
 * SVG child element structure
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChildElement[];
}

/**
 * Complete icon configuration object
 */
interface MailIconConfig {
  /** Icon visual definition */
  icon: IconDefinition;
  /** Semantic name identifier */
  name: string;
  /** Visual style theme variant */
  theme: string;
}

/**
 * Mail icon configuration in outlined theme style
 * Provides SVG path data for rendering an envelope icon
 */
declare const mailIconConfig: MailIconConfig;

export default mailIconConfig;