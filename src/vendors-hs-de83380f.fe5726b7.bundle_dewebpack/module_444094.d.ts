/**
 * Ant Design 图标定义
 * 图标名称: check
 * 图标主题: outlined
 */

/**
 * SVG 元素属性接口
 */
interface SVGAttributes {
  /** SVG 视图盒子坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * Path 元素属性接口
 */
interface PathAttributes {
  /** SVG 路径数据 */
  d: string;
}

/**
 * SVG 子元素节点定义
 */
interface SVGChildNode {
  /** 元素标签名 */
  tag: 'path';
  /** Path 元素的属性 */
  attrs: PathAttributes;
}

/**
 * SVG 图标结构定义
 */
interface SVGIconStructure {
  /** 元素标签名 */
  tag: 'svg';
  /** SVG 根元素的属性 */
  attrs: SVGAttributes;
  /** SVG 子元素集合 */
  children: SVGChildNode[];
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /** SVG 图标结构 */
  icon: SVGIconStructure;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Check 勾选图标定义
 * @description 用于表示选中、完成、确认等状态的勾选标记图标
 */
declare const checkOutlined: IconDefinition;

export default checkOutlined;