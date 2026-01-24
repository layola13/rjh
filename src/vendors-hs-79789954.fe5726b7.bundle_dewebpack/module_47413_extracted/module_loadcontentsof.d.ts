/**
 * Module: module_loadContentsOf
 * 
 * Loads contents of a specified resource or element.
 * This function configures WebGL context and delegates to an internal loader.
 * 
 * @remarks
 * This appears to be part of a WebGL-based content loading system.
 * The function sets up the GL context before initiating content loading.
 */

/**
 * Configuration object for WebGL context
 */
interface WebGLConfig {
  /** WebGL rendering context */
  gl: WebGLRenderingContext | WebGL2RenderingContext;
}

/**
 * Internal state object containing WebGL context and loading utilities
 */
interface InternalState {
  /** WebGL rendering context */
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  
  /**
   * Internal method to load contents of a resource
   * @param resource - The resource identifier or path to load
   */
  loadContentsOf(resource: string | HTMLElement | URL): void | Promise<void>;
}

/**
 * Global or module-level state manager (likely a Set or Map-like object)
 */
declare const y: {
  /**
   * Sets the WebGL configuration
   * @param config - Configuration object containing WebGL context
   */
  set(config: WebGLConfig): void;
};

/**
 * Loads contents of a specified resource
 * 
 * @param resource - The resource to load (can be a URL string, HTML element, or URL object)
 * @returns void or Promise<void> depending on whether loading is synchronous or asynchronous
 * 
 * @example
 *