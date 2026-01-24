/**
 * OBJ/MTL file format serializer for Babylon.js meshes
 * Provides functionality to export 3D meshes to Wavefront OBJ format
 */

import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import type { Material } from '@babylonjs/core/Materials/material';
import type { Texture } from '@babylonjs/core/Materials/Textures/texture';
import type { Color3 } from '@babylonjs/core/Maths/math.color';

/**
 * Material properties for MTL export
 */
export interface MaterialExportProperties {
  /** Material identifier */
  id: string;
  /** Specular power/shininess (Ns in MTL) */
  specularPower: number;
  /** Alpha transparency value (0.0 - 1.0) */
  alpha: number;
  /** Ambient color component */
  ambientColor: Color3;
  /** Diffuse color component */
  diffuseColor: Color3;
  /** Specular color component */
  specularColor: Color3;
  /** Emissive color component */
  emissiveColor: Color3;
  /** Ambient texture map */
  ambientTexture?: Texture | null;
  /** Diffuse texture map */
  diffuseTexture?: Texture | null;
  /** Specular texture map */
  specularTexture?: Texture | null;
  /** Bump/normal map texture */
  bumpTexture?: Texture | null;
  /** Opacity/transparency map */
  opacityTexture?: Texture | null;
}

/**
 * Mesh with exportable material
 */
export interface ExportableMesh extends AbstractMesh {
  material?: MaterialExportProperties | null;
}

/**
 * OBJ/MTL file serializer namespace
 */
export declare namespace OBJExport {
  /**
   * Export meshes to Wavefront OBJ format
   * 
   * @param meshes - Array of meshes to export
   * @param includeMaterials - Whether to reference MTL material file
   * @param materialLibraryName - Name of the MTL file (without extension)
   * @param applyWorldTransform - Whether to bake world transforms into vertex data
   * @returns OBJ file content as string
   * 
   * @remarks
   * - Supports position, normal, and UV vertex data
   * - Automatically handles right-handed coordinate system conversion
   * - Groups objects with 'g' and 'o' directives
   */
  function OBJ(
    meshes: ExportableMesh[],
    includeMaterials?: boolean,
    materialLibraryName?: string,
    applyWorldTransform?: boolean
  ): string;

  /**
   * Export material to Wavefront MTL format
   * 
   * @param mesh - Mesh containing the material to export
   * @returns MTL file content as string
   * 
   * @remarks
   * Exports the following material properties:
   * - Ns: Specular exponent/shininess
   * - Ka: Ambient color
   * - Kd: Diffuse color
   * - Ks: Specular color
   * - Ke: Emissive color
   * - d: Dissolve/opacity
   * - map_Ka, map_Kd, map_Ks: Texture maps
   * - map_bump: Normal/bump map
   * - map_d: Opacity map
   */
  function MTL(mesh: ExportableMesh): string;
}