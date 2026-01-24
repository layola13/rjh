/**
 * 左箭头图标组件定义
 * 提供一个指向左侧的箭头SVG图标配置
 */

/**
 * SVG元素属性接口
 */
interface SvgAttributes {
  /** SVG视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * Path元素属性接口
 */
interface PathAttributes {
  /** SVG路径数据 */
  d: string;
}

/**
 * SVG子元素节点接口
 */
interface SvgChildNode {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttributes;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** SVG根元素标签 */
  tag: string;
  /** SVG根元素属性 */
  attrs: SvgAttributes;
  /** SVG子元素列表 */
  children: SvgChildNode[];
}

/**
 * 左箭头图标定义接口
 */
interface LeftIconDefinition {
  /** 图标SVG配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 左箭头图标配置对象
 * 
 * @remarks
 * 该图标采用outlined主题风格，默认视图框为 64x64 到 896x896
 * 
 * @example
 *