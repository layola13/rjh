/**
 * CSG (Constructive Solid Geometry) operations module
 * Provides boolean operations for 3D meshes including union, subtract, and intersect
 */

/**
 * Represents a 3D mesh object with polygons
 */
interface Mesh {
  polygons?: Polygon[];
  [key: string]: any;
}

/**
 * Represents a 3D geometry object
 */
interface Geometry {
  [key: string]: any;
}

/**
 * Represents mesh data for CSG initialization
 */
interface MeshData {
  [key: string]: any;
}

/**
 * Represents a polygon point array for CSG operations
 */
type PolygonPoints = number[][] | Float32Array[] | any[];

/**
 * Represents a polygon in 3D space
 */
interface Polygon {
  [key: string]: any;
}

/**
 * CSG (Constructive Solid Geometry) object with boolean operation methods
 */
interface CSG {
  polygons: Polygon[];
  
  /**
   * Subtracts another CSG from this CSG
   */
  subtract(other: CSG): CSG;
  
  /**
   * Unions this CSG with another CSG
   */
  union(other: CSG): CSG;
  
  /**
   * Intersects this CSG with another CSG
   */
  intersect(other: CSG): CSG;
}

/**
 * CSG utility module interface
 */
interface CSGModule {
  /**
   * Converts a mesh to CSG representation
   */
  fromMesh(mesh: Mesh): CSG;
  
  /**
   * Converts CSG back to mesh representation
   */
  toMesh(csg: CSG): Mesh;
  
  /**
   * Converts geometry to CSG representation
   */
  fromGeometry(geometry: Geometry): CSG;
  
  /**
   * Converts CSG back to geometry representation
   */
  toGeometry(csg: CSG): Geometry;
  
  /**
   * Creates CSG from polygon points
   */
  fromPolygonPoints(points: PolygonPoints): CSG;
  
  /**
   * Initializes CSG from mesh data
   */
  setFromMeshData(meshData: MeshData): CSG;
}

/**
 * CSG operations interface
 */
export interface CSGOperations {
  /**
   * Subtracts second mesh from first mesh
   * @param meshA - The base mesh
   * @param meshB - The mesh to subtract
   * @returns Resulting mesh after subtraction
   */
  subtract(meshA: Mesh, meshB: Mesh): Mesh;
  
  /**
   * Unions two meshes together
   * @param meshA - First mesh
   * @param meshB - Second mesh
   * @returns Resulting mesh after union
   */
  union(meshA: Mesh, meshB: Mesh): Mesh;
  
  /**
   * Intersects two meshes
   * @param meshA - First mesh
   * @param meshB - Second mesh
   * @returns Resulting mesh containing only intersection
   */
  intersect(meshA: Mesh, meshB: Mesh): Mesh;
  
  /**
   * Inverts a mesh (reverses polygon orientation)
   * @param mesh - The mesh to invert
   * @returns Inverted mesh
   */
  inverse(mesh: Mesh): Mesh;
  
  /**
   * Subtracts multiple meshes from a base mesh
   * @param baseMesh - The base mesh
   * @param meshes - Array of meshes to subtract
   * @returns Resulting mesh after all subtractions
   */
  subtrctByMeshes(baseMesh: Mesh, meshes: Mesh[]): Mesh;
  
  /**
   * Subtracts multiple CSG objects from a base mesh
   * @param baseMesh - The base mesh
   * @param csgs - Array of CSG objects to subtract
   * @returns Resulting mesh after all subtractions
   */
  subtrctByCSGs(baseMesh: Mesh, csgs: CSG[]): Mesh;
  
  /**
   * Subtracts polygon points from a geometry
   * @param geometry - The base geometry
   * @param polygonPoints - Polygon points to subtract
   * @returns Resulting geometry after subtraction
   */
  subtrctByPolygons(geometry: Geometry, polygonPoints: PolygonPoints): Geometry;
  
  /**
   * Converts a mesh to CSG representation
   * @param mesh - The mesh to convert
   * @returns CSG object
   */
  toCsg(mesh: Mesh): CSG;
  
  /**
   * Initializes CSG from mesh data
   * @param meshData - The mesh data
   * @returns CSG object
   */
  InitCSGFromMeshData(meshData: MeshData): CSG;
}

declare const csgOperations: CSGOperations;
export default csgOperations;