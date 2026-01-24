/**
 * glTF 2.0 Serializer Extensions
 * 
 * This module exports all available glTF 2.0 serializer extensions.
 * These extensions enhance the base glTF format with additional features
 * for materials, lighting, and mesh optimization.
 */

/**
 * EXT_mesh_gpu_instancing
 * 
 * Enables GPU instancing for meshes, allowing efficient rendering of
 * multiple instances of the same mesh with different transforms.
 */
export { EXT_mesh_gpu_instancing } from './KHR_texture_transform';

/**
 * KHR_lights_punctual
 * 
 * Adds support for punctual light sources (directional, point, and spot lights)
 * in the glTF scene.
 */
export { KHR_lights_punctual } from './KHR_lights_punctual';

/**
 * KHR_materials_clearcoat
 * 
 * Extends materials with a clear coating layer, simulating materials
 * like car paint or lacquered wood.
 */
export { KHR_materials_clearcoat } from './KHR_materials_clearcoat';

/**
 * KHR_materials_emissive_strength
 * 
 * Allows emissive materials to have intensity values greater than 1.0,
 * enabling HDR emissive effects.
 */
export { KHR_materials_emissive_strength } from './KHR_materials_emissive_strength';

/**
 * KHR_materials_ior
 * 
 * Defines the index of refraction (IOR) for materials, affecting
 * how light bends when passing through transparent surfaces.
 */
export { KHR_materials_ior } from './KHR_materials_ior';

/**
 * KHR_materials_iridescence
 * 
 * Adds iridescence effects to materials, simulating thin-film interference
 * as seen in soap bubbles or oil slicks.
 */
export { KHR_materials_iridescence } from './KHR_materials_iridescence';

/**
 * KHR_materials_sheen
 * 
 * Adds a sheen layer to materials for simulating fabrics like velvet,
 * satin, or microfiber cloth.
 */
export { KHR_materials_sheen } from './KHR_materials_sheen';

/**
 * KHR_materials_specular
 * 
 * Extends the metallic-roughness material model with specular workflow,
 * providing more artistic control over reflections.
 */
export { KHR_materials_specular } from './KHR_materials_specular';

/**
 * KHR_materials_transmission
 * 
 * Enables light transmission through materials, allowing realistic
 * rendering of glass, water, and other transparent objects.
 */
export { KHR_materials_transmission } from './KHR_materials_transmission';

/**
 * KHR_materials_unlit
 * 
 * Defines an unlit shading model, rendering materials with constant color
 * unaffected by scene lighting.
 */
export { KHR_materials_unlit } from './KHR_materials_unlit';

/**
 * KHR_materials_volume
 * 
 * Adds volumetric properties to materials for rendering effects like
 * fog, smoke, or subsurface scattering in thick materials.
 */
export { KHR_materials_volume } from './KHR_materials_volume';

/**
 * KHR_texture_transform
 * 
 * Allows transformation of texture coordinates (offset, rotation, scale)
 * without modifying the underlying mesh geometry.
 */
export { KHR_texture_transform } from './KHR_texture_transform';