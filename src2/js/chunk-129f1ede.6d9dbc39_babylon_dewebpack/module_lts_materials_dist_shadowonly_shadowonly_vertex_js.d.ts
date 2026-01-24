/**
 * Shadow Only Vertex Shader Declaration Module
 * @module ShadowOnlyVertexShader
 */

/**
 * Name identifier for the shadow-only vertex shader
 */
export declare const SHADER_NAME: 'shadowOnlyVertexShader';

/**
 * GLSL source code for the shadow-only vertex shader.
 * This shader renders objects that only cast shadows without being visible themselves.
 * 
 * Features:
 * - Vertex position transformation
 * - Optional normal transformation
 * - Skeletal animation support (bones)
 * - Baked vertex animation
 * - Instancing support
 * - Clipping plane support
 * - Fog calculation
 * - Shadow map generation for multiple lights
 * - Point size customization
 * - Vertex color pass-through
 */
export declare const SHADOW_ONLY_VERTEX_SHADER_SOURCE: string;

/**
 * Shadow-only vertex shader configuration object
 */
export interface ShadowOnlyVertexShaderConfig {
    /**
     * Unique identifier for this shader in the shader store
     */
    name: typeof SHADER_NAME;
    
    /**
     * The complete GLSL shader source code
     */
    shader: string;
}

/**
 * Exported shadow-only vertex shader configuration.
 * Automatically registered in Babylon.js ShaderStore upon import.
 * 
 * @remarks
 * This shader is typically used for objects that should cast shadows
 * but remain invisible in the final render (e.g., occluders, placeholder geometry).
 * 
 * Shader uniforms:
 * - `view`: View matrix
 * - `viewProjection`: Combined view-projection matrix
 * - `pointSize`: Point sprite size (optional, POINTSIZE defined)
 * 
 * Shader attributes:
 * - `position`: Vertex position (vec3)
 * - `normal`: Vertex normal (vec3, optional, NORMAL defined)
 * 
 * Shader varyings:
 * - `vPositionW`: World-space position
 * - `vNormalW`: World-space normal (NORMAL defined)
 * - `vColor`: Vertex color (VERTEXCOLOR defined)
 */
export declare const shadowOnlyVertexShader: ShadowOnlyVertexShaderConfig;