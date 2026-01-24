/**
 * Field String Icon Definition
 * SVG icon component for representing string/text field type
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * Generic SVG child element structure
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes | PathAttributes | Record<string, never>;
  /** Nested child elements */
  children?: SvgChildElement[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: "svg";
    /** SVG root attributes */
    attrs: SvgAttributes;
    /** Child elements (defs, paths, etc.) */
    children: SvgChildElement[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: "outlined" | "filled" | "twoTone";
}

/**
 * Field String Icon - Represents a text/string field type
 * Used in form builders, data tables, and schema editors
 */
declare const fieldStringIcon: IconDefinition;

export default fieldStringIcon;