/**
 * Aim icon component definition (outlined theme)
 * Represents a targeting/aiming crosshair symbol
 */

/**
 * SVG element attributes
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the element is focusable */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * Generic element attributes (empty for defs/style tags)
 */
interface EmptyAttrs {}

/**
 * SVG child element (path)
 */
interface PathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path attributes */
  attrs: PathAttrs;
}

/**
 * SVG child element (style)
 */
interface StyleElement {
  /** HTML tag name */
  tag: 'style';
  /** Style attributes */
  attrs: EmptyAttrs;
}

/**
 * SVG child element (defs)
 */
interface DefsElement {
  /** HTML tag name */
  tag: 'defs';
  /** Defs attributes */
  attrs: EmptyAttrs;
  /** Nested style elements */
  children: StyleElement[];
}

/**
 * Union type for all possible SVG child elements
 */
type SvgChildElement = DefsElement | PathElement;

/**
 * Icon SVG structure
 */
interface IconSvg {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (defs and paths) */
  children: SvgChildElement[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Aim icon (outlined theme) - represents a targeting crosshair
 * Contains two path elements:
 * 1. Outer crosshair frame with extending lines
 * 2. Inner circular center target
 */
declare const aimOutlinedIcon: IconDefinition;

export default aimOutlinedIcon;