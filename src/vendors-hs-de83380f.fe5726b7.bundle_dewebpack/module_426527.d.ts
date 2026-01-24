/**
 * Switcher icon component configuration
 * Represents a switcher/toggle interface element in outlined theme
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
  /** SVG path data string defining the shape */
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
 * Icon configuration structure
 */
interface IconConfig {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition object
 */
interface SwitcherIconDefinition {
  /** Icon visual configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Switcher icon definition
 * An outlined icon depicting a switcher/toggle interface with overlapping rectangles
 */
declare const switcherIcon: SwitcherIconDefinition;

export default switcherIcon;