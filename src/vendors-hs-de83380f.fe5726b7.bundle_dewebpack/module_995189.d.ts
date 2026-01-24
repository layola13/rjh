/**
 * SVG 图标属性接口
 * 定义 SVG 元素的基本属性
 */
interface SvgAttributes {
  /** SVG 视图盒子坐标和尺寸 */
  viewBox: string;
  /** 是否可通过键盘聚焦 */
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
  tag: string;
  /** 元素属性 */
  attrs: PathAttributes;
}

/**
 * 图标配置接口
 * 定义完整的图标数据结构
 */
interface IconConfig {
  /** 元素标签名 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: SvgAttributes;
  /** SVG 子元素列表 */
  children: SvgChild[];
}

/**
 * 图标定义接口
 * 包含图标的完整元数据
 */
interface IconDefinition {
  /** 图标 SVG 配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * Profile 图标模块
 * 导出 filled 主题的 profile 图标定义
 */
declare const profileFilledIcon: IconDefinition;

export default profileFilledIcon;