/**
 * Yahoo filled icon definition for Ant Design Icons
 * @module YahooFilledIcon
 */

/**
 * SVG attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element interface
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon structure interface
 */
interface Icon {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Icon definition interface for Ant Design Icons
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: Icon;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Yahoo filled icon definition
 * Contains the complete SVG path data and metadata for the Yahoo logo icon
 */
declare const YahooFilledIcon: IconDefinition;

export default YahooFilledIcon;