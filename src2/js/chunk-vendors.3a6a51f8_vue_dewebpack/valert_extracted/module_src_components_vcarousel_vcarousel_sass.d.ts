/**
 * VCarousel 样式模块
 * 
 * 该模块导入 VCarousel 组件的样式文件。
 * 由于是 SASS 样式文件，在 TypeScript 中作为副作用导入使用。
 * 
 * @module VCarouselStyles
 * @packageDocumentation
 */

/**
 * VCarousel 组件样式导入
 * 
 * 此声明允许 TypeScript 识别 .sass 文件的导入。
 * 实际使用时通过 `import './VCarousel.sass'` 引入样式。
 * 
 * @remarks
 * - 样式文件没有导出任何 JavaScript 值
 * - 仅产生 CSS 副作用，用于样式化 VCarousel 组件
 * - 通常由构建工具（如 Webpack）处理并注入到应用中
 */
declare module '*.sass' {
  /**
   * SASS 模块不导出任何内容
   * 导入此模块仅为了加载样式副作用
   */
  const content: void;
  export default content;
}

/**
 * VCarousel 样式模块的具体声明
 * 
 * @example
 *