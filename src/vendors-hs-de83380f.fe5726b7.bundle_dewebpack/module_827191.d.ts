/**
 * 右箭头图标定义
 * 
 * @module CaretRightIcon
 * @description Ant Design 右箭头（caret-right）图标的矢量路径定义
 */

/**
 * SVG 元素属性接口
 */
interface SvgAttributes {
  /** SVG 视口坐标系 */
  viewBox: string;
  /** 是否可通过键盘获取焦点 */
  focusable: string;
}

/**
 * SVG 路径元素属性接口
 */
interface PathAttributes {
  /** SVG 路径数据，定义图形形状 */
  d: string;
}

/**
 * SVG 子元素接口
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
  /** 图标的 SVG 结构 */
  icon: {
    /** SVG 根元素标签 */
    tag: string;
    /** SVG 根元素属性 */
    attrs: SvgAttributes;
    /** SVG 子元素数组 */
    children: SvgChild[];
  };
  /** 图标名称标识 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 右箭头图标定义
 * 
 * @remarks
 * 该图标为轮廓主题（outlined）风格，通常用于：
 * - 折叠/展开面板的展开指示器
 * - 下拉菜单的右侧子菜单指示
 * - 轮播图的下一页按钮
 * - 树形控件的展开箭头
 */
declare const caretRightIconDefinition: IconDefinition;

export default caretRightIconDefinition;