/**
 * Wechat Work Icon Component
 * 企业微信图标组件的类型定义
 */

/**
 * SVG 元素属性接口
 */
interface SVGAttributes {
  /** SVG 填充规则 */
  'fill-rule'?: string;
  /** SVG 视图框 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
  /** 路径数据 */
  d?: string;
}

/**
 * SVG 子元素节点
 */
interface SVGChildNode {
  /** 元素标签名 */
  tag: 'path' | 'circle' | 'rect' | 'polygon' | 'polyline';
  /** 元素属性 */
  attrs: SVGAttributes;
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /** SVG 根元素标签 */
  tag: 'svg';
  /** SVG 根元素属性 */
  attrs: SVGAttributes;
  /** SVG 子元素集合 */
  children: SVGChildNode[];
}

/**
 * 图标配置对象
 */
interface IconConfig {
  /** 图标 SVG 定义 */
  icon: IconDefinition;
  /** 图标名称标识 */
  name: 'wechat-work';
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * 企业微信图标配置
 * 提供企业微信(WeCom)的矢量图标定义
 */
declare const WechatWorkIcon: IconConfig;

export default WechatWorkIcon;