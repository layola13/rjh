/**
 * Aliyun icon component definition for Ant Design Icons
 * @module AliyunOutlined
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon configuration interface
 */
interface IconDefinition {
  /** SVG element tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon object structure
 */
interface AliyunIconConfig {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Aliyun outlined icon definition
 * Represents the Aliyun (Alibaba Cloud) logo in outlined style
 */
declare const aliyunOutlinedIcon: AliyunIconConfig;

export default aliyunOutlinedIcon;