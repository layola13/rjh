/**
 * CSS模块导出类型定义
 * 
 * 此模块导出一个CSS样式表字符串，包含禁用状态的属性字符串组件样式
 * 原始模块ID: 980286
 */

/**
 * Webpack模块导出函数类型
 * 
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数，用于加载其他模块
 */
declare function cssModuleLoader(
  exports: CSSModuleExports,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * CSS模块导出接口
 * 
 * 表示CSS加载器处理后的导出对象，通常包含push方法用于添加CSS内容
 */
interface CSSModuleExports {
  /**
   * 添加CSS样式内容到样式表集合
   * 
   * @param content - 包含模块ID和CSS字符串的数组
   */
  push(content: [string, string]): void;
}

/**
 * Webpack模块对象接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string;
  
  /** 模块导出内容 */
  exports: CSSModuleExports;
}

/**
 * Webpack require函数类型
 * 
 * @param moduleId - 要加载的模块ID
 * @returns 加载的模块导出内容
 */
type WebpackRequire = (moduleId: number) => CSSModuleExports;

/**
 * 属性字符串禁用组件的CSS类名
 */
declare namespace PropertyStringDisabledStyles {
  /**
   * 主容器样式类
   * 
   * 特性：
   * - Flexbox布局
   * - 水平两端对齐
   * - 垂直居中
   * - 固定高度36px
   */
  const container: 'property-string-disabled';
  
  /**
   * 标签文本样式类
   * 
   * 特性：
   * - 字体大小12px
   * - 灰色文本 (#888888)
   */
  const label: 'property-string-disabled-label';
  
  /**
   * 禁用输入框样式类
   * 
   * 特性：
   * - 尺寸: 64x24px
   * - 字体大小12px
   * - 浅灰背景 (#f7f7f7)
   * - 边框颜色 (#eaecf1)
   * - 圆角5px
   * - 文本居中显示
   */
  const input: 'property-string-disabled-input';
}

/**
 * 导出的CSS样式表内容
 * 
 * 包含以下样式类：
 * - `.property-string-disabled` - 主容器
 * - `.property-string-disabled-label` - 标签文本
 * - `.property-string-disabled-input` - 禁用输入框
 */
declare const cssContent: string;

export default cssModuleLoader;
export { PropertyStringDisabledStyles, cssContent };