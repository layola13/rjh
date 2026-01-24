/**
 * Wall generation and rendering module for 3D scene construction.
 * Handles both standard polygonal walls and curved arc walls with interior/exterior textures.
 */

import { Color4, Texture, Vector2, Vector3, Vector4, Mesh, Space, MeshBuilder } from '@babylonjs/core';
import Point from './Point';
import { ProfileTypesEnum } from './ProfileTypes';
import GeometryUtils from './GeometryUtils';
import LathePolygonFactory from './LathePolygonFactory';
import CustomModelGenerator from './CustomModelGenerator';
import MaterialManager from './MaterialManager';
import TransformNodeFactory from './TransformNodeFactory';
import VertexNormalUtils from './VertexNormalUtils';

/**
 * Configuration for wall generation, including dimensions and positioning.
 */
interface WallGenerationConfig {
  /** Wall thickness in scene units */
  wall_depth: number;
  /** Frame/structure depth in scene units */
  frame_depth: number;
  /** Center position offset for the entire wall system */
  center_pos: Vector3;
}

/**
 * Represents a single wall segment with geometric data.
 */
interface WallSegment {
  /** Unique identifier for the wall segment */
  id?: string | number;
  /** Array of 2D points defining the wall's footprint */
  pts: Array<{ x: number; y: number }>;
  /** Wall type identifier (e.g., "3dArc" for curved walls) */
  type?: string;
  /** Height offset for arc walls */
  arcHeight?: number;
  /** Whether the arc curves inward (true) or outward (false) */
  arcFaceInner?: boolean;
}

/**
 * Circular arc geometric information.
 */
interface CircleInfo {
  /** Center offset from origin */
  offset: { x: number; y: number };
  /** Radius of the circular arc */
  radius: number;
  /** Angular extent in radians */
  radion: number;
  /** Rotation angle for right side alignment */
  rightRadion: number;
}

/**
 * Wall builder class for generating 3D wall meshes in a Babylon.js scene.
 * Supports both straight polygonal walls and curved arc walls with customizable materials.
 */
export default class WallBuilder {
  /** Active Babylon.js scene context */
  private static scene: BABYLON.Scene;
  
  /** Color array for wall faces: [outer, top, inner] */
  private static faceColors: Color4[];

  /**
   * Initialize the wall builder with scene context and default colors.
   * @param scene - The Babylon.js scene to render walls in
   */
  static Init(scene: BABYLON.Scene): void {
    this.scene = scene;
    this.faceColors = [
      new Color4(1, 1, 1, 1), // Outer face color
      new Color4(1, 1, 1, 1), // Top face color
      new Color4(1, 1, 1, 1)  // Inner face color
    ];
  }

  /**
   * Set the color for the interior wall surface.
   * @param color - RGBA color for inner wall faces
   */
  static SetWallInColor(color: Color4): void {
    this.faceColors[0] = color;
  }

  /**
   * Apply a texture to exterior wall surfaces.
   * @param textureUrl - Path or URL to the texture image
   */
  static SetWallOutTexture(textureUrl: string): void {
    const wallOutProfile = MaterialManager.GetProfileType(ProfileTypesEnum.BrickWallOut);
    wallOutProfile.diffuseTexture = new Texture(textureUrl, this.scene);
  }

  /**
   * Generate all wall meshes from segment data.
   * Creates either polygonal extrusions or lathed arc meshes based on segment type.
   * 
   * @param segments - Array of wall segment definitions
   * @param parentNode - Parent transform node for the wall hierarchy
   * @param config - Wall dimensions and positioning configuration
   */
  static GenWalls(
    segments: WallSegment[] | undefined,
    parentNode: BABYLON.TransformNode,
    config: WallGenerationConfig
  ): void {
    if (segments === undefined) {
      return;
    }

    const wallOutMaterial = MaterialManager.GetProfileType(ProfileTypesEnum.BrickWallOut);
    const wallInMaterial = MaterialManager.GetProfileType(ProfileTypesEnum.BrickWallIn);

    for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
      const segment = segments[segmentIndex];

      // Calculate bounding box of the wall segment
      const minX = segment.pts.reduce((min, pt) => Math.min(min, pt.x), Number.MAX_SAFE_INTEGER);
      const maxX = segment.pts.reduce((max, pt) => Math.max(max, pt.x), Number.MIN_SAFE_INTEGER);
      const minY = segment.pts.reduce((min, pt) => Math.min(min, pt.y), Number.MAX_SAFE_INTEGER);
      const maxY = segment.pts.reduce((max, pt) => Math.max(max, pt.y), Number.MIN_SAFE_INTEGER);

      const width = maxX - minX;
      const height = maxY - minY;
      const wallThickness = 10 * config.wall_depth;
      const scaledHeight = 10 * (maxY - minY);

      // Create parent node for this wall segment
      const wallNode = TransformNodeFactory.CreateTransformNode({
        name: `Wall-${segment.id ?? segmentIndex}`,
        parent: parentNode
      });

      // Handle curved arc walls
      if (segment.type === '3dArc') {
        const isInnerArc = segment.arcFaceInner ?? false;
        const arcHeightOffset = isInnerArc 
          ? -Math.abs(segment.arcHeight!) 
          : Math.abs(segment.arcHeight!);

        // Calculate circle geometry for the arc
        const circleInfo = GeometryUtils.GetCircleInfo(
          new Point(0, 0),
          new Point(width, 0),
          arcHeightOffset,
          new Point(0, 0),
          new Point(width, 0)
        );

        const arcCenterPos = new Vector3(
          10 * (minX + circleInfo.offset.x) - config.center_pos.x,
          10 * minY - config.center_pos.y,
          10 * circleInfo.offset.y
        );

        const rotationAngle = isInnerArc 
          ? -circleInfo.rightRadion 
          : Math.PI - circleInfo.rightRadion;

        // Calculate radii for inner and outer walls
        let innerRadius = 10 * (circleInfo.radius + 0.5 * config.frame_depth - 0.5 * config.wall_depth);
        let outerRadius = 10 * (circleInfo.radius + 0.5 * config.frame_depth + 0.5 * config.wall_depth);
        const arcLength = 2 * Math.PI * circleInfo.radius * circleInfo.radion / (2 * Math.PI);

        let outerWallUVs = new Vector4(maxX, minY - config.wall_depth, maxX - arcLength, maxY + config.wall_depth);

        // Define outer wall cross-section profile
        let outerWallProfile = [
          new Vector3(innerRadius, 0, 0),
          new Vector3(outerRadius, 0, 0),
          new Vector3(outerRadius, 10 * height, 0),
          new Vector3(innerRadius, 10 * height, 0)
        ];

        // Adjust for inner-facing arcs
        if (isInnerArc) {
          innerRadius = 10 * (circleInfo.radius - 0.5 * config.frame_depth - 0.5 * config.wall_depth);
          outerRadius = 10 * (circleInfo.radius - 0.5 * config.frame_depth + 0.5 * config.wall_depth);
          outerWallProfile = [
            new Vector3(outerRadius, 10 * height, 0),
            new Vector3(innerRadius, 10 * height, 0),
            new Vector3(innerRadius, 0, 0),
            new Vector3(outerRadius, 0, 0)
          ];
          outerWallUVs = new Vector4(maxX, maxY + config.wall_depth, maxX - arcLength, minY - config.wall_depth);
        }

        // Smooth normals for the profile
        outerWallProfile = VertexNormalUtils.GenSmoothNormalVertexArray(outerWallProfile);

        // Create outer wall mesh via lathing
        const outerWallMesh = MeshBuilder.CreateLathe(
          ProfileTypesEnum.BrickWallOut,
          {
            shape: outerWallProfile,
            invertUV: true,
            arc: circleInfo.radion / (2 * Math.PI),
            closed: false,
            cap: Mesh.NO_CAP,
            sideOrientation: Mesh.DOUBLESIDE,
            frontUVs: outerWallUVs,
            backUVs: outerWallUVs
          },
          this.scene
        );

        outerWallMesh.convertToFlatShadedMesh();
        outerWallMesh.position = arcCenterPos;
        outerWallMesh.rotate(Vector3.Up(), rotationAngle, Space.WORLD);
        outerWallMesh.material = wallOutMaterial;
        outerWallMesh.setParent(wallNode);

        // Create inner wall edge profile
        let innerWallProfile = [
          new Vector3(innerRadius, 0, 0),
          new Vector3(innerRadius, 10 * height, 0)
        ];

        if (isInnerArc) {
          innerWallProfile = [
            new Vector3(outerRadius, 0, 0),
            new Vector3(outerRadius, 10 * height, 0)
          ];
        }

        const innerWallUVs = new Vector4(minX, minY, minX - arcLength, maxY);

        // Create inner wall mesh
        const innerWallMesh = MeshBuilder.CreateLathe(
          ProfileTypesEnum.BrickWallIn,
          {
            shape: innerWallProfile,
            invertUV: true,
            arc: circleInfo.radion / (2 * Math.PI),
            closed: false,
            cap: Mesh.NO_CAP,
            sideOrientation: Mesh.DOUBLESIDE,
            frontUVs: innerWallUVs,
            backUVs: innerWallUVs
          },
          this.scene
        );

        innerWallMesh.position = arcCenterPos;
        innerWallMesh.rotate(Vector3.Up(), rotationAngle, Space.WORLD);
        innerWallMesh.material = MaterialManager.GetProfileType(ProfileTypesEnum.BrickWallIn);
        innerWallMesh.setParent(wallNode);

        // Create side caps for the arc wall
        const sideCapNode = TransformNodeFactory.CreateTransformNode({
          name: ProfileTypesEnum.BrickWallSide,
          parent: wallNode,
          pos: arcCenterPos
        });
        sideCapNode.rotate(Vector3.Up(), rotationAngle, Space.WORLD);

        // Define side cap polygon
        const sideCapPolygon = [
          new Vector2(-wallThickness, -scaledHeight).scale(0.5),
          new Vector2(wallThickness, -scaledHeight).scale(0.5),
          new Vector2(wallThickness, scaledHeight).scale(0.5),
          new Vector2(-wallThickness, scaledHeight).scale(0.5)
        ];

        const sideCapCenter = new Vector3(
          0.5 * (innerRadius + outerRadius),
          0.5 * (maxY - minY) * 10,
          0
        );

        const sideCapUVs = new Vector4(0, minY, config.wall_depth, maxY);

        LathePolygonFactory.CreateLatheIrregularPolygon_V(
          {
            name: 'Wall',
            pts: sideCapPolygon,
            mat: wallOutMaterial
          },
          sideCapNode,
          sideCapCenter,
          circleInfo.radion,
          sideCapUVs
        );
      } else {
        // Handle standard polygonal walls
        const wallCenterPos = new Vector3(0.5 * (minX + maxX), minY, 0);
        wallNode.position = wallCenterPos.scale(10);

        // Convert to Point array and ensure proper winding order
        const wallPoints = segment.pts.map(pt => new Point(pt.x, pt.y));
        GeometryUtils.NormalCWStatus(wallPoints, false);
        GeometryUtils.SetClosed(wallPoints, true);

        // Define UV mapping for each face
        const faceUVs: Vector4[] = [];
        faceUVs[0] = new Vector4(minX, minY, maxX, maxY); // Outer face
        faceUVs[1] = new Vector4(0, 0, maxX - minX, config.wall_depth); // Top face
        faceUVs[2] = new Vector4(maxX, maxY, minX, minY); // Inner face

        // Generate extruded outer wall mesh
        const outerWallMesh = CustomModelGenerator.GenCustomerModelM(
          wallPoints.map(pt => new Vector2(pt.x, pt.y)),
          config.wall_depth,
          {
            mat: wallOutMaterial,
            faceColors: this.faceColors,
            faceUVs: faceUVs
          }
        );

        outerWallMesh.setParent(wallNode);
        outerWallMesh.position.z = 0.5 * (config.frame_depth - config.wall_depth) * 10;

        // Generate thin inner wall surface
        const innerWallMesh = CustomModelGenerator.GenCustomerModelM(
          wallPoints.map(pt => new Vector2(pt.x, pt.y)),
          0.01, // Very thin inner surface
          {
            mat: wallInMaterial,
            faceColors: this.faceColors,
            faceUVs: faceUVs
          }
        );

        innerWallMesh.setParent(wallNode);
        innerWallMesh.position.z = 10 * (0.5 * (config.frame_depth - config.wall_depth) - 0.001);

        // Position wall relative to center
        wallNode.position = wallCenterPos.scale(10).subtract(config.center_pos);
      }
    }
  }
}