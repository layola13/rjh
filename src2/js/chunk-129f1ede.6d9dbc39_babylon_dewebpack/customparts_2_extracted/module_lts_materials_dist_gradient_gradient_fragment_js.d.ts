/**
 * Gradient material fragment shader definition
 * Provides gradient color interpolation with lighting support
 */

/**
 * Shader name identifier for the gradient pixel shader
 */
export const gradientPixelShaderName: string;

/**
 * Complete gradient fragment shader source code
 * 
 * Features:
 * - Gradient interpolation between top and bottom colors
 * - Multiple light sources support (up to maxSimultaneousLights)
 * - Optional vertex colors, normals, and alpha testing
 * - Fog, shadows, and clipping plane support
 * - Emissive and alpha blending modes
 * 
 * Uniforms:
 * - vEyePosition: Camera position in world space
 * - topColor: Top gradient color (RGBA)
 * - bottomColor: Bottom gradient color (RGBA)
 * - offset: Vertical offset for gradient calculation
 * - scale: Scaling factor for gradient position
 * - smoothness: Smoothness factor for gradient interpolation (clamped 0.01-10.0)
 * 
 * Varyings:
 * - vPositionW: Vertex position in world space
 * - vPosition: Vertex position in local/model space
 * - vNormalW: Vertex normal in world space (if NORMAL defined)
 * - vColor: Vertex color (if VERTEXCOLOR defined)
 * 
 * Defines:
 * - NORMAL: Enable normal-based lighting calculations
 * - VERTEXCOLOR: Enable vertex color multiplication
 * - ALPHATEST: Enable alpha testing (discard fragments < 0.4)
 * - EMISSIVE: Enable emissive color mode
 * - VERTEXALPHA: Enable vertex alpha blending
 * - INSTANCESCOLOR/INSTANCES: Enable instanced color support
 */
export const gradientPixelShader: {
    /**
     * Shader identifier name
     */
    name: string;
    
    /**
     * GLSL shader source code
     */
    shader: string;
};

/**
 * Type definition for gradient shader exports
 */
export interface GradientShaderModule {
    /**
     * Gradient pixel/fragment shader definition
     */
    gradientPixelShader: {
        name: string;
        shader: string;
    };
}