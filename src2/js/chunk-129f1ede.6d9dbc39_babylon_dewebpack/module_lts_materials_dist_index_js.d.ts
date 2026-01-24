/**
 * Babylon.js Materials Library
 * 
 * This module provides a collection of specialized material types for advanced
 * rendering effects in Babylon.js applications.
 */

/**
 * Cell shading material that creates a cartoon-like, non-photorealistic rendering effect.
 * Commonly used for toon-style graphics with distinct color bands.
 */
export { CellMaterial } from './cell/index';

/**
 * Highly customizable material allowing developers to inject custom shader code
 * into the standard Babylon.js material pipeline.
 */
export { CustomMaterial } from './custom/index';

/**
 * Structure defining the organization and injection points for custom shader code.
 * Used in conjunction with CustomMaterial and PBRCustomMaterial.
 */
export { CustomShaderStructure } from './custom/index';

/**
 * Material simulating animated fire effects with flickering and color gradients.
 * Useful for torch flames, campfires, and other fire-based visual effects.
 */
export { FireMaterial } from './fire/index';

/**
 * Material that simulates fur or hair-like surfaces using shell-based rendering techniques.
 * Creates multiple layers to achieve a realistic fur appearance.
 */
export { FurMaterial } from './fur/index';

/**
 * Material that creates smooth color transitions across a surface.
 * Supports linear and radial gradients with customizable color stops.
 */
export { GradientMaterial } from './gradient/index';

/**
 * Material rendering a customizable grid pattern, commonly used for editor floors,
 * debug visualizations, and architectural reference planes.
 */
export { GridMaterial } from './grid/index';

/**
 * Material simulating molten lava with animated flowing effects and emission.
 * Combines texture distortion and color blending for realistic magma appearance.
 */
export { LavaMaterial } from './lava/index';

/**
 * Material that blends multiple textures based on a mix map or vertex colors.
 * Essential for terrain rendering and complex surface composition.
 */
export { MixMaterial } from './mix/index';

/**
 * Debug material that visualizes surface normals using RGB color mapping.
 * Red = X-axis, Green = Y-axis, Blue = Z-axis. Useful for geometry validation.
 */
export { NormalMaterial } from './normal/index';

/**
 * Physically-Based Rendering (PBR) material with custom shader injection capabilities.
 * Combines realistic lighting with the flexibility of CustomMaterial.
 */
export { PBRCustomMaterial } from './custom/index';

/**
 * Enumeration or configuration defining albedo-related shader code injection points
 * for custom material modifications.
 */
export { ShaderAlebdoParts } from './custom/index';

/**
 * Enumeration or configuration defining special shader code injection points
 * (e.g., fragment definitions, vertex definitions) for advanced customization.
 */
export { ShaderSpecialParts } from './custom/index';

/**
 * Material that only renders shadows while keeping the object itself invisible.
 * Commonly used for shadow catchers in mixed reality or compositing scenarios.
 */
export { ShadowOnlyMaterial } from './shadowOnly/index';

/**
 * Lightweight material with basic diffuse lighting and minimal computational overhead.
 * Ideal for mobile platforms or scenes requiring high performance.
 */
export { SimpleMaterial } from './simple/index';

/**
 * Procedural sky material simulating atmospheric scattering effects.
 * Provides realistic day/night cycles and sun positioning.
 */
export { SkyMaterial } from './sky/index';

/**
 * Specialized material for terrain rendering with multi-texture splatting.
 * Supports height-based blending and detail texture layering.
 */
export { TerrainMaterial } from './terrain/index';

/**
 * Material that projects three orthogonal textures (X, Y, Z planes) onto geometry.
 * Eliminates UV mapping requirements and prevents texture stretching on complex meshes.
 */
export { TriPlanarMaterial } from './triPlanar/index';

/**
 * Material simulating realistic water surfaces with waves, reflections, and refraction.
 * Includes foam, depth-based coloring, and animated normal mapping.
 */
export { WaterMaterial } from './water/index';