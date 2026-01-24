/**
 * Module: module_destroy
 * Original ID: destroy
 */

/**
 * WebGL context property
 */
interface GLContext {
  gl: WebGLRenderingContext | WebGL2RenderingContext;
}

/**
 * Internal state manager
 */
interface InternalState {
  /** WebGL rendering context */
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  /** Cleanup and release resources */
  destroy(): void;
}

/**
 * External state setter
 */
interface StateSetter {
  /** Update state with GL context */
  set(context: GLContext): void;
}

/**
 * Destroy module - cleans up WebGL resources
 * Updates external state and destroys internal resources
 */
declare function destroy(this: { _: InternalState }): void;

declare const y: StateSetter;

export { destroy, type InternalState, type GLContext, type StateSetter };