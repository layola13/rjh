import { PMolding } from './PMolding';
import { PAssembly } from './PAssembly';
import { CabinetBase } from './CabinetBase';
import { EntityEventType } from './EntityEventType';
import { RoomUtil } from './RoomUtil';
import { Util } from './Util';

interface EntityEventData {
  data: {
    type: EntityEventType;
  };
}

interface GraphicsObject {
  entityId: string;
  type: string;
  visible: boolean;
  position: Float32Array;
  rotation: Float32Array;
  scale: Float32Array;
  customAttrs: {
    roomType: string;
    roomArea: number;
    type: string;
    lightBandIndex?: number;
  };
  graphicsPath?: string;
  mesh?: string;
  material?: MaterialObject;
}

interface MeshDef {
  meshKey: string;
  vertexPositions: number[];
  customData?: {
    faceMaterialId?: string;
    uvCenter?: { x: number; y: number };
  };
  sketchModelData?: {
    type: string;
  };
}

interface GraphicsData {
  meshDefs: MeshDef[];
  objects: GraphicsObject[];
}

interface MaterialObject {
  diffuseMapUvTransform?: THREE.Matrix3;
  normalMapUvTransform?: THREE.Matrix3;
  [key: string]: unknown;
}

interface Material {
  textureRotation?: number;
  tileSize_x?: number;
  tileSize_y?: number;
  offsetX?: number;
  offsetY?: number;
  flipX?: boolean;
  flipY?: boolean;
  rotation?: number;
}

interface Entity {
  ID: string;
  parents?: Record<string, Parent>;
  material: Material;
  XSize?: number;
  YSize?: number;
  contentType?: ContentType;
  localId?: string;
  isFlagOn(flag: number): boolean;
  getUniqueParent(): Entity | null;
}

interface Parent {
  flip?: boolean;
}

interface Room {
  ID: string;
  roomType?: string;
}

interface ContentType {
  isTypeOf(type: number): boolean;
}

export class PModel extends CabinetBase {
  constructor(entity: Entity, webCadDocument: unknown, options: unknown) {
    super(entity, webCadDocument, options);
    this.signalHook.listen(entity.signalMaterialChanged, this._onMaterialDirty);
    this.signalHook.listen(entity.signalPositionChanged, this._onPositionDirty);
    this.signalHook.listen(entity.signalGeometryChanged, this._onGeometryDirty);
  }

  onUpdate(): void {}

  private _onMaterialDirty(): void {
    this._entityDirtied({
      data: {
        type: EntityEventType.Material
      }
    });
  }

  private _onPositionDirty(): void {
    this._entityDirtied({
      data: {
        type: EntityEventType.Position
      }
    });
  }

  private _onGeometryDirty(): void {
    this._entityDirtied({
      data: {
        type: EntityEventType.Geometry
      }
    });
  }

  toGraphicsData(): GraphicsData {
    if (!this._webCadDocument) {
      return {
        meshDefs: [],
        objects: []
      };
    }

    const entity = this.entity;
    if (
      entity.isFlagOn(HSCore.Model.EntityFlagEnum.hidden) ||
      entity.isFlagOn(HSCore.Model.EntityFlagEnum.removed)
    ) {
      return {
        objects: [],
        meshDefs: []
      };
    }

    const transformMatrix = HSCore.Util.Matrix3DHandler.getMatrix4(entity);
    const position = new THREE.Vector3();
    const rotation = new THREE.Quaternion();
    const scale = new THREE.Vector3(1, 1, 1);
    transformMatrix.decompose(position, rotation, scale);

    const parent = this.entity.parents
      ? this.entity.parents[Object.keys(this.entity.parents)[0]]
      : undefined;

    const hostRoom = this.getHostRoom(entity);

    const baseGraphicsObject: GraphicsObject = {
      entityId: entity.ID,
      type: HSConstants.GraphicsObjectType.Mesh,
      visible: true,
      position: new Float32Array([position.x, position.y, position.z]),
      rotation: new Float32Array([rotation.x, rotation.y, rotation.z, rotation.w]),
      scale: new Float32Array([parent?.flip ? -1 : 1, 1, 1]),
      customAttrs: {
        roomType: hostRoom ? `${hostRoom.roomType ?? 'none'}-${hostRoom.ID}` : 'none',
        roomArea: hostRoom ? RoomUtil.getArea(hostRoom) : 0,
        type: 'Cabinet'
      }
    };

    const snappingMeshKeys: string[] = [];
    const snappingFaceKeys = this.snappingFaceKeys;
    const originalPaths = this.originalPaths;

    const graphicsData = this._webCadDocument.getGraphicsData().reduce(
      (accumulator: GraphicsData, meshDef: MeshDef): GraphicsData => {
        const uniqueParent = entity.getUniqueParent();
        const isMoldingInNonCountertopAssembly =
          entity instanceof PMolding &&
          uniqueParent &&
          uniqueParent instanceof PAssembly &&
          !uniqueParent.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Countertop);

        let materialObject: MaterialObject;
        let material = entity.material;
        let diffuseUvTransform = new THREE.Matrix3();
        let normalUvTransform = new THREE.Matrix3();

        if (isMoldingInNonCountertopAssembly) {
          material = Util.dealMoldingMaterial(
            material,
            entity,
            entity.XSize,
            entity.YSize
          );
          accumulator.meshDefs.push(Util.getFgiMeshDef(meshDef));

          const textureRotationRad = THREE.Math.degToRad(material.textureRotation ?? 0);
          const originalTileSizeX = entity.material.tileSize_x ?? 1;
          const originalTileSizeY = entity.material.tileSize_y ?? 1;
          const newTileSizeX = material.tileSize_x ?? 1;
          const newTileSizeY = material.tileSize_y ?? 1;

          diffuseUvTransform.setUvTransform(
            0,
            0,
            1 / originalTileSizeX,
            1 / originalTileSizeY,
            textureRotationRad,
            0,
            0
          );
          normalUvTransform.setUvTransform(0, 0, 1 / newTileSizeX, 1 / newTileSizeY, 0, 0, 0);
        } else {
          const meshDefData = Util.getFgiMeshDef(meshDef);
          accumulator.meshDefs.push(meshDefData);

          const offsetX = material.offsetX ?? 0;
          const offsetY = material.offsetY ?? 0;
          const offsetMatrix = new THREE.Matrix3().translate(offsetX, offsetY);

          const flipXScale = material.flipX ? -1 : 1;
          const flipYScale = material.flipY ? -1 : 1;
          const scaleX = flipXScale / (material.tileSize_x ?? 1);
          const scaleY = flipYScale / (material.tileSize_y ?? 1);
          const scaleMatrix = new THREE.Matrix3().scale(scaleX, scaleY);

          const rotationRad = THREE.Math.degToRad(material.rotation ?? 0);
          const uvCenter = meshDef.customData?.uvCenter ?? { x: 0, y: 0 };

          const translateToOrigin = new THREE.Matrix3().translate(-uvCenter.x, -uvCenter.y);
          const rotationMatrix = new THREE.Matrix3().rotate(rotationRad);
          const translateBack = new THREE.Matrix3().translate(uvCenter.x, uvCenter.y);

          const rotateAroundCenter = new THREE.Matrix3().multiplyMatrices(
            rotationMatrix,
            translateToOrigin
          );
          const finalRotation = new THREE.Matrix3().multiplyMatrices(
            rotateAroundCenter,
            translateBack
          );
          const scaleAndRotate = new THREE.Matrix3().multiplyMatrices(
            scaleMatrix,
            finalRotation
          );

          diffuseUvTransform = new THREE.Matrix3().multiplyMatrices(offsetMatrix, scaleAndRotate);
          normalUvTransform = new THREE.Matrix3();
        }

        materialObject = Util.getMaterialObject(material);

        const isProfileMaterial =
          meshDef.customData?.faceMaterialId &&
          meshDef.customData.faceMaterialId.indexOf('/profile') !== -1;

        materialObject = Util.setGraphicMaterialParam(
          materialObject,
          material,
          entity,
          isProfileMaterial,
          isMoldingInNonCountertopAssembly
        );

        materialObject.diffuseMapUvTransform = diffuseUvTransform;
        materialObject.normalMapUvTransform = isProfileMaterial
          ? normalUvTransform
          : new THREE.Matrix3();

        accumulator.objects.push({
          ...baseGraphicsObject,
          graphicsPath: `${baseGraphicsObject.entityId}/${meshDef.meshKey}`,
          mesh: meshDef.meshKey,
          material: materialObject
        });

        if (
          entity.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.LightMolding) &&
          entity.localId === 'lightstrip'
        ) {
          accumulator.objects.forEach(obj => {
            obj.customAttrs.type = 'Cabinet/LightBand';
            obj.customAttrs.lightBandIndex = 0;
          });
        }

        if (snappingFaceKeys && snappingFaceKeys.length > 0) {
          const vertices: THREE.Vector3[] = [];
          for (let i = 0; i < meshDef.vertexPositions.length - 2; ) {
            vertices.push(
              new THREE.Vector3(
                meshDef.vertexPositions[i],
                meshDef.vertexPositions[i + 1],
                meshDef.vertexPositions[i + 2]
              )
            );
            i += 3;
          }

          const matchingIndices = this.findMatchingVertexIndices(vertices, originalPaths);

          let faceType = 'originalface';
          if (matchingIndices.length === 0) {
            faceType = 'extrudedface';
          } else if (matchingIndices.length === 2) {
            const indexDiff = Math.abs(matchingIndices[0] - matchingIndices[1]);
            const faceIndex =
              indexDiff === 1
                ? Math.min(matchingIndices[0], matchingIndices[1])
                : Math.max(matchingIndices[0], matchingIndices[1]);
            faceType = `sideface${faceIndex}`;
          }

          if (
            snappingFaceKeys.indexOf(faceType) !== -1 &&
            meshDef.sketchModelData?.type === 'FACE'
          ) {
            snappingMeshKeys.push(meshDef.meshKey);
          }
        }

        return accumulator;
      },
      { meshDefs: [], objects: [] }
    );

    return graphicsData;
  }

  private findMatchingVertexIndices(
    vertices: THREE.Vector3[],
    paths: THREE.Vector3[][]
  ): number[] {
    const findIndexInPaths = (vertex: THREE.Vector3): number => {
      let foundIndex = -1;
      paths.forEach(path => {
        for (let i = 0; i < path.length; ++i) {
          if (
            GeLib.VectorUtils.isPointEqual(
              path[i],
              vertex,
              HSCore.Util.Math.defaultTolerance
            )
          ) {
            foundIndex = i;
            break;
          }
        }
      });
      return foundIndex;
    };

    const matchingIndices: number[] = [];
    for (let i = 0; i < vertices.length; ++i) {
      const index = findIndexInPaths(vertices[i]);
      if (index !== -1) {
        matchingIndices.push(index);
      }
    }

    return matchingIndices;
  }
}