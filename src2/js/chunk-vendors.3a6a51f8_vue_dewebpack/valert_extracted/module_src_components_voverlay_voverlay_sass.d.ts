/**
 * VOverlay 组件的样式模块
 * 
 * 该模块负责导入和注册 VOverlay 组件的 SASS 样式。
 * 由于是样式模块，运行时不导出任何值，仅产生副作用（注入 CSS）。
 * 
 * @module VOverlay/VOverlay.sass
 */

/**
 * 样式模块初始化函数
 * 
 * Webpack 模块加载器会调用此函数来初始化样式模块。
 * 该函数不返回任何值，仅用于触发样式的加载和注入。
 * 
 * @param module - Webpack 模块对象，用于存储模块元数据
 * @param exports - 模块导出对象（样式模块通常为空对象）
 * @param require - Webpack require 函数，用于加载其他模块
 * 
 * @remarks
 * 此声明文件对应的原始模块是一个 SASS 样式文件，
 * 在构建过程中被编译为 CSS 并通过 style-loader 注入到 DOM 中。
 * 运行时不包含任何可导出的 JavaScript 值。
 */
declare function initVOverlayStyles(
  module: unknown,
  exports: Record<string, never>,
  require: unknown
): void;

export default initVOverlayStyles;

/**
 * 类型声明：样式副作用模块
 * 
 * 导入此模块时仅产生副作用（样式注入），不提供任何导出值。
 * 
 * @example
 *