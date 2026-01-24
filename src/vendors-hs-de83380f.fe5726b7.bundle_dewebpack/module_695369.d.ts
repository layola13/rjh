/**
 * SVG 元素属性接口
 */
interface SVGAttributes {
  /**
   * SVG 视图框 - 定义 SVG 画布的坐标系统和显示区域
   * 格式: "min-x min-y width height"
   */
  viewBox?: string;
  /**
   * 是否可聚焦
   */
  focusable?: string;
}

/**
 * SVG Path 元素属性接口
 */
interface PathAttributes {
  /**
   * SVG 路径数据 - 定义形状的绘制指令
   */
  d: string;
}

/**
 * SVG 子元素接口
 */
interface SVGChildElement {
  /**
   * 元素标签名
   */
  tag: 'path';
  /**
   * 路径元素的属性
   */
  attrs: PathAttributes;
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /**
   * 图标的 SVG 根元素
   */
  icon: {
    /**
     * SVG 根元素标签
     */
    tag: 'svg';
    /**
     * SVG 根元素属性
     */
    attrs: SVGAttributes;
    /**
     * SVG 子元素数组 (通常为 path 元素)
     */
    children: SVGChildElement[];
  };
  /**
   * 图标名称 - 用于标识和引用图标
   */
  name: string;
  /**
   * 图标主题类型
   * @example 'filled', 'outlined', 'twotone'
   */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Sketch Square 图标 (填充主题)
 * 
 * 一个以 Sketch 风格呈现的方形图标，采用填充样式。
 * 图标尺寸: 896x896 (viewBox: 64 64 896 896)
 */
declare const sketchSquareIcon: IconDefinition;

export default sketchSquareIcon;