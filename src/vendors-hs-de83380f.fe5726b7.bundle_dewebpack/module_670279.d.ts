/**
 * 双右箭头图标定义
 * Ant Design 图标库中的 double-right 轮廓图标
 */

/**
 * SVG 元素属性接口
 */
interface SvgAttributes {
  /** SVG 视图框坐标和尺寸 */
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
 * SVG 子元素节点接口
 */
interface SvgChildNode {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttributes;
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /** 图标 SVG 结构 */
  icon: {
    /** 根元素标签名 */
    tag: string;
    /** 根元素属性 */
    attrs: SvgAttributes;
    /** 子元素列表 */
    children: SvgChildNode[];
  };
  /** 图标名称 */
  name: string;
  /** 图标主题风格 */
  theme: string;
}

/**
 * 双右箭头图标配置对象
 * 用于表示向右快进、下一步或前进两级等操作
 */
declare const doubleRightIcon: IconDefinition;

export default doubleRightIcon;