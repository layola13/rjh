import { Vector3, MeshBuilder, Mesh, Scene } from '@babylonjs/core';

/**
 * Frame generator utility for creating 3D frames from path and profile definitions.
 * Generates mesh geometry by extruding a 2D profile along a 3D path with mitered corners.
 */
export default class FrameGenerator {
  /** The Babylon.js scene where frames will be created */
  private static scene: Scene;

  /**
   * Initializes the frame generator with a Babylon.js scene.
   * @param scene - The scene instance to use for mesh creation
   */
  static Init(scene: Scene): void {
    this.scene = scene;
  }

  /**
   * Generates a 3D frame mesh by extruding a profile along a path.
   * Uses mitered joints at corners for smooth connections.
   * 
   * @param path - Array of 3D points defining the frame's path (default: triangular path)
   * @param profile - Array of 2D points defining the frame's cross-section profile (default: rectangular profile)
   * @returns A merged, flat-shaded mesh representing the complete frame
   */
  static GenFrame(
    path?: Vector3[],
    profile?: Vector3[]
  ): Mesh {
    return this.generateFrameGeometry({
      path: path || [
        new Vector3(-150, -100, 0),
        new Vector3(150, -100, 0),
        new Vector3(110, 100, 0)
      ],
      profile: profile || [
        new Vector3(-12, 12, 0),
        new Vector3(-12, -12, 0),
        new Vector3(12, -12, 0),
        new Vector3(12, -6, 0),
        new Vector3(-6, -6, 0),
        new Vector3(-6, 12, 0)
      ]
    });
  }

  /**
   * Internal method that performs the actual frame geometry generation.
   * Calculates mitered corners based on angles between path segments.
   * 
   * @param config - Configuration object containing path and profile
   * @returns The generated frame mesh
   */
  private static generateFrameGeometry(config: FrameConfig): Mesh {
    const { path, profile } = config;

    // Find the minimum x-coordinate in the profile for offset calculations
    let minProfileX = Number.MAX_VALUE;
    for (let i = 0; i < profile.length; i++) {
      minProfileX = Math.min(minProfileX, profile[i].x);
    }

    const transformedProfiles: Vector3[][] = [];
    const pathLength = path.length;
    const currentDirection = Vector3.Zero();
    const nextDirection = Vector3.Zero();

    // Calculate initial direction vectors
    path[1].subtractToRef(path[0], currentDirection);
    path[2].subtractToRef(path[1], nextDirection);

    // Process each segment of the path
    for (let segmentIndex = 0; segmentIndex < pathLength; segmentIndex++) {
      // Calculate miter angle between current and next direction
      const miterAngle = Math.PI - Math.acos(
        Vector3.Dot(currentDirection, nextDirection) / 
        (currentDirection.length() * nextDirection.length())
      );

      // Determine if corner is concave or convex
      const cornerDirection = Vector3.Cross(currentDirection, nextDirection).normalize().z;

      // Calculate perpendicular vector for profile placement
      const perpendicular = new Vector3(
        currentDirection.y,
        -1 * currentDirection.x,
        0
      ).normalize();

      currentDirection.normalize();

      // Transform profile points to world space with miter adjustment
      transformedProfiles[(segmentIndex + 1) % pathLength] = [];
      for (let profileIndex = 0; profileIndex < profile.length; profileIndex++) {
        const offset = profile[profileIndex].x - minProfileX;
        const miterOffset = cornerDirection * offset / Math.tan(miterAngle / 2);
        
        transformedProfiles[(segmentIndex + 1) % pathLength].push(
          path[(segmentIndex + 1) % pathLength]
            .subtract(perpendicular.scale(offset))
            .subtract(currentDirection.scale(miterOffset))
        );
      }

      // Update direction vectors for next iteration
      currentDirection.copyFrom(nextDirection);
      path[(segmentIndex + 3) % pathLength].subtractToRef(
        path[(segmentIndex + 2) % pathLength],
        nextDirection
      );
    }

    // Create ribbon meshes for each segment
    const segmentMeshes: Mesh[] = [];
    for (let segmentIndex = 0; segmentIndex < pathLength; segmentIndex++) {
      const ribbonPaths: Vector3[][] = [];

      for (let profileIndex = 0; profileIndex < profile.length; profileIndex++) {
        ribbonPaths[profileIndex] = [];
        ribbonPaths[profileIndex].push(
          new Vector3(
            transformedProfiles[segmentIndex][profileIndex].x,
            transformedProfiles[segmentIndex][profileIndex].y,
            profile[profileIndex].y
          )
        );
        ribbonPaths[profileIndex].push(
          new Vector3(
            transformedProfiles[(segmentIndex + 1) % pathLength][profileIndex].x,
            transformedProfiles[(segmentIndex + 1) % pathLength][profileIndex].y,
            profile[profileIndex].y
          )
        );
      }

      segmentMeshes[segmentIndex] = MeshBuilder.CreateRibbon(
        'frameSegment',
        {
          pathArray: ribbonPaths,
          sideOrientation: Mesh.DOUBLESIDE,
          updatable: true,
          closeArray: true
        },
        this.scene
      );
    }

    // Merge all segments and apply flat shading
    return Mesh.MergeMeshes(segmentMeshes, true)!.convertToFlatShadedMesh();
  }
}

/**
 * Configuration interface for frame generation
 */
interface FrameConfig {
  /** The 3D path along which the profile will be extruded */
  path: Vector3[];
  /** The 2D profile shape to extrude along the path */
  profile: Vector3[];
}