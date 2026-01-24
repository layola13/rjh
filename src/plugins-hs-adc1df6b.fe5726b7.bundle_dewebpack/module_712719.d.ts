/**
 * CSS模块导出类型定义
 * 
 * 该模块导出属性栏图片按钮组件的样式定义
 * 包含按钮容器、图片面板、标签文本、图标等UI元素的样式
 * 
 * @module PropertyBarImageButtonStyles
 */

/**
 * CSS模块加载器函数类型
 * 
 * @param insertAtTop - 是否在顶部插入样式，false表示追加到底部
 * @returns CSS模块导出对象，包含push方法用于注册样式规则
 */
type CSSModuleLoader = (insertAtTop: boolean) => {
  /**
   * 注册CSS样式规则
   * 
   * @param rule - 样式规则数组，包含模块ID和CSS字符串
   */
  push(rule: [string, string]): void;
};

/**
 * Webpack模块导出函数签名
 * 
 * @param exports - 模块导出对象
 * @param module - 当前模块对象，包含id等元数据
 * @param require - 模块加载函数，用于导入依赖
 */
export default function(
  exports: {
    /** 模块导出的内容 */
    exports: unknown;
    /** 模块唯一标识符 */
    id: string;
  },
  module: {
    /** 模块唯一标识符 */
    id: string;
  },
  require: (moduleId: number) => CSSModuleLoader
): void;

/**
 * 属性栏图片按钮样式类名映射
 * 
 * 包含所有可用的CSS类名常量
 */
export interface PropertyBarImageButtonStyles {
  /** 主容器样式类 */
  readonly 'property-bar-image-button': string;
  
  /** 工具提示容器样式类 */
  readonly 'property-bar-image-button-tooltip': string;
  
  /** 按钮区域样式类 */
  readonly 'property-bar-image-button-area': string;
  
  /** 图片面板样式类 */
  readonly 'property-bar-image-panel': string;
  
  /** 图片按钮容器样式类 */
  readonly 'property-bar-image-button-image': string;
  
  /** 图片包裹容器样式类 */
  readonly 'property-bar-image-wrap': string;
  
  /** 图片占位文本样式类 */
  readonly 'property-bar-image-text': string;
  
  /** 三角标记容器样式类 */
  readonly 'property-bar-image-triangle-container': string;
  
  /** 三角图标样式类 */
  readonly 'property-bar-image-triangle': string;
  
  /** 角标图标容器样式类 */
  readonly 'property-bar-image-triangle-container-cornericon': string;
  
  /** 错误状态三角图标样式类 */
  readonly 'property-bar-image-triangle_error': string;
  
  /** 警告状态三角图标样式类 */
  readonly 'property-bar-image-triangle_warning': string;
  
  /** 正常状态三角图标样式类 */
  readonly 'property-bar-image-triangle_normal': string;
  
  /** 禁用状态三角容器样式类 */
  readonly 'property-bar-image-triangle-container_disabled': string;
  
  /** 悬停图标样式类 */
  readonly 'property-bar-image-hover-icon': string;
  
  /** 标签容器样式类 */
  readonly 'property-bar-image-button-label': string;
  
  /** 短标签样式类 */
  readonly 'short-label': string;
  
  /** 迷你标签样式类 */
  readonly 'mini-label': string;
  
  /** 标题标签样式类 */
  readonly 'property-bar-image-button-title-label': string;
  
  /** 尺寸标签样式类 */
  readonly 'property-bar-image-button-size-label': string;
  
  /** 标签文本容器样式类 */
  readonly 'property-bar-image-button-label-text-container': string;
  
  /** 标签文本样式类 */
  readonly 'property-bar-image-button-label-text': string;
  
  /** 材质重置按钮样式类 */
  readonly 'material-reset': string;
  
  /** 按钮图标样式类 */
  readonly 'property-bar-image-button-icon': string;
  
  /** 分割线样式类 */
  readonly 'split-line': string;
  
  /** 禁用状态样式类 */
  readonly disabled: string;
}