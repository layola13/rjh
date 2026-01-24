/**
 * Icon definition for a field-number icon in outlined theme.
 * This represents a numeric field icon commonly used in form components.
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * Style tag attributes interface (empty but included for structure)
 */
interface StyleAttrs {}

/**
 * Defs tag attributes interface (empty but included for structure)
 */
interface DefsAttrs {}

/**
 * Root SVG attributes interface
 */
interface SvgAttrs {
  /** Defines the coordinate system and aspect ratio */
  viewBox: string;
  /** Controls focus behavior for accessibility */
  focusable: string;
}

/**
 * Generic SVG element node structure
 */
interface SvgNode<T = Record<string, unknown>> {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: T;
  /** Optional child elements */
  children?: SvgNode[];
}

/**
 * Icon definition structure matching Ant Design icon specification
 */
interface IconDefinition {
  /** Root SVG icon structure */
  icon: {
    /** SVG tag name */
    tag: "svg";
    /** SVG root attributes */
    attrs: SvgAttrs;
    /** Child elements (defs, paths, etc.) */
    children: Array<
      | SvgNode<DefsAttrs>
      | SvgNode<PathAttrs>
    >;
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: "outlined" | "filled" | "twotone";
}

/**
 * Field Number Icon Definition
 * 
 * An outlined icon representing a numeric field, typically used in forms
 * or data entry interfaces. The icon displays a stylized "N" with a 
 * numeric indicator.
 */
declare const fieldNumberIcon: IconDefinition;

export default fieldNumberIcon;