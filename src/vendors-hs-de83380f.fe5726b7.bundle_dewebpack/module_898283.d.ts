/**
 * Background Colors Icon Component Definition
 * An outlined theme icon representing background color/paint bucket functionality
 */

/**
 * SVG attributes interface for the root svg element
 */
interface SvgAttributes {
  /** The viewBox defines the position and dimension of the SVG viewport */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * Path attributes interface for SVG path elements
 */
interface PathAttributes {
  /** The SVG path data string that defines the shape */
  d: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML tag name for the SVG element */
  tag: string;
  /** Attributes applied to the SVG element */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element tag name */
  tag: string;
  /** Attributes for the root SVG element */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) that compose the icon */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface BgColorsIcon {
  /** The icon's SVG structure and properties */
  icon: IconDefinition;
  /** Semantic name identifier for the icon */
  name: string;
  /** Visual style theme variant */
  theme: string;
}

/**
 * Background Colors Icon
 * A paint bucket/dropper icon used for background color selection functionality
 * @remarks
 * This icon uses the outlined theme variant with a 896x896 viewBox
 */
declare const bgColorsIcon: BgColorsIcon;

export default bgColorsIcon;