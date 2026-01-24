/**
 * SVG图标定义：radius-bottomleft（左下圆角图标）
 * 主题：outlined（线框风格）
 */

/**
 * SVG元素属性接口
 */
interface SvgAttributes {
  /** SVG视图盒子坐标 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
  /** SVG路径数据 */
  d?: string;
}

/**
 * SVG子元素节点接口
 */
interface SvgChildNode {
  /** 元素标签名 */
  tag: string;
  /** 元素属性集合 */
  attrs: SvgAttributes;
}

/**
 * SVG图标结构接口
 */
interface SvgIcon {
  /** 根元素标签名 */
  tag: string;
  /** 根元素属性 */
  attrs: SvgAttributes;
  /** 子元素节点数组 */
  children: SvgChildNode[];
}

/**
 * 图标配置接口
 */
interface IconDefinition {
  /** SVG图标结构 */
  icon: SvgIcon;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * 左下圆角图标定义
 * 用于表示容器或边框的左下角圆角样式
 */
declare const radiusBottomLeftIcon: IconDefinition;

export default radiusBottomLeftIcon;