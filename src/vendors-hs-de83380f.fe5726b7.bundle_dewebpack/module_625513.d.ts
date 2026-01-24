/**
 * Ant Design icon definition - Outlined theme
 * Represents the Ant Design logo icon
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the icon can receive focus */
  focusable: string;
}

/**
 * Path element attributes for SVG rendering
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
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon configuration structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** SVG root element attributes */
    attrs: IconAttrs;
    /** Child elements (paths, groups, etc.) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Ant Design outlined icon definition
 * Contains the complete SVG structure and metadata for the Ant Design logo
 */
declare const antDesignOutlinedIcon: IconDefinition;

export default antDesignOutlinedIcon;