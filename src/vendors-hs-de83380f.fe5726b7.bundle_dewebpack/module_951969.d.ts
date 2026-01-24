/**
 * Icon definition for the "rise" outlined icon
 * Represents an upward trending chart or growth indicator
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * SVG path element attributes
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
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
 * Icon SVG structure
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: string;
  /** SVG root attributes */
  attrs: IconAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface Icon {
  /** SVG icon structure and metadata */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Visual style theme of the icon */
  theme: string;
}

/**
 * Rise icon - Outlined theme
 * Displays an upward trending line chart symbolizing growth or increase
 */
declare const RiseOutlinedIcon: Icon;

export default RiseOutlinedIcon;