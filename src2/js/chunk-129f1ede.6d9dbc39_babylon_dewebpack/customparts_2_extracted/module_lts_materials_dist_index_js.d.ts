/**
 * Babylon.js Materials Library
 * 
 * This module provides a collection of advanced material implementations
 * for the Babylon.js 3D engine, including stylized, procedural, and 
 * special-effect materials.
 * 
 * @module @babylonjs/materials
 */

/**
 * Cell-shaded material for cartoon/toon rendering effects.
 * Creates distinct color bands instead of smooth gradients.
 */
export class CellMaterial {}

/**
 * Base class for creating custom materials with shader code injection.
 * Allows modification of standard material shaders without rewriting entire shader.
 */
export class CustomMaterial {}

/**
 * Structure defining the organization and injection points for custom shaders.
 * Used to specify where custom shader code should be inserted.
 */
export class CustomShaderStructure {}

/**
 * Animated fire material with procedural flame effects.
 * Simulates burning fire with distortion and color gradients.
 */
export class FireMaterial {}

/**
 * Fur/hair rendering material with shell-based rendering technique.
 * Creates realistic fur appearance through layered shell textures.
 */
export class FurMaterial {}

/**
 * Material with smooth color gradients.
 * Interpolates between multiple colors across the surface.
 */
export class GradientMaterial {}

/**
 * Grid pattern material for technical visualizations.
 * Renders a customizable grid overlay, useful for coordinate systems.
 */
export class GridMaterial {}

/**
 * Animated lava material with flowing magma effects.
 * Combines textures and noise for realistic molten rock appearance.
 */
export class LavaMaterial {}

/**
 * Blends multiple materials together based on a mix map texture.
 * Commonly used for terrain with different surface types.
 */
export class MixMaterial {}

/**
 * Visualizes surface normals as RGB colors.
 * Useful for debugging geometry and normal map issues.
 */
export class NormalMaterial {}

/**
 * PBR-based custom material with shader injection capabilities.
 * Extends physically-based rendering with custom shader code.
 */
export class PBRCustomMaterial {}

/**
 * Shader injection points for albedo/diffuse color calculations.
 * Defines where custom albedo shader code can be inserted.
 */
export class ShaderAlebdoParts {}

/**
 * Shader injection points for special effects and calculations.
 * Defines locations for custom shader code in specialized rendering passes.
 */
export class ShaderSpecialParts {}

/**
 * Material that only renders shadows, making the geometry itself invisible.
 * Useful for shadow-catching planes and invisible occluders.
 */
export class ShadowOnlyMaterial {}

/**
 * Lightweight material with basic lighting calculations.
 * Offers better performance than standard materials with simplified rendering.
 */
export class SimpleMaterial {}

/**
 * Procedural sky material implementing atmospheric scattering.
 * Renders realistic sky dome with sun position and atmospheric effects.
 */
export class SkyMaterial {}

/**
 * Multi-texture terrain material with height-based blending.
 * Optimized for large landscapes with multiple surface types.
 */
export class TerrainMaterial {}

/**
 * Projects textures from three perpendicular planes onto geometry.
 * Eliminates UV mapping issues on complex organic shapes.
 */
export class TriPlanarMaterial {}

/**
 * Realistic water surface material with waves and reflections.
 * Simulates water with bump mapping, reflections, and animated waves.
 */
export class WaterMaterial {}