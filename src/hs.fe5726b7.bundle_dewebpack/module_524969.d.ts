/**
 * SVG 绘制光标资源模块
 * 
 * 导出绘制工具的光标图标路径
 * 该资源用于在画布或绘图界面中显示自定义光标
 * 
 * @module DrawCursorAsset
 * @example
 * import drawCursorPath from './draw-cursor-asset';
 * element.style.cursor = `url(${drawCursorPath}), auto`;
 */

/**
 * 绘制光标 SVG 资源的完整 URL 路径
 * 
 * 指向编译后的静态资源目录中的 SVG 文件
 * 路径格式: assets/draw-cursor.[contenthash].svg
 * 
 * @constant
 */
declare const drawCursorAssetPath: string;

export default drawCursorAssetPath;