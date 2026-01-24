/**
 * SVG icon definition for the "merge-cells" icon in outlined theme.
 * This icon represents the merge cells functionality, commonly used in spreadsheet or table applications.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Determines if the element can receive focus */
  focusable?: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d?: string;
}

/**
 * Generic SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs | PathAttrs | Record<string, unknown>;
  /** Nested child elements */
  children?: SvgChild[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** SVG root attributes */
    attrs: SvgAttrs;
    /** Child elements of the SVG */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon visual style theme */
  theme: string;
}

/**
 * Merge cells icon definition
 * 
 * @remarks
 * This icon depicts two sections merging together, typically used to represent
 * the merge cells action in table or spreadsheet interfaces.
 */
declare const mergeCellsIcon: IconDefinition;

export default mergeCellsIcon;