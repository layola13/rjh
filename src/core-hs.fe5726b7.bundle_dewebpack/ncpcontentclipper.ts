import { ContentClipper } from './ContentClipper';
import { polygon } from './polygon';
import { NCustomizedFeatureModelUtil } from './NCustomizedFeatureModelUtil';

interface MeshDefinition {
  meshKey: string;
  faceIndices: number[];
  indexCount: number;
  vertexPositions: number[];
  vertexCount: number;
  visible: boolean;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface ClipMeshResult {
  clipMeshes: unknown[];
  cutPlanes: unknown[];
  nodeMap: Map<unknown, unknown>;
  cutObstacles: unknown[];
}

export class NCPContentClipper extends ContentClipper {
  private ncpcontent: unknown;

  constructor(content: unknown) {
    super(content);
    this.ncpcontent = content;
  }

  /**
   * Cuts planes to mesh definitions based on provided cut planes
   * @param cutPlanes - Array of cutting planes
   * @param planeCount - Number of planes to process
   * @param adjustVertical - Whether to adjust vertical coordinates
   * @param useBox - Whether to construct box from cut planes
   * @param indexOffset - Starting index offset
   * @returns Array of mesh definitions
   */
  cutPlanesToMeshDefs(
    cutPlanes: unknown[],
    planeCount: number,
    adjustVertical: boolean = false,
    useBox: boolean = false,
    indexOffset: number = 0
  ): MeshDefinition[] {
    const entityLayer = HSCore.Util.Layer.getEntityLayer(this.ncpcontent);
    let altitude = 0;

    if (entityLayer instanceof HSCore.Model.Layer) {
      altitude = HSCore.Util.Layer.getAltitude(entityLayer);
    }

    const meshDefinitions: MeshDefinition[] = [];
    const uniqueId = this.generateUniqueId(13);

    const boxes = cutPlanes && cutPlanes.length 
      ? this._constructBoxFromCutPlanes(cutPlanes, planeCount, useBox) 
      : [];

    boxes.forEach((box, boxIndex) => {
      const faceIndices: number[] = [];
      const vertexPositions: number[] = [];
      let minY: number | undefined;
      let maxY: number | undefined;

      box.forEach((face) => {
        face.forEach((point: Point3D) => {
          if (minY === undefined) {
            minY = point.y;
            maxY = point.y;
          } else {
            minY = point.y < minY ? point.y : minY;
            maxY = point.y > maxY! ? point.y : maxY;
          }
        });
      });

      box.forEach((face) => {
        const vertices: number[][] = [];

        face.forEach((point: Point3D) => {
          const VERTICAL_OFFSET = 0.0005;
          
          if (adjustVertical && HSCore.Util.Math.nearlyEquals(point.y, minY!)) {
            vertices.push([point.x, point.y - VERTICAL_OFFSET, point.z]);
          } else if (adjustVertical && HSCore.Util.Math.nearlyEquals(point.y, maxY!)) {
            vertices.push([point.x, point.y + VERTICAL_OFFSET, point.z]);
          } else {
            vertices.push([point.x, point.y, point.z]);
          }
        });

        polygon.triangulate(vertices, []).forEach((triangle) => {
          triangle.forEach((vertex) => {
            vertexPositions.push(vertex[0], -vertex[2], vertex[1] + altitude);
          });
        });
      });

      const vertexCount = vertexPositions.length / 3;
      for (let i = 0; i < vertexCount; i++) {
        faceIndices.push(i);
      }

      const meshDef: MeshDefinition = {
        meshKey: `${uniqueId}/${indexOffset}/${boxIndex}`,
        faceIndices,
        indexCount: faceIndices.length,
        vertexPositions,
        vertexCount,
        visible: false
      };

      meshDefinitions.push(meshDef);
    });

    return meshDefinitions;
  }

  /**
   * Retrieves all clip meshes and related data
   * @param param1 - First parameter
   * @param param2 - Second parameter
   * @returns Object containing clip meshes, cut planes, node map, and obstacles
   */
  getAllClipMeshes(param1: unknown, param2: unknown): ClipMeshResult {
    const nodeMap = new Map();
    const cutPlanes = HSCore.Geometry.Util.getNCPContentClipPlanes(this.ncpcontent);
    let cutObstacles: unknown[] = [];

    if (HSConstants.Config.ClipBackgroundWallEnable) {
      cutObstacles = NCustomizedFeatureModelUtil.getObstacleInfos(this.ncpcontent);
    }

    return {
      clipMeshes: [],
      cutPlanes,
      nodeMap,
      cutObstacles
    };
  }

  /**
   * Converts model space coordinates to view space coordinates
   * @param point - Point in model space
   * @returns Point in view space
   */
  ModelSpaceToViewSpace(point: Point3D): THREE.Vector3 {
    return new THREE.Vector3(point.x, point.z, -point.y);
  }

  /**
   * Generates a unique identifier with specified length
   * @param length - Length of the unique ID
   * @returns Unique identifier string
   */
  private generateUniqueId(length: number): string {
    const clampedLength = length > 13 ? 13 : length;
    const MAX_RANDOM = 1000;
    const SECONDS_TO_MS = 1000;
    
    let timestamp = new Date().getTime();
    timestamp += SECONDS_TO_MS * Math.floor(MAX_RANDOM * Math.random() + 1);
    
    return timestamp.toString().substring(13 - clampedLength);
  }

  /**
   * Constructs boxes from cut planes (abstract method to be implemented)
   * @param cutPlanes - Array of cutting planes
   * @param planeCount - Number of planes
   * @param useBox - Whether to use box construction
   * @returns Array of box faces
   */
  private _constructBoxFromCutPlanes(
    cutPlanes: unknown[],
    planeCount: number,
    useBox: boolean
  ): Point3D[][][] {
    // Implementation depends on parent class
    return [];
  }
}