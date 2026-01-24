/**
 * Lava material vertex shader module
 * Provides vertex shader code for lava surface animation with noise-based displacement
 */

/**
 * Name identifier for the lava vertex shader
 */
export const lavaVertexShaderName: string;

/**
 * Complete GLSL vertex shader source code for lava material effect.
 * 
 * Features:
 * - Perlin noise-based vertex displacement for lava surface animation
 * - Time-based animation with configurable frequency speeds
 * - Support for standard Babylon.js material features (diffuse, normal, vertex colors, etc.)
 * - Multi-light support with shadows
 * - Fog and clipping plane support
 * - Skeletal animation and baked vertex animation support
 * 
 * Uniforms:
 * @uniform {float} time - Current animation time
 * @uniform {float} lowFrequencySpeed - Speed multiplier for low-frequency displacement
 * @uniform {mat4} view - View matrix
 * @uniform {mat4} viewProjection - View-projection matrix
 * @uniform {mat4} diffuseMatrix - Texture coordinate transformation matrix
 * @uniform {vec2} vDiffuseInfos - Diffuse texture configuration (x: UV set selector)
 * @uniform {float} pointSize - Point sprite size
 * 
 * Attributes:
 * @attribute {vec3} position - Vertex position
 * @attribute {vec3} normal - Vertex normal (when NORMAL is defined)
 * @attribute {vec2} uv - Primary UV coordinates (when UV1 is defined)
 * @attribute {vec2} uv2 - Secondary UV coordinates (when UV2 is defined)
 * @attribute {vec4} color - Vertex color (when VERTEXCOLOR is defined)
 * 
 * Varyings:
 * @varying {float} noise - Computed noise value passed to fragment shader
 * @varying {vec3} vPositionW - World space position
 * @varying {vec3} vNormalW - World space normal (when NORMAL is defined)
 * @varying {vec2} vDiffuseUV - Transformed diffuse UV coordinates (when DIFFUSE is defined)
 * @varying {vec4} vColor - Vertex color (when VERTEXCOLOR is defined)
 */
export const lavaVertexShader: string;

/**
 * Shader registration object containing name and shader source.
 * Automatically registers the shader in Babylon.js ShaderStore upon module load.
 */
export interface LavaVertexShaderRegistration {
  /** Shader identifier name */
  name: string;
  /** Complete GLSL shader source code */
  shader: string;
}