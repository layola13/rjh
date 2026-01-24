/**
 * Redo icon component definition for Ant Design Icons
 * Represents a redo/repeat action icon in outlined theme
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** The viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure definition
 */
interface IconDefinition {
  /** HTML tag name for the root element */
  tag: string;
  /** Root element attributes */
  attrs: SvgAttributes;
  /** Child elements array */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface RedoIconConfig {
  /** SVG icon structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Redo icon configuration export
 * Provides the complete icon definition for rendering a redo/repeat icon
 */
declare const redoIconConfig: RedoIconConfig;

export default redoIconConfig;