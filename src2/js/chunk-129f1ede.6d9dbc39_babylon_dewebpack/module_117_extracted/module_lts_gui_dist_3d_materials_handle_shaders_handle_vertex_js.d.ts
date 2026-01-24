/**
 * Handle vertex shader module for 3D material rendering
 * @module materials/handle/shaders/handle.vertex
 */

/**
 * Name identifier for the handle vertex shader
 */
export const HANDLE_VERTEX_SHADER_NAME = "handleVertexShader";

/**
 * GLSL source code for the handle vertex shader.
 * This shader transforms vertex positions with an offset and scale factor.
 */
export const HANDLE_VERTEX_SHADER_SOURCE = `precision highp float;
attribute vec3 position;
uniform vec3 positionOffset;
uniform mat4 worldViewProjection;
uniform float scale;
void main(void) {
    vec4 vPos = vec4((vec3(position) + positionOffset) * scale, 1.0);
    gl_Position = worldViewProjection * vPos;
}`;

/**
 * Handle vertex shader configuration object
 */
export interface HandleVertexShader {
  /** Unique name identifier for the shader */
  name: string;
  /** GLSL shader source code */
  shader: string;
}

/**
 * Exported handle vertex shader configuration.
 * Registers the shader in the ShaderStore for use in the rendering pipeline.
 */
export const handleVertexShader: HandleVertexShader = {
  name: HANDLE_VERTEX_SHADER_NAME,
  shader: HANDLE_VERTEX_SHADER_SOURCE
};