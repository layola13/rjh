/**
 * SVG图标配置：3/4加载动画图标
 * @module LoadingThreeQuarters
 */

/**
 * SVG元素属性接口
 */
interface SvgAttrs {
  /** SVG视图框坐标 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * 路径元素属性接口
 */
interface PathAttrs {
  /** SVG路径数据 */
  d: string;
}

/**
 * SVG子元素接口
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
  /** 根SVG元素标签 */
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
 * 3/4加载圆环图标定义
 * 展示一个缺少1/4的圆环，通常用于加载动画
 */
declare const loadingThreeQuartersIcon: IconDefinition;

export default loadingThreeQuartersIcon;