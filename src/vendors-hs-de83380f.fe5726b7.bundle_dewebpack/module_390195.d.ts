/**
 * SVG icon definition for exclamation-circle with outlined theme
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** SVG path data string */
  d?: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Array of child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration
 */
interface IconConfig {
  /** SVG icon structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Exclamation circle icon - outlined theme
 * Displays a circular exclamation mark icon commonly used for warnings or information
 */
declare const exclamationCircleOutlined: IconConfig;

export default exclamationCircleOutlined;