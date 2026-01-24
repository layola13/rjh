/**
 * Mix material vertex shader definition
 * Handles vertex transformations, normal calculations, and texture coordinate mapping
 */

/**
 * Name identifier for the mix vertex shader
 */
export const mixVertexShaderName: string = "mixVertexShader";

/**
 * GLSL vertex shader source code for mix material
 * Supports:
 * - Vertex positions and normals
 * - Dual UV channels (UV1/UV2)
 * - Vertex colors
 * - Skeletal animation (bones)
 * - Baked vertex animation
 * - Instancing
 * - Multiple simultaneous lights
 * - Fog effects
 * - Shadow mapping
 * - Clip planes
 * - Point size rendering
 */
export const mixVertexShaderSource: string = `precision highp float;
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
varying vec2 vTextureUV;
uniform mat4 textureMatrix;
uniform vec2 vTextureInfos;
#endif
#ifdef POINTSIZE
uniform float pointSize;
#endif
varying vec3 vPositionW;
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
if (vTextureInfos.x == 0.)
{
vTextureUV=vec2(textureMatrix*vec4(uv, 1.0, 0.0));
}
else
{
vTextureUV=vec2(textureMatrix*vec4(uv2, 1.0, 0.0));
}
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
 * Shader definition object containing name and source
 */
export interface ShaderDefinition {
  /** Unique identifier for the shader */
  name: string;
  /** GLSL source code */
  shader: string;
}

/**
 * Mix vertex shader definition exported for Babylon.js shader store
 */
export const mixVertexShader: ShaderDefinition = {
  name: mixVertexShaderName,
  shader: mixVertexShaderSource
};