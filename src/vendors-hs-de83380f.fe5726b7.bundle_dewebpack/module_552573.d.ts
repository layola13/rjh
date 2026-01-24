/**
 * Idcard icon component definition (filled theme)
 * @module idcard-filled
 */

/**
 * SVG path attributes interface
 */
interface SVGPathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SVGAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SVGChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: SVGPathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** HTML tag name */
    tag: string;
    /** SVG root attributes */
    attrs: SVGAttributes;
    /** Child SVG elements */
    children: SVGChild[];
  };
  /** Icon name identifier */
  name: string;
  /** Icon visual theme */
  theme: string;
}

/**
 * Idcard filled icon definition
 * Represents an identification card icon in filled style
 */
declare const idcardFilledIcon: IconDefinition;

export default idcardFilledIcon;