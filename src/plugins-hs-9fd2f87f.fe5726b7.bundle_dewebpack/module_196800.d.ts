/**
 * Webpack静态资源模块
 * 
 * 此模块导出一个SVG图标文件的公共URL路径。
 * 在Webpack构建过程中，静态资源会被处理并分配一个包含内容哈希的文件名，
 * 以便实现长期缓存策略。
 * 
 * @module CurtainAsset
 */

/**
 * 窗帘图标SVG文件的公共访问路径
 * 
 * 该路径由Webpack的publicPath配置和资源文件名组成。
 * 文件名中的哈希值(197defce)确保了资源更新时能够破坏浏览器缓存。
 * 
 * @example
 *