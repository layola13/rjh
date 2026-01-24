/**
 * Fire material vertex shader module
 * Provides vertex shader code for fire rendering effects with distortion animations
 */

/**
 * Name identifier for the fire vertex shader
 */
export declare const fireVertexShaderName: string;

/**
 * Fire vertex shader configuration object
 */
export interface FireVertexShaderConfig {
  /**
   * Unique name identifier for the shader
   */
  name: string;
  
  /**
   * GLSL vertex shader source code
   */
  shader: string;
}

/**
 * Fire vertex shader implementation
 * 
 * Features:
 * - High precision float calculations
 * - UV coordinate distortion for fire effect animation
 * - Multi-layer distortion with configurable speed
 * - Support for skeletal animation (bones)
 * - Support for baked vertex animation
 * - Instancing support for performance optimization
 * - Vertex color blending
 * - Fog rendering
 * - Clipping plane support
 * - Point size rendering
 * 
 * Shader defines:
 * @define UV1 - Enable primary UV coordinates
 * @define UV2 - Enable secondary UV coordinates
 * @define VERTEXCOLOR - Enable vertex color attributes
 * @define DIFFUSE - Enable diffuse texture with distortion
 * @define POINTSIZE - Enable point size uniform
 * @define WEBGPU - WebGPU compatibility mode
 * 
 * Uniforms:
 * - view: Camera view matrix
 * - viewProjection: Combined view-projection matrix
 * - time: Current animation time in milliseconds
 * - speed: Animation speed multiplier
 * - pointSize: Size of rendered points (if POINTSIZE defined)
 * 
 * Attributes:
 * - position: Vertex position (vec3)
 * - uv: Primary UV coordinates (vec2, if UV1 defined)
 * - uv2: Secondary UV coordinates (vec2, if UV2 defined)
 * - color: Vertex color (vec4, if VERTEXCOLOR defined)
 * 
 * Varyings:
 * - vPositionW: World space position
 * - vDiffuseUV: Diffuse texture coordinates
 * - vDistortionCoords1/2/3: Three layers of distorted UV coordinates for fire effect
 * - vColor: Interpolated vertex color (if VERTEXCOLOR defined)
 */
export declare const fireVertexShader: FireVertexShaderConfig;