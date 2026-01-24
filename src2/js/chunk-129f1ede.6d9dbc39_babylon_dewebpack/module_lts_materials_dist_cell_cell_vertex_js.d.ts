/**
 * Cell shader vertex shader declaration module
 * Provides vertex shader code for the cell shading material system
 */

/**
 * Name identifier for the cell vertex shader
 */
export const cellVertexShaderName: string;

/**
 * Cell vertex shader configuration object
 * Contains the shader name and GLSL source code for cell shading vertex processing
 */
export interface ICellVertexShader {
  /**
   * Unique identifier name for this shader
   */
  name: string;
  
  /**
   * GLSL vertex shader source code
   * Handles vertex transformation, normal calculation, UV mapping, and lighting preparation
   */
  shader: string;
}

/**
 * Cell vertex shader export
 * 
 * This shader implements vertex processing for cell/toon shading effects including:
 * - Vertex position transformation with bone animation support
 * - Normal vector transformation for lighting calculations
 * - UV coordinate mapping for diffuse textures (supports UV1 and UV2 channels)
 * - Vertex color blending
 * - Shadow map coordinate generation
 * - Fog calculation preparation
 * - Clip plane support
 * - Instancing support for efficient rendering
 * 
 * Preprocessor definitions control feature inclusion:
 * - NORMAL: Enable normal vector processing
 * - UV1/UV2: Enable texture coordinate channels
 * - VERTEXCOLOR: Enable per-vertex color attributes
 * - DIFFUSE: Enable diffuse texture mapping
 * - POINTSIZE: Enable point sprite size control
 * 
 * @remarks
 * The shader automatically registers itself in the ShaderStore upon import
 */
export const cellVertexShader: ICellVertexShader;