/**
 * Ant Design Icon Definition
 * Icon name: project
 * Theme: outlined
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
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
 * Icon configuration structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** Root element tag name */
    tag: string;
    /** SVG root attributes */
    attrs: SvgAttrs;
    /** Child elements array */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: string;
}

/**
 * Project icon definition (outlined theme)
 * Represents a bar chart or project analytics visualization
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;