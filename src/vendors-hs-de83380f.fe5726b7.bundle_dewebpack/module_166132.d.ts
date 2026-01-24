/**
 * Eye Invisible Icon - Outlined Theme
 * Ant Design icon component for representing hidden/invisible state
 * Typically used for password visibility toggles or content hiding features
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG path element definition
 */
interface PathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path attributes */
  attrs: PathAttrs;
}

/**
 * SVG root element attributes
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Icon definition structure
 */
interface IconNode {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child path elements */
  children: PathElement[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** SVG icon node structure */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Eye Invisible icon definition
 * Represents a crossed-out eye symbol for password hiding or content obscuring
 */
declare const eyeInvisibleOutlined: IconDefinition;

export default eyeInvisibleOutlined;