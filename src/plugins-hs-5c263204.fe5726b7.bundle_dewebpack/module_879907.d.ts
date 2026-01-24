/**
 * CSS模块导出类型定义
 * 包含反馈文本块组件的样式类名
 */

/**
 * CSS类名映射接口
 * 定义了反馈文本块组件可用的所有CSS类名
 */
export interface FeedbackTextBlockStyles {
  /** 反馈文本块容器样式 - 使用flex布局，内容两端对齐，垂直居中 */
  'feedback-text-block': string;
  
  /** 反馈文本块内容样式 - 字体大小为12px */
  'feedback-text-block-content': string;
  
  /** 黑色主题变体 - 文本颜色为半透明白色(rgba(255, 255, 255, 0.86)) */
  'feedback-black': string;
}

/**
 * 默认导出的CSS模块对象
 * 可通过解构或属性访问获取具体的类名字符串
 */
declare const styles: FeedbackTextBlockStyles;

export default styles;