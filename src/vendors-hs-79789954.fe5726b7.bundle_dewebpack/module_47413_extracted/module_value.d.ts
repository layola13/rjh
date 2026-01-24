/**
 * Module: module_value
 * Original ID: value
 * 
 * This module provides access to the default shader instance for the GL context.
 */

/**
 * Represents a shader instance used in WebGL rendering.
 * This is the default shader type referenced by the module.
 */
declare class DefaultShader {
  constructor();
}

/**
 * Represents a WebGL context object that manages shaders and rendering state.
 */
interface GLContext {
  /**
   * The default shader instance for this GL context.
   * Lazily initialized on first access.
   */
  defaultShader?: DefaultShader;
}

/**
 * Represents a context manager that stores and retrieves various context objects.
 */
interface ContextManager {
  /**
   * Retrieves a context object by its identifier.
   * @param contextId - The identifier for the context (e.g., "gl" for WebGL context)
   * @returns The requested context object
   */
  get(contextId: "gl"): GLContext;
  get(contextId: string): unknown;
}

/**
 * Gets or creates the default shader for the current GL context.
 * 
 * This function retrieves the GL context and ensures a default shader instance exists.
 * If no default shader is present, it creates a new one and caches it for future use.
 * 
 * @returns The default shader instance associated with the GL context
 */
declare function getDefaultShader(): DefaultShader;

export { DefaultShader, GLContext, ContextManager, getDefaultShader };