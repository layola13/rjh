/**
 * SVG icon configuration for DingTalk Circle (filled theme)
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element is focusable */
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
 * SVG child element (path) configuration
 */
interface SvgChildElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** SVG root element tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Array of child elements (paths) */
  children: SvgChildElement[];
}

/**
 * DingTalk Circle icon definition
 */
interface DingTalkCircleIcon {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: 'dingtalk-circle';
  /** Icon theme variant */
  theme: 'filled';
}

/**
 * Default export: DingTalk Circle filled icon configuration
 * 
 * This icon represents the DingTalk logo in a circular filled style.
 * The SVG uses a 896x896 viewBox with the actual content offset by 64 units.
 */
declare const dingTalkCircleIcon: DingTalkCircleIcon;

export default dingTalkCircleIcon;