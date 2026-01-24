/**
 * Mesh data structure containing geometry information
 */
interface MeshData {
  /** Face indices array */
  faces: number[];
  /** Normal vectors array */
  normals: number[];
  /** UV texture coordinates array */
  uvs: number[];
  /** Vertex position coordinates array */
  vertices: number[];
  /** Optional material identifier */
  material?: string;
}

/**
 * Tessellation result containing mesh data
 */
interface TessellationResult {
  /** The generated mesh data */
  mesh: MeshData | null;
}

/**
 * Face representation in a boundary representation solid
 */
interface BrepFace {
  /** Face identifier tag, may contain material information */
  tag: string;
  /**
   * Converts the face to a triangulated mesh
   * @returns Tessellation result containing mesh data
   */
  tessellate(): TessellationResult;
}

/**
 * Boundary representation solid body
 */
interface BrepBody {
  /**
   * Retrieves all faces of the BREP body
   * @returns Array of faces
   */
  getFaces(): BrepFace[];
}

/**
 * Constructive Solid Geometry object
 */
interface CsgObject {
  /**
   * Performs CSG subtraction operation
   * @param other - The CSG object to subtract
   * @param returnMesh - Whether to return mesh data instead of CSG
   * @returns Result of the subtraction operation
   */
  subtract(other: CsgObject, returnMesh?: boolean): CsgObject | MeshData;
}

/**
 * Performs a boolean subtraction operation on two objects using CSG
 * Supports both BrepBody and CSG objects as input
 * 
 * @param firstObject - The object to subtract from (BrepBody or CsgObject)
 * @param secondObject - The object to subtract (BrepBody or CsgObject)
 * @param returnMesh - If true, returns mesh data; if false, returns CSG object (default: false)
 * @returns The result of the CSG subtraction operation
 */
export declare function csgBoolean(
  firstObject: BrepBody | CsgObject,
  secondObject: BrepBody | CsgObject,
  returnMesh?: boolean
): CsgObject | MeshData;

/**
 * Converts a boundary representation body to a constructive solid geometry object
 * Processes all faces, tessellates them, and merges into a single CSG representation
 * 
 * @param brepBody - The boundary representation body to convert
 * @returns A CSG object representing the input BREP body
 */
export declare function brepToCsg(brepBody: BrepBody): CsgObject;

/**
 * Global GeLib namespace containing CSG utility functions
 */
declare global {
  namespace GeLib {
    namespace CsgUtils {
      /**
       * Initializes a CSG object from mesh data
       * @param meshData - The mesh data to convert
       * @returns A CSG object
       */
      function InitCSGFromMeshData(meshData: MeshData): CsgObject;
    }
  }
}

/**
 * MathAlg namespace containing mesh utility functions
 */
declare namespace MathAlg {
  namespace MeshUtil {
    /**
     * Merges two mesh data objects into a single mesh
     * @param mesh1 - First mesh to merge
     * @param mesh2 - Second mesh to merge
     * @returns Merged mesh data
     */
    function merge(mesh1: MeshData, mesh2: MeshData): MeshData;
  }
}