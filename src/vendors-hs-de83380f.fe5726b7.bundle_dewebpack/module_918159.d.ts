/**
 * SVG 图标属性接口
 * 定义 SVG 元素的基本属性
 */
interface SvgAttributes {
  /** SVG 填充规则 */
  'fill-rule': string;
  /** SVG 视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * Path 元素属性接口
 * 定义 SVG path 元素的属性
 */
interface PathAttributes {
  /** SVG 路径数据 */
  d: string;
}

/**
 * SVG 子元素接口
 * 表示 SVG 内部的子元素结构
 */
interface SvgChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttributes;
}

/**
 * 图标配置接口
 * 定义完整的图标结构
 */
interface IconConfig {
  /** 图标标签名 */
  tag: string;
  /** 图标属性 */
  attrs: SvgAttributes;
  /** 图标子元素数组 */
  children: SvgChild[];
}

/**
 * 静音图标定义接口
 * 描述一个完整的图标对象结构
 */
interface MutedIconDefinition {
  /** 图标 SVG 配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 静音图标（Filled 主题）
 * 
 * 这是一个音量静音图标的定义，使用填充样式渲染。
 * 图标包含完整的 SVG 路径数据和配置信息。
 * 
 * @example
 *