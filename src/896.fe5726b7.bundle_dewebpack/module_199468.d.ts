/**
 * Webpack静态资源模块
 * 导出会员展示图标的SVG资源路径
 */

/**
 * 普通会员展示图标的SVG资源路径
 * @description 该资源通过Webpack的file-loader或asset模块处理，包含内容哈希以支持长期缓存
 * @example
 * import memberIconUrl from './path/to/module';
 * // memberIconUrl = "/assets/hs_zhanshi_putonghuiyuan.3f92d698.svg"
 */
declare const assetUrl: string;

export default assetUrl;