/**
 * Fur material vertex shader declaration module
 * Provides GLSL vertex shader code for fur rendering effects
 */

/**
 * Name identifier for the fur vertex shader
 */
export declare const furVertexShaderName: string;

/**
 * Fur vertex shader configuration object containing shader name and GLSL source code
 */
export declare const furVertexShader: {
  /**
   * Unique identifier for the shader in the shader store
   */
  name: string;
  
  /**
   * Complete GLSL vertex shader source code for fur rendering
   * 
   * Features:
   * - Fur length and angle adjustments
   * - Optional heightmap-based fur length variation
   * - High-level fur simulation with gravity and wind forces
   * - Support for diffuse texture mapping
   * - Vertex color blending
   * - Bone-based skeletal animation
   * - Shadow casting
   * - Fog effects
   * - Instanced rendering support
   * 
   * Shader Defines:
   * - UV1/UV2: Enable texture coordinate sets
   * - VERTEXCOLOR: Enable per-vertex coloring
   * - HIGHLEVEL: Enable advanced fur simulation (gravity, wind, spacing)
   * - HEIGHTMAP: Use texture for fur length variation
   * - DIFFUSE: Enable diffuse texture mapping
   * - NORMAL: Enable normal vector output
   * - POINTSIZE: Enable point size control
   */
  shader: string;
};

/**
 * GLSL Vertex Shader Attributes:
 * @attribute position - vec3: Vertex position in object space
 * @attribute normal - vec3: Vertex normal vector
 * @attribute uv - vec2: Primary texture coordinates (when UV1 is defined)
 * @attribute uv2 - vec2: Secondary texture coordinates (when UV2 is defined)
 * @attribute color - vec4: Vertex color (when VERTEXCOLOR is defined)
 */

/**
 * GLSL Vertex Shader Uniforms:
 * @uniform furLength - float: Base length of fur strands
 * @uniform furAngle - float: Angle of fur strand deviation from normal
 * @uniform furOffset - float: Offset multiplier for fur layers (HIGHLEVEL)
 * @uniform furGravity - vec3: Gravity force vector (HIGHLEVEL)
 * @uniform furTime - float: Time value for animated fur motion (HIGHLEVEL)
 * @uniform furSpacing - float: Spacing between fur layers (HIGHLEVEL)
 * @uniform furDensity - float: Density of fur texture sampling (HIGHLEVEL)
 * @uniform heightTexture - sampler2D: Texture for fur length variation (HEIGHTMAP)
 * @uniform view - mat4: View transformation matrix
 * @uniform viewProjection - mat4: Combined view-projection matrix
 * @uniform diffuseMatrix - mat4: Diffuse texture transformation matrix
 * @uniform vDiffuseInfos - vec2: Diffuse texture configuration
 * @uniform pointSize - float: Size of rendered points (POINTSIZE)
 */

/**
 * GLSL Vertex Shader Varyings:
 * @varying vPositionW - vec3: Vertex position in world space
 * @varying vNormalW - vec3: Normal vector in world space (NORMAL)
 * @varying vfur_length - float: Computed fur length for this vertex
 * @varying vDiffuseUV - vec2: Transformed diffuse texture coordinates
 * @varying vFurUV - vec2: Fur density-adjusted texture coordinates (HIGHLEVEL)
 * @varying vColor - vec4: Interpolated vertex color (VERTEXCOLOR)
 */