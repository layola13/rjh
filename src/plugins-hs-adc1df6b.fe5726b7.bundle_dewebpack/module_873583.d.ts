/**
 * CSS模块导出类型定义
 * 
 * 此模块定义了价格栏组件的样式表类型。
 * 用于在TypeScript项目中为CSS模块提供类型安全支持。
 */

/**
 * CSS模块加载器函数类型
 * 
 * @param sourceMap - 是否生成source map，false表示不生成
 * @returns CSS模块API对象，包含push方法用于注册样式
 */
type CSSModuleLoader = (sourceMap: boolean) => CSSModuleAPI;

/**
 * CSS模块API接口
 * 
 * 提供样式内容注册和管理功能
 */
interface CSSModuleAPI {
  /**
   * 注册CSS样式内容
   * 
   * @param entry - 样式条目元组
   *   - entry[0]: 模块ID（字符串或数字）
   *   - entry[1]: CSS样式字符串内容
   *   - entry[2]: 可选的source map数据
   */
  push(entry: [moduleId: string | number, cssContent: string, sourceMap?: unknown]): void;
}

/**
 * Webpack模块工厂函数参数接口
 */
interface WebpackModuleParams {
  /** 模块导出对象 */
  exports: CSSModuleExports;
  
  /** 模块元数据 */
  id: string | number;
}

/**
 * CSS模块导出接口
 * 
 * 包含样式类名到哈希类名的映射（CSS Modules模式）
 * 或直接导出CSS内容字符串
 */
interface CSSModuleExports {
  /** CSS类名映射或样式内容 */
  [key: string]: string;
}

/**
 * Webpack require函数类型
 * 
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出内容
 */
type WebpackRequire = (moduleId: number) => CSSModuleLoader;

/**
 * 价格栏CSS模块
 * 
 * 包含以下样式类：
 * - `.price-bar-container` - 价格栏容器（flex布局，圆角背景）
 * - `.change-currency` - 货币切换组件
 * - `.current-currency` - 当前选中的货币显示
 * - `.currency-label` - 货币标签文本
 * - `.currency-list` - 货币选项下拉列表
 * - `.option` - 单个货币选项
 * - `.price-bar` - 价格显示区域
 * - `.price-container` - 价格数值容器
 * - `.dollar` - 美元符号样式
 * - `.num-container` - 数字容器
 * - `.small` - 小号字体数字
 * - `.loading-img` - 加载动画图标
 * - `.price-bar-tip-icon` - 提示图标
 * 
 * @param exports - 模块导出对象
 * @param module - 模块元数据
 * @param require - Webpack模块加载函数
 */
declare function priceCSSModule(
  exports: WebpackModuleParams['exports'],
  module: WebpackModuleParams,
  require: WebpackRequire
): void;

export = priceCSSModule;