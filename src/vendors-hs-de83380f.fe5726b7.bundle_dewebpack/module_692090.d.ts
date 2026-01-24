/**
 * Swap Left icon definition for Ant Design Icons
 * @module SwapLeftOutlined
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  viewBox: string;
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  d: string;
}

/**
 * SVG child element interface
 */
interface SvgChildElement {
  tag: 'path';
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  tag: 'svg';
  attrs: SvgAttributes;
  children: SvgChildElement[];
}

/**
 * Complete icon configuration
 */
interface IconConfig {
  /** SVG icon structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Swap Left outlined icon configuration
 * Represents a leftward arrow icon used for swap/exchange operations
 */
declare const swapLeftOutlined: IconConfig;

export default swapLeftOutlined;