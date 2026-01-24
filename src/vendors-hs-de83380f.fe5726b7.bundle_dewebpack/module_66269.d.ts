/**
 * Trademark icon component definition (outlined theme)
 * Represents a trademark symbol (®) in a circular border
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
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
  /** SVG viewBox coordinates (min-x min-y width height) */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** HTML tag name */
    tag: 'svg';
    /** SVG element attributes */
    attrs: SvgAttrs;
    /** Child elements (paths, groups, etc.) */
    children: PathElement[];
  };
  /** Semantic name of the icon */
  name: string;
  /** Visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Trademark icon definition
 * Displays a trademark symbol (®) within a circle
 * @remarks Used to represent registered trademark indicators in UI
 */
declare const trademarkIcon: IconDefinition;

export default trademarkIcon;