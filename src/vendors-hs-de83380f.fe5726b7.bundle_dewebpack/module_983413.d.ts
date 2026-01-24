/**
 * 图标节点属性接口
 */
interface IconNodeAttrs {
  /** SVG viewBox 属性 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
  /** SVG path 的 d 属性，定义路径数据 */
  d?: string;
}

/**
 * 图标节点接口
 */
interface IconNode {
  /** HTML/SVG 标签名 */
  tag: string;
  /** 标签属性 */
  attrs: IconNodeAttrs;
  /** 子节点列表 */
  children?: IconNode[];
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /** 图标SVG结构 */
  icon: IconNode;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Group 分组图标（outlined 主题）
 * 
 * 包含一个带边框的矩形框架和两个内部矩形区块，
 * 通常用于表示分组、集合或容器的概念
 */
declare const groupOutlined: IconDefinition;

export default groupOutlined;