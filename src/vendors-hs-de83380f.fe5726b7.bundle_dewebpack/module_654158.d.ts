/**
 * REST icon component definition for Ant Design Icons
 * @module RestOutlined
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * Generic attributes type for SVG child elements
 */
type ElementAttributes = SvgAttributes | PathAttributes | Record<string, never>;

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: ElementAttributes;
  /** Nested child elements (optional) */
  children?: SvgChild[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** Root tag name */
    tag: string;
    /** Root element attributes */
    attrs: SvgAttributes;
    /** Child elements array */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * REST icon definition (outlined theme)
 * Represents a camera/photography icon with circular lens and body
 */
declare const restOutlinedIcon: IconDefinition;

export default restOutlinedIcon;