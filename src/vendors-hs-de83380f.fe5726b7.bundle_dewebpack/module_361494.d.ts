/**
 * Shop icon component definition (filled theme)
 * Represents a store/shop icon with building structure
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes for SVG rendering
 */
interface PathAttrs {
  /** SVG path data describing the shape */
  d: string;
}

/**
 * SVG child element structure
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
  /** SVG root element tag */
  tag: string;
  /** SVG root attributes */
  attrs: IconAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface ShopIconConfig {
  /** Icon SVG structure definition */
  icon: IconDefinition;
  /** Semantic name of the icon */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Shop icon (filled theme) - represents a retail store or shop building
 * @constant
 */
declare const shopIcon: ShopIconConfig;

export default shopIcon;