import type { CabinetBase } from './CabinetBase';
import type { Loop, Coordinate3, Vector3, Polygon, Box2, Vector2, MathAlg } from './MathLib';
import type { RoomUtil } from './RoomUtil';
import type { Util } from './MaterialUtil';
import type { TexturePaveTypeEnum } from './TextureEnums';
import type { alg } from './GeometryAlgorithms';
import type { csgBoolean, brepToCsg } from './CSGOperations';
import type { Logger } from './Logger';

/**
 * Material configuration stored in the material map
 */
interface MaterialConfig {
  /** Material instance */
  material: Material;
  /** Texture paving type for this material */
  textureType: TexturePaveTypeEnum;
}

/**
 * Flat mesh structure containing extruded geometry faces
 */
interface FlatMesh {
  /** Top face geometry data */
  top: FlatMeshFace[];
  /** Bottom face geometry data */
  bottom: FlatMeshFace[];
  /** Side face geometry data (array of face arrays) */
  sides: FlatMeshFace[][];
}

/**
 * Individual mesh face with vertex data and optional material
 */
interface FlatMeshFace {
  /** Vertex positions array */
  vertices: number[];
  /** Vertex normals array */
  normals: number[];
  /** UV coordinates array */
  uvs: number[];
  /** Face indices array */
  faces: number[];
  /** Optional material seek ID */
  material?: string;
}

/**
 * Path segment depth configuration
 */
interface SegmentDepth {
  /** Start depth */
  from: number;
  /** End depth */
  to: number;
}

/**
 * Hole path configuration with extrusion direction
 */
interface HolePathsWithDirection {
  /** Coordinate system for the holes */
  coordinate3: Coordinate3;
  /** Array of path definitions */
  paths: HolePath[];
}

/**
 * Individual hole path definition
 */
interface HolePath {
  /** 2D points defining the hole boundary */
  points: Vector2[];
  /** Optional start depth */
  from?: number;
  /** Optional end depth */
  to?: number;
}

/**
 * Graphics output data structure
 */
interface GraphicsData {
  /** Graphics objects array */
  objects: GraphicsObject[];
  /** Mesh definitions array */
  meshDefs: MeshDefinition[];
}

/**
 * Graphics object metadata
 */
interface GraphicsObject {
  /** Entity ID */
  entityId: string;
  /** Graphics object type */
  type: number;
  /** Visibility flag */
  visible: boolean;
  /** Position as Float32Array [x, y, z] */
  position: Float32Array;
  /** Rotation as Float32Array [x, y, z, w] (quaternion) */
  rotation: Float32Array;
  /** Scale as Float32Array [x, y, z] */
  scale: Float32Array;
  /** Custom attributes */
  customAttrs: CustomAttributes;
  /** Material seek ID */
  seekId: string;
  /** Material configuration */
  material: unknown;
  /** Mesh key reference */
  mesh: string;
  /** Graphics path identifier */
  graphicsPath: string;
}

/**
 * Custom attributes for graphics objects
 */
interface CustomAttributes {
  /** Room type identifier */
  roomType: string;
  /** Room area in square units */
  roomArea: number;
  /** Object type label */
  type: string;
}

/**
 * Mesh definition with vertex and index data
 */
interface MeshDefinition {
  /** Unique mesh key */
  meshKey: string;
  /** Vertex positions buffer */
  vertexPositions: Float32Array;
  /** Vertex normals buffer */
  vertexNormals: Float32Array;
  /** UV coordinates buffer */
  vertexUVs: Float32Array;
  /** Total vertex count */
  vertexCount: number;
  /** Face indices buffer */
  faceIndices: Uint32Array;
  /** Total index count */
  indexCount: number;
}

/**
 * Mesh data with material assignment
 */
interface MeshWithMaterial {
  /** Mesh geometry data */
  mesh: FlatMeshFace;
  /** Material configuration */
  material: unknown;
}

/**
 * Material properties for texture mapping
 */
interface Material {
  /** Material unique identifier */
  seekId: string;
  /** Texture offset X */
  offsetX?: number;
  /** Texture offset Y */
  offsetY?: number;
  /** Horizontal flip flag */
  flipX?: boolean;
  /** Vertical flip flag */
  flipY?: boolean;
  /** Tile size in X direction */
  tileSize_x?: number;
  /** Tile size in Y direction */
  tileSize_y?: number;
  /** Rotation angle in degrees */
  rotation?: number;
}

/**
 * Entity with extruding geometry properties
 */
interface ExtrudingEntity {
  /** Entity unique identifier */
  ID: string;
  /** Primary material */
  material: Material;
  /** Side material (optional) */
  sideMaterial?: Material;
  /** Primary texture paving type */
  textureType: TexturePaveTypeEnum;
  /** Side texture paving type */
  sideTextureType: TexturePaveTypeEnum;
  /** Extrusion height */
  height: number;
  /** Segment path depth configurations */
  segmentPathsDepth: SegmentDepth[];
  /** Model cutting planes */
  modelCutPlanes?: unknown[];
  
  /**
   * Get extrusion paths
   */
  getPaths(): THREE.Vector3[][];
  
  /**
   * Get hole paths with direction information
   */
  getHolePathsWithDirection(): HolePathsWithDirection | undefined;
  
  /**
   * Check if entity flag is enabled
   */
  isFlagOn(flag: number): boolean;
}

/**
 * DExtruding: Cabinet component that handles extrusion geometry generation
 * Processes 2D paths and extrudes them into 3D mesh geometry with material mapping
 */
export declare class DExtruding extends CabinetBase {
  /** Map of material configurations keyed by material seek ID */
  private materialMap: Map<string, MaterialConfig>;
  
  /** Cached flat mesh geometry */
  private _flatMesh?: FlatMesh;
  
  /**
   * Creates a new DExtruding instance
   * @param entity - The extruding entity
   * @param param2 - Second constructor parameter (type unknown)
   * @param param3 - Third constructor parameter (type unknown)
   */
  constructor(entity: ExtrudingEntity, param2: unknown, param3: unknown);
  
  /**
   * Updates the extrusion geometry based on entity properties
   * Generates mesh from paths, handles holes, and applies boolean operations
   */
  onUpdate(): void;
  
  /**
   * Converts the extruding geometry to graphics data format
   * @returns Graphics data containing mesh definitions and object metadata
   */
  toGraphicsData(): GraphicsData;
  
  /**
   * Generates material configuration with UV transformation
   * @param uvs - UV coordinates array
   * @param material - Material properties
   * @param textureType - Texture paving type
   * @returns Material object with applied transformations
   */
  private _getExtrudeMaterial(
    uvs: number[],
    material: Material,
    textureType: TexturePaveTypeEnum
  ): unknown;
  
  /**
   * Calculates bounding box from UV coordinates
   * @param uvs - UV coordinates array [u0, v0, u1, v1, ...]
   * @returns 2D bounding box
   */
  private _getUVbox(uvs: number[]): Box2;
  
  /**
   * Retrieves and merges mesh faces by material
   * @param materialSeekId - Material seek ID to filter by (undefined for default)
   * @param outputArray - Array to append merged meshes to
   * @returns Array of merged mesh faces or undefined
   */
  private _getMergedMeshByMaterial(
    materialSeekId: string | undefined,
    outputArray: FlatMeshFace[]
  ): FlatMeshFace[] | undefined;
  
  /**
   * Merges multiple flat mesh faces into a single mesh
   * @param meshFaces - Variable number of mesh faces to merge
   * @returns Merged mesh face or undefined if no valid input
   */
  private _mergeFlatMesh(...meshFaces: FlatMeshFace[]): FlatMeshFace | undefined;
}