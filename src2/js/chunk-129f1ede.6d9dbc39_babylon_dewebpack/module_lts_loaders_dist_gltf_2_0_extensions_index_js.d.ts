/**
 * glTF 2.0 Extensions Module
 * 
 * This module exports all available glTF 2.0 loader extensions for Babylon.js.
 * Extensions add support for additional features beyond the core glTF 2.0 specification.
 */

// ============================================================================
// EXT Extensions (Vendor-specific extensions)
// ============================================================================

/**
 * EXT_lights_image_based
 * Adds support for image-based lighting in glTF files.
 */
export { EXT_lights_image_based } from './EXT_lights_image_based';

/**
 * EXT_mesh_gpu_instancing
 * Enables GPU instancing for meshes to improve rendering performance of repeated geometry.
 */
export { EXT_mesh_gpu_instancing } from './EXT_mesh_gpu_instancing';

/**
 * EXT_meshopt_compression
 * Provides support for meshoptimizer compression to reduce file size.
 */
export { EXT_meshopt_compression } from './EXT_meshopt_compression';

/**
 * EXT_texture_webp
 * Adds WebP texture format support for improved compression.
 */
export { EXT_texture_webp } from './EXT_texture_webp';

// ============================================================================
// KHR Extensions (Khronos ratified extensions)
// ============================================================================

/**
 * KHR_animation_pointer
 * Allows animations to target arbitrary properties using JSON Pointer syntax.
 */
export { KHR_animation_pointer } from './KHR_animation_pointer';

/**
 * KHR_draco_mesh_compression
 * Provides Draco geometry compression support for reduced file sizes.
 */
export { KHR_draco_mesh_compression } from './KHR_draco_mesh_compression';

/**
 * KHR_lights (KHR_lights_punctual)
 * Adds support for punctual lights (point, spot, directional).
 */
export { KHR_lights } from './KHR_lights_punctual';

/**
 * KHR_materials_clearcoat
 * Adds a clear coating layer to materials for car paint and similar effects.
 */
export { KHR_materials_clearcoat } from './KHR_materials_clearcoat';

/**
 * KHR_materials_emissive_strength
 * Allows emissive materials to exceed the default [0,1] range for HDR emissive.
 */
export { KHR_materials_emissive_strength } from './KHR_materials_emissive_strength';

/**
 * KHR_materials_ior
 * Defines the index of refraction for dielectric materials.
 */
export { KHR_materials_ior } from './KHR_materials_ior';

/**
 * KHR_materials_iridescence
 * Adds thin-film iridescence effects (soap bubble, oil slick).
 */
export { KHR_materials_iridescence } from './KHR_materials_iridescence';

/**
 * KHR_materials_pbrSpecularGlossiness
 * Alternative PBR workflow using specular-glossiness instead of metallic-roughness.
 */
export { KHR_materials_pbrSpecularGlossiness } from './KHR_materials_pbrSpecularGlossiness';

/**
 * KHR_materials_sheen
 * Adds sheen layer for cloth and fabric materials.
 */
export { KHR_materials_sheen } from './KHR_materials_sheen';

/**
 * KHR_materials_specular
 * Provides more control over specular reflections in materials.
 */
export { KHR_materials_specular } from './KHR_materials_specular';

/**
 * KHR_materials_translucency
 * Enables translucency/subsurface scattering effects.
 */
export { KHR_materials_translucency } from './KHR_materials_translucency';

/**
 * KHR_materials_transmission
 * Adds support for transparent/transmissive materials like glass.
 */
export { KHR_materials_transmission } from './KHR_materials_transmission';

/**
 * KHR_materials_unlit
 * Defines unlit materials that are not affected by lighting.
 */
export { KHR_materials_unlit } from './KHR_materials_unlit';

/**
 * KHR_materials_variants
 * Allows multiple material variants for a single mesh.
 */
export { KHR_materials_variants } from './KHR_materials_variants';

/**
 * KHR_materials_volume
 * Adds volumetric effects for thick translucent materials.
 */
export { KHR_materials_volume } from './KHR_materials_volume';

/**
 * KHR_mesh_quantization
 * Enables quantized vertex attributes for reduced memory usage.
 */
export { KHR_mesh_quantization } from './KHR_mesh_quantization';

/**
 * KHR_texture_basisu
 * Adds support for Basis Universal texture compression.
 */
export { KHR_texture_basisu } from './KHR_texture_basisu';

/**
 * KHR_texture_transform
 * Allows UV transformations (offset, rotation, scale) on textures.
 */
export { KHR_texture_transform } from './KHR_texture_transform';

/**
 * KHR_xmp_json_ld
 * Embeds XMP metadata in glTF files using JSON-LD format.
 */
export { KHR_xmp_json_ld } from './KHR_xmp_json_ld';

// ============================================================================
// MSFT Extensions (Microsoft vendor extensions)
// ============================================================================

/**
 * MSFT_audio_emitter
 * Adds spatial audio emitters to glTF scenes.
 */
export { MSFT_audio_emitter } from './MSFT_audio_emitter';

/**
 * MSFT_lod
 * Provides level-of-detail support for progressive loading.
 */
export { MSFT_lod } from './MSFT_lod';

/**
 * MSFT_minecraftMesh
 * Support for Minecraft-specific mesh data.
 */
export { MSFT_minecraftMesh } from './MSFT_minecraftMesh';

/**
 * MSFT_sRGBFactors
 * Interprets material factors as sRGB instead of linear.
 */
export { MSFT_sRGBFactors } from './MSFT_sRGBFactors';

// ============================================================================
// Other Extensions
// ============================================================================

/**
 * ExtrasAsMetadata
 * Converts glTF extras fields into Babylon.js metadata.
 */
export { ExtrasAsMetadata } from './ExtrasAsMetadata';