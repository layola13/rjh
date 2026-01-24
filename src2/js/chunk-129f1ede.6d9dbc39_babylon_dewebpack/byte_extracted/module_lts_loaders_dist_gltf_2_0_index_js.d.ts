/**
 * glTF 2.0 Loader Module
 * 
 * This module provides the main glTF 2.0 loader implementation and all official extensions.
 * It serves as the central export point for loading and parsing glTF 2.0 assets in Babylon.js.
 */

// Core glTF loader exports
export { ArrayItem } from './glTFLoader';
export { GLTFLoader } from './glTFLoader';

// Khronos Group (KHR) Extensions
/** Extension for Draco mesh compression */
export { KHR_draco_mesh_compression } from './Extensions/index';

/** Extension for PBR Specular-Glossiness material workflow */
export { KHR_materials_pbrSpecularGlossiness } from './Extensions/index';

/** Extension for unlit materials */
export { KHR_materials_unlit } from './Extensions/index';

/** Extension for clearcoat material layer */
export { KHR_materials_clearcoat } from './Extensions/index';

/** Extension for sheen material effect */
export { KHR_materials_sheen } from './Extensions/index';

/** Extension for specular material properties */
export { KHR_materials_specular } from './Extensions/index';

/** Extension for transmission (transparency) materials */
export { KHR_materials_transmission } from './Extensions/index';

/** Extension for Index of Refraction (IOR) */
export { KHR_materials_ior } from './Extensions/index';

/** Extension for iridescence material effect */
export { KHR_materials_iridescence } from './Extensions/index';

/** Extension for volumetric materials */
export { KHR_materials_volume } from './Extensions/index';

/** Extension for translucency material properties */
export { KHR_materials_translucency } from './Extensions/index';

/** Extension for emissive strength control */
export { KHR_materials_emissive_strength } from './Extensions/index';

/** Extension for material variants support */
export { KHR_materials_variants } from './Extensions/index';

/** Extension for punctual lights */
export { KHR_lights } from './Extensions/index';

/** Extension for texture coordinate transformations */
export { KHR_texture_transform } from './Extensions/index';

/** Extension for Basis Universal texture compression */
export { KHR_texture_basisu } from './Extensions/index';

/** Extension for mesh quantization optimization */
export { KHR_mesh_quantization } from './Extensions/index';

/** Extension for animation pointer targeting */
export { KHR_animation_pointer } from './Extensions/index';

/** Extension for XMP metadata in JSON-LD format */
export { KHR_xmp_json_ld } from './Extensions/index';

// Multi-vendor (EXT) Extensions
/** Extension for image-based lighting */
export { EXT_lights_image_based } from './Extensions/index';

/** Extension for GPU instancing of meshes */
export { EXT_mesh_gpu_instancing } from './Extensions/index';

/** Extension for meshopt compression */
export { EXT_meshopt_compression } from './Extensions/index';

/** Extension for WebP texture format support */
export { EXT_texture_webp } from './Extensions/index';

/** Extension to store glTF extras as metadata */
export { ExtrasAsMetadata } from './Extensions/index';

// Microsoft (MSFT) Extensions
/** Extension for spatial audio emitters */
export { MSFT_audio_emitter } from './Extensions/index';

/** Extension for Level of Detail (LOD) support */
export { MSFT_lod } from './Extensions/index';

/** Extension for Minecraft-specific mesh data */
export { MSFT_minecraftMesh } from './Extensions/index';

/** Extension for sRGB color space factors */
export { MSFT_sRGBFactors } from './Extensions/index';