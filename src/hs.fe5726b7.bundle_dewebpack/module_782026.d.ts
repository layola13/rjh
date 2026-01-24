/**
 * Batching utilities for material and node management
 * Module provides functions for managing batched rendering optimization
 */

import { Node, RasterizerCullMode, Pass } from './367441';
import { BatchingComponent } from './482748';

/**
 * Material batching hint interface containing material properties for batch comparison
 */
interface MaterialBatchingHint {
  /** Indicates if the material properties have changed */
  dirty: boolean;
  /** Material identifier */
  materialName: string;
  /** Material color value */
  color: number;
  /** Culling mode for rendering */
  cullMode: RasterizerCullMode;
  /** Normal map texture URI */
  normalURI?: string;
  /** Diffuse texture URI */
  textureURI?: string;
  /** Material opacity (0-1) */
  opacity: number;
  /** Specular shininess factor */
  shininess: number;
  /** Specular reflection intensity */
  specular: number;
  /** Polygon offset factor for depth testing */
  polygonOffsetFactor: number;
  /** Polygon offset units for depth testing */
  polygonOffsetUnits: number;
  /** Whether material uses transparency */
  transparent: boolean;
  /** Whether material uses normal map with Phong shading */
  isNormalMapPhong: boolean;
  /** Texture transform matrix (row 0) */
  transform0?: { equalsWithEpsilon(other: any): boolean };
  /** Texture transform matrix (row 1) */
  transform1?: { equalsWithEpsilon(other: any): boolean };
  /** Rotation angle in radians (for normal map) */
  radian?: number;
  /** Diffuse texture tile size X */
  diffuseTileSizeX?: number;
  /** Diffuse texture tile size Y */
  diffuseTileSizeY?: number;
  /** Normal texture tile size X */
  normalTileSizeX?: number;
  /** Normal texture tile size Y */
  normalTileSizeY?: number;
  /** Whether to flip normal map green channel */
  flipNormalGreen?: boolean;
  /** Whether normal mapping is enabled */
  useNormalMap?: boolean;
  /** Whether material uses double UV with Phong shading */
  isDoubleUvPhong?: boolean;
  /** Normal map texture transform (row 0) */
  normalTransform0?: { equalsWithEpsilon(other: any): boolean };
  /** Normal map texture transform (row 1) */
  normalTransform1?: { equalsWithEpsilon(other: any): boolean };
}

/**
 * Material interface with batching hint
 */
interface Material {
  /** Internal batching hint for optimization */
  _batchingHint?: MaterialBatchingHint;
  /** Get the culling mode */
  getCullMode?(): RasterizerCullMode;
  /** Get material techniques */
  getTechniques(): Array<{
    getPassCount(): number;
    getPass(index: number): Pass;
  }>;
}

/**
 * Renderable interface with material
 */
interface Renderable {
  /** Get the material associated with this renderable */
  getMaterial(): Material | null;
}

/**
 * Clears the dirty flag on a material's batching hint
 * @param material - The material to clear the dirty flag from
 */
export function clearMaterialDirtyForBatching(material: Material): void;

/**
 * Creates a new node with batching component attached
 * @param name - Optional name for the node (default: empty string)
 * @param maxVertexCount - Maximum vertex count for batching (default: 300)
 * @returns A new node with BatchingComponent attached
 */
export function createBatchingNode(name?: string, maxVertexCount?: number): Node;

/**
 * Enables or disables batching on a node
 * @param node - The node to configure batching for
 * @param enable - Whether to enable batching
 */
export function enableNodeBatching(node: Node, enable: boolean): void;

/**
 * Fast retrieval of culling mode from a renderable's material
 * @param renderable - The renderable to get cull mode from
 * @returns The culling mode, or null if material not found
 */
export function fastGetCullMode(renderable: Renderable): RasterizerCullMode | null;

/**
 * Checks if a material's batching hint is marked as dirty
 * @param material - The material to check
 * @returns True if the material has a batching hint and it's dirty
 */
export function isMaterialDirtyForBatching(material: Material): boolean;