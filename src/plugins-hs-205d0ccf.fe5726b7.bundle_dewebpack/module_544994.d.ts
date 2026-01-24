/**
 * CSS模块类型定义
 * 该模块导出用户认证相关模态框的样式声明
 * @module UserModalStyles
 */

/**
 * CSS加载器推送函数类型
 * @param args - CSS模块数组，包含模块ID和CSS内容
 */
type CSSLoaderPush = (args: [string, string][]) => void;

/**
 * CSS加载器导出对象
 */
interface CSSLoaderExports {
  /** CSS内容推送方法 */
  push: CSSLoaderPush;
  /** 模块标识符 */
  id?: string;
  /** 其他可能的属性 */
  [key: string]: unknown;
}

/**
 * Webpack模块工厂函数类型
 * @param sourceMap - 是否启用source map
 * @returns CSS加载器导出对象
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSLoaderExports;

/**
 * Webpack模块对象
 */
interface WebpackModule {
  /** 模块导出对象 */
  exports: CSSLoaderExports | Record<string, unknown>;
  /** 模块唯一标识符 */
  id: string;
  /** 模块是否已加载 */
  loaded?: boolean;
  /** 其他可能的属性 */
  [key: string]: unknown;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块的导出对象
 */
type WebpackRequire = (moduleId: number) => CSSLoaderExports | unknown;

/**
 * 用户模态框样式模块
 * 包含登录、注册、忘记密码等表单的完整样式定义
 * 
 * @remarks
 * 该模块定义了以下主要样式类：
 * - `.md-modal-header`: 模态框头部样式
 * - `.md-modal-body`: 模态框主体样式
 * - `.signinform`: 登录表单样式
 * - `.signupform`: 注册表单样式
 * - `.forgotpwform`: 忘记密码表单样式
 * - `.signinpopup`: 弹窗容器样式
 * 
 * @param module - Webpack模块对象，包含模块ID和导出
 * @param require - Webpack require函数，用于加载依赖模块(ID: 986380)
 * 
 * @example
 *