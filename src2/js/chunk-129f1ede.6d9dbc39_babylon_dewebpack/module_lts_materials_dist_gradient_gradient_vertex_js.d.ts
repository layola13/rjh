/**
 * Gradient vertex shader module
 * Provides vertex shader implementation for gradient materials in Babylon.js
 */

/**
 * Shader name identifier
 */
export const GRADIENT_VERTEX_SHADER_NAME = "gradientVertexShader";

/**
 * GLSL vertex shader source code for gradient material
 * 
 * Features:
 * - Supports vertex positions and normals
 * - UV mapping (UV1 and UV2)
 * - Vertex colors
 * - Skeletal animation (bones)
 * - Baked vertex animations
 * - Instancing
 * - Fog effects
 * - Shadow casting
 * - Clip planes
 * - Point size rendering
 */
export const GRADIENT_VERTEX_SHADER_SOURCE = `precision highp float;
attribute vec3 position;
#ifdef NORMAL
attribute vec3 normal;
#endif
#ifdef UV1
attribute vec2 uv;
#endif
#ifdef UV2
attribute vec2 uv2;
#endif
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
uniform mat4 view;
uniform mat4 viewProjection;
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
varying vec3 vPosition;
#ifdef NORMAL
varying vec3 vNormalW;
#endif
#ifdef VERTEXCOLOR
varying vec4 vColor;
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<__decl__lightFragment>[0..maxSimultaneousLights]
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position, 1.0);
gl_Position=viewProjection*worldPos;
vPositionW=vec3(worldPos);
vPosition=position;
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal, 0.0)));
#endif
#ifndef UV1
vec2 uv=vec2(0., 0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0., 0.);
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;

/**
 * Shader metadata object
 */
export interface GradientVertexShader {
  /** Shader identifier name */
  readonly name: string;
  /** Compiled shader source code */
  readonly shader: string;
}

/**
 * Exported gradient vertex shader configuration
 */
export const gradientVertexShader: GradientVertexShader = {
  name: GRADIENT_VERTEX_SHADER_NAME,
  shader: GRADIENT_VERTEX_SHADER_SOURCE
};