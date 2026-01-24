/**
 * Ant Design Icon: Sync (Outlined)
 * 同步图标组件的类型定义
 */

/**
 * SVG 元素的属性接口
 */
interface SvgAttributes {
  /** SVG 视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * Path 元素的属性接口
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
  tag: 'path';
  /** Path 元素属性 */
  attrs: PathAttributes;
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /** SVG 图标配置 */
  icon: {
    /** 根元素标签名 */
    tag: 'svg';
    /** SVG 根元素属性 */
    attrs: SvgAttributes;
    /** SVG 子元素列表 */
    children: SvgChildNode[];
  };
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * 同步图标定义
 * 用于表示同步、刷新等操作的循环箭头图标
 */
declare const syncOutlinedIcon: IconDefinition;

export default syncOutlinedIcon;