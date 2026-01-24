/**
 * Highlight icon definition (filled theme)
 * Provides SVG icon configuration for Ant Design's highlight icon
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the icon is focusable for accessibility */
  focusable: string;
}

/**
 * Path element attributes for SVG shapes
 */
interface PathAttrs {
  /** SVG path data string defining the shape geometry */
  d: string;
}

/**
 * SVG child element (path) definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** SVG icon structure and content */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Highlight icon (filled variant)
 * Used to represent text highlighting or emphasis actions
 */
declare const highlightFilledIcon: IconDefinition;

export default highlightFilledIcon;