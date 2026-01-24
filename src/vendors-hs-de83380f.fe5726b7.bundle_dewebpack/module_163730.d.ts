/**
 * Align Left Icon Definition
 * An outlined theme icon representing left text alignment
 */

/**
 * SVG attributes interface
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
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element interface
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure interface
 */
interface IconSvg {
  /** HTML tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements array */
  children: SvgChild[];
}

/**
 * Icon definition interface
 * Represents a complete icon configuration
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon name identifier */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Align Left icon definition
 * Used for left text alignment UI controls
 */
declare const alignLeftIcon: IconDefinition;

export default alignLeftIcon;