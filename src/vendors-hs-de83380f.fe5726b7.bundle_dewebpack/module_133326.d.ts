/**
 * Ant Design Icon definition for 'file-done' outlined icon
 * Represents a file with a checkmark, typically used to indicate completed or verified files
 */

/**
 * SVG attributes interface for basic SVG properties
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * Generic SVG child element structure
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
  /** Root SVG element tag */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon export structure matching Ant Design icon format
 */
interface AntDesignIconDefinition {
  /** Icon SVG structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant (outlined, filled, or two-tone) */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * File Done Icon - Outlined theme
 * Shows a document with a checkmark indicator
 */
declare const FileDoneOutlined: AntDesignIconDefinition;

export default FileDoneOutlined;