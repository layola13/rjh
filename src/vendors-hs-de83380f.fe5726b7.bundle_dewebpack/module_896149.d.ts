/**
 * Import icon component definition (Ant Design outlined style)
 * Represents an import/external link action icon
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG path element definition
 */
interface PathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * SVG root element attributes
 */
interface SvgAttrs {
  /** Fill rule for SVG rendering */
  'fill-rule': 'evenodd';
  /** ViewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: 'false' | 'true';
}

/**
 * SVG icon element structure
 */
interface IconElement {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, groups, etc.) */
  children: PathElement[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon element configuration */
  icon: IconElement;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Import icon definition with outlined theme
 * Contains SVG data for an import/external link icon at 896x896 viewBox
 */
declare const importIconDefinition: IconDefinition;

export default importIconDefinition;