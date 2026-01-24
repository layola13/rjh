/**
 * VCalendar Category 组件样式模块
 * 
 * 该模块导入 VCalendarCategory 组件的 Sass 样式文件。
 * 由于是样式文件，在 TypeScript 中作为副作用导入，不导出任何值。
 * 
 * @module VCalendarCategory.sass
 * @packageDocumentation
 */

/**
 * Sass 样式模块类型声明
 * 
 * 该模块仅用于副作用（样式注入），不包含任何可导出的成员。
 * Webpack 在处理 .sass 文件时会将其编译并注入到 DOM 中。
 */
declare module '*/VCalendarCategory.sass' {
  /**
   * 样式模块无导出内容
   * 使用方式: import './VCalendarCategory.sass'
   */
  const styles: void;
  export default styles;
}

/**
 * 通用 Sass 模块类型声明
 * 
 * 为所有 .sass 文件提供类型支持
 */
declare module '*.sass' {
  const content: void;
  export default content;
}