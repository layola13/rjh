/**
 * CSS样式模块导出类型定义
 * 该模块导出一个CSS样式字符串，用于.hsc-shop-rank商家排行榜组件
 */

/**
 * Webpack CSS Loader导出函数类型
 * @param usable - 是否使用可用模式（通常为false表示直接导出CSS）
 * @returns CSS模块对象，包含push方法用于添加样式规则
 */
type CssLoaderExport = (usable: boolean) => CssModule;

/**
 * CSS模块接口
 * 用于管理CSS样式字符串的集合
 */
interface CssModule {
  /**
   * 添加CSS样式规则
   * @param rule - 包含模块ID和CSS内容的元组
   * @returns void
   */
  push(rule: [moduleId: string, cssContent: string, sourceMap?: string]): void;
}

/**
 * Webpack模块导出函数类型
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数，用于导入其他模块
 */
type WebpackModuleExport = (
  exports: ModuleExports,
  module: Module,
  require: WebpackRequire
) => void;

/**
 * Webpack模块对象接口
 */
interface Module {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出对象 */
  exports: ModuleExports;
}

/**
 * 模块导出对象（可以是任意类型）
 */
type ModuleExports = unknown;

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块的导出对象
 */
type WebpackRequire = (moduleId: number) => CssLoaderExport;

/**
 * 商家排行榜样式规则
 * 该CSS定义了以下样式：
 * - .hsc-shop-rank .merchant: 商家卡片容器（flex布局、圆角、阴影）
 * - .merchant .left: 左侧区域（包含logo和名称）
 * - .merchant .left .logo: 商家logo（30x30px）
 * - .merchant .left .name: 商家名称（最大宽度130px，文本溢出省略）
 * - .merchant .right: 右侧区域（包含数值显示）
 * - .merchant .right .number: 数值容器
 * - .number-pre: 数值前缀（缩放0.8倍）
 * - .number-value: 数值主体（倾斜-12度，粗体字体）
 * - .merchant:hover: 鼠标悬停效果（增强阴影）
 */
declare const cssStyleSheet: string;

export default cssStyleSheet;