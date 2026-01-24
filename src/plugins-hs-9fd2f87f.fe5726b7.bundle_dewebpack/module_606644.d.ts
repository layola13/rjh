/**
 * CSS模块导出类型定义
 * 
 * 该模块定义了进度条组件的样式类名
 * 包含容器、进度条、百分比显示和上传成功图标等样式
 */

/**
 * 进度条组件的CSS类名映射接口
 */
export interface ProgressBarStyles {
  /**
   * 进度条最外层容器
   * 包含内边距和宽度设置
   */
  progressBarContainer: string;

  /**
   * 进度条内容区域
   * 使用Flexbox布局，横向排列元素
   */
  progressBarContent: string;

  /**
   * 进度条主体元素
   * 灰色背景，带内阴影效果
   */
  progressBar: string;

  /**
   * 进度条百分比填充部分
   * 蓝色填充，动态宽度表示进度
   */
  percent: string;

  /**
   * 提示信息容器
   * 居中显示提示文本
   */
  hint: string;

  /**
   * 上传成功图标容器
   * 包含对勾图标的圆形背景
   */
  uploadSuccessIcon: string;
}

/**
 * CSS模块默认导出
 * 
 * @remarks
 * 该模块通过CSS Modules加载样式，返回类名映射对象
 * 所有类名都经过作用域隔离处理，避免样式冲突
 */
declare const styles: ProgressBarStyles;

export default styles;