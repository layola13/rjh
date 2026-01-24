/**
 * Icon definition for the "block" icon in outlined theme.
 * Represents a block or layout grid structure.
 */
export interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG path element attributes
 */
export interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element definition
 */
export interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure definition
 */
export interface IconSvg {
  /** SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon definition object
 */
export interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Block icon definition in outlined theme.
 * Used to represent blocking, layout grids, or structural elements.
 */
declare const blockOutlinedIcon: IconDefinition;

export default blockOutlinedIcon;