/**
 * QuestionCircle outlined icon definition
 * Ant Design Icons - Question mark icon in outlined style
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
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon configuration structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon export structure
 */
interface IconExport {
  /** SVG icon definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon style theme */
  theme: string;
}

/**
 * Question mark icon in outlined style
 * Displays a question mark symbol typically used for help or info indicators
 */
declare const QuestionOutlined: IconExport;

export default QuestionOutlined;