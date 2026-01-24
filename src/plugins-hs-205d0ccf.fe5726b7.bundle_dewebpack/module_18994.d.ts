/**
 * CSS 模块类型定义
 * 
 * 该模块导出搜索结果项的样式定义，包含浅色和深色主题的交互样式
 */

/**
 * CSS 类名映射接口
 * 定义了组件中使用的所有 CSS 类名
 */
export interface CSSModuleClasses {
  /** 搜索结果项的外层容器样式 */
  'item-wrapper': string;
  
  /** 列表项前的圆点指示器样式 */
  dian: string;
  
  /** 内容区域容器样式 */
  content: string;
  
  /** 标签文本样式（带倾斜效果） */
  'tag-span': string;
  
  /** 标题文本样式（支持多行省略） */
  title: string;
  
  /** 标题内容样式 */
  'title-content': string;
  
  /** 关键词容器样式（单行省略） */
  'key-word-wrapper': string;
  
  /** 单个关键词样式 */
  'key-word': string;
  
  /** 浅色主题样式类 */
  'teaching-light': string;
  
  /** 深色主题样式类 */
  'teaching-black': string;
}

/**
 * CSS 模块导出接口
 * 
 * @remarks
 * 该模块包含搜索结果项的完整样式定义：
 * - 基础布局：使用 flexbox 布局，支持圆点标记和内容区域
 * - 文本样式：PingFang SC 字体系列，支持多种字重
 * - 交互效果：hover 状态下的背景色和文字颜色过渡动画
 * - 主题支持：
 *   - teaching-light: 浅色主题，hover 时背景色 rgba(111, 129, 175, 0.1)
 *   - teaching-black: 深色主题，hover 时背景色 rgba(255, 255, 255, 0.04)
 * - 高亮显示：em 标签用于关键词高亮，颜色为 #eb5d46
 * - 文本截断：标题支持 2 行省略，关键词支持单行省略
 * 
 * @example
 *