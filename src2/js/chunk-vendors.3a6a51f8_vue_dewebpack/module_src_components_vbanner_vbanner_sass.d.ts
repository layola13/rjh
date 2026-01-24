/**
 * VBanner组件样式模块
 * 
 * 此模块导出VBanner组件的样式定义。
 * 作为CSS/SASS模块，它在运行时被webpack处理并注入到DOM中。
 * 
 * @module components/VBanner/VBanner.sass
 * @remarks 该文件通常不包含静态导出，样式通过副作用自动应用
 */

/**
 * Webpack模块导出函数
 * 
 * @param e - Webpack模块导出对象（exports）
 * @param t - Webpack模块对象本身（module）
 * @param n - Webpack require函数，用于加载其他模块
 * @returns void - 样式模块无返回值，通过副作用工作
 * 
 * @remarks
 * - 该模块没有静态导出（no static exports found）
 * - 样式在模块加载时自动注入到页面
 * - 通常与style-loader或mini-css-extract-plugin配合使用
 */
declare function VBannerStyleModule(
  e: Record<string, unknown>,
  t: { exports: Record<string, unknown> },
  n: (moduleId: string) => unknown
): void;

export default VBannerStyleModule;