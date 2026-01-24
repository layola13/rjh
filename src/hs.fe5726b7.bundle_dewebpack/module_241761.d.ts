/**
 * CSS模块定义文件
 * 
 * 此模块导出一个CSS样式表，用于自定义下拉菜单组件(.cdropdown)
 * 包含按钮样式、下拉列表样式、悬停效果和禁用状态等
 */

/**
 * Webpack模块工厂函数类型
 * @param exports - 模块导出对象
 * @param module - 模块元数据对象
 * @param require - Webpack的require函数，用于加载其他模块
 */
declare function moduleFactory(
  exports: CSSModuleExports,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * Webpack模块对象
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出对象 */
  exports: CSSModuleExports;
  /** 模块是否已加载 */
  loaded?: boolean;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块的导出对象
 */
interface WebpackRequire {
  (moduleId: string | number): unknown;
}

/**
 * CSS模块导出对象
 * 表示CSS加载器处理后的模块
 */
interface CSSModuleExports {
  /**
   * 将CSS内容推送到样式集合
   * @param entry - CSS条目，包含模块ID和CSS字符串
   */
  push(entry: [string | number, string]): void;
  
  /** CSS模块的toString方法 */
  toString(): string;
}

/**
 * CSS加载器工厂函数
 * @param sourceMap - 是否生成source map
 * @returns CSS模块导出对象
 */
declare function cssLoaderFactory(sourceMap: boolean): CSSModuleExports;

/**
 * 模块导出声明
 * 
 * 该模块调用CSS加载器(模块ID: 986380)处理CSS内容
 * CSS包含以下组件样式：
 * 
 * - .cdropdown: 主容器（浮动定位）
 * - .cdropdown.disable: 禁用状态（透明度0.5）
 * - .cdropdown button: 下拉按钮样式（110px宽，左对齐文本）
 * - .cdropdown > ul: 下拉列表容器（最大高度160px，自动滚动）
 * - .cdropdown > ul li: 列表项（高度28px，悬停时显示蓝色背景）
 * - .cdropdown > ul li .hotKey: 快捷键显示区域（右对齐）
 * - .cdropdown > ul li .right_image: 右侧图标区域
 */
export = moduleFactory;