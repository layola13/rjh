/**
 * Webpack静态资源模块
 * 导出编辑图标SVG文件的公共路径
 */

/**
 * SVG资源路径常量
 * 指向构建后的编辑图标资源文件
 */
export const EDIT_ICON_PATH: string = "assets/edit.fb6df0ec.svg";

/**
 * 默认导出编辑图标的完整URL路径
 * 在运行时会根据webpack的publicPath配置自动拼接完整路径
 */
export default EDIT_ICON_PATH;