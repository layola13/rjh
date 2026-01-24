/**
 * 知乎方形图标配置
 * Zhihu Square Icon Definition
 */
interface IconAttrs {
  /** SVG viewBox 属性 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * SVG 路径元素属性
 */
interface PathAttrs {
  /** SVG 路径数据 */
  d: string;
}

/**
 * SVG 子元素定义
 */
interface SvgChild {
  /** 元素标签名 */
  tag: 'path';
  /** 路径元素属性 */
  attrs: PathAttrs;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** 图标标签名 */
  tag: 'svg';
  /** SVG 根元素属性 */
  attrs: IconAttrs;
  /** 子元素列表 */
  children: SvgChild[];
}

/**
 * 知乎方形图标定义
 */
interface ZhihuSquareIconDefinition {
  /** 图标配置对象 */
  icon: IconConfig;
  /** 图标名称 */
  name: 'zhihu-square';
  /** 图标主题 */
  theme: 'filled';
}

/**
 * 知乎方形填充图标
 * @description 用于展示知乎品牌的方形填充样式图标
 */
declare const zhihuSquareIcon: ZhihuSquareIconDefinition;

export default zhihuSquareIcon;