/**
 * VCalendarWeekly 组件样式模块
 * 
 * 该模块包含 VCalendar 周视图组件的样式定义。
 * 由于这是一个 Sass 样式文件，在运行时不导出任何 JavaScript 值，
 * 仅用于副作用（应用样式到 DOM）。
 * 
 * @module VCalendarWeekly.sass
 * @packageDocumentation
 */

/**
 * 样式模块导入函数
 * 
 * Webpack 加载器函数，用于处理和注入 Sass 样式。
 * 此函数在模块加载时执行，但不返回任何导出内容。
 * 
 * @param module - Webpack 模块对象，包含模块元数据
 * @param exports - 模块导出对象（此样式模块为空对象）
 * @param require - Webpack require 函数，用于加载依赖
 * 
 * @remarks
 * - 该函数仅产生副作用（注入 CSS），无静态导出
 * - 在生产环境中，样式通常会被提取到单独的 CSS 文件
 * 
 * @internal
 */
declare function loadVCalendarWeeklyStyles(
  module: WebpackModule,
  exports: Record<string, never>,
  require: WebpackRequire
): void;

/**
 * Webpack 模块对象接口
 * 
 * @internal
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出对象 */
  exports: Record<string, unknown>;
  /** 模块是否已加载 */
  loaded: boolean;
}

/**
 * Webpack require 函数类型
 * 
 * @internal
 */
interface WebpackRequire {
  /** 通过模块 ID 加载模块 */
  (moduleId: string): unknown;
  /** 模块缓存 */
  c: Record<string, WebpackModule>;
}

/**
 * 样式模块默认导出
 * 
 * 由于这是纯样式文件，不包含任何运行时逻辑或导出值。
 * TypeScript 导入此模块时仅用于触发样式加载副作用。
 * 
 * @example
 *