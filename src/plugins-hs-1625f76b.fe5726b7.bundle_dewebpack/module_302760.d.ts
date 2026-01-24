/**
 * CSS模块导出类型定义
 * 该模块定义了进度条组件的样式类名
 */

/**
 * 进度条容器样式类名映射接口
 */
export interface ProgressBarStyles {
  /**
   * 进度条容器主样式
   * - 宽度: 400px
   * - 内边距: 上0px, 左右20px, 下20px
   */
  progressBarContainer: string;

  /**
   * 进度条内容区域样式
   * - 使用Flexbox布局（行方向）
   * - 垂直和水平居中对齐
   */
  progressBarContent: string;

  /**
   * 进度条轨道样式
   * - 高度: 6px
   * - 背景色: #f3f3f3
   * - 圆角: 3px
   * - 宽度: 95%
   */
  progressBar: string;

  /**
   * 进度条百分比填充样式
   * - 背景色: #000（黑色）
   * - 圆角: 3px
   * - 初始宽度: 0（通过动态样式更新）
   */
  percent: string;

  /**
   * 提示文本样式
   * - 上下边距: 20px
   * - 文字颜色: #000
   */
  hint: string;

  /**
   * 上传成功图标容器样式
   * - 左边距: 5px
   * - 上内边距: 1px
   */
  uploadSuccessIcon: string;
}

/**
 * CSS模块默认导出
 * 包含所有样式类名的映射对象
 */
declare const styles: ProgressBarStyles;

export default styles;