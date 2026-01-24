/**
 * Handle vertex shader module
 * Provides vertex shader for 3D handle rendering in GUI
 */

/**
 * Shader source code for handle vertex rendering
 * Transforms handle vertices with scale and offset for 3D manipulation widgets
 */
const HANDLE_VERTEX_SHADER_SOURCE = `precision highp float;
attribute vec3 position;
uniform vec3 positionOffset;
uniform mat4 worldViewProjection;
uniform float scale;
void main(void) {
    vec4 vPos = vec4((vec3(position) + positionOffset) * scale, 1.0);
    gl_Position = worldViewProjection * vPos;
}`;

/**
 * Shader identifier name
 */
const HANDLE_VERTEX_SHADER_NAME = "handleVertexShader";

/**
 * Handle vertex shader configuration
 */
export interface HandleVertexShaderConfig {
  /** Unique identifier for the shader */
  name: string;
  /** Compiled shader source code */
  shader: string;
}

/**
 * Registers and exports the handle vertex shader
 * Automatically adds the shader to the global ShaderStore
 */
export const handleVertexShader: HandleVertexShaderConfig;