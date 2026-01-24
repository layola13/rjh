/**
 * Apartment icon component definition (outlined theme)
 * Represents a building/apartment structure icon from Ant Design icon set
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the icon shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
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
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** SVG tag name */
    tag: string;
    /** SVG element attributes */
    attrs: SvgAttrs;
    /** Child elements (paths, shapes, etc.) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Apartment icon definition with outlined theme
 * Used for displaying apartment/building related UI elements
 */
declare const apartmentOutlined: IconDefinition;

export default apartmentOutlined;