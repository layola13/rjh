/**
 * VTreeview 组件样式模块
 * 
 * 该模块导入并注册 VTreeview 组件的 Sass 样式文件。
 * 在 Webpack 构建过程中，样式会被提取并注入到最终的 CSS bundle 中。
 * 
 * @module VTreeview/VTreeview.sass
 * @remarks
 * 这是一个副作用模块，仅用于样式注入，不导出任何运行时值。
 * 通常由 style-loader 或 mini-css-extract-plugin 处理。
 */

/**
 * 样式模块声明
 * 
 * @remarks
 * 由于这是纯 CSS/Sass 模块，它不包含任何 JavaScript 运行时导出。
 * TypeScript 需要此声明以允许导入 .sass 文件而不报错。
 */
declare module '*.sass' {
  /**
   * 样式内容（如果通过 CSS Modules 启用，则为类名映射对象）
   * 
   * @remarks
   * - 标准模式：导入副作用，无导出值
   * - CSS Modules 模式：导出类名到哈希值的映射对象
   */
  const content: Record<string, string>;
  export default content;
}

/**
 * VTreeview 组件样式入口
 * 
 * @remarks
 * 此声明对应原始 Webpack 模块：
 * - 模块路径: `./src/components/VTreeview/VTreeview.sass`
 * - 用途: 为 VTreeview 组件提供样式定义
 * - 导出: 无静态导出（副作用模块）
 */
export {};