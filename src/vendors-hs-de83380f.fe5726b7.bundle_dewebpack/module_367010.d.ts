/**
 * Icon definition for the "file" outlined icon from Ant Design Icons.
 * Represents a generic file/document symbol.
 * 
 * @module FileOutlinedIcon
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon structure and properties */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * File outlined icon definition
 * Used to represent generic files or documents in the UI
 */
declare const fileOutlinedIcon: IconDefinition;

export default fileOutlinedIcon;