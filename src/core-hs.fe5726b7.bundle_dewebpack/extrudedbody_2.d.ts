import { ParametricModel } from './ParametricModel';
import { Vector3 } from 'three';

/**
 * Represents an extruded 3D body created from a 2D polygon path.
 * Handles the creation, updating, and rendering of extruded geometries
 * with support for face replacement and material mapping.
 */
export class ExtrudedBody extends ParametricModel {
  /**
   * The original points defining the base polygon of the extrusion.
   * Stored as Vector3 array for spatial calculations and face identification.
   */
  private originalPoints: Vector3[] = [];

  /**
   * Creates a new ExtrudedBody instance.
   * 
   * @param entity - The entity model containing parameters and metadata
   * @param webCADDocument - The CAD document for geometric operations
   * @param geometryManager - Manager for geometry lifecycle and caching
   * @param renderContext - Context for rendering operations
   */
  constructor(
    entity: unknown,
    webCADDocument: unknown,
    geometryManager: unknown,
    renderContext: unknown
  ) {
    super(entity, webCADDocument, geometryManager, renderContext);
  }

  /**
   * Updates the extruded body geometry based on entity parameters.
   * Handles both initial extrusion and optional face replacement.
   * 
   * @remarks
   * - Validates polygon has at least 3 points
   * - Computes plane and normal from polygon
   * - Optionally replaces bottom face with new geometry
   */
  protected onUpdate(): void {
    super.onUpdate();

    const parameters = this.entity.parameters;

    // Create base extrusion if valid points exist
    if (parameters.points && parameters.points.length > 2) {
      const polygonPoints = parameters.points.map((point: { x: number; y: number }) => 
        new Vector3(point.x, point.y, parameters.elevation)
      );

      this.originalPoints = polygonPoints;

      const plane = GeLib.PolygonUtils.getPlaneFromPolygon(polygonPoints);
      if (!plane) {
        Logger.console.error('Invalid PExtruding paths.');
        return;
      }

      plane.normal = parameters.direction || plane.normal;
      plane.normal = new Vector3(plane.normal.x, plane.normal.y, plane.normal.z);

      const xRay = plane.xRay;

      this._webCADDocument.addExtrudedBody(
        {
          paths: [polygonPoints],
          plane: plane,
          xRay: xRay,
          targetNormal: plane.normal
        },
        parameters.height
      );
    }

    // Replace bottom face if specified
    if (parameters.replacePoints) {
      this._webCADDocument.compute({
        isDuringFastComputation: true,
        sortSmoothPaths: false
      });

      const replacementPoints = parameters.replacePoints.map((point: { x: number; y: number }) =>
        new Vector3(point.x, point.y, parameters.elevation - parameters.height)
      );

      const replacementPlane = GeLib.PolygonUtils.getPlaneFromPolygon(replacementPoints);
      if (!replacementPlane) {
        Logger.console.error('Invalid PExtruding paths.');
        return;
      }

      replacementPlane.normal = parameters.direction || replacementPlane.normal;
      replacementPlane.normal = new Vector3(
        replacementPlane.normal.x,
        replacementPlane.normal.y,
        replacementPlane.normal.z
      );

      this._webCADDocument._documentJSON = WebCADModelAPI.addPath(
        this._webCADDocument._documentJSON,
        {
          xRay: replacementPlane.xRay,
          plane: replacementPlane,
          paths: [replacementPoints],
          planeOption: {
            independent: true
          },
          customData: {
            isReplacedPath: true
          }
        }
      );

      this._webCADDocument._meshes = WebCADModelAPI.getGraphicsData(
        this._webCADDocument._documentJSON,
        undefined,
        { sortSmoothPaths: false }
      ).faces;
    }
  }

  /**
   * Retrieves the room entity that hosts this extruded body.
   * Supports window sills, walls, and window ceilings.
   * 
   * @returns The parent room entity or undefined
   */
  private _getRoom(): unknown | undefined {
    if (
      this.entity.instanceOf(HSConstants.ModelClass.NgParametricWindowSill) ||
      this.entity.instanceOf(HSConstants.ModelClass.NgParametricWall) ||
      this.entity.instanceOf(HSConstants.ModelClass.NgParametricWindowCeiling)
    ) {
      const parentEntity = Object.values(this.entity.parents)[0];
      if (parentEntity?.getHost) {
        return parentEntity.getHost();
      }
    }
    return undefined;
  }

  /**
   * Converts mesh data into graphics objects with materials and metadata.
   * Classifies faces as original, extruded, or side faces based on vertex matching.
   * 
   * @param meshes - Array of mesh data from CAD document
   * @param materialMap - Map of face types to material definitions
   * @param baseGraphicsData - Base graphics data for object creation
   * @param room - Associated room entity for metadata
   * @param snappingFaceKeys - Face keys that support snapping
   * @param snappingPlanes - Output array for snapping plane keys
   * @returns Graphics data containing mesh definitions and objects
   */
  private _createGraphicsDataFromMeshes(
    meshes: unknown[],
    materialMap: Map<string, unknown>,
    baseGraphicsData: { entityId: string; type: string; visible: boolean },
    room: unknown,
    snappingFaceKeys: string[],
    snappingPlanes: string[]
  ): { meshDefs: unknown[]; objects: unknown[] } {
    return meshes.reduce(
      (graphicsData, mesh) => {
        // Extract vertex positions as Vector3 array
        const vertices: Vector3[] = [];
        for (let i = 0; i < mesh.vertexPositions.length - 2; ) {
          vertices.push(
            new Vector3(
              mesh.vertexPositions[i],
              mesh.vertexPositions[i + 1],
              mesh.vertexPositions[i + 2]
            )
          );
          i += 3;
        }

        // Classify face type based on matching original points
        const matchingIndices = this._getIndicesFromOriginalPoints(vertices);
        let faceType = 'originalface';

        if (mesh.customData?.isReplacedPath || matchingIndices.length === 0) {
          faceType = 'extrudedface';
        } else if (matchingIndices.length === 2) {
          const edgeIndex =
            Math.abs(matchingIndices[0] - matchingIndices[1]) === 1
              ? Math.min(matchingIndices[0], matchingIndices[1])
              : Math.max(matchingIndices[0], matchingIndices[1]);
          faceType = `sideface${edgeIndex}`;
        }

        // Get material for this face type
        const materialData = materialMap.get(faceType);
        if (!materialData) {
          console.error(`No material data specified for face ${faceType}`);
          return graphicsData;
        }

        // Create mesh definition and material object
        const meshDefinition = Util.getFgiMeshDef(mesh);
        const uvTransform = Util.getUvTransformCommon(mesh, materialData);
        const materialObject = Util.getMaterialObject(materialData);

        if (uvTransform) {
          materialObject.diffuseMapUvTransform = uvTransform.diffuseMapUvTransform;
          materialObject.normalMapUvTransform = uvTransform.normalMapUvTransform;
        }

        graphicsData.meshDefs.push(meshDefinition);

        // Add to snapping planes if applicable
        if (
          snappingFaceKeys.includes(faceType) &&
          mesh.sketchModelData?.type === 'FACE'
        ) {
          snappingPlanes.push(mesh.meshKey);
        }

        // Create graphics object with metadata
        graphicsData.objects.push({
          graphicsPath: `${baseGraphicsData.entityId}/${mesh.meshKey}`,
          mesh: mesh.meshKey,
          material: materialObject,
          customAttrs: {
            roomType: room ? `${room.roomType || 'none'}-${room.id}` : 'none',
            roomArea: room ? HSCore.Util.Room.getArea(room) : 0,
            type: 'BayWindow'
          },
          ...baseGraphicsData
        });

        return graphicsData;
      },
      { meshDefs: [], objects: [] } as { meshDefs: unknown[]; objects: unknown[] }
    );
  }

  /**
   * Filters meshes by excluding faces specified in hideFaceKeys.
   * Classifies faces and removes those matching hidden face types.
   * 
   * @param meshes - Source mesh array
   * @param hideFaceKeys - Face type keys to exclude
   * @returns Filtered mesh array
   */
  private _createMeshesFromGraphicsData(
    meshes: unknown[],
    hideFaceKeys: string[]
  ): unknown[] {
    const visibleMeshes: unknown[] = [];

    (meshes || []).forEach((mesh) => {
      const vertices: Vector3[] = [];
      for (let i = 0, length = mesh.vertexPositions.length - 2; i < length; ) {
        vertices.push(
          new Vector3(
            mesh.vertexPositions[i],
            mesh.vertexPositions[i + 1],
            mesh.vertexPositions[i + 2]
          )
        );
        i += 3;
      }

      const matchingIndices = this._getIndicesFromOriginalPoints(vertices);
      let faceType = 'originalface';

      if (matchingIndices.length === 0) {
        faceType = 'extrudedface';
      } else if (matchingIndices.length === 2) {
        const edgeIndex =
          Math.abs(matchingIndices[0] - matchingIndices[1]) === 1
            ? Math.min(matchingIndices[0], matchingIndices[1])
            : Math.max(matchingIndices[0], matchingIndices[1]);
        faceType = `sideface${edgeIndex}`;
      }

      // Include mesh if not hidden or is a replaced path
      if (!hideFaceKeys.includes(faceType) || mesh.customData?.isReplacedPath) {
        visibleMeshes.push(mesh);
      }
    });

    return visibleMeshes;
  }

  /**
   * Asynchronously generates graphics data for rendering.
   * Handles face hiding and applies materials with snapping plane configuration.
   * 
   * @returns Promise resolving to graphics data with mesh definitions and objects
   */
  async toGraphicsDataAsync(): Promise<{ meshDefs: unknown[]; objects: unknown[] }> {
    const entity = this.entity;
    const hostEntity = entity.getHost();
    const materialMap = this.entity.materialsForFGI;
    const baseGraphicsData = {
      entityId: entity.id,
      type: HSConstants.GraphicsObjectType.Mesh,
      visible:
        entity.isFlagOff(HSCore.Model.EntityFlagEnum.hidden) ||
        (hostEntity && hostEntity.isFlagOff(HSCore.Model.EntityFlagEnum.hidden))
    };

    const room = this._getRoom();
    const snappingFaceKeys = entity.snappingFaceKeys;
    const hideFaceKeys = entity.hideFaceKeys;
    const snappingPlanes: string[] = [];

    let meshes: unknown[] = [];

    try {
      if (hideFaceKeys.length > 0) {
        const rawMeshes = await this._webCADDocument.getGraphicsDataAsync({
          isDuringFastComputation: true,
          sortSmoothPaths: false
        });
        meshes = this._createMeshesFromGraphicsData(rawMeshes, hideFaceKeys);
      } else {
        meshes = await this._webCADDocument.getGraphicsDataAsync({
          isDuringFastComputation: true,
          sortSmoothPaths: false
        });
        meshes = meshes || [];
      }

      return this._createGraphicsDataFromMeshes(
        meshes,
        materialMap,
        baseGraphicsData,
        room,
        snappingFaceKeys,
        snappingPlanes
      );
    } catch (error) {
      return { meshDefs: [], objects: [] };
    }
  }

  /**
   * Synchronously generates graphics data for rendering.
   * Handles face hiding and applies materials with snapping plane configuration.
   * 
   * @returns Graphics data with mesh definitions and objects
   */
  toGraphicsData(): { meshDefs: unknown[]; objects: unknown[] } {
    const entity = this.entity;
    const hostEntity = entity.getHost();
    const materialMap = this.entity.materialsForFGI;
    const baseGraphicsData = {
      entityId: entity.id,
      type: HSConstants.GraphicsObjectType.Mesh,
      visible:
        entity.isFlagOff(HSCore.Model.EntityFlagEnum.hidden) ||
        (hostEntity && hostEntity.isFlagOff(HSCore.Model.EntityFlagEnum.hidden))
    };

    const room = this._getRoom();
    const snappingFaceKeys = entity.snappingFaceKeys;
    const hideFaceKeys = entity.hideFaceKeys;
    const snappingPlanes: string[] = [];

    let meshes: unknown[] = [];

    if (hideFaceKeys.length > 0) {
      const rawMeshes = this._webCADDocument.getGraphicsData({
        isDuringFastComputation: true,
        sortSmoothPaths: false
      });
      meshes = this._createMeshesFromGraphicsData(rawMeshes, hideFaceKeys);
    } else {
      meshes = this._webCADDocument.getGraphicsData({
        isDuringFastComputation: true,
        sortSmoothPaths: false
      });
    }

    const graphicsData = this._createGraphicsDataFromMeshes(
      meshes,
      materialMap,
      baseGraphicsData,
      room,
      snappingFaceKeys,
      snappingPlanes
    );

    this._webCADDocument.setSnappingPlanes(snappingPlanes);
    return graphicsData;
  }

  /**
   * Finds indices of vertices that match the original polygon points.
   * Used for face classification during rendering.
   * 
   * @param vertices - Vertices to check against original points
   * @returns Array of matching indices in originalPoints
   */
  private _getIndicesFromOriginalPoints(vertices: Vector3[]): number[] {
    const findMatchingIndex = (vertex: Vector3): number => {
      for (let i = 0; i < this.originalPoints.length; ++i) {
        if (
          GeLib.VectorUtils.isPointEqual(
            this.originalPoints[i],
            vertex,
            HSCore.Util.Math.defaultTolerance
          )
        ) {
          return i;
        }
      }
      return -1;
    };

    const matchingIndices: number[] = [];
    for (let i = 0; i < vertices.length; ++i) {
      const index = findMatchingIndex(vertices[i]);
      if (index !== -1) {
        matchingIndices.push(index);
      }
    }

    return matchingIndices;
  }
}