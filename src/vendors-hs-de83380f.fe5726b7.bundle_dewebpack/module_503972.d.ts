/**
 * Fork icon component definition for Ant Design Icons
 * @module IconDefinition
 */

/**
 * SVG attributes interface
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element definition
 */
interface SVGChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure definition
 */
interface IconSVG {
  /** HTML tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements array */
  children: SVGChild[];
}

/**
 * Complete icon definition structure
 */
export interface IconDefinition {
  /** SVG icon structure */
  icon: IconSVG;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Fork icon definition with outlined theme
 * Represents a branching or forking symbol commonly used in version control or tree structures
 */
declare const forkIconDefinition: IconDefinition;

export default forkIconDefinition;