/**
 * Bell icon component definition (outlined theme)
 * Ant Design Icons - Bell notification icon
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
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
 * Icon SVG structure definition
 */
interface IconSvg {
  /** SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: string;
}

/**
 * Bell icon definition (outlined variant)
 * Used for notifications, alerts, and reminder UI elements
 */
declare const bellOutlined: IconDefinition;

export default bellOutlined;