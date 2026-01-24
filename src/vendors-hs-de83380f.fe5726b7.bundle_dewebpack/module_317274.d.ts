/**
 * Build icon component definition (Ant Design outlined theme)
 * Represents a building/construction icon with a grid-like structure
 */
interface IconAttrs {
  /** SVG viewBox coordinates defining the visible area */
  viewBox: string;
  /** Whether the SVG element can receive focus */
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
 * SVG child element structure
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
  /** SVG root attributes */
  attrs: IconAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface BuildIconConfig {
  /** Icon SVG structure and rendering configuration */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: "outlined" | "filled" | "twotone";
}

/**
 * Build icon configuration export
 * Provides a grid/construction icon in outlined style
 */
declare const buildIcon: BuildIconConfig;

export default buildIcon;