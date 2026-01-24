/**
 * Icon definition for the Product icon in outlined theme
 * @module ProductOutlined
 */

/**
 * SVG attributes interface for icon configuration
 */
interface SvgAttrs {
  /** Fill rule for SVG rendering */
  'fill-rule': string;
  /** ViewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** SVG path data string */
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
interface IconStructure {
  /** Root SVG tag */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Product icon in outlined theme
 * Displays a grid layout representing products or dashboard items
 */
declare const productOutlinedIcon: IconDefinition;

export default productOutlinedIcon;