/**
 * OpenAI icon component definition for Ant Design Icons
 * Module: module_916914
 * Original ID: 916914
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** Fill rule for SVG rendering */
  "fill-rule": string;
  /** ViewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
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
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon export structure
 */
interface OpenAIIcon {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: "outlined" | "filled" | "twotone";
}

/**
 * OpenAI logo icon definition in outlined theme
 * Represents the OpenAI brand logo as an SVG icon component
 */
declare const openAIIcon: OpenAIIcon;

export default openAIIcon;