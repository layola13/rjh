/**
 * Shader name identifier for the normal vertex shader
 */
export const NORMAL_VERTEX_SHADER_NAME: string = "normalVertexShader";

/**
 * GLSL source code for the normal vertex shader.
 * This shader handles vertex transformation, normal calculation, UV mapping,
 * and various optional features like diffuse mapping, fog, shadows, and vertex colors.
 */
export const NORMAL_VERTEX_SHADER_SOURCE: string = `precision highp float;
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
#ifdef DIFFUSE
varying vec2 vDiffuseUV;
uniform mat4 diffuseMatrix;
uniform vec2 vDiffuseInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
#ifdef NORMAL
varying vec3 vNormalW;
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
#ifdef NORMAL
vNormalW=normalize(vec3(finalWorld*vec4(normal, 0.0)));
#endif
#ifndef UV1
vec2 uv=vec2(0., 0.);
#endif
#ifndef UV2
vec2 uv2=vec2(0., 0.);
#endif
#ifdef DIFFUSE
if (vDiffuseInfos.x == 0.)
{
vDiffuseUV=vec2(diffuseMatrix*vec4(uv, 1.0, 0.0));
}
else
{
vDiffuseUV=vec2(diffuseMatrix*vec4(uv2, 1.0, 0.0));
}
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize=pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;

/**
 * Shader store entry containing metadata and source code for the normal vertex shader
 */
export interface ShaderStoreEntry {
  /** Unique identifier for the shader */
  name: string;
  /** GLSL source code of the shader */
  shader: string;
}

/**
 * Normal vertex shader entry registered in the shader store.
 * This shader is used for rendering materials with normal mapping support.
 */
export const normalVertexShader: ShaderStoreEntry;