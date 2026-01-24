/**
 * Money Collect Icon - Outlined Theme
 * 
 * An outlined icon representing money collection or financial transactions.
 * This icon displays a document or receipt with a currency symbol (¥).
 * 
 * @module MoneyCollectOutlined
 */

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
 * Path element attributes interface
 */
interface PathAttributes {
  /** The SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element representing a path
 */
interface SvgPathChild {
  /** The HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** The root SVG tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) that make up the icon */
  children: SvgPathChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** The icon SVG definition */
  icon: IconDefinition;
  /** The semantic name of the icon */
  name: 'money-collect';
  /** The visual theme style of the icon */
  theme: 'outlined';
}

/**
 * Money Collect icon configuration
 * 
 * Provides a complete icon definition including SVG structure,
 * semantic name, and theme information for the money collect icon.
 */
declare const moneyCollectOutlined: IconConfig;

export default moneyCollectOutlined;