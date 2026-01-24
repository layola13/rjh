/**
 * Handle fragment shader module for 3D materials
 * Provides pixel shader definition for rendering handle materials
 */

/**
 * Shader name identifier
 */
export const HANDLE_PIXEL_SHADER_NAME = 'handlePixelShader';

/**
 * GLSL fragment shader source code for handle rendering
 * Uses a uniform color vector to render solid colored handles
 */
export const HANDLE_FRAGMENT_SHADER_SOURCE = `uniform vec3 color;
void main(void) {
    gl_FragColor = vec4(color, 1.0);
}`;

/**
 * Handle pixel shader configuration object
 */
export interface HandlePixelShader {
  /** Unique identifier for the shader */
  name: string;
  /** Compiled shader source code */
  shader: string;
}

/**
 * Registered handle pixel shader instance
 * Automatically registers the shader in the ShaderStore upon import
 */
export const handlePixelShader: HandlePixelShader;