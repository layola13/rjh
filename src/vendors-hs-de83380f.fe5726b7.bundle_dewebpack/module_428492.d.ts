/**
 * Fire icon component definition (outlined theme)
 * SVG icon representing a fire/flame symbol
 */
declare module 'module_428492' {
  /**
   * SVG path attributes interface
   */
  interface PathAttrs {
    /** SVG path data string defining the shape */
    d: string;
  }

  /**
   * SVG element attributes interface
   */
  interface SvgAttrs {
    /** SVG viewBox coordinates and dimensions */
    viewBox: string;
    /** Whether the SVG element can receive focus */
    focusable: string;
  }

  /**
   * SVG child element structure
   */
  interface SvgChild {
    /** HTML tag name */
    tag: 'path';
    /** Path-specific attributes */
    attrs: PathAttrs;
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
      /** Child elements (paths, shapes, etc.) */
      children: SvgChild[];
    };
    /** Icon identifier name */
    name: 'fire';
    /** Visual style theme */
    theme: 'outlined';
  }

  /**
   * Default export: Fire icon definition
   * Contains SVG markup and metadata for rendering a fire icon
   */
  const icon: IconDefinition;
  export default icon;
}