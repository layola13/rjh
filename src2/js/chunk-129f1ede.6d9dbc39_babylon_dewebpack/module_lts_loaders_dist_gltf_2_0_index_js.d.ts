/**
 * glTF 2.0 Loader Module
 * Exports the main GLTFLoader and all supported extensions
 */

/**
 * Utility class for handling array items in glTF structures
 */
export { ArrayItem } from './glTFLoader';

/**
 * Main glTF 2.0 loader class
 * Handles loading and parsing of glTF 2.0 assets
 */
export { GLTFLoader } from './glTFLoader';

/**
 * EXT_lights_image_based extension
 * Adds support for image-based lighting in glTF files
 */
export { EXT_lights_image_based } from './Extensions/index';

/**
 * EXT_mesh_gpu_instancing extension
 * Enables GPU instancing for efficient rendering of repeated meshes
 */
export { EXT_mesh_gpu_instancing } from './Extensions/index';

/**
 * EXT_meshopt_compression extension
 * Provides meshoptimizer compression for geometry and animation data
 */
export { EXT_meshopt_compression } from './Extensions/index';

/**
 * EXT_texture_webp extension
 * Adds WebP texture format support
 */
export { EXT_texture_webp } from './Extensions/index';

/**
 * ExtrasAsMetadata extension
 * Treats glTF extras as metadata on Babylon.js objects
 */
export { ExtrasAsMetadata } from './Extensions/index';

/**
 * KHR_animation_pointer extension
 * Allows animations to target arbitrary glTF properties
 */
export { KHR_animation_pointer } from './Extensions/index';

/**
 * KHR_draco_mesh_compression extension
 * Enables Draco geometry compression for smaller file sizes
 */
export { KHR_draco_mesh_compression } from './Extensions/index';

/**
 * KHR_lights extension (deprecated, use KHR_lights_punctual)
 * Adds punctual light sources to glTF scenes
 */
export { KHR_lights } from './Extensions/index';

/**
 * KHR_materials_clearcoat extension
 * Adds a clear coating layer to materials for automotive/lacquer effects
 */
export { KHR_materials_clearcoat } from './Extensions/index';

/**
 * KHR_materials_emissive_strength extension
 * Allows emissive intensity values greater than 1.0 for HDR emissive materials
 */
export { KHR_materials_emissive_strength } from './Extensions/index';

/**
 * KHR_materials_ior extension
 * Specifies the index of refraction for dielectric materials
 */
export { KHR_materials_ior } from './Extensions/index';

/**
 * KHR_materials_iridescence extension
 * Adds thin-film iridescence effects (soap bubble, oil slick)
 */
export { KHR_materials_iridescence } from './Extensions/index';

/**
 * KHR_materials_pbrSpecularGlossiness extension
 * Alternative PBR workflow using specular-glossiness instead of metallic-roughness
 */
export { KHR_materials_pbrSpecularGlossiness } from './Extensions/index';

/**
 * KHR_materials_sheen extension
 * Adds sheen layer for cloth and fabric materials
 */
export { KHR_materials_sheen } from './Extensions/index';

/**
 * KHR_materials_specular extension
 * Adjusts specular reflection for dielectric materials
 */
export { KHR_materials_specular } from './Extensions/index';

/**
 * KHR_materials_translucency extension
 * Enables subsurface scattering approximation for translucent materials
 */
export { KHR_materials_translucency } from './Extensions/index';

/**
 * KHR_materials_transmission extension
 * Enables light transmission through surfaces for glass and transparent materials
 */
export { KHR_materials_transmission } from './Extensions/index';

/**
 * KHR_materials_unlit extension
 * Disables lighting calculations for constant-color materials
 */
export { KHR_materials_unlit } from './Extensions/index';

/**
 * KHR_materials_variants extension
 * Allows switching between material variants at runtime
 */
export { KHR_materials_variants } from './Extensions/index';

/**
 * KHR_materials_volume extension
 * Adds volumetric attenuation for thick translucent objects
 */
export { KHR_materials_volume } from './Extensions/index';

/**
 * KHR_mesh_quantization extension
 * Enables quantized vertex attributes for reduced memory usage
 */
export { KHR_mesh_quantization } from './Extensions/index';

/**
 * KHR_texture_basisu extension
 * Adds Basis Universal texture compression support
 */
export { KHR_texture_basisu } from './Extensions/index';

/**
 * KHR_texture_transform extension
 * Allows UV transformation (offset, rotation, scale) on textures
 */
export { KHR_texture_transform } from './Extensions/index';

/**
 * KHR_xmp_json_ld extension
 * Embeds XMP metadata in glTF assets
 */
export { KHR_xmp_json_ld } from './Extensions/index';

/**
 * MSFT_audio_emitter extension
 * Microsoft extension for spatial audio emitters
 */
export { MSFT_audio_emitter } from './Extensions/index';

/**
 * MSFT_lod extension
 * Microsoft extension for level-of-detail support
 */
export { MSFT_lod } from './Extensions/index';

/**
 * MSFT_minecraftMesh extension
 * Microsoft extension for Minecraft-specific mesh data
 */
export { MSFT_minecraftMesh } from './Extensions/index';

/**
 * MSFT_sRGBFactors extension
 * Microsoft extension for sRGB color space factors
 */
export { MSFT_sRGBFactors } from './Extensions/index';