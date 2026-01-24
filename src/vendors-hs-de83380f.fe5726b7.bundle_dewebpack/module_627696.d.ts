/**
 * 子节点图标组件定义
 * 提供Ant Design风格的子节点添加图标（圆圈内带加号）
 * @module SubnodeIcon
 */

/**
 * SVG元素属性接口
 */
interface SVGAttributes {
  /** SVG视图框尺寸 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
}

/**
 * SVG路径属性接口
 */
interface PathAttributes {
  /** SVG路径数据 */
  d: string;
}

/**
 * SVG元素节点接口
 */
interface SVGElement {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: SVGAttributes | PathAttributes | Record<string, never>;
  /** 子元素 */
  children?: SVGElement[];
}

/**
 * 图标配置接口
 */
interface IconDefinition {
  /** 图标SVG配置 */
  icon: {
    /** 根SVG标签 */
    tag: 'svg';
    /** SVG根元素属性 */
    attrs: SVGAttributes;
    /** SVG子元素集合 */
    children: SVGElement[];
  };
  /** 图标名称 */
  name: string;
  /** 图标主题风格 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * 子节点图标定义
 * 用于表示添加子节点的操作图标
 */
declare const SubnodeOutlined: IconDefinition;

export default SubnodeOutlined;