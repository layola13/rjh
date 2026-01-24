/**
 * Webpack模块加载器函数类型定义
 * @module AlbumRenderingCardStyles
 */

/**
 * 模块导出对象
 */
interface ModuleExports {
  /** 模块ID */
  id: string | number;
  /** 模块导出的内容 */
  exports: any;
}

/**
 * CSS加载器返回类型
 */
interface CSSLoaderResult {
  /**
   * 添加CSS规则到样式表
   * @param rule - CSS规则数组 [moduleId, cssContent, sourceMap?]
   */
  push(rule: [string | number, string, string?]): void;
}

/**
 * Webpack require函数类型
 * @param moduleId - 模块ID
 * @returns CSS加载器实例
 */
type WebpackRequire = (moduleId: number) => (sourceMap: boolean) => CSSLoaderResult;

/**
 * 专辑渲染卡片样式模块加载函数
 * 
 * 该模块包含以下CSS样式：
 * - `.album-rendering-card .card-label`: 卡片标签样式（居中显示，白色文字）
 * - `.album-rendering-card .process-info`: 进度信息容器样式
 * - `.album-rendering-card .process-info .process-label`: 进度标签样式
 * - `.album-rendering-card .process-info .ant-progress`: Ant Design进度条样式
 * 
 * @param e - 模块导出对象
 * @param t - 模块依赖对象（未使用）
 * @param n - Webpack require函数，用于加载CSS加载器（模块ID: 986380）
 */
declare function loadAlbumRenderingCardStyles(
  e: ModuleExports,
  t: unknown,
  n: WebpackRequire
): void;

export default loadAlbumRenderingCardStyles;