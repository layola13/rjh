/**
 * SVG 路径属性接口
 * 定义 SVG path 元素的属性
 */
interface PathAttributes {
  /** SVG 路径数据，定义图形的形状 */
  d: string;
}

/**
 * SVG 元素属性接口
 * 定义根 SVG 元素的属性
 */
interface SvgAttributes {
  /** SVG 视图盒子，定义坐标系统和宽高比 */
  viewBox: string;
  /** 是否可聚焦，用于无障碍访问 */
  focusable: string;
}

/**
 * SVG 子元素接口
 * 描述 SVG 内部的子元素结构
 */
interface SvgChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttributes;
}

/**
 * SVG 图标配置接口
 * 定义完整的 SVG 图标结构
 */
interface IconConfig {
  /** 元素标签名 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: SvgAttributes;
  /** SVG 子元素数组 */
  children: SvgChild[];
}

/**
 * 边框内部图标定义接口
 * Ant Design 图标组件的完整配置
 */
interface BorderInnerIconDefinition {
  /** SVG 图标配置对象 */
  icon: IconConfig;
  /** 图标名称标识符 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 边框内部图标（Border Inner Icon）
 * 
 * Ant Design 图标库中的"边框内部"图标定义
 * - 用于表示内部边框或网格布局
 * - 主题：outlined（线框风格）
 * - 视图盒子：64 64 896 896
 * 
 * @remarks
 * 该图标通常用于布局编辑器、表格设计等场景
 */
declare const borderInnerIcon: BorderInnerIconDefinition;

export default borderInnerIcon;