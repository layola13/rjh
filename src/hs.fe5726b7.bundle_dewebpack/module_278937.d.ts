/**
 * CSS模块导出声明
 * 该模块导出滑块输入组件的样式定义
 * @module SliderInputStyles
 */

/**
 * 样式类名映射接口
 * 定义了滑块输入组件可用的CSS类名
 */
export interface SliderInputStyles {
  /**
   * 滑块输入容器类名
   * 样式特性：
   * - 相对定位
   * - 宽度220px
   * - 内联弹性布局
   * - 垂直居中对齐
   * - 高度34px
   */
  'slider-input': string;

  /**
   * 滑块外层容器类名
   * 样式特性：
   * - 右边距6px
   */
  'slider-outer': string;
}

/**
 * 默认导出的样式对象
 * 包含所有样式类名的字符串映射
 */
declare const styles: SliderInputStyles;

export default styles;

/**
 * CSS内容常量
 * 包含实际的CSS规则定义
 */
export const cssContent: string;

/**
 * 模块标识符
 */
export const moduleId: string | number;

/**
 * 源映射标识
 * false表示不包含源映射
 */
export const sourceMap: false;