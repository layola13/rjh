/**
 * 区域配置文件路径模块
 * 
 * 该模块导出一个指向区域配置JSON文件的静态资源路径。
 * 该路径由webpack在构建时通过publicPath(__webpack_require__.p)自动注入。
 * 
 * @module RegionConfigPath
 */

/**
 * 区域配置文件的完整URL路径
 * 
 * 格式: `{publicPath}/assets/config_region.29091123.json`
 * 其中29091123为内容哈希值，用于缓存控制
 * 
 * @example
 *