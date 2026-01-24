/**
 * Simple vertex shader module for Babylon.js materials system.
 * Provides basic vertex transformation with support for various features like
 * diffuse mapping, vertex colors, fog, shadows, and skeletal animation.
 * @module SimpleVertexShader
 */

/**
 * Name identifier for the simple vertex shader in the shader store
 */
export const simpleVertexShaderName: string = "simpleVertexShader";

/**
 * GLSL source code for the simple vertex shader.
 * Supports the following optional features via preprocessor directives:
 * - NORMAL: Normal vector processing
 * - UV1/UV2: Texture coordinate sets
 * - VERTEXCOLOR: Per-vertex coloring
 * - DIFFUSE: Diffuse texture mapping
 * - POINTSIZE: Custom point size
 * - INSTANCESCOLOR: Instanced color attributes
 */
export const simpleVertexShaderSource: string = `precision highp float;
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
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
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
vec4 worldPos = finalWorld * vec4(position, 1.0);
gl_Position = viewProjection * worldPos;
vPositionW = vec3(worldPos);
#ifdef NORMAL
vNormalW = normalize(vec3(finalWorld * vec4(normal, 0.0)));
#endif
#ifndef UV1
vec2 uv = vec2(0., 0.);
#endif
#ifndef UV2
vec2 uv2 = vec2(0., 0.);
#endif
#ifdef DIFFUSE
if (vDiffuseInfos.x == 0.) {
vDiffuseUV = vec2(diffuseMatrix * vec4(uv, 1.0, 0.0));
} else {
vDiffuseUV = vec2(diffuseMatrix * vec4(uv2, 1.0, 0.0));
}
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<shadowsVertex>[0..maxSimultaneousLights]
#include<vertexColorMixing>
#if defined(POINTSIZE) && !defined(WEBGPU)
gl_PointSize = pointSize;
#endif
#define CUSTOM_VERTEX_MAIN_END
}
`;

/**
 * Shader metadata object containing the shader name and source code.
 * This object is typically registered with Babylon.js ShaderStore.
 */
export interface ISimpleVertexShader {
    /** Unique identifier for the shader */
    name: string;
    /** GLSL source code */
    shader: string;
}

/**
 * Complete shader definition exported to the shader store
 */
export const simpleVertexShader: ISimpleVertexShader = {
    name: simpleVertexShaderName,
    shader: simpleVertexShaderSource
};