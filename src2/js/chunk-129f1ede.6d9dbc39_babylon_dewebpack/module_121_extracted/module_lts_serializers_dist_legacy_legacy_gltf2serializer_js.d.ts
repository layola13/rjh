/**
 * Legacy glTF 2.0 Serializer Module
 * 
 * This module provides backward compatibility exports for the glTF 2.0 serializer,
 * re-exporting core functionality and extensions from the modular implementation.
 */

// ============================================================================
// Core Exports
// ============================================================================

/**
 * Main glTF 2.0 exporter class
 * Handles serialization of Babylon.js scenes to glTF 2.0 format
 */
export { GLTF2Export } from '@lts/serializers/glTF/2.0';

/**
 * Container for glTF data including JSON, binary buffers, and images
 */
export { GLTFData } from '@lts/serializers/glTF/2.0';

// ============================================================================
// Internal Utilities (Prefixed with _)
// ============================================================================

/**
 * Binary writer utility for writing glTF binary data
 * @internal
 */
export { _BinaryWriter } from '@lts/serializers/glTF/2.0';

/**
 * Core exporter implementation
 * @internal
 */
export { _Exporter } from '@lts/serializers/glTF/2.0';

/**
 * Animation serialization utilities
 * @internal
 */
export { _GLTFAnimation } from '@lts/serializers/glTF/2.0';

/**
 * Material export utilities
 * @internal
 */
export { _GLTFMaterialExporter } from '@lts/serializers/glTF/2.0';

/**
 * General glTF utilities
 * @internal
 */
export { _GLTFUtilities } from '@lts/serializers/glTF/2.0';

// ============================================================================
// Extension Interfaces
// ============================================================================

/**
 * Base interface for glTF exporter extensions (V1)
 * @internal
 */
export { __IGLTFExporterExtension } from '@lts/serializers/glTF/glTFFileExporter';

/**
 * Interface for glTF 2.0 exporter extensions
 * @internal
 */
export { __IGLTFExporterExtensionV2 } from '@lts/serializers/glTF/2.0';

// ============================================================================
// glTF 2.0 Extensions
// ============================================================================

/**
 * EXT_mesh_gpu_instancing extension
 * Enables GPU instancing for efficient rendering of repeated meshes
 */
export { EXT_mesh_gpu_instancing } from '@lts/serializers/glTF/2.0/Extensions';

/**
 * KHR_lights_punctual extension
 * Adds support for point, spot, and directional lights
 */
export { KHR_lights_punctual } from '@lts/serializers/glTF/2.0/Extensions';

/**
 * KHR_materials_clearcoat extension
 * Adds clear coat layer to materials for automotive paint, lacquered wood, etc.
 */
export { KHR_materials_clearcoat } from '@lts/serializers/glTF/2.0/Extensions';

/**
 * KHR_materials_emissive_strength extension
 * Allows emissive strength values greater than 1.0 for HDR rendering
 */
export { KHR_materials_emissive_strength } from '@lts/serializers/glTF/2.0/Extensions';

/**
 * KHR_materials_ior extension
 * Specifies index of refraction for physically accurate dielectric materials
 */
export { KHR_materials_ior } from '@lts/serializers/glTF/2.0/Extensions';

/**
 * KHR_materials_iridescence extension
 * Adds thin-film iridescence effects (soap bubbles, oil slicks, etc.)
 */
export { KHR_materials_iridescence } from '@lts/serializers/glTF/2.0/Extensions';

/**
 * KHR_materials_sheen extension
 * Adds sheen layer for cloth-like materials (velvet, satin, etc.)
 */
export { KHR_materials_sheen } from '@lts/serializers/glTF/2.0/Extensions';

/**
 * KHR_materials_specular extension
 * Provides more control over specular reflections for dielectric materials
 */
export { KHR_materials_specular } from '@lts/serializers/glTF/2.0/Extensions';

/**
 * KHR_materials_transmission extension
 * Enables refraction and transparency for glass and other transmissive materials
 */
export { KHR_materials_transmission } from '@lts/serializers/glTF/2.0/Extensions';

/**
 * KHR_materials_unlit extension
 * Disables lighting calculations for pre-lit or stylized materials
 */
export { KHR_materials_unlit } from '@lts/serializers/glTF/2.0/Extensions';

/**
 * KHR_materials_volume extension
 * Adds volumetric attenuation for thick translucent materials
 */
export { KHR_materials_volume } from '@lts/serializers/glTF/2.0/Extensions';

/**
 * KHR_texture_transform extension
 * Allows offset, rotation, and scale transformations on textures
 */
export { KHR_texture_transform } from '@lts/serializers/glTF/2.0/Extensions';