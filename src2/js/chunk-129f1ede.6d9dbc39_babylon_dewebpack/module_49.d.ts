import { CSG } from 'babylonjs';
import { Scene } from 'babylonjs';
import { Mesh } from 'babylonjs';
import { Material } from 'babylonjs';

/**
 * Boolean operation utility for 3D meshes using Constructive Solid Geometry (CSG).
 * Provides methods for performing subtract and intersect operations on Babylon.js meshes.
 */
export default class BooleanOperations {
  /**
   * The scene instance used for mesh operations.
   */
  private static scene: Scene;

  /**
   * Initializes the Boolean operations utility with a scene reference.
   * @param scene - The Babylon.js scene to use for mesh operations
   */
  static Init(scene: Scene): void;

  /**
   * Performs a boolean subtraction operation between two meshes.
   * Subtracts the second mesh from the first mesh using CSG operations.
   * 
   * @param baseMesh - The base mesh to subtract from
   * @param subtractMesh - The mesh to subtract (can be null, in which case the base mesh is returned)
   * @param scene - Optional scene override (uses the initialized scene if not provided)
   * @param material - Optional material to apply to the resulting mesh
   * @returns The resulting mesh after subtraction operation
   * 
   * @remarks
   * - If subtractMesh is null, returns the baseMesh with the material applied
   * - Disposes of the original meshes after the operation
   * - The subtractMesh is cloned before the operation to preserve the original
   */
  static BooleanOpSubtract(
    baseMesh: Mesh,
    subtractMesh: Mesh | null,
    scene?: Scene,
    material?: Material
  ): Mesh;

  /**
   * Performs a boolean intersection operation between two meshes.
   * Returns a new mesh containing only the overlapping volume of both meshes.
   * 
   * @param firstMesh - The first mesh for intersection
   * @param secondMesh - The second mesh for intersection (can be null, in which case the first mesh is returned)
   * @param scene - Optional scene override (uses the initialized scene if not provided)
   * @param material - Optional material to apply to the resulting mesh
   * @returns The resulting mesh after intersection operation
   * 
   * @remarks
   * - If secondMesh is null or undefined, returns the firstMesh with the material applied
   * - Disposes of the original meshes after the operation
   * - The secondMesh is cloned before the operation to preserve the original
   * - Generated mesh name includes material name and a unique GUID suffix
   */
  static BooleanOpIntersect(
    firstMesh: Mesh,
    secondMesh: Mesh | null | undefined,
    scene?: Scene,
    material?: Material
  ): Mesh;
}