/**
 * Yuque (语雀) icon definition for outlined theme
 * This icon represents the Yuque brand logo in SVG format
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG path element structure
 */
interface PathElement {
  /** HTML tag name */
  tag: "path";
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * SVG root element attributes
 */
interface SvgAttrs {
  /** SVG viewBox coordinates: min-x min-y width height */
  viewBox: string;
  /** Whether the SVG is focusable via keyboard navigation */
  focusable: string;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** HTML tag name */
    tag: "svg";
    /** SVG element attributes */
    attrs: SvgAttrs;
    /** Child elements (paths, shapes, etc.) */
    children: PathElement[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual style theme variant */
  theme: "outlined" | "filled" | "twotone";
}

/**
 * Yuque icon definition export
 * Provides the complete SVG structure for rendering the Yuque brand logo
 */
declare const yuqueOutlined: IconDefinition;

export default yuqueOutlined;