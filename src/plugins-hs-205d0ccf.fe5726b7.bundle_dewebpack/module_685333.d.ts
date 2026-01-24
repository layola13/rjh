/**
 * CSS模块导出类型定义
 * 用于Webpack css-loader的模块化CSS样式表
 */

/**
 * CSS模块导出接口
 * 包含样式类名映射和元数据
 */
interface CSSModuleExports {
  /** CSS类名映射表 */
  locals?: Record<string, string>;
  /** 模块标识符 */
  id?: string;
  /** 样式内容数组 */
  toString(): string;
  /** 其他可能的属性 */
  [key: string]: unknown;
}

/**
 * CSS加载器函数类型
 * @param sourceMap - 是否启用source map
 * @returns CSS模块导出对象
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSModuleExports;

/**
 * Webpack模块定义函数
 * @param exports - 模块导出对象
 * @param require - 模块加载函数
 * @param moduleId - 当前模块ID
 */
declare function webpackModule(
  exports: { exports: CSSModuleExports },
  require: (moduleId: number) => CSSLoaderFunction,
  moduleId: { id: string }
): void;

/**
 * 进度条组件样式模块
 * 
 * CSS类名说明：
 * - `.progress_container` - 进度条容器（宽度100%）
 * - `.progress_container .process-info` - 进度信息行（flex布局，space-between对齐）
 * - `.progress_container .process-info .process-left` - 左侧进度文本（白色86%不透明度）
 * - `.progress_container .process-info .process-right` - 右侧进度文本（白色66%不透明度）
 * - `.progress_container .ant-progress-inner` - Ant Design进度条内层（白色30%不透明度背景）
 * - `.progress_container .ant-progress-bg` - Ant Design进度条填充背景（纯白色）
 */
export interface ProgressContainerStyles {
  /** 进度条主容器类名 */
  progress_container: string;
  /** 进度信息容器类名 */
  'process-info': string;
  /** 左侧进度文本类名 */
  'process-left': string;
  /** 右侧进度文本类名 */
  'process-right': string;
}

/**
 * 默认导出：进度条样式模块
 */
declare const styles: ProgressContainerStyles;
export default styles;