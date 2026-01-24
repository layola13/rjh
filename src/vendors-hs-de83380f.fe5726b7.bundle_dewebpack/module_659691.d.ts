/**
 * 向下插入符号图标配置
 * Caret Down Icon Configuration
 * @module IconCaretDownFilled
 */

/**
 * SVG 元素属性接口
 * Interface for SVG element attributes
 */
interface SvgAttributes {
  /** SVG 视图框坐标 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * Path 元素属性接口
 * Interface for path element attributes
 */
interface PathAttributes {
  /** SVG 路径数据 */
  d: string;
}

/**
 * SVG 子元素接口
 * Interface for SVG child elements
 */
interface SvgChildElement {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttributes;
}

/**
 * 图标配置接口
 * Interface for icon configuration
 */
interface IconDefinition {
  /** SVG 图标对象 */
  icon: {
    /** SVG 标签名 */
    tag: string;
    /** SVG 属性 */
    attrs: SvgAttributes;
    /** SVG 子元素列表 */
    children: SvgChildElement[];
  };
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 向下插入符号图标（填充样式）
 * Caret down icon with filled theme
 * 
 * 用于下拉菜单、折叠面板等场景的向下箭头图标
 * Used for dropdown menus, collapsible panels, etc.
 */
declare const iconCaretDownFilled: IconDefinition;

export default iconCaretDownFilled;