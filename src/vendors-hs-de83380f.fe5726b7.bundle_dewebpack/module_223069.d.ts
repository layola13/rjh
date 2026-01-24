/**
 * Baidu icon definition for Ant Design Icons
 * @module BaiduOutlined
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** Fill rule for SVG rendering */
  "fill-rule": string;
  /** ViewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** SVG root element attributes */
    attrs: SvgAttrs;
    /** Child elements (paths, shapes, etc.) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Baidu logo icon in outlined theme
 * 
 * Represents the official Baidu brand logo as an SVG icon definition
 * compatible with Ant Design's icon system.
 * 
 * @remarks
 * - Theme: outlined
 * - ViewBox: 64 64 896 896
 * - Fill rule: evenodd
 */
declare const BaiduOutlinedIcon: IconDefinition;

export default BaiduOutlinedIcon;