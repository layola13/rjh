/**
 * SVG 路径属性接口
 * 定义 SVG path 元素的属性结构
 */
interface PathAttributes {
  /** SVG path 的 d 属性，定义路径数据 */
  d: string;
}

/**
 * SVG 子元素接口
 * 描述 SVG 内部子元素的结构
 */
interface SvgChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttributes;
}

/**
 * SVG 属性接口
 * 定义 SVG 根元素的属性
 */
interface SvgAttributes {
  /** SVG 视图框，定义坐标系统和可视区域 */
  viewBox: string;
  /** 是否可通过键盘聚焦 */
  focusable: string;
}

/**
 * 图标配置接口
 * 描述完整的图标 SVG 结构
 */
interface IconConfig {
  /** SVG 根元素标签 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: SvgAttributes;
  /** SVG 子元素数组 */
  children: SvgChild[];
}

/**
 * 图标定义接口
 * 完整的图标对象定义，包含图标配置、名称和主题
 */
interface IconDefinition {
  /** 图标的 SVG 配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题样式 */
  theme: string;
}

/**
 * 右边框图标
 * Ant Design 图标库中的 border-right 图标定义
 * @remarks
 * 这是一个 outlined 主题的图标，用于表示右边框或右侧分割线
 */
declare const borderRightIcon: IconDefinition;

export default borderRightIcon;