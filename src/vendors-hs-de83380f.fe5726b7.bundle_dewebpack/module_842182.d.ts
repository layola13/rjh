/**
 * Python icon component definition for Ant Design Icons
 * Represents a Python programming language logo in outlined theme
 */

/**
 * SVG attributes interface for path elements
 */
interface PathAttributes {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG attributes interface for the root svg element
 */
interface SvgAttributes {
  /** Fill rule for SVG rendering */
  "fill-rule": string;
  /** ViewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * Represents a child element within the SVG structure
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: "path";
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  tag: "svg";
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) that compose the icon */
  children: SvgChildElement[];
}

/**
 * Complete icon metadata and definition
 */
interface PythonIconConfig {
  /** Icon SVG structure and styling */
  icon: IconDefinition;
  /** Icon identifier name */
  name: "python";
  /** Visual theme variant */
  theme: "outlined";
}

/**
 * Python programming language icon definition in outlined style
 * Contains two interlocking snake shapes representing the Python logo
 */
declare const pythonIcon: PythonIconConfig;

export default pythonIcon;