/**
 * CSS 模块导出函数
 * 该模块用于将 CSS 样式推送到样式加载系统中
 * 
 * @remarks
 * 此模块包含反馈复选框列表组件的样式定义，支持标准和深色主题
 */

/**
 * CSS 模块加载器函数类型
 * @param sourceMap - 是否生成 source map
 * @returns CSS 模块加载器实例
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSModuleLoader;

/**
 * CSS 模块加载器接口
 * 用于处理和推送 CSS 样式到构建系统
 */
interface CSSModuleLoader {
  /**
   * 推送 CSS 样式数组到加载器
   * @param styles - 包含模块 ID 和 CSS 内容的元组数组
   */
  push(styles: Array<[string | number, string]>): void;
}

/**
 * Webpack 模块导出对象
 */
interface ModuleExports {
  /** 模块的唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: CSSModuleLoader;
}

/**
 * Webpack 模块加载器 require 函数
 * @param moduleId - 要加载的模块 ID
 * @returns 加载的模块导出内容
 */
type RequireFunction = (moduleId: number) => CSSLoaderFunction;

/**
 * 模块工厂函数类型
 * @param module - Webpack 模块对象
 * @param exports - 模块导出对象
 * @param require - 模块加载函数
 */
declare function moduleFactory(
  module: ModuleExports,
  exports: unknown,
  require: RequireFunction
): void;

/**
 * 反馈复选框列表样式模块
 * 
 * @remarks
 * 该模块定义了以下样式规则：
 * - `.feedback-checkbox-list` - 反馈复选框列表容器
 *   - `.feedback-checkbox-group-title` - 复选框组标题样式（灰色，12px，PingFangSC 字体）
 *   - `.ant-col.ant-col-5` - 列布局，占 20% 宽度
 *   - `.ant-checkbox-wrapper` - 复选框包装器，不换行显示
 *   - `.checkbox-list-checkbox` - 复选框文本样式（深色，12px，PingFangSC 字体）
 * - `.feedback-checkbox-list.feedback-black` - 深色主题变体（白色半透明文字）
 * 
 * @param module - Webpack 模块对象
 * @param exports - 导出对象（未使用）
 * @param require - 模块加载函数，用于导入 CSS 加载器（模块 ID: 986380）
 */
declare const feedbackCheckboxListStyleModule: typeof moduleFactory;

export default feedbackCheckboxListStyleModule;