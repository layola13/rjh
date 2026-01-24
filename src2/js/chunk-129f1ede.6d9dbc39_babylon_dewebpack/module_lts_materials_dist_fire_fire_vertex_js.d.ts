/**
 * Fire material vertex shader declaration module
 * Provides GLSL vertex shader code for fire rendering effects
 */

/**
 * Configuration object for a shader registration
 */
export interface ShaderRegistration {
  /** The identifier name of the shader */
  name: string;
  /** The GLSL shader source code */
  shader: string;
}

/**
 * GLSL vertex shader source code for fire material rendering.
 * 
 * Features:
 * - Animated distortion coordinates for flame effect
 * - Time-based UV offset animation
 * - Multi-layer distortion sampling support
 * - Vertex color mixing
 * - Fog and clipping plane support
 * - Skeletal animation and vertex baking
 * 
 * Uniforms:
 * - time: Current animation time in milliseconds
 * - speed: Animation speed multiplier
 * - view: View matrix
 * - viewProjection: Combined view-projection matrix
 * - pointSize: Size of point primitives (if POINTSIZE defined)
 * 
 * Attributes:
 * - position: Vertex position in object space
 * - uv: Primary texture coordinates (if UV1 defined)
 * - uv2: Secondary texture coordinates (if UV2 defined)
 * - color: Vertex color (if VERTEXCOLOR defined)
 * 
 * Varyings:
 * - vPositionW: World space position
 * - vDiffuseUV: Transformed diffuse texture coordinates
 * - vDistortionCoords1/2/3: Multi-layer distortion coordinates for flame animation
 * - vColor: Interpolated vertex color (if VERTEXCOLOR defined)
 */
export declare const fireVertexShader: ShaderRegistration;

/**
 * The shader name identifier used for registration
 */
export declare const FIRE_VERTEX_SHADER_NAME = "fireVertexShader";