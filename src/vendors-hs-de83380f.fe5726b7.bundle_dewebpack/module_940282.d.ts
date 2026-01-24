/**
 * 知乎圈形图标配置
 * Zhihu Circle Icon Configuration
 */
export interface IconAttrs {
  /** SVG viewBox 属性 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
  /** path 元素的 d 属性（SVG 路径数据） */
  d?: string;
}

/**
 * SVG 子元素配置
 * SVG Child Element Configuration
 */
export interface IconChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: IconAttrs;
}

/**
 * 图标配置对象
 * Icon Configuration Object
 */
export interface IconConfig {
  /** SVG 根元素标签名 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: IconAttrs;
  /** SVG 子元素数组 */
  children: IconChild[];
}

/**
 * 知乎圈形图标定义
 * Zhihu Circle Icon Definition
 */
export interface ZhihuCircleIcon {
  /** 图标配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题 */
  theme: 'filled' | 'outlined' | 'twoTone';
}

/**
 * 知乎圈形填充图标
 * 包含完整的 SVG 路径数据和配置信息
 */
declare const zhihuCircleIcon: ZhihuCircleIcon;

export default zhihuCircleIcon;