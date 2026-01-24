/**
 * IE浏览器图标配置（圆形填充主题）
 * Module: module_953552
 * Original ID: 953552
 */

/**
 * SVG属性接口
 */
interface SvgAttrs {
  /** SVG视图框定义 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * Path元素属性接口
 */
interface PathAttrs {
  /** SVG路径数据 */
  d: string;
}

/**
 * SVG子元素配置
 */
interface SvgChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttrs;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** 图标SVG标签名 */
  tag: string;
  /** SVG根元素属性 */
  attrs: SvgAttrs;
  /** SVG子元素列表 */
  children: SvgChild[];
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /** 图标SVG配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * IE浏览器圆形填充图标定义
 */
declare const ieCircleIcon: IconDefinition;

export default ieCircleIcon;