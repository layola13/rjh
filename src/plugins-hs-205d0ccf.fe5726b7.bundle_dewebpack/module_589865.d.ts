/**
 * SVG 静态资源模块声明
 * 
 * 该模块导出 create_pano SVG 图标的资源路径
 * 
 * @module assets/create_pano
 * @example
 * import createPanoIcon from './assets/create_pano.a0594e78.svg';
 * // createPanoIcon 的值为: "assets/create_pano.a0594e78.svg"
 */

/**
 * SVG 文件的默认导出类型
 * 在 webpack 中通过 file-loader 或 url-loader 处理后，
 * SVG 文件会被解析为字符串路径
 */
declare module '*.svg' {
  /**
   * SVG 资源的公共路径
   * @type {string} 资源的相对或绝对 URL 路径
   */
  const content: string;
  export default content;
}

/**
 * 特定的 create_pano 资源模块声明
 */
declare module 'assets/create_pano.a0594e78.svg' {
  /**
   * create_pano SVG 图标的资源路径
   * @constant
   * @type {string}
   * @default "assets/create_pano.a0594e78.svg"
   */
  const createPanoIconPath: string;
  export default createPanoIconPath;
}