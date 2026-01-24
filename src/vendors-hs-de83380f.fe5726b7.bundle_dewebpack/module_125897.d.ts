/**
 * WeChat Work icon definition for Ant Design Icons
 * @module WeChatWorkFilled
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element representing a path
 */
interface PathElement {
  /** Element tag name */
  tag: 'path';
  /** Path attributes */
  attrs: PathAttrs;
}

/**
 * SVG root element attributes
 */
interface SvgAttrs {
  /** Fill rule for SVG rendering */
  'fill-rule': 'evenodd';
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: 'false' | 'true';
}

/**
 * SVG root element structure
 */
interface SvgElement {
  /** Element tag name */
  tag: 'svg';
  /** SVG attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) */
  children: PathElement[];
}

/**
 * Icon definition structure following Ant Design Icons specification
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: SvgElement;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * WeChat Work filled icon definition
 * Contains the complete SVG structure for rendering the WeChat Work logo
 */
declare const wechatWorkFilledIcon: IconDefinition;

export default wechatWorkFilledIcon;