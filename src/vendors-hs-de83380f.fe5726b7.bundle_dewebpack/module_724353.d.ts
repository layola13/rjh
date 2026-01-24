/**
 * Trademark Circle Icon - Outlined theme
 * 
 * An SVG icon component representing a trademark symbol (®) within a circle.
 * This icon is typically used to indicate registered trademarks in UI applications.
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** The viewBox attribute defines the position and dimension of the SVG viewport */
  viewBox: string;
  /** Controls whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element configuration */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon object structure
 */
interface TrademarkCircleIcon {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Default export: Trademark Circle icon configuration
 * 
 * @remarks
 * This icon displays a registered trademark symbol (®) enclosed in a circle.
 * The icon uses a 896x896 viewBox with 64px offset and features an outlined style.
 */
declare const trademarkCircleIcon: TrademarkCircleIcon;

export default trademarkCircleIcon;