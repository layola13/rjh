/**
 * Truck filled icon definition
 * Ant Design Icons - Truck icon with filled theme
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** Fill rule for SVG rendering */
  "fill-rule": string;
  /** ViewBox dimensions for SVG coordinate system */
  viewBox: string;
  /** Whether the element can receive focus */
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
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface TruckIconConfig {
  /** Icon SVG structure and configuration */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: string;
}

/**
 * Truck filled icon - represents delivery vehicle or transportation
 * @remarks
 * This icon is part of the Ant Design icon set with filled theme.
 * Suitable for logistics, delivery, and transportation related UI elements.
 */
declare const truckIcon: TruckIconConfig;

export default truckIcon;