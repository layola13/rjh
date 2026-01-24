/**
 * SVG资源模块 - 右侧收起/展开图标
 * @module hs_shouqizhankai_youce
 * @description 导出SVG图标资源的完整URL路径
 */

/**
 * 右侧收起/展开图标的SVG资源路径
 * 文件名: hs_shouqizhankai_youce.572cedb0.svg
 * @example
 * import iconUrl from './hs_shouqizhankai_youce.svg';
 * // iconUrl === 'assets/hs_shouqizhankai_youce.572cedb0.svg'
 */
declare module '*.hs_shouqizhankai_youce.svg' {
  /**
   * SVG资源的公共URL路径
   * 该路径由Webpack在构建时根据publicPath配置自动生成
   */
  const content: string;
  export default content;
}

/**
 * 通用SVG模块类型声明
 * 支持所有.svg文件的导入
 */
declare module '*.svg' {
  /**
   * SVG文件的资源路径
   * 在Webpack配置了file-loader或url-loader时，导入SVG会返回其公共URL
   */
  const content: string;
  export default content;
}