/**
 * Sun icon component definition (filled theme)
 * Represents a sun/light mode icon with rays extending from a central circle
 */
declare module 'module_34446' {
  /**
   * SVG path attributes interface
   */
  interface PathAttrs {
    /** SVG path data defining the shape */
    d: string;
  }

  /**
   * SVG element attributes interface
   */
  interface SvgAttrs {
    /** Fill rule for SVG rendering */
    'fill-rule': string;
    /** ViewBox coordinates and dimensions */
    viewBox: string;
    /** Whether the element can receive focus */
    focusable: string;
  }

  /**
   * SVG child element definition
   */
  interface SvgChild {
    /** HTML tag name */
    tag: 'path';
    /** Path-specific attributes */
    attrs: PathAttrs;
  }

  /**
   * Icon structure definition
   */
  interface IconStructure {
    /** Root SVG tag name */
    tag: 'svg';
    /** SVG element attributes */
    attrs: SvgAttrs;
    /** Array of child elements (paths, shapes, etc.) */
    children: SvgChild[];
  }

  /**
   * Complete icon definition object
   */
  interface IconDefinition {
    /** SVG icon structure and content */
    icon: IconStructure;
    /** Icon identifier name */
    name: 'sun';
    /** Icon visual theme variant */
    theme: 'filled';
  }

  /**
   * Default export containing the sun icon definition
   * Used for light mode or brightness-related UI elements
   */
  const iconDefinition: IconDefinition;
  export default iconDefinition;
}