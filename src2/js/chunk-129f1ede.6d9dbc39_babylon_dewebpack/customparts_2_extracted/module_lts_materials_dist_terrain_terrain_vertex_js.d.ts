/**
 * Terrain vertex shader module
 * Provides vertex shader code for terrain rendering in Babylon.js
 */

/**
 * Name identifier for the terrain vertex shader
 */
export const terrainVertexShaderName: string;

/**
 * Terrain vertex shader configuration object
 */
export interface TerrainVertexShader {
  /** The shader name identifier */
  name: string;
  /** The complete GLSL shader source code */
  shader: string;
}

/**
 * Complete terrain vertex shader with GLSL source code.
 * 
 * Handles:
 * - Vertex position transformation
 * - Normal vector calculation
 * - UV texture coordinate mapping (UV1/UV2)
 * - Vertex colors
 * - Skeletal animation (bones)
 * - Baked vertex animations
 * - Instancing
 * - Fog effects
 * - Shadow mapping
 * - Clipping planes
 * - Multiple simultaneous lights
 * 
 * @remarks
 * The shader supports various preprocessor directives for conditional features:
 * - NORMAL: Enable normal vector processing
 * - UV1/UV2: Enable primary/secondary texture coordinates
 * - VERTEXCOLOR: Enable per-vertex coloring
 * - DIFFUSE: Enable diffuse texture mapping
 * - POINTSIZE: Enable point size rendering
 * - INSTANCESCOLOR: Enable per-instance coloring
 */
export const terrainVertexShader: TerrainVertexShader;