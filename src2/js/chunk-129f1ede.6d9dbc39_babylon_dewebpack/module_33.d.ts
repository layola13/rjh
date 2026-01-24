import { Scene, TransformNode, Vector3, MeshBuilder, Mesh, AbstractMesh, Material } from '@babylonjs/core';

/**
 * Options for creating a TransformNode
 */
export interface TransformNodeOptions {
  /** The name of the transform node */
  name?: string;
  /** The parent node */
  parent?: TransformNode | AbstractMesh;
  /** The position of the node */
  pos?: Vector3;
}

/**
 * Options for creating a Box mesh
 */
export interface BoxOptions {
  /** The name of the box mesh */
  name?: string;
  /** The parent node */
  parent?: TransformNode | AbstractMesh;
  /** The local position of the box */
  localPos?: Vector3;
  /** Whether the box is pickable (default: true) */
  isPick?: boolean;
  /** The material to apply to the box */
  mat?: Material;
  /** The target scene (uses default scene if not specified) */
  targetScene?: Scene;
  /** Uniform size for all dimensions */
  size?: number;
  /** Width of the box (used when size is not specified) */
  width?: number;
  /** Height of the box (used when size is not specified) */
  height?: number;
  /** Depth of the box (used when size is not specified) */
  depth?: number;
}

/**
 * Utility class for creating and managing Babylon.js 3D objects
 */
export default class MeshFactory {
  /** The scene instance used for creating objects */
  private static scene: Scene;

  /**
   * Initialize the factory with a scene instance
   * @param scene - The Babylon.js scene to use for object creation
   */
  static Init(scene: Scene): void;

  /**
   * Create a TransformNode in the scene
   * @param options - Configuration options for the transform node
   * @returns The created TransformNode instance
   */
  static CreateTransformNode(options?: TransformNodeOptions): TransformNode;

  /**
   * Create a box mesh in the scene
   * @param options - Configuration options for the box mesh
   * @returns The created box Mesh instance
   */
  static CreateBox(options: BoxOptions): Mesh;
}