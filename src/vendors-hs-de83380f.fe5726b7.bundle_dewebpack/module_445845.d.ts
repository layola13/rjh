/**
 * Copyright Circle Filled Icon
 * 版权符号圆形填充图标组件定义
 */

/**
 * SVG 元素属性接口
 */
interface SvgAttrs {
  /** SVG 视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * Path 元素属性接口
 */
interface PathAttrs {
  /** SVG 路径数据 */
  d: string;
}

/**
 * SVG 子元素接口
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
  /** 元素标签名 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: SvgAttrs;
  /** SVG 子元素列表 */
  children: SvgChild[];
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /** 图标 SVG 配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 版权符号圆形填充图标
 * @description 带有版权符号(C)的圆形填充图标，常用于版权声明场景
 */
declare const copyrightCircleFilled: IconDefinition;

export default copyrightCircleFilled;