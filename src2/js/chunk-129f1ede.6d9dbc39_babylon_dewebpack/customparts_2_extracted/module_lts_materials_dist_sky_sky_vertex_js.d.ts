/**
 * Sky shader vertex shader name constant
 */
export const skyVertexShaderName = "skyVertexShader";

/**
 * GLSL source code for the sky material vertex shader.
 * 
 * Features:
 * - Transforms vertices from model space to clip space
 * - Supports optional vertex colors via VERTEXCOLOR define
 * - Supports optional point size via POINTSIZE define
 * - Includes fog and clipping plane support
 * - Passes world position to fragment shader for sky rendering
 */
export const skyVertexShaderSource = `precision highp float;
attribute vec3 position;
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
uniform mat4 world;
uniform mat4 view;
uniform mat4 viewProjection;
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
gl_Position=viewProjection*world*vec4(position, 1.0);
vec4 worldPos=world*vec4(position, 1.0);
vPositionW=vec3(worldPos);
#include<clipPlaneVertex>
#include<fogVertex>
#ifdef VERTEXCOLOR
vColor=color;
#endif
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;

/**
 * Sky vertex shader object containing name and shader source.
 * This object is typically registered with the shader store.
 */
export interface SkyVertexShader {
  /** Shader identifier name */
  name: string;
  /** GLSL shader source code */
  shader: string;
}

/**
 * Sky vertex shader export object
 */
export const skyVertexShader: SkyVertexShader = {
  name: skyVertexShaderName,
  shader: skyVertexShaderSource
};