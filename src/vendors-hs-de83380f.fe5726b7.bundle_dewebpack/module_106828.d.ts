/**
 * Ant Design 图标定义：选中圆圈图标（填充主题）
 * Check Circle Filled Icon
 */

/**
 * SVG 元素属性接口
 */
interface SvgAttributes {
  /** SVG 视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * SVG 路径元素属性接口
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
interface IconDefinition {
  /** 图标 SVG 结构 */
  icon: {
    /** 根元素标签名 */
    tag: string;
    /** SVG 根元素属性 */
    attrs: SvgAttributes;
    /** SVG 子元素列表 */
    children: SvgChild[];
  };
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 选中圆圈图标（填充样式）
 * 用于表示完成、成功、选中等状态
 */
declare const CheckCircleFilled: IconDefinition;

export default CheckCircleFilled;