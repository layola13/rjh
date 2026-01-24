/**
 * Tool icon component definition (Ant Design outlined theme)
 * Represents a wrench/tool icon in SVG format
 */
declare module 'module_603550' {
  /**
   * SVG path attributes interface
   */
  interface PathAttributes {
    /** SVG path data string defining the shape */
    d: string;
  }

  /**
   * SVG child element definition
   */
  interface SvgChild {
    /** HTML tag name */
    tag: 'path';
    /** Path element attributes */
    attrs: PathAttributes;
  }

  /**
   * Root SVG element attributes
   */
  interface SvgAttributes {
    /** SVG viewport coordinates and dimensions */
    viewBox: string;
    /** Whether the SVG should be focusable */
    focusable: string;
  }

  /**
   * Icon SVG structure
   */
  interface IconSvg {
    /** Root SVG tag */
    tag: 'svg';
    /** SVG element attributes */
    attrs: SvgAttributes;
    /** Child elements (paths) */
    children: SvgChild[];
  }

  /**
   * Complete icon definition
   */
  interface IconDefinition {
    /** SVG icon structure */
    icon: IconSvg;
    /** Icon identifier name */
    name: 'tool';
    /** Icon theme variant */
    theme: 'outlined';
  }

  /**
   * Default export: Tool icon definition
   * Used for displaying a wrench/tool icon in outlined style
   */
  const iconDefinition: IconDefinition;
  
  export default iconDefinition;
}