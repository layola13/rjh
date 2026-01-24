/**
 * VSnackbar组件样式模块
 * 
 * 该模块导入了VSnackbar组件的Sass样式文件。
 * 在构建过程中，样式会被提取并注入到应用中。
 * 
 * @module VSnackbarStyles
 * @packageDocumentation
 */

/**
 * VSnackbar样式副作用导入
 * 
 * 此声明表示该模块仅包含副作用（样式注入），不导出任何值。
 * Webpack/Vite等构建工具会处理.sass文件并将CSS注入到最终bundle中。
 * 
 * @remarks
 * - 该模块没有运行时导出
 * - 仅用于样式加载的副作用
 * - TypeScript会识别此导入但不期望任何导出值
 */
declare module './VSnackbar.sass' {
  // 无导出 - 仅样式副作用
}

/**
 * 替代声明：如果需要在TypeScript项目中导入.sass文件而不报错
 */
declare module '*.sass' {
  const content: Record<string, never>;
  export default content;
}