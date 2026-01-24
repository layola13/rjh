/**
 * CSS模块导出类型定义
 * 该模块导出Property Bar长度输入组件的样式规则
 */

/**
 * Webpack模块导出函数类型
 * @param e - 模块导出对象，包含id和exports属性
 * @param t - 模块依赖项（未使用）
 * @param n - Webpack require函数，用于加载其他模块
 */
type WebpackModuleExport = (
  e: WebpackModule,
  t: unknown,
  n: WebpackRequire
) => void;

/**
 * Webpack模块对象接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: CssModuleExports;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 加载的模块导出内容
 */
type WebpackRequire = (moduleId: number) => CssLoader;

/**
 * CSS加载器接口
 * 用于处理CSS内容并生成模块导出
 */
interface CssLoader {
  /**
   * 创建CSS模块导出
   * @param sourceMap - 是否生成source map
   * @returns CSS模块导出对象
   */
  (sourceMap: boolean): CssModuleExports;
}

/**
 * CSS模块导出对象接口
 */
interface CssModuleExports {
  /**
   * 添加CSS规则到模块
   * @param rule - CSS规则数组，格式为 [moduleId, cssContent, sourceMap?]
   */
  push(rule: [string | number, string, string?]): void;
}

/**
 * Property Bar长度输入组件的CSS类名映射
 */
interface PropertyBarLengthInputStyles {
  /** 长度输入包装器容器 */
  'property-bar-length-input-wrapper': string;
  /** 长度输入复选框容器 */
  'property-bar-length-input-checkbox': string;
  /** 长度输入主容器 */
  'property-bar-length-input': string;
  /** 长度输入框 */
  'length-input': string;
  /** 长度输入标签 */
  'length-input-label': string;
  /** 左侧内容容器 */
  'property-bar-length-input__left': string;
  /** 图标样式 */
  'property-bar-length-input__icon': string;
  /** 左侧图标 */
  'property-bar-length-input__icon-left': string;
  /** 右侧图标 */
  'property-bar-length-input__icon-right': string;
  /** 包含复选框的变体样式 */
  'has-checkbox': string;
}

/**
 * 模块导出声明
 * 导出Property Bar长度输入组件的样式规则
 */
declare const styles: PropertyBarLengthInputStyles;

export default styles;