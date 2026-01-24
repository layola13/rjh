/**
 * CSS模块导出类型定义
 * 该模块导出一个包含Slider Input组件样式的CSS字符串数组
 * 
 * @module SliderInputStyles
 * @moduleId 320953
 */

/**
 * CSS加载器推送函数类型
 * 用于将CSS内容推送到样式加载系统
 */
interface CSSLoaderPushFunction {
  /**
   * 推送CSS模块内容
   * @param content - 包含模块ID和CSS字符串的元组数组
   */
  push(content: [string, string][]): void;
}

/**
 * CSS模块加载器返回类型
 * @param sourceMap - 是否启用source map
 * @returns CSS加载器实例，包含push方法用于添加样式
 */
type CSSModuleLoader = (sourceMap: boolean) => CSSLoaderPushFunction;

/**
 * Webpack模块导出接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出对象 */
  exports: CSSLoaderPushFunction;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 加载的模块（此处为CSS加载器函数）
 */
type WebpackRequire = (moduleId: number) => CSSModuleLoader;

/**
 * Slider Input组件样式模块工厂函数
 * 
 * 该模块包含以下样式类：
 * - `.widgtes-slider-input` - 滑块输入组件容器
 * - `.widgtes-slider-input-content` - 内容容器
 * - `.widgtes-slider-input-content-input` - 输入区域（标签+输入框）
 * - `.slider-input-label` - 标签文本样式
 * - `.widgtes-slider-input-content-slider` - 滑块区域样式
 * 
 * @param module - Webpack模块对象，包含id和exports
 * @param exports - 模块导出对象（与module.exports相同）
 * @param require - Webpack的require函数，用于加载依赖模块
 */
declare function sliderInputStylesModule(
  module: WebpackModule,
  exports: unknown,
  require: WebpackRequire
): void;

export default sliderInputStylesModule;

/**
 * CSS内容常量
 * 包含完整的Slider Input组件样式定义
 */
export const CSS_CONTENT: string;

/**
 * 模块标识符常量
 */
export const MODULE_ID: 320953;

/**
 * CSS类名类型定义
 */
export interface SliderInputClassNames {
  /** 滑块输入组件根容器类名 */
  'widgtes-slider-input': string;
  /** 内容容器类名 */
  'widgtes-slider-input-content': string;
  /** 输入区域容器类名 */
  'widgtes-slider-input-content-input': string;
  /** 标签文本类名 */
  'slider-input-label': string;
  /** Homestyler UI组件覆盖类名 */
  'homestyler-ui-components': string;
  /** 滑块容器类名 */
  'widgtes-slider-input-content-slider': string;
}