/**
 * Skin icon component definition for Ant Design icon system
 * @module SkinTwoTone
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG element child node
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * SVG root element attributes
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** HTML tag name for root element */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child path elements */
  children: SvgChild[];
}

/**
 * Icon generator function signature
 * @param primaryColor - Primary color for the icon outline
 * @param secondaryColor - Secondary color for the icon fill
 * @returns Complete SVG icon definition
 */
type IconFunction = (primaryColor: string, secondaryColor: string) => IconDefinition;

/**
 * Icon component configuration
 */
interface IconComponent {
  /** Function that generates the icon SVG structure */
  icon: IconFunction;
  /** Icon identifier name */
  name: 'skin';
  /** Icon visual theme variant */
  theme: 'twotone';
}

/**
 * Skin TwoTone icon component
 * Represents a skin/theme switching icon in two-tone style
 */
declare const SkinTwoToneIcon: IconComponent;

export default SkinTwoToneIcon;