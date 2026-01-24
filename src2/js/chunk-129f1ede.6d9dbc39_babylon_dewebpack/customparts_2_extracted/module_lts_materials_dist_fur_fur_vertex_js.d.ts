/**
 * Fur material vertex shader declaration module
 * Provides the GLSL vertex shader code for rendering fur effects
 */

/**
 * Name identifier for the fur vertex shader
 */
export declare const furVertexShader: {
  /**
   * The shader name used for registration and lookup
   */
  name: string;
  
  /**
   * The complete GLSL vertex shader source code for fur rendering.
   * 
   * Features:
   * - Fur length and angle control
   * - Optional heightmap-based fur length variation
   * - High-level fur simulation with gravity and wind effects
   * - Support for vertex colors, multiple UV sets, skeletal animation
   * - Shadow casting, fog, and clipping plane support
   * 
   * Shader defines:
   * @define {UV1} - Enable primary UV coordinates
   * @define {UV2} - Enable secondary UV coordinates
   * @define {VERTEXCOLOR} - Enable vertex color support
   * @define {HIGHLEVEL} - Enable advanced fur simulation (gravity, wind, spacing)
   * @define {HEIGHTMAP} - Use heightmap texture for per-vertex fur length
   * @define {DIFFUSE} - Enable diffuse texture mapping
   * @define {NORMAL} - Enable normal vector output
   * @define {POINTSIZE} - Enable point size rendering
   */
  shader: string;
};