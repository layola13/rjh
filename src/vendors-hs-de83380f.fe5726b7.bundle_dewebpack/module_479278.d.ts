/**
 * SVG icon configuration for a box-plot icon with two-tone theme
 * @module BoxPlotIcon
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Prevents the SVG from receiving focus */
  focusable?: string;
  /** Fill color for the path */
  fill?: string;
  /** SVG path data */
  d?: string;
}

/**
 * SVG element structure
 */
interface SvgElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
  /** Child elements (optional) */
  children?: SvgElement[];
}

/**
 * Icon generator function signature
 * @param primaryColor - Primary fill color for the icon
 * @param secondaryColor - Secondary fill color for the two-tone effect
 * @returns SVG element structure
 */
type IconGenerator = (primaryColor: string, secondaryColor: string) => SvgElement;

/**
 * Icon definition interface
 */
interface IconDefinition {
  /** Function that generates the SVG structure */
  icon: IconGenerator;
  /** Semantic name of the icon */
  name: string;
  /** Visual theme of the icon */
  theme: string;
}

/**
 * Box plot icon definition with two-tone theme
 * Represents a statistical box-and-whisker plot visualization
 */
declare const boxPlotIcon: IconDefinition;

export default boxPlotIcon;