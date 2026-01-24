/**
 * CSS 样式选择器模块
 * 
 * 该模块导出一个 CSS 样式表，用于渲染样式选择器组件的界面。
 * 包含选择器的布局、按钮样式、选中状态等视觉元素。
 * 
 * @module StyleSelectorStyles
 */

/**
 * Webpack 模块导出函数类型
 * 
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require 函数，用于加载依赖模块
 */
declare function styleLoaderModule(
  exports: Record<string, unknown>,
  module: { id: string; exports: unknown },
  require: (moduleId: number) => unknown
): void;

/**
 * CSS 加载器推送的样式条目
 * 
 * 包含模块 ID 和对应的 CSS 样式字符串
 */
declare type CSSModuleEntry = [
  /** 模块 ID */
  moduleId: string,
  /** CSS 样式内容 */
  cssContent: string
];

/**
 * CSS 加载器返回的样式数组
 * 
 * 该数组包含一个或多个 CSS 模块条目，支持 push 方法用于添加新样式
 */
declare interface CSSLoader extends Array<CSSModuleEntry> {
  /**
   * 添加新的 CSS 样式条目
   * 
   * @param entry - CSS 模块条目，包含模块 ID 和样式内容
   */
  push(entry: CSSModuleEntry): void;
}

/**
 * CSS 加载器工厂函数类型
 * 
 * @param sourceMap - 是否启用 source map
 * @returns CSS 加载器实例
 */
declare type CSSLoaderFactory = (sourceMap: boolean) => CSSLoader;

/**
 * 资源 URL 处理函数类型
 * 
 * 用于处理 CSS 中引用的图片等资源路径
 * 
 * @param resourcePath - 资源的原始路径
 * @returns 处理后的资源 URL
 */
declare type URLHelper = (resourcePath: string) => string;

/**
 * 样式选择器模块依赖项
 */
declare module '992716' {
  /** URL 资源处理辅助函数 */
  export default URLHelper;
}

declare module '986380' {
  /** CSS 加载器工厂函数 */
  export default CSSLoaderFactory;
}

declare module '249207' {
  /** 关闭图标资源路径 */
  export default string;
}

/**
 * 样式选择器组件的 CSS 类名定义
 */
declare interface StyleSelectorClassNames {
  /** 样式选择器容器 - 宽度 110px，包含内边距和字体设置 */
  'style-selector-wrapper': string;
  
  /** 选择器头部 - 包含标题和关闭按钮，使用 flex 布局 */
  'style-selector-header': string;
  
  /** 关闭按钮 - 11x11px 图标，居中显示 */
  'style-selector-close': string;
  
  /** 标题标签 - 浅色文字 (#FAFAFA) */
  'style-selector-label': string;
  
  /** 选择器主体 - flex 换行布局，包含多个选项按钮 */
  'style-selector-body': string;
  
  /** 样式类型按钮 - 40x20px 圆角按钮，默认半透明灰色背景 */
  'style-selector-type': string;
  
  /** 选中状态 - 白色背景，蓝色文字 (#396EFE) */
  'style-selector-selected': string;
  
  /** 选择器底部 - 包含操作按钮 */
  'style-selector-footer': string;
}

export {};