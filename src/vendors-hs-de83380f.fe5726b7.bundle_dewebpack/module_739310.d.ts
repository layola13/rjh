/**
 * 图标配置：资金查看图标（fund-view）
 * @description Ant Design 风格的资金查看图标，包含图表和眼睛的组合视觉
 */

/**
 * SVG 元素属性接口
 */
interface SVGAttributes {
  /** SVG 视图框坐标和尺寸 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
  /** SVG 路径数据 */
  d?: string;
}

/**
 * SVG 子元素节点
 */
interface SVGElement {
  /** HTML/SVG 标签名 */
  tag: string;
  /** 元素属性 */
  attrs: SVGAttributes;
  /** 子元素列表 */
  children?: SVGElement[];
}

/**
 * 图标配置对象
 */
interface IconDefinition {
  /** 图标 SVG 结构 */
  icon: {
    /** 根标签名称 */
    tag: string;
    /** 根元素属性 */
    attrs: SVGAttributes;
    /** 子元素集合 */
    children: SVGElement[];
  };
  /** 图标名称标识 */
  name: string;
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * 资金查看图标定义
 * @description 包含以下视觉元素：
 * - 眼睛图形：表示查看/可见性
 * - 图表区域：表示数据面板
 * - 对勾标记：表示确认/完成状态
 */
declare const fundViewIcon: IconDefinition;

export default fundViewIcon;