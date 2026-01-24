/**
 * Dribbble Square Icon (Outlined Theme)
 * 
 * SVG icon definition for the Dribbble logo in a square outline style.
 * Used in Ant Design icon library for rendering Dribbble brand icons.
 */

/**
 * SVG path attribute configuration
 */
interface SvgPathAttrs {
  /** SVG path data string defining the shape geometry */
  d: string;
}

/**
 * SVG path element definition
 */
interface SvgPath {
  /** HTML tag name */
  tag: 'path';
  /** Path attributes containing geometry data */
  attrs: SvgPathAttrs;
}

/**
 * SVG root element attributes
 */
interface SvgAttrs {
  /** SVG viewport coordinates and dimensions (minX minY width height) */
  viewBox: string;
  /** Whether the element can receive focus (accessibility) */
  focusable: string;
}

/**
 * SVG icon structure
 */
interface IconDefinition {
  /** HTML tag name for root element */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child path elements that compose the icon */
  children: SvgPath[];
}

/**
 * Complete icon configuration object
 */
interface Icon {
  /** SVG icon definition containing structure and paths */
  icon: IconDefinition;
  /** Semantic name identifier for the icon */
  name: string;
  /** Visual style theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Dribbble Square outlined icon configuration
 * 
 * @remarks
 * This icon represents the Dribbble brand logo within a square container.
 * The outlined theme provides a minimalist line-based appearance.
 * 
 * @example
 *