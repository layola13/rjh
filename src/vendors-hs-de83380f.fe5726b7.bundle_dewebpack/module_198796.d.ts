/**
 * Audio icon component definition for Ant Design Icons
 * @module AudioOutlined
 */

/**
 * SVG icon attributes interface
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * SVG path element attributes
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element structure
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** HTML/SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: IconAttrs;
  /** Child elements of the SVG */
  children: IconChild[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Audio microphone icon in outlined style
 * Represents audio recording or voice input functionality
 */
declare const audioOutlinedIcon: IconDefinition;

export default audioOutlinedIcon;