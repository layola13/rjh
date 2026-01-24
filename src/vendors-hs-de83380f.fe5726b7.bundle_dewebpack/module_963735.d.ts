/**
 * 双左箭头图标定义
 * 用于描述SVG图标的结构、属性和元数据
 */

/**
 * SVG元素属性接口
 */
interface SvgAttrs {
  /** SVG视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * Path元素属性接口
 */
interface PathAttrs {
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
  attrs: PathAttrs;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** SVG根元素标签名 */
  tag: string;
  /** SVG根元素属性 */
  attrs: SvgAttrs;
  /** SVG子元素集合 */
  children: SvgChild[];
}

/**
 * 图标定义接口
 * 完整描述一个Ant Design图标的所有属性
 */
interface IconDefinition {
  /** 图标SVG配置 */
  icon: IconConfig;
  /** 图标名称标识 */
  name: string;
  /** 图标主题风格 */
  theme: string;
}

/**
 * 双左箭头图标（<<）
 * 
 * @remarks
 * - 主题: outlined（线框风格）
 * - 用途: 通常用于分页组件的"跳转首页"或"快速向左"操作
 * - 视图框: 64 64 896 896
 * 
 * @example
 *