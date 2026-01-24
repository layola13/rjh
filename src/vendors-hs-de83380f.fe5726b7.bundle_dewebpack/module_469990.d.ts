/**
 * Tablet icon component definition (filled theme)
 * Represents a tablet device icon for Ant Design icon library
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG definition structure
 */
interface IconSvg {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements array */
  children: SvgChild[];
}

/**
 * Icon definition interface
 * Defines the complete structure for an Ant Design icon
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme style */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Tablet filled icon definition
 * @default Exported tablet icon in filled theme
 */
declare const tabletFilledIcon: IconDefinition;

export default tabletFilledIcon;