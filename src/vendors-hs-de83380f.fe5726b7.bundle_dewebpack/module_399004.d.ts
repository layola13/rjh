/**
 * SVG 图标定义：Radius Setting（圆角设置）
 * 主题：outlined（线框风格）
 */

/**
 * SVG 元素属性接口
 */
interface SVGAttributes {
  /** SVG 视口坐标系 */
  viewBox?: string;
  /** 是否可通过键盘聚焦 */
  focusable?: string;
  /** SVG 路径数据 */
  d?: string;
}

/**
 * SVG 子元素节点
 */
interface SVGChildNode {
  /** 标签名称 */
  tag: string;
  /** 元素属性 */
  attrs: SVGAttributes;
}

/**
 * SVG 图标结构定义
 */
interface SVGIcon {
  /** 根标签名称 */
  tag: string;
  /** 根元素属性 */
  attrs: SVGAttributes;
  /** 子元素列表 */
  children: SVGChildNode[];
}

/**
 * 图标配置对象
 */
interface IconDefinition {
  /** SVG 图标结构 */
  icon: SVGIcon;
  /** 图标名称标识符 */
  name: string;
  /** 图标主题风格 */
  theme: string;
}

/**
 * Radius Setting 图标 - 用于表示圆角设置或边框配置功能
 * @description 包含多个矩形路径的组合图标，线框风格
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;