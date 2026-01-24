/**
 * SVG图标配置 - 左箭头（Caret Left）
 * 定义了一个朝左的三角形箭头图标
 */

/**
 * SVG元素属性接口
 */
interface SvgAttributes {
  /** SVG视图盒子坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * Path元素属性接口
 */
interface PathAttributes {
  /** SVG路径数据 */
  d: string;
}

/**
 * SVG子元素接口
 */
interface SvgChild {
  /** HTML标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttributes;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** 图标SVG配置 */
  icon: {
    /** HTML标签名 */
    tag: string;
    /** SVG根元素属性 */
    attrs: SvgAttributes;
    /** SVG子元素列表 */
    children: SvgChild[];
  };
  /** 图标名称 */
  name: string;
  /** 图标主题风格 */
  theme: string;
}

/**
 * 左箭头图标配置
 * 包含SVG路径定义和元数据
 */
declare const caretLeftIcon: IconConfig;

export default caretLeftIcon;