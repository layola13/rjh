/**
 * WebGL 上下文配置接口
 */
interface GLConfig {
  /** WebGL 渲染上下文 */
  gl: WebGLRenderingContext | WebGL2RenderingContext;
}

/**
 * 内部状态管理接口
 */
interface InternalState {
  /** WebGL 渲染上下文 */
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  
  /**
   * 销毁内部资源
   */
  destroy(): void;
}

/**
 * 全局状态管理器接口
 */
interface StateManager {
  /**
   * 设置全局 GL 配置
   * @param config - WebGL 配置对象
   */
  set(config: GLConfig): void;
}

/**
 * 模块销毁器类
 * @module module_destroy
 */
declare class ModuleDestroy {
  /** 内部状态 */
  private _: InternalState;
  
  /**
   * 销毁模块并清理 WebGL 资源
   * 将 GL 上下文传递给全局状态管理器后，销毁内部状态
   */
  destroy(): void;
}

/** 全局状态管理器实例 */
declare const y: StateManager;

export { ModuleDestroy, StateManager, GLConfig, InternalState };