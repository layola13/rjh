/**
 * X icon component definition (filled theme)
 * Represents an "X" symbol icon in SVG format
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
  /** Fill rule for the path rendering */
  'fill-rule'?: 'evenodd' | 'nonzero';
}

/**
 * SVG path element definition
 */
interface PathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path attributes */
  attrs: PathAttrs;
}

/**
 * SVG group attributes interface
 */
interface GroupAttrs {
  /** Fill rule for all children elements */
  'fill-rule'?: 'evenodd' | 'nonzero';
}

/**
 * SVG group element definition
 */
interface GroupElement {
  /** HTML tag name */
  tag: 'g';
  /** Group attributes */
  attrs: GroupAttrs;
  /** Child elements within the group */
  children: PathElement[];
}

/**
 * Root SVG attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG icon structure interface
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG attributes */
  attrs: SvgAttrs;
  /** Child elements of the SVG */
  children: GroupElement[];
}

/**
 * Complete icon configuration interface
 */
interface IconConfig {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * X icon configuration with filled theme
 * Contains SVG paths that render an "X" symbol within a rounded square
 */
declare const iconConfig: IconConfig;

export default iconConfig;