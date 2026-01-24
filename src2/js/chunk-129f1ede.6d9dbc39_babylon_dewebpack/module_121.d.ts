/**
 * Type definitions for Babylon.js Serializers module
 * This module provides export functionality for 3D scenes and meshes to various formats
 */

declare module "babylonjs-serializers" {
  import type {
    Mesh,
    Scene,
    Material,
    Texture,
    Node,
    TransformNode,
    Animation,
    AnimationGroup,
    Skeleton,
    Camera,
    Light,
    Nullable,
  } from "babylonjs";

  // ============================================================================
  // OBJ Export
  // ============================================================================

  /**
   * OBJ file format exporter for Babylon.js meshes
   */
  export namespace OBJExport {
    /**
     * Exports meshes to OBJ format
     * @param meshes - Array of meshes to export
     * @param materials - Whether to export materials (MTL file)
     * @param materialLibraryName - Name of the material library file
     * @param globalScale - Global scale factor for exported geometry
     * @returns OBJ file content as string
     */
    function OBJ(
      meshes: Mesh[],
      materials?: boolean,
      materialLibraryName?: string,
      globalScale?: number
    ): string;

    /**
     * Exports material to MTL format
     * @param material - Material to export
     * @returns MTL file content as string
     */
    function MTL(material: Material): string;
  }

  // ============================================================================
  // STL Export
  // ============================================================================

  /**
   * STL (STereoLithography) file format exporter
   */
  export namespace STLExport {
    /**
     * Creates STL file from meshes
     * @param meshes - Meshes to export
     * @param download - Whether to trigger download automatically
     * @param fileName - Output file name
     * @param binary - Export as binary STL (true) or ASCII (false)
     * @param isLittleEndian - Byte order for binary export
     * @param doNotBakeTransform - Skip baking transforms into vertices
     * @param supportInstancedMeshes - Support instanced mesh export
     * @returns STL file content (string for ASCII, ArrayBuffer for binary)
     */
    function CreateSTL(
      meshes: Mesh[],
      download?: boolean,
      fileName?: string,
      binary?: boolean,
      isLittleEndian?: boolean,
      doNotBakeTransform?: boolean,
      supportInstancedMeshes?: boolean
    ): string | ArrayBuffer;
  }

  // ============================================================================
  // glTF 2.0 Export
  // ============================================================================

  /**
   * Options for glTF exporter
   */
  export interface IGLTFExportOptions {
    /**
     * Whether to export the scene without waiting for it to be ready
     */
    exportWithoutWaitingForScene?: boolean;

    /**
     * Sample rate for baking animations (frames per second)
     */
    animationSampleRate?: number;

    /**
     * Whether to include coordinate system conversion nodes in export
     */
    includeCoordinateSystemConversionNodes?: boolean;

    /**
     * Callback to determine if a node should be exported
     */
    shouldExportNode?(node: Node): boolean;

    /**
     * Callback to determine if an animation should be exported
     */
    shouldExportAnimation?(animation: Animation): boolean;

    /**
     * Callback to select metadata to export
     */
    metadataSelector?(metadata: unknown): unknown;

    /**
     * Whether to export unused UVs
     */
    exportUnusedUVs?: boolean;
  }

  /**
   * Container for glTF export data
   */
  export class GLTFData {
    /**
     * Dictionary of file names to file data
     */
    glTFFiles: Record<string, string | Blob>;

    /**
     * Downloads all exported files to local filesystem
     */
    downloadFiles(): void;
  }

  /**
   * Main glTF 2.0 exporter
   */
  export namespace GLTF2Export {
    /**
     * Exports scene to glTF 2.0 format (.gltf + .bin)
     * @param scene - Scene to export
     * @param filePrefix - Prefix for output files
     * @param options - Export options
     * @returns Promise resolving to GLTFData containing exported files
     */
    function GLTFAsync(
      scene: Scene,
      filePrefix: string,
      options?: IGLTFExportOptions
    ): Promise<GLTFData>;

    /**
     * Exports scene to binary glTF format (.glb)
     * @param scene - Scene to export
     * @param filePrefix - Prefix for output file
     * @param options - Export options
     * @returns Promise resolving to GLTFData containing exported file
     */
    function GLBAsync(
      scene: Scene,
      filePrefix: string,
      options?: IGLTFExportOptions
    ): Promise<GLTFData>;
  }

  // ============================================================================
  // glTF Internal Classes (Advanced Usage)
  // ============================================================================

  /**
   * Binary data writer for glTF export
   */
  export class _BinaryWriter {
    constructor(byteLength: number);

    /**
     * Gets current byte offset in buffer
     */
    getByteOffset(): number;

    /**
     * Gets the array buffer with trimmed size
     */
    getArrayBuffer(): ArrayBuffer;

    /**
     * Write methods for various data types
     */
    setUInt8(value: number, byteOffset?: number): void;
    setUInt16(value: number, byteOffset?: number): void;
    setUInt32(value: number, byteOffset?: number): void;
    setFloat32(value: number, byteOffset?: number): void;
    setInt16(value: number, byteOffset?: number): void;
    setByte(value: number, byteOffset?: number): void;
  }

  /**
   * Main glTF exporter implementation
   */
  export class _Exporter {
    constructor(scene: Scene, options?: IGLTFExportOptions);

    /**
     * Disposes exporter resources
     */
    dispose(): void;
  }

  /**
   * Material exporter for glTF
   */
  export class _GLTFMaterialExporter {
    /**
     * Converts materials to glTF format
     */
    _convertMaterialsToGLTFAsync(
      materials: Set<Material>,
      imageType: string,
      hasTextureCoordinates: boolean
    ): Promise<void>;
  }

  /**
   * Animation converter for glTF
   */
  export class _GLTFAnimation {
    /**
     * Creates node animation from Babylon animation
     */
    static _CreateNodeAnimation(
      node: Node,
      animation: Animation,
      animationChannelTargetPath: string,
      useQuaternion: boolean,
      convertToRightHanded: boolean,
      sampleRate: number
    ): Nullable<{
      inputs: number[];
      outputs: number[][];
      samplerInterpolation: string;
      inputsMin: number;
      inputsMax: number;
    }>;
  }

  /**
   * Utility functions for glTF export
   */
  export class _GLTFUtilities {
    /**
     * Creates glTF buffer view object
     */
    static _CreateBufferView(
      bufferIndex: number,
      byteOffset: number,
      byteLength: number,
      byteStride?: number,
      name?: string
    ): unknown;

    /**
     * Creates glTF accessor object
     */
    static _CreateAccessor(
      bufferViewIndex: number,
      name: string,
      type: string,
      componentType: number,
      count: number,
      byteOffset?: Nullable<number>,
      min?: Nullable<number[]>,
      max?: Nullable<number[]>
    ): unknown;
  }

  // ============================================================================
  // glTF Extensions
  // ============================================================================

  /**
   * Base interface for glTF exporter extensions
   */
  export const __IGLTFExporterExtension: number;
  export const __IGLTFExporterExtensionV2: number;

  // Standard glTF extensions
  export class KHR_texture_transform {}
  export class KHR_lights_punctual {}
  export class KHR_materials_clearcoat {}
  export class KHR_materials_iridescence {}
  export class KHR_materials_sheen {}
  export class KHR_materials_unlit {}
  export class KHR_materials_ior {}
  export class KHR_materials_specular {}
  export class KHR_materials_volume {}
  export class KHR_materials_transmission {}
  export class KHR_materials_emissive_strength {}
  export class EXT_mesh_gpu_instancing {}
}