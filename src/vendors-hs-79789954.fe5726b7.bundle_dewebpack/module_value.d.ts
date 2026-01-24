/**
 * OpenGL shader module
 * Manages the default shader instance for GL context
 */

/**
 * Shader class interface
 * Represents a compiled shader program
 */
interface Shader {
  // Add shader-specific properties and methods here
}

/**
 * GL Context interface
 * WebGL rendering context wrapper with shader management
 */
interface GLContext {
  /**
   * Default shader instance for this GL context
   * Lazily initialized on first access
   */
  defaultShader?: Shader;
}

/**
 * Retrieves or creates the default shader for the current GL context
 * 
 * @returns The default shader instance, creating it if it doesn't exist
 * 
 * @example
 *