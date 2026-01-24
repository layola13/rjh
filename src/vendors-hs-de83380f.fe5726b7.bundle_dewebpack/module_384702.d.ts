/**
 * SVG 属性接口
 */
interface SvgAttributes {
  /** SVG 视图框坐标 */
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
interface IconConfig {
  /** 根元素标签名 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: SvgAttributes;
  /** 子元素列表 */
  children: SvgChild[];
}

/**
 * 图标主题类型
 * - outlined: 线框风格
 * - filled: 填充风格
 * - twotone: 双色风格
 */
type IconTheme = 'outlined' | 'filled' | 'twotone';

/**
 * 图标定义接口
 */
interface IconDefinition {
  /** 图标 SVG 配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题 */
  theme: IconTheme;
}

/**
 * 水平边框图标（Ant Design 图标）
 * 用于表示水平方向的边框或分隔线
 */
declare const borderHorizontalIcon: IconDefinition;

export default borderHorizontalIcon;