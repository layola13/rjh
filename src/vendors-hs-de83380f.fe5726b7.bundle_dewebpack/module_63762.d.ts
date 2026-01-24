/**
 * Dribbble图标组件的类型定义
 * 用于Ant Design图标库中的Dribbble品牌图标
 */

/**
 * SVG元素的属性接口
 */
interface SvgAttributes {
  /** SVG视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * Path元素的属性接口
 */
interface PathAttributes {
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
  attrs: PathAttributes;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** SVG根元素标签 */
  tag: string;
  /** SVG根元素属性 */
  attrs: SvgAttributes;
  /** SVG子元素数组 */
  children: SvgChild[];
}

/**
 * Dribbble图标定义接口
 */
interface DribbbleIconDefinition {
  /** 图标SVG配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * Dribbble品牌图标
 * 
 * @remarks
 * 此图标遵循Ant Design图标规范，包含完整的SVG路径定义
 * 主题为outlined（线框风格）
 * 
 * @example
 *