/**
 * Split Cells Icon Component Definition
 * Ant Design Icon: split-cells (outlined theme)
 */

/**
 * SVG attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Indicates if the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * Generic element attributes interface
 */
interface ElementAttrs {
  [key: string]: unknown;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs | ElementAttrs;
  /** Nested child elements (optional) */
  children?: SvgChild[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** SVG root attributes */
    attrs: SvgAttrs;
    /** Child elements array */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Split Cells icon definition
 * Represents a split cells action in a table or grid layout
 */
declare const splitCellsIcon: IconDefinition;

export default splitCellsIcon;