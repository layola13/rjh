/**
 * Flag icon component definition (outlined theme)
 * Represents a flag symbol in the Ant Design icon set
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG path element definition
 */
interface PathElement {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * SVG root element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * SVG icon structure interface
 */
interface IconDefinition {
  /** SVG root element tag */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: PathElement[];
}

/**
 * Complete icon configuration interface
 */
interface IconConfig {
  /** SVG icon structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Flag icon configuration (outlined theme)
 * Used in Ant Design icon system
 */
declare const FlagOutlined: IconConfig;

export default FlagOutlined;