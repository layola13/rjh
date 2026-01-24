/**
 * WebGL内容加载器模块
 * 用于加载和初始化WebGL相关内容
 */

/**
 * WebGL上下文配置接口
 */
interface WebGLContextConfig {
  /** WebGL渲染上下文 */
  gl: WebGLRenderingContext | WebGL2RenderingContext;
}

/**
 * 内部状态管理接口
 */
interface InternalState {
  /** WebGL渲染上下文 */
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  
  /**
   * 加载指定内容
   * @param content - 要加载的内容标识符或配置对象
   */
  loadContentsOf(content: unknown): void | Promise<void>;
}

/**
 * 内容加载器类上下文
 */
interface ContentLoaderContext {
  /** 内部状态对象 */
  _: InternalState;
}

/**
 * 加载WebGL内容的模块函数
 * @param content - 要加载的内容（资源路径、配置对象等）
 * @this ContentLoaderContext - 内容加载器实例上下文
 */
declare function loadContentsOf(
  this: ContentLoaderContext,
  content: unknown
): void;

export { loadContentsOf, ContentLoaderContext, InternalState, WebGLContextConfig };