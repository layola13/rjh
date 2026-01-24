/**
 * Water material vertex shader definition
 * Provides vertex shader code for water surface rendering with waves, reflections, and refractions
 */

/**
 * Water vertex shader configuration
 */
export interface WaterVertexShader {
  /** Shader identifier name */
  name: string;
  /** GLSL shader source code */
  shader: string;
}

/**
 * Name identifier for the water vertex shader
 */
export const waterVertexShaderName: string;

/**
 * Exported water vertex shader object containing the complete GLSL vertex shader
 * for water material rendering.
 * 
 * Features:
 * - Wave animation based on time, wind direction, and wave parameters
 * - Reflection and refraction texture coordinate generation
 * - Normal mapping support with optional superimpose mode
 * - Vertex skinning and bone animation
 * - Fog and shadow mapping
 * - Instancing and vertex color support
 * 
 * Shader defines:
 * - NORMAL: Enable normal processing
 * - UV1/UV2: Enable UV coordinate sets
 * - VERTEXCOLOR: Enable vertex colors
 * - BUMP: Enable normal mapping
 * - BUMPSUPERIMPOSE: Enable dual normal map blending
 * - REFLECTION: Enable reflection/refraction mapping
 * - POINTSIZE: Enable point size output
 * - INSTANCESCOLOR: Enable per-instance coloring
 * 
 * Uniforms:
 * - view: View matrix
 * - viewProjection: Combined view-projection matrix
 * - worldReflectionViewProjection: World-reflection view-projection matrix
 * - windDirection: Wind direction vector (xy)
 * - waveLength: Wave length scale factor
 * - time: Animation time
 * - windForce: Wind strength multiplier
 * - waveHeight: Wave amplitude
 * - waveSpeed: Wave animation speed
 * - waveCount: Number of waves
 * - normalMatrix: Normal transformation matrix
 * - vNormalInfos: Normal map configuration
 * - pointSize: Point sprite size
 * 
 * Varyings (outputs):
 * - vPositionW: World space position
 * - vNormalW: World space normal
 * - vPosition: Local position
 * - vRefractionMapTexCoord: Refraction map texture coordinates
 * - vReflectionMapTexCoord: Reflection map texture coordinates
 * - vNormalUV: Primary normal map UV coordinates
 * - vNormalUV2: Secondary normal map UV coordinates (superimpose mode)
 * - vColor: Vertex/instance color
 */
export const waterVertexShader: WaterVertexShader;