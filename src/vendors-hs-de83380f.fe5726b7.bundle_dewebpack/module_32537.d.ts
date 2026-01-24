/**
 * Red Envelope icon component definition (Ant Design Icons)
 * Represents a Chinese red envelope (hongbao) in outlined theme
 */

/**
 * SVG attributes interface for icon elements
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
 * SVG child element (typically a path)
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element tag */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon export structure
 */
interface RedEnvelopeIcon {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme style */
  theme: string;
}

/**
 * Red Envelope outlined icon
 * A traditional Chinese red envelope (hongbao) symbol used for gifting money
 */
declare const redEnvelopeOutlined: RedEnvelopeIcon;

export default redEnvelopeOutlined;