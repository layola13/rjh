/**
 * Calculator icon component definition (Ant Design outlined theme)
 * Represents a calculator symbol with plus, X, and equals signs
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
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
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
 * Icon structure definition
 */
interface IconStructure {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child SVG elements */
  children: SvgChild[];
}

/**
 * Complete icon definition with metadata
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Calculator icon definition for Ant Design icon system
 * @type {IconDefinition}
 */
declare const calculatorIcon: IconDefinition;

export default calculatorIcon;