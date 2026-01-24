/**
 * Percentage icon component definition (outlined theme)
 * Represents a percentage symbol with a diagonal line and two circles
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes for SVG shapes
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
 * Icon SVG structure definition
 */
interface IconSvg {
  /** SVG root tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Percentage icon definition with outlined theme
 * Contains SVG path data for rendering a percentage symbol
 * - Diagonal line from top-right to bottom-left
 * - Circle in top-left quadrant
 * - Circle in bottom-right quadrant
 */
declare const percentageIcon: IconDefinition;

export default percentageIcon;