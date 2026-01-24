/**
 * Cell material vertex shader module
 * Provides vertex shader code for cell/toon shading effects
 */

/**
 * Name identifier for the cell vertex shader
 */
export const cellVertexShader: string;

/**
 * Cell Vertex Shader
 * 
 * Handles vertex transformations and attribute processing for cell-shaded materials.
 * Supports bones animation, vertex colors, multiple UV sets, fog, shadows, and clipping planes.
 * 
 * Features:
 * - Skeletal animation via bones
 * - Baked vertex animation
 * - Instanced rendering support
 * - Diffuse texture mapping with dual UV channels
 * - Vertex color blending
 * - Shadow casting/receiving
 * - Fog effects
 * - Clip plane support
 * - Point size control
 * 
 * Preprocessor Directives:
 * - NORMAL: Include normal attribute and calculations
 * - UV1: Include primary UV coordinates
 * - UV2: Include secondary UV coordinates
 * - VERTEXCOLOR: Enable vertex color support
 * - DIFFUSE: Enable diffuse texture mapping
 * - POINTSIZE: Enable point size control (non-WebGPU)
 * 
 * Attributes:
 * - position: Vertex position in local space
 * - normal: Vertex normal (optional)
 * - uv: Primary texture coordinates (optional)
 * - uv2: Secondary texture coordinates (optional)
 * - color: Vertex color (optional)
 * 
 * Uniforms:
 * - view: View matrix
 * - viewProjection: Combined view-projection matrix
 * - diffuseMatrix: Texture coordinate transformation matrix
 * - vDiffuseInfos: Diffuse texture info (x: UV channel selector, y: reserved)
 * - pointSize: Point sprite size
 * 
 * Varyings:
 * - vPositionW: World space position
 * - vNormalW: World space normal
 * - vDiffuseUV: Transformed diffuse texture coordinates
 * - vColor: Interpolated vertex color
 */
export declare const cellVertexShaderCode: string;

/**
 * Shader registration metadata
 */
export interface CellVertexShaderMetadata {
  /** Shader identifier name */
  name: string;
  /** Compiled shader code stored in ShaderStore */
  shader: string;
}

/**
 * Cell vertex shader metadata with registration information
 */
export declare const cellVertexShaderMetadata: CellVertexShaderMetadata;