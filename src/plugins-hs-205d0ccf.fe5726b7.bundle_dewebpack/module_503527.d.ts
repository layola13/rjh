/**
 * CSS模块声明文件
 * 该模块导出CSS样式字符串，用于分享案例页面的样式定义
 * @module share-case-page-styles
 */

/**
 * CSS加载器函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS模块加载器实例
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSModuleLoader;

/**
 * CSS模块加载器接口
 * 提供push方法用于添加CSS规则
 */
interface CSSModuleLoader {
  /**
   * 添加CSS样式规则
   * @param rule - CSS规则数组，包含模块ID和CSS内容字符串
   */
  push(rule: [string, string]): void;
}

/**
 * Webpack模块导出对象
 */
interface WebpackModuleExports {
  /** 模块ID标识符 */
  id: string;
  /** 模块导出内容 */
  exports: CSSModuleLoader;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns CSS加载器函数
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFunction;

/**
 * 分享案例页面样式模块
 * 
 * 包含以下主要样式类：
 * - `.share-case-page` - 页面根容器，全屏高度
 * - `.share-case-overlay` - 半透明黑色遮罩层（透明度30%）
 * - `.share-case-content` - 居中弹窗内容区域（380px宽）
 * - `.header` - 弹窗标题区域，包含标题文本和关闭按钮
 * - `.checkbox` - 单选按钮组区域
 * - `.share-url-area` - 分享链接输入和复制按钮区域
 * - `.share-tips` - 底部提示文字区域
 * 
 * @param moduleExports - Webpack模块导出对象
 * @param exports - 模块导出引用（未使用）
 * @param webpackRequire - Webpack模块加载函数
 */
declare function sharePageStyleModule(
  moduleExports: WebpackModuleExports,
  exports: unknown,
  webpackRequire: WebpackRequire
): void;

export = sharePageStyleModule;