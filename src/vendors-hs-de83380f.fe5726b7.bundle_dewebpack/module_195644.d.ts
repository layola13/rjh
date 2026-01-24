/**
 * Merge icon definition for filled theme
 * Represents a merge/branch visualization icon with SVG path data
 */
declare module 'module_195644' {
  /**
   * SVG element attributes interface
   */
  interface SvgAttrs {
    /** Fill rule for SVG rendering */
    'fill-rule': string;
    /** SVG viewBox coordinates and dimensions */
    viewBox: string;
    /** Whether the element can receive focus */
    focusable: string;
  }

  /**
   * Path element attributes interface
   */
  interface PathAttrs {
    /** SVG path data string defining the shape */
    d: string;
  }

  /**
   * SVG child element definition
   */
  interface SvgChild {
    /** HTML/SVG tag name */
    tag: 'path';
    /** Element attributes */
    attrs: PathAttrs;
  }

  /**
   * Icon definition structure
   */
  interface IconDefinition {
    /** Root SVG element configuration */
    icon: {
      /** SVG tag identifier */
      tag: 'svg';
      /** SVG element attributes */
      attrs: SvgAttrs;
      /** Child elements array */
      children: SvgChild[];
    };
    /** Icon identifier name */
    name: 'merge';
    /** Visual theme variant */
    theme: 'filled';
  }

  const iconDefinition: IconDefinition;
  export default iconDefinition;
}