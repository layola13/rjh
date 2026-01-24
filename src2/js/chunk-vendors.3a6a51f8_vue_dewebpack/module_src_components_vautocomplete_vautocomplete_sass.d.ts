/**
 * VAutocomplete 组件样式模块
 * 
 * 此模块包含 VAutocomplete 组件的 Sass 样式定义。
 * 作为样式模块，它在导入时会自动应用样式到组件中。
 * 
 * @module VAutocomplete.sass
 * @packageDocumentation
 */

/**
 * 样式模块的副作用导入函数
 * 
 * 此函数在模块加载时执行，用于注册和应用 VAutocomplete 组件的样式。
 * 由于是样式文件，不导出任何静态内容，仅产生副作用（注入样式到 DOM）。
 * 
 * @remarks
 * - 该模块没有任何导出值
 * - 主要用途是通过 webpack 的样式加载器注入 CSS
 * - 通常与 sass-loader、css-loader 和 style-loader 配合使用
 * 
 * @internal
 */
declare module './components/VAutocomplete/VAutocomplete.sass' {
  /**
   * 样式模块没有导出任何内容
   * 仅在导入时产生副作用（注入样式）
   */
  const styles: void;
  export default styles;
}