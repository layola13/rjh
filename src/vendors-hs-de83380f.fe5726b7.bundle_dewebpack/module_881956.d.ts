/**
 * Warning icon component definition (filled theme)
 * Represents a triangular warning/alert symbol
 */
declare module 'module_881956' {
  /**
   * SVG path attributes interface
   */
  interface PathAttributes {
    /** SVG path data string */
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
    /** SVG viewBox coordinate system */
    viewBox: string;
    /** Whether the element can receive focus */
    focusable: string;
  }

  /**
   * Icon SVG structure definition
   */
  interface IconSvg {
    /** Root element tag */
    tag: 'svg';
    /** SVG element attributes */
    attrs: SvgAttributes;
    /** Child elements (paths, shapes, etc.) */
    children: SvgChild[];
  }

  /**
   * Complete icon configuration object
   */
  interface IconDefinition {
    /** SVG icon structure */
    icon: IconSvg;
    /** Icon identifier name */
    name: 'warning';
    /** Visual theme variant */
    theme: 'filled';
  }

  /**
   * Default export: Warning icon definition
   * A filled triangular warning symbol with exclamation mark
   */
  const iconDefinition: IconDefinition;
  
  export default iconDefinition;
}