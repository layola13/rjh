/**
 * SVG图标配置类型定义
 * 描述Ant Design图标组件的结构
 */

/**
 * SVG元素属性接口
 */
interface SVGAttributes {
  /** SVG视口坐标系 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
  /** SVG路径数据 */
  d?: string;
}

/**
 * SVG子元素节点
 */
interface SVGChildNode {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: SVGAttributes;
}

/**
 * 图标配置接口
 */
interface IconDefinition {
  /** SVG根元素配置 */
  icon: {
    /** 根元素标签名 */
    tag: string;
    /** 根元素属性 */
    attrs: SVGAttributes;
    /** 子元素列表 */
    children: SVGChildNode[];
  };
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * 日程安排图标（填充风格）
 * Ant Design图标库中的schedule图标定义
 */
declare const scheduleFilledIcon: IconDefinition;

export default scheduleFilledIcon;