/**
 * Ant Design Icon Definition
 * Icon: arrows-alt (outlined theme)
 */

/**
 * SVG属性接口
 */
interface SvgAttributes {
  /** SVG视图盒子坐标 */
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
 * SVG子元素接口
 */
interface SvgChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttributes;
}

/**
 * 图标配置接口
 */
interface IconDefinition {
  /** SVG根元素标签名 */
  tag: string;
  /** SVG根元素属性 */
  attrs: SvgAttributes;
  /** SVG子元素数组 */
  children: SvgChild[];
}

/**
 * 图标导出接口
 */
interface ArrowsAltIcon {
  /** 图标SVG配置 */
  icon: IconDefinition;
  /** 图标名称 */
  name: string;
  /** 图标主题 */
  theme: string;
}

/**
 * ArrowsAlt图标定义（全屏展开/收缩箭头图标）
 * @description 用于表示全屏、展开或最大化操作的双向箭头图标
 */
declare const arrowsAltIcon: ArrowsAltIcon;

export default arrowsAltIcon;