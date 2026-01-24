/**
 * SVG 图标属性接口
 * 定义 SVG 元素的基本属性
 */
interface SvgAttributes {
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
 * 描述 SVG 内部的子元素结构
 */
interface SvgChild {
  /** 元素标签名 */
  tag: 'path';
  /** path 元素的属性 */
  attrs: PathAttributes;
}

/**
 * 图标配置接口
 * 定义图标的完整 SVG 结构
 */
interface IconConfig {
  /** SVG 根元素标签 */
  tag: 'svg';
  /** SVG 根元素属性 */
  attrs: SvgAttributes;
  /** SVG 子元素数组 */
  children: SvgChild[];
}

/**
 * 图标定义接口
 * 包含图标的所有元数据和配置
 */
interface IconDefinition {
  /** 图标 SVG 配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * 菜单折叠图标定义
 * 用于显示菜单折叠/收起状态的 Ant Design 图标
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;