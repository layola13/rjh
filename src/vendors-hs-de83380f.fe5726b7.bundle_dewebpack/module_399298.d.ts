/**
 * Sketch Circle icon component definition (filled theme)
 * Represents a Sketch logo within a circle shape
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * SVG path element configuration
 */
interface PathChild {
  /** HTML tag name */
  tag: "path";
  /** Path element attributes */
  attrs: {
    /** SVG path data defining the shape geometry */
    d: string;
  };
}

/**
 * SVG icon structure definition
 */
interface IconDefinition {
  /** Root SVG element configuration */
  icon: {
    /** HTML tag name */
    tag: "svg";
    /** SVG root attributes */
    attrs: IconAttrs;
    /** Child elements (paths) of the SVG */
    children: PathChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: "filled" | "outlined" | "twotone";
}

/**
 * Sketch Circle filled icon definition
 * 
 * A filled circular icon featuring the Sketch diamond logo.
 * Designed for use in icon libraries and UI components.
 * 
 * @example
 *