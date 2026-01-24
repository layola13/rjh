/**
 * Icon definition for the dot-net icon.
 * Represents the .NET framework logo in outlined theme.
 */

/**
 * SVG attributes configuration
 */
interface SvgAttrs {
  /** SVG fill rule for path rendering */
  'fill-rule': string;
  /** SVG viewBox defining the coordinate system */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * Group element attributes
 */
interface GroupAttrs {
  /** Fill opacity value for the group */
  'fill-opacity': string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG element node structure
 */
interface SvgElement<T = Record<string, unknown>> {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: T;
  /** Child elements (optional) */
  children?: SvgElement[];
}

/**
 * Icon definition structure for Ant Design icons
 */
interface IconDefinition {
  /** Root SVG icon configuration */
  icon: SvgElement<SvgAttrs>;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Dot Net icon definition
 * Contains the SVG markup for rendering the .NET framework logo
 */
declare const dotNetIcon: IconDefinition;

export default dotNetIcon;