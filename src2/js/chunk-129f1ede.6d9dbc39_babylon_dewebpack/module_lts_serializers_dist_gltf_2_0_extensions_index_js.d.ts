/**
 * glTF 2.0 Serializer Extensions Module
 * 
 * This module exports all supported glTF 2.0 extension serializers.
 * These extensions enhance the base glTF specification with additional material properties,
 * lighting, instancing, and texture transformation capabilities.
 */

/**
 * EXT_mesh_gpu_instancing extension
 * Enables GPU instancing for efficient rendering of multiple instances of the same mesh.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing
 */
export { EXT_mesh_gpu_instancing } from './Extensions/EXT_mesh_gpu_instancing';

/**
 * KHR_lights_punctual extension
 * Adds support for punctual light sources (directional, point, and spot lights).
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_lights_punctual
 */
export { KHR_lights_punctual } from './Extensions/KHR_lights_punctual';

/**
 * KHR_materials_clearcoat extension
 * Adds a clear coating layer on top of the base material for realistic multi-layer surfaces.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_clearcoat
 */
export { KHR_materials_clearcoat } from './Extensions/KHR_materials_clearcoat';

/**
 * KHR_materials_emissive_strength extension
 * Allows emissive strength values greater than 1.0 for HDR emissive materials.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_emissive_strength
 */
export { KHR_materials_emissive_strength } from './Extensions/KHR_materials_emissive_strength';

/**
 * KHR_materials_ior extension
 * Specifies the index of refraction (IOR) for dielectric materials.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_ior
 */
export { KHR_materials_ior } from './Extensions/KHR_materials_ior';

/**
 * KHR_materials_iridescence extension
 * Adds thin-film iridescence effects (e.g., soap bubbles, oil slicks).
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_iridescence
 */
export { KHR_materials_iridescence } from './Extensions/KHR_materials_iridescence';

/**
 * KHR_materials_sheen extension
 * Adds a sheen layer for cloth and fabric-like materials.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_sheen
 */
export { KHR_materials_sheen } from './Extensions/KHR_materials_sheen';

/**
 * KHR_materials_specular extension
 * Provides control over specular reflections via specular color and factor.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_specular
 */
export { KHR_materials_specular } from './Extensions/KHR_materials_specular';

/**
 * KHR_materials_transmission extension
 * Enables light transmission through surfaces for glass and transparent materials.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_transmission
 */
export { KHR_materials_transmission } from './Extensions/KHR_materials_transmission';

/**
 * KHR_materials_unlit extension
 * Defines an unlit shading model for materials that should not be affected by lighting.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_unlit
 */
export { KHR_materials_unlit } from './Extensions/KHR_materials_unlit';

/**
 * KHR_materials_volume extension
 * Adds volumetric properties for subsurface scattering and light attenuation.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_volume
 */
export { KHR_materials_volume } from './Extensions/KHR_materials_volume';

/**
 * KHR_texture_transform extension
 * Allows transformation (offset, rotation, scale) of texture coordinates.
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_texture_transform
 */
export { KHR_texture_transform } from './Extensions/KHR_texture_transform';