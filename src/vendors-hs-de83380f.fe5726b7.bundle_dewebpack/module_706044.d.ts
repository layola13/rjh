/**
 * SVG 图标属性接口
 * 定义 SVG 元素的基本属性
 */
interface SvgAttributes {
  /** SVG 视图盒子，定义 SVG 画布的坐标系统和尺寸 */
  viewBox: string;
  /** 是否可聚焦，用于无障碍访问 */
  focusable: string;
}

/**
 * Path 元素属性接口
 * 定义 SVG path 元素的属性
 */
interface PathAttributes {
  /** SVG 路径数据，定义图形的形状 */
  d: string;
}

/**
 * SVG 子元素接口
 * 表示 SVG 内部的子元素（如 path）
 */
interface SvgChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttributes;
}

/**
 * 图标定义接口
 * 完整描述一个 SVG 图标的结构
 */
interface IconDefinition {
  /** 元素标签名 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: SvgAttributes;
  /** SVG 子元素数组 */
  children: SvgChild[];
}

/**
 * 图标配置接口
 * 包含图标的完整配置信息
 */
interface IconConfig {
  /** 图标的 SVG 定义 */
  icon: IconDefinition;
  /** 图标名称标识符 */
  name: string;
  /** 图标主题样式（filled: 填充样式, outlined: 轮廓样式, twotone: 双色样式） */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * 电话图标配置
 * 导出一个填充样式的电话图标
 */
declare const phoneIconConfig: IconConfig;

export default phoneIconConfig;