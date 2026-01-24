/**
 * CSS模块定义文件
 * 
 * 该模块导出属性栏标签单选按钮组件的样式表
 * 使用CSS-in-JS方式注入样式到webpack构建系统
 * 
 * @module PropertyBarLabelRadioButtonStyles
 */

/**
 * Webpack模块导出函数类型
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数
 */
type WebpackModuleExport = (
  exports: Record<string, unknown>,
  module: { id: string | number; exports: unknown },
  require: (moduleId: number) => CssLoaderFunction
) => void;

/**
 * CSS加载器函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS加载器实例
 */
type CssLoaderFunction = (sourceMap: boolean) => {
  /**
   * 将CSS内容推送到样式数组
   * @param entry - [模块ID, CSS内容字符串]元组
   */
  push(entry: [string | number, string]): void;
};

/**
 * 属性栏标签单选按钮组件的CSS样式定义
 * 
 * 包含以下样式类：
 * - .property-bar-labelradiobutton: 主容器，使用Grid布局
 * - .property-bar-labelradiobutton-btn-selected: 选中状态按钮样式
 * - .property-bar-labelradiobutton__label: 标签文本样式
 * - .property-bar-labelradiobutton__label__question: 问号图标样式
 * - .property-bar-labelradiobutton__label__tooltip: 工具提示样式
 * - .property-bar-labelradiobutton__btns: 按钮容器样式
 */
declare const cssContent: string;

/**
 * 模块导出对象
 * 包含注入到页面的CSS内容
 */
export default cssContent;

/**
 * CSS类名映射接口
 * 提供类型安全的CSS类名访问
 */
export interface PropertyBarLabelRadioButtonClasses {
  /** 主容器类名 - Grid布局容器(82px + 126px列) */
  'property-bar-labelradiobutton': string;
  
  /** 选中状态按钮类名 - 蓝色背景(#396EFE) */
  'property-bar-labelradiobutton-btn-selected': string;
  
  /** 标签文本类名 - 灰色文本(#888888, 12px) */
  'property-bar-labelradiobutton__label': string;
  
  /** 问号图标容器类名 - 垂直居中，24px高度 */
  'property-bar-labelradiobutton__label__question': string;
  
  /** 工具提示类名 - 深色文本(#19191E) */
  'property-bar-labelradiobutton__label__tooltip': string;
  
  /** 隐藏标签类名 */
  'label-hidden': string;
  
  /** 工具提示内部标签类名 */
  'label-tooltip': string;
  
  /** 按钮容器类名 - 右对齐 */
  'property-bar-labelradiobutton__btns': string;
}

/**
 * 获取CSS类名映射
 * @returns CSS类名对象
 */
export function getClasses(): PropertyBarLabelRadioButtonClasses;