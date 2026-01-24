/**
 * Video camera icon definition for Ant Design Icons
 * @module VideoCamera
 */

export interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the icon can receive focus */
  focusable: string;
}

export interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

export interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

export interface IconDefinition {
  /** SVG root element tag */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Child elements of the icon */
  children: IconChild[];
}

/**
 * Complete icon configuration object
 */
export interface AntdIconConfig {
  /** Icon SVG structure definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon visual style theme */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Video camera outlined icon for Ant Design
 * Represents video recording or camera functionality
 */
declare const VideoCameraOutlined: AntdIconConfig;

export default VideoCameraOutlined;