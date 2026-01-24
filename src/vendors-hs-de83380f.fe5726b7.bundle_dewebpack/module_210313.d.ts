/**
 * Truck icon component definition
 * SVG icon representing a delivery truck in outlined theme
 */
interface IconAttrs {
  /** SVG fill rule for rendering */
  'fill-rule': string;
  /** SVG viewBox dimensions */
  viewBox: string;
  /** Whether the icon can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure
 */
interface IconSvg {
  /** HTML tag name */
  tag: string;
  /** SVG root attributes */
  attrs: IconAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Icon definition object
 */
interface IconDefinition {
  /** SVG icon structure and content */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon visual style theme */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Truck delivery icon in outlined style
 * Displays a side view of a cargo truck with wheels and cargo area
 */
declare const truckIcon: IconDefinition;

export default truckIcon;