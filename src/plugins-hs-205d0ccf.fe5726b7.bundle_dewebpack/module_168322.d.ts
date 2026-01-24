/**
 * CSS模块导出声明
 * 
 * 该模块导出Spark图片详情查看器的样式表内容，
 * 用于全屏图片预览、图片导航和操作按钮的样式定义。
 * 
 * @module SparkPicImageDetailStyles
 */

/**
 * Webpack模块工厂函数类型
 * 
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数，用于加载其他模块
 */
declare function moduleFactory(
  exports: Record<string, unknown>,
  module: { id: string | number; exports: Record<string, unknown> },
  require: (moduleId: number) => CssLoaderFunction
): void;

/**
 * CSS加载器函数类型
 * 
 * @param useSourceMap - 是否启用SourceMap
 * @returns CSS内容推送接口
 */
interface CssLoaderFunction {
  (useSourceMap: boolean): CssContentPusher;
}

/**
 * CSS内容推送器接口
 * 包含push方法用于注入CSS模块内容
 */
interface CssContentPusher {
  /**
   * 推送CSS模块内容
   * 
   * @param content - CSS模块元组 [模块ID, CSS字符串内容, 可选的SourceMap]
   */
  push(content: [string | number, string, string?]): void;
}

/**
 * 模块导出的CSS样式内容
 * 
 * 包含以下主要样式类：
 * - `.spark-pic-image-detail`: 全屏容器（固定定位，z-index: 1005）
 * - `.mask`: 半透明黑色背景遮罩（opacity: 0.95）
 * - `.queue-card-tip`: 居中提示文本区域
 * - `.process_area`: 进度显示区域（宽度300px）
 * - `.icons`: Flex布局的操作图标容器
 *   - `.header`: 顶部工具栏（包含标题、AI参数、关闭按钮）
 *   - `.arrow`: 左右导航箭头
 *   - `.bottom`: 底部操作栏（渐变背景）
 * - `.zoom_disable`: 禁用缩放状态样式
 * 
 * @example
 * // 该CSS通过Webpack的css-loader处理并注入到页面
 * // 模块ID: 168322
 * // 依赖模块: 986380 (css-loader核心函数)
 */
declare const cssModuleContent: string;

export default cssModuleContent;