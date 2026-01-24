/**
 * Legacy serializers module exports
 * Re-exports GLTF2, OBJ, and STL serializers for backward compatibility
 */

// GLTF2 Serializer exports
export {
  /** Extension for GPU instancing support in GLTF mesh primitives */
  EXT_mesh_gpu_instancing,
  
  /** Main GLTF2 export functionality */
  GLTF2Export,
  
  /** Container for GLTF export data including JSON and binary buffers */
  GLTFData,
  
  /** Extension for punctual lights (point, spot, directional) */
  KHR_lights_punctual,
  
  /** Extension for clearcoat material layer */
  KHR_materials_clearcoat,
  
  /** Extension for emissive strength control */
  KHR_materials_emissive_strength,
  
  /** Extension for index of refraction material property */
  KHR_materials_ior,
  
  /** Extension for iridescence material effect */
  KHR_materials_iridescence,
  
  /** Extension for sheen material layer */
  KHR_materials_sheen,
  
  /** Extension for specular material properties */
  KHR_materials_specular,
  
  /** Extension for transmission/refraction material properties */
  KHR_materials_transmission,
  
  /** Extension for unlit materials */
  KHR_materials_unlit,
  
  /** Extension for volumetric material properties */
  KHR_materials_volume,
  
  /** Extension for texture coordinate transformations */
  KHR_texture_transform,
  
  /** Internal binary writer utility for GLTF export */
  _BinaryWriter,
  
  /** Internal base exporter class */
  _Exporter,
  
  /** Internal GLTF animation processor */
  _GLTFAnimation,
  
  /** Internal GLTF material exporter */
  _GLTFMaterialExporter,
  
  /** Internal GLTF utility functions */
  _GLTFUtilities,
  
  /** Internal interface for GLTF exporter extensions */
  __IGLTFExporterExtension,
  
  /** Internal interface for GLTF exporter extensions V2 */
  __IGLTFExporterExtensionV2
} from './legacy-glTF2Serializer';

// OBJ Serializer exports
export {
  /** Wavefront OBJ file format exporter */
  OBJExport
} from './legacy-objSerializer';

// STL Serializer exports
export {
  /** STL (Stereolithography) file format exporter */
  STLExport
} from './legacy-stlSerializer';