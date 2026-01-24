/**
 * Normal map procedural texture pixel shader module
 * Generates normal maps from height/luminance data by computing gradient slopes
 */

/**
 * Shader name identifier for the normal map procedural texture pixel shader
 */
export declare const SHADER_NAME: string;

/**
 * GLSL pixel shader source code for generating normal maps from texture data.
 * 
 * The shader samples neighboring pixels to compute luminance gradients,
 * which are then converted to normal map slope values.
 * 
 * Uniforms:
 * - baseSampler: The input texture to generate normals from
 * - size: The texture size used for offset calculations
 * 
 * Varyings:
 * - vUV: Texture coordinates from vertex shader
 */
export declare const normalMapProceduralTexturePixelShader: {
    /**
     * Human-readable name of the shader
     */
    readonly name: string;
    
    /**
     * The GLSL shader source code as a string
     */
    readonly shader: string;
};

/**
 * Type definition for the shader object structure
 */
export interface NormalMapShaderDefinition {
    /**
     * Shader identifier name
     */
    name: string;
    
    /**
     * GLSL shader source code
     */
    shader: string;
}