/**
 * CSS模块加载器类型定义
 * 该模块用于webpack环境下加载和注入CSS样式
 */

/**
 * Webpack模块导出函数签名
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - webpack require函数，用于加载其他模块
 */
declare function cssModuleLoader(
  exports: CSSModuleExports,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * CSS模块导出对象接口
 */
interface CSSModuleExports {
  /** 模块的唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports?: unknown;
}

/**
 * Webpack模块对象接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出对象 */
  exports: unknown;
  /** 模块是否已加载 */
  loaded?: boolean;
}

/**
 * Webpack require函数接口
 * 用于动态加载模块
 */
interface WebpackRequire {
  /** 
   * 加载指定模块
   * @param moduleId - 要加载的模块ID
   * @returns 模块导出内容
   */
  (moduleId: number): CSSLoaderAPI;
}

/**
 * CSS加载器API接口
 * 该接口定义了css-loader模块的导出方法
 */
interface CSSLoaderAPI {
  /**
   * 创建CSS模块数组
   * @param sourceMap - 是否生成source map
   * @returns CSS模块实例，包含push方法用于添加样式
   */
  (sourceMap: boolean): CSSModuleInstance;
}

/**
 * CSS模块实例接口
 * 用于收集和管理CSS样式规则
 */
interface CSSModuleInstance {
  /**
   * 添加CSS样式规则
   * @param entry - 样式条目数组 [模块ID, CSS内容, 可选的source map]
   */
  push(entry: [string | number, string, string?]): void;
}

/**
 * 圆弧阵列参数设置样式模块
 * 
 * 该模块包含以下UI组件的样式：
 * - #arc-array-params-setting-container: 主容器，绝对定位在(340px, 54px)
 * - .arc-array-params-card: 参数卡片，带圆角和半透明背景
 * - .arc-array-params-input-card: 输入区域容器
 * - .arc-array-params-angle: 角度参数输入
 * - .arc-array-params-number: 数量参数输入
 * - .arc-array-params-tip: 提示文本
 * - .arc-array-params-label: 标签文本
 * - .homestyler-numberinput: 数字输入框组件(宽度64px)
 */
declare const arcArrayParamsStyles: string;

export = cssModuleLoader;