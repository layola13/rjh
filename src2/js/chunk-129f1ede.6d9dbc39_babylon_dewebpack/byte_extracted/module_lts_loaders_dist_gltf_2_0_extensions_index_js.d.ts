/**
 * glTF 2.0 Extensions Module
 * 
 * This module exports all available glTF 2.0 loader extensions for Babylon.js.
 * These extensions enhance the glTF loader with support for various official
 * and vendor-specific glTF extensions.
 */

/**
 * EXT_lights_image_based extension
 * Adds support for image-based lighting in glTF models
 */
export { EXT_lights_image_based } from './EXT_lights_image_based';

/**
 * EXT_mesh_gpu_instancing extension
 * Enables GPU instancing for efficient rendering of repeated meshes
 */
export { EXT_mesh_gpu_instancing } from './EXT_mesh_gpu_instancing';

/**
 * EXT_meshopt_compression extension
 * Provides support for meshopt compression to reduce file sizes
 */
export { EXT_meshopt_compression } from './EXT_meshopt_compression';

/**
 * EXT_texture_webp extension
 * Enables WebP texture format support for improved compression
 */
export { EXT_texture_webp } from './EXT_texture_webp';

/**
 * ExtrasAsMetadata extension
 * Converts glTF extras fields into Babylon.js metadata
 */
export { ExtrasAsMetadata } from './ExtrasAsMetadata';

/**
 * KHR_animation_pointer extension
 * Allows animations to target arbitrary glTF properties
 */
export { KHR_animation_pointer } from './KHR_animation_pointer';

/**
 * KHR_draco_mesh_compression extension
 * Supports Draco mesh compression for geometry data
 */
export { KHR_draco_mesh_compression } from './KHR_draco_mesh_compression';

/**
 * KHR_lights extension (also known as KHR_lights_punctual)
 * Adds support for punctual lights (point, spot, directional)
 */
export { KHR_lights } from './KHR_lights_punctual';

/**
 * KHR_materials_clearcoat extension
 * Implements clearcoat material layer for automotive and other glossy surfaces
 */
export { KHR_materials_clearcoat } from './KHR_materials_clearcoat';

/**
 * KHR_materials_emissive_strength extension
 * Allows emissive materials to exceed the default [0,1] range for HDR
 */
export { KHR_materials_emissive_strength } from './KHR_materials_emissive_strength';

/**
 * KHR_materials_ior extension
 * Specifies index of refraction for materials with transmission
 */
export { KHR_materials_ior } from './KHR_materials_ior';

/**
 * KHR_materials_iridescence extension
 * Adds thin-film iridescence effect to materials
 */
export { KHR_materials_iridescence } from './KHR_materials_iridescence';

/**
 * KHR_materials_pbrSpecularGlossiness extension
 * Provides specular-glossiness workflow as alternative to metallic-roughness
 */
export { KHR_materials_pbrSpecularGlossiness } from './KHR_materials_pbrSpecularGlossiness';

/**
 * KHR_materials_sheen extension
 * Adds sheen layer for cloth and fabric materials
 */
export { KHR_materials_sheen } from './KHR_materials_sheen';

/**
 * KHR_materials_specular extension
 * Controls specular reflection for materials
 */
export { KHR_materials_specular } from './KHR_materials_specular';

/**
 * KHR_materials_translucency extension
 * Enables subsurface scattering and translucent materials
 */
export { KHR_materials_translucency } from './KHR_materials_translucency';

/**
 * KHR_materials_transmission extension
 * Supports transparent materials with light transmission (glass, etc.)
 */
export { KHR_materials_transmission } from './KHR_materials_transmission';

/**
 * KHR_materials_unlit extension
 * Defines unlit materials that are not affected by lighting
 */
export { KHR_materials_unlit } from './KHR_materials_unlit';

/**
 * KHR_materials_variants extension
 * Allows switching between material variants at runtime
 */
export { KHR_materials_variants } from './KHR_materials_variants';

/**
 * KHR_materials_volume extension
 * Adds volumetric effects like fog, smoke, and thick glass
 */
export { KHR_materials_volume } from './KHR_materials_volume';

/**
 * KHR_mesh_quantization extension
 * Enables quantized vertex attributes for reduced memory usage
 */
export { KHR_mesh_quantization } from './KHR_mesh_quantization';

/**
 * KHR_texture_basisu extension
 * Supports Basis Universal texture compression format
 */
export { KHR_texture_basisu } from './KHR_texture_basisu';

/**
 * KHR_texture_transform extension
 * Allows UV transformation (offset, rotation, scale) for textures
 */
export { KHR_texture_transform } from './KHR_texture_transform';

/**
 * KHR_xmp_json_ld extension
 * Embeds XMP metadata in JSON-LD format
 */
export { KHR_xmp_json_ld } from './KHR_xmp_json_ld';

/**
 * MSFT_audio_emitter extension
 * Microsoft extension for spatial audio emitters
 */
export { MSFT_audio_emitter } from './MSFT_audio_emitter';

/**
 * MSFT_lod extension
 * Microsoft extension for level of detail (LOD) support
 */
export { MSFT_lod } from './MSFT_lod';

/**
 * MSFT_minecraftMesh extension
 * Microsoft extension for Minecraft-specific mesh features
 */
export { MSFT_minecraftMesh } from './MSFT_minecraftMesh';

/**
 * MSFT_sRGBFactors extension
 * Microsoft extension for sRGB color space factors
 */
export { MSFT_sRGBFactors } from './MSFT_sRGBFactors';