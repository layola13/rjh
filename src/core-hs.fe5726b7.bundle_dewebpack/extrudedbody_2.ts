import { ParametricModel } from './ParametricModel';
import { Util } from './Util';
import { Logger } from './Logger';

interface Point2D {
  x: number;
  y: number;
}

interface EntityParameters {
  points?: Point2D[];
  elevation: number;
  direction?: THREE.Vector3;
  height: number;
  replacePoints?: Point2D[];
}

interface Entity {
  parameters: EntityParameters;
  id: string;
  materialsForFGI: Map<string, MaterialData>;
  snappingFaceKeys: string[];
  hideFaceKeys: string[];
  parents: Record<string, any>;
  instanceOf(modelClass: string): boolean;
  getHost(): any;
  isFlagOff(flag: number): boolean;
}

interface Plane {
  normal: THREE.Vector3;
  xRay: any;
}

interface MeshData {
  vertexPositions: number[];
  meshKey: string;
  customData?: {
    isReplacedPath?: boolean;
    type?: string;
  };
  sketchModelData?: {
    type: string;
  };
}

interface MaterialData {
  diffuseMapUvTransform?: any;
  normalMapUvTransform?: any;
}

interface GraphicsObjectBase {
  entityId: string;
  type: string;
  visible: boolean;
}

interface GraphicsObject extends GraphicsObjectBase {
  graphicsPath: string;
  mesh: string;
  material: any;
  customAttrs: {
    roomType: string;
    roomArea: number;
    type: string;
  };
}

interface GraphicsData {
  meshDefs: any[];
  objects: GraphicsObject[];
}

interface WebCADDocument {
  _documentJSON: any;
  _meshes: any[];
  addExtrudedBody(config: {
    paths: THREE.Vector3[][];
    plane: Plane;
    xRay: any;
    targetNormal: THREE.Vector3;
  }, height: number): void;
  compute(options: { isDuringFastComputation: boolean; sortSmoothPaths: boolean }): void;
  getGraphicsData(options: { isDuringFastComputation: boolean; sortSmoothPaths: boolean }): MeshData[];
  getGraphicsDataAsync(options: { isDuringFastComputation: boolean; sortSmoothPaths: boolean }): Promise<MeshData[]>;
  setSnappingPlanes(planes: string[]): void;
}

export class ExtrudedBody extends ParametricModel {
  private originalPoints: THREE.Vector3[] = [];

  constructor(
    webCADDocument: WebCADDocument,
    entity: Entity,
    param3: any,
    param4: any
  ) {
    super(webCADDocument, entity, param3, param4);
  }

  onUpdate(): void {
    super.onUpdate();
    const parameters = this.entity.parameters;

    if (parameters.points && parameters.points.length > 2) {
      const points = parameters.points.map((point: Point2D) => {
        return new THREE.Vector3(point.x, point.y, parameters.elevation);
      });

      this.originalPoints = points;
      const plane = GeLib.PolygonUtils.getPlaneFromPolygon(points);

      if (!plane) {
        Logger.console.error('Invalid PExtruding paths.');
        return;
      }

      plane.normal = parameters.direction ?? plane.normal;
      plane.normal = new THREE.Vector3(plane.normal.x, plane.normal.y, plane.normal.z);
      const xRay = plane.xRay;

      this._webCADDocument.addExtrudedBody(
        {
          paths: [points],
          plane: plane,
          xRay: xRay,
          targetNormal: plane.normal
        },
        parameters.height
      );
    }

    if (parameters.replacePoints) {
      this._webCADDocument.compute({
        isDuringFastComputation: true,
        sortSmoothPaths: false
      });

      const replacePoints = parameters.replacePoints.map((point: Point2D) => {
        return new THREE.Vector3(point.x, point.y, parameters.elevation - parameters.height);
      });

      const replacePlane = GeLib.PolygonUtils.getPlaneFromPolygon(replacePoints);

      if (!replacePlane) {
        Logger.console.error('Invalid PExtruding paths.');
        return;
      }

      replacePlane.normal = parameters.direction ?? replacePlane.normal;
      replacePlane.normal = new THREE.Vector3(
        replacePlane.normal.x,
        replacePlane.normal.y,
        replacePlane.normal.z
      );

      this._webCADDocument._documentJSON = WebCADModelAPI.addPath(
        this._webCADDocument._documentJSON,
        {
          xRay: replacePlane.xRay,
          plane: replacePlane,
          paths: [replacePoints],
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
        {
          sortSmoothPaths: false
        }
      ).faces;
    }
  }

  private _getRoom(): any {
    if (
      this.entity.instanceOf(HSConstants.ModelClass.NgParametricWindowSill) ||
      this.entity.instanceOf(HSConstants.ModelClass.NgParametricWall) ||
      this.entity.instanceOf(HSConstants.ModelClass.NgParametricWindowCeiling)
    ) {
      const parent = Object.values(this.entity.parents)[0];
      if (parent?.getHost) {
        return parent.getHost();
      }
    }
    return undefined;
  }

  private _createGraphicsDataFromMeshes(
    meshes: MeshData[],
    materialsMap: Map<string, MaterialData>,
    graphicsBase: GraphicsObjectBase,
    room: any,
    snappingKeys: string[],
    snappingPlanes: string[]
  ): GraphicsData {
    return meshes.reduce(
      (result, mesh) => {
        const vertices: THREE.Vector3[] = [];
        for (let i = 0; i < mesh.vertexPositions.length - 2; ) {
          vertices.push(
            new THREE.Vector3(
              mesh.vertexPositions[i],
              mesh.vertexPositions[i + 1],
              mesh.vertexPositions[i + 2]
            )
          );
          i += 3;
        }

        const indices = this._getIndicesFromOriginalPoints(vertices);
        let faceKey = 'originalface';

        if (mesh.customData?.isReplacedPath || indices.length === 0) {
          faceKey = 'extrudedface';
        } else if (indices.length === 2) {
          const indexDiff = Math.abs(indices[0] - indices[1]);
          const sideIndex = indexDiff === 1 ? Math.min(indices[0], indices[1]) : Math.max(indices[0], indices[1]);
          faceKey = 'sideface' + sideIndex;
        }

        const materialData = materialsMap.get(faceKey);
        if (!materialData) {
          assert(false, `no material data specified for face ${faceKey}`, 'HSCore.Geometrymanager.Fgi');
          return result;
        }

        const meshDef = Util.getFgiMeshDef(mesh);
        const uvTransform = Util.getUvTransformCommon(mesh, materialData);
        const materialObject = Util.getMaterialObject(materialData);

        if (uvTransform) {
          materialObject.diffuseMapUvTransform = uvTransform.diffuseMapUvTransform;
          materialObject.normalMapUvTransform = uvTransform.normalMapUvTransform;
        }

        result.meshDefs.push(meshDef);

        if (
          snappingKeys.indexOf(faceKey) !== -1 &&
          mesh.sketchModelData?.type === 'FACE'
        ) {
          snappingPlanes.push(mesh.meshKey);
        }

        result.objects.push({
          ...graphicsBase,
          graphicsPath: graphicsBase.entityId + '/' + mesh.meshKey,
          mesh: mesh.meshKey,
          material: materialObject,
          customAttrs: {
            roomType: room ? (room.roomType ?? 'none') + '-' + room.id : 'none',
            roomArea: room ? HSCore.Util.Room.getArea(room) : 0,
            type: 'BayWindow'
          }
        });

        return result;
      },
      {
        meshDefs: [],
        objects: []
      } as GraphicsData
    );
  }

  private _createMeshesFromGraphicsData(meshes: MeshData[], hiddenFaceKeys: string[]): MeshData[] {
    const filteredMeshes: MeshData[] = [];

    (meshes ?? []).forEach((mesh) => {
      const vertices: THREE.Vector3[] = [];
      for (let i = 0, length = mesh.vertexPositions.length - 2; i < length; ) {
        vertices.push(
          new THREE.Vector3(
            mesh.vertexPositions[i],
            mesh.vertexPositions[i + 1],
            mesh.vertexPositions[i + 2]
          )
        );
        i += 3;
      }

      const indices = this._getIndicesFromOriginalPoints(vertices);
      let faceKey = 'originalface';

      if (indices.length === 0) {
        faceKey = 'extrudedface';
      } else if (indices.length === 2) {
        const indexDiff = Math.abs(indices[0] - indices[1]);
        const sideIndex = indexDiff === 1 ? Math.min(indices[0], indices[1]) : Math.max(indices[0], indices[1]);
        faceKey = 'sideface' + sideIndex;
      }

      if (hiddenFaceKeys.indexOf(faceKey) === -1 || mesh.customData?.isReplacedPath) {
        filteredMeshes.push(mesh);
      }
    });

    return filteredMeshes;
  }

  toGraphicsDataAsync(): Promise<GraphicsData> {
    const entity = this.entity;
    const host = entity.getHost();
    const materialsMap = this.entity.materialsForFGI;
    const graphicsBase: GraphicsObjectBase = {
      entityId: entity.id,
      type: HSConstants.GraphicsObjectType.Mesh,
      visible: entity.isFlagOff(HSCore.Model.EntityFlagEnum.hidden) || (host && host.isFlagOff(HSCore.Model.EntityFlagEnum.hidden))
    };
    const room = this._getRoom();
    const snappingKeys = entity.snappingFaceKeys;
    const hiddenFaceKeys = entity.hideFaceKeys;
    const snappingPlanes: string[] = [];

    if (hiddenFaceKeys.length > 0) {
      return this._webCADDocument
        .getGraphicsDataAsync({
          isDuringFastComputation: true,
          sortSmoothPaths: false
        })
        .then((meshes) => this._createMeshesFromGraphicsData(meshes, hiddenFaceKeys))
        .then((filteredMeshes) =>
          this._createGraphicsDataFromMeshes(filteredMeshes, materialsMap, graphicsBase, room, snappingKeys, snappingPlanes)
        )
        .catch(() => ({
          meshDefs: [],
          objects: []
        }));
    } else {
      return this._webCADDocument
        .getGraphicsDataAsync({
          isDuringFastComputation: true,
          sortSmoothPaths: false
        })
        .then((meshes) => meshes ?? [])
        .then((meshes) =>
          this._createGraphicsDataFromMeshes(meshes, materialsMap, graphicsBase, room, snappingKeys, snappingPlanes)
        )
        .catch(() => ({
          meshDefs: [],
          objects: []
        }));
    }
  }

  toGraphicsData(): GraphicsData {
    const entity = this.entity;
    const host = entity.getHost();
    const materialsMap = this.entity.materialsForFGI;
    const graphicsBase: GraphicsObjectBase = {
      entityId: entity.id,
      type: HSConstants.GraphicsObjectType.Mesh,
      visible: entity.isFlagOff(HSCore.Model.EntityFlagEnum.hidden) || (host && host.isFlagOff(HSCore.Model.EntityFlagEnum.hidden))
    };
    const room = this._getRoom();
    const snappingKeys = entity.snappingFaceKeys;
    const hiddenFaceKeys = entity.hideFaceKeys;
    const snappingPlanes: string[] = [];
    let meshes: MeshData[] = [];

    if (hiddenFaceKeys.length > 0) {
      const rawMeshes = this._webCADDocument.getGraphicsData({
        isDuringFastComputation: true,
        sortSmoothPaths: false
      });
      meshes = this._createMeshesFromGraphicsData(rawMeshes, hiddenFaceKeys);
    } else {
      meshes = this._webCADDocument.getGraphicsData({
        isDuringFastComputation: true,
        sortSmoothPaths: false
      });
    }

    const graphicsData = this._createGraphicsDataFromMeshes(
      meshes,
      materialsMap,
      graphicsBase,
      room,
      snappingKeys,
      snappingPlanes
    );

    this._webCADDocument.setSnappingPlanes(snappingPlanes);
    return graphicsData;
  }

  private _getIndicesFromOriginalPoints(vertices: THREE.Vector3[]): number[] {
    const findIndex = (vertex: THREE.Vector3, context: ExtrudedBody): number => {
      let index = -1;
      for (let i = 0; i < context.originalPoints.length; ++i) {
        if (
          GeLib.VectorUtils.isPointEqual(
            context.originalPoints[i],
            vertex,
            HSCore.Util.Math.defaultTolerance
          )
        ) {
          index = i;
          break;
        }
      }
      return index;
    };

    const indices: number[] = [];
    for (let i = 0; i < vertices.length; ++i) {
      const index = findIndex(vertices[i], this);
      if (index !== -1) {
        indices.push(index);
      }
    }
    return indices;
  }
}