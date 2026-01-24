/**
 * Security Scan Icon Definition
 * An outlined icon representing security scanning functionality
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
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
 * Icon structure definition
 */
interface Icon {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: IconAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** Icon visual structure and properties */
  icon: Icon;
  /** Semantic name of the icon */
  name: string;
  /** Visual style theme variant */
  theme: string;
}

/**
 * Security Scan outlined icon definition
 * Represents a security scanning or protection feature with a shield and magnifying glass design
 */
declare const securityScanIcon: IconDefinition;

export default securityScanIcon;