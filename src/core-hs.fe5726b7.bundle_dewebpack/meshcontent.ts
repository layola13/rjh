import { Box2, Vector2 } from 'three';
import * as THREE from 'three';
import { IMeshContent } from './IMeshContent';
import { CabinetBase } from './CabinetBase';
import { RoomUtil } from './RoomUtil';
import { Util } from './Util';
import { TexturePaveTypeEnum } from './TexturePaveTypeEnum';
import { Logger } from './Logger';

interface MeshData {
  material: { id: string };
  vertices: Float32Array;
  normals: Float32Array;
  uvs: Float32Array;
  faces: number[];
}

interface MaterialData {
  offsetX?: number;
  offsetY?: number;
  flipX?: boolean;
  flipY?: boolean;
  tileSize_x?: number;
  tileSize_y?: number;
  rotation?: number;
}

interface MeshMaterial {
  id: string;
  paveType?: IMeshContent.TexturePaveType;
  transform?: number[];
}

interface GraphicsMaterial {
  texture?: string;
  diffuseMapUvTransform: THREE.Matrix3;
  normalMapUvTransform: THREE.Matrix3;
}

interface MeshDefinition {
  meshKey: string;
  vertexPositions: Float32Array;
  vertexNormals: Float32Array;
  vertexUVs: Float32Array;
  vertexCount: number;
  faceIndices: Uint32Array;
  indexCount: number;
}

interface GraphicsObject {
  entityId: string;
  seekId: string;
  type: string;
  visible: boolean;
  position: Float32Array;
  rotation: Float32Array;
  scale: Float32Array;
  customAttrs: CustomAttributes;
  meshKey?: string;
  material?: GraphicsMaterial;
  mesh?: string;
  graphicsPath: string;
  contentType?: string;
  selected?: boolean;
  bounding?: Float32Array;
  matrixLocal?: THREE.Matrix4;
  model?: string;
  component?: string;
  simulatedContentId?: string;
  pocketMaterial?: unknown;
  parentSeekId?: unknown;
}

interface CustomAttributes {
  roomType: string;
  roomArea?: number;
  type?: string;
  hasDefaultMaterial?: boolean;
  doorType?: string;
  dir?: unknown;
  offset?: unknown;
  isMaterialRep?: boolean;
}

interface GraphicsData {
  objects: GraphicsObject[];
  meshDefs: MeshDefinition[];
}

interface MetaInfo {
  matrix?: ArrayLike<number>;
  originMeta: OriginMeta;
}

interface OriginMeta {
  id: string;
  seekId: string;
  contentType: { getTypeString: () => string };
  XLength: number;
  YLength: number;
  ZLength: number;
  model3d?: string;
  modelTexture?: string;
  extension?: {
    objInfo?: {
      bounding?: BoundingInfo[];
      objectNames?: string[];
    };
  };
  scaleRule?: unknown;
}

interface BoundingInfo {
  min_vertex: { x: number; y: number; z: number };
  max_vertex: { x: number; y: number; z: number };
  obj_name: string;
}

interface ContentMeshOptions {
  bounding: number[];
  meshName?: string;
  isMaterialRep?: boolean;
  index?: number;
  offset?: unknown;
}

interface TransformData {
  pos?: THREE.Vector3;
  qut?: THREE.Quaternion;
  scl?: THREE.Vector3;
}

export class MeshContent extends CabinetBase {
  private _mesh?: MeshData[];

  onUpdate(): void {
    if (this.entity.mesh) {
      this._mesh = this.entity.mesh;
    }
  }

  toGraphicsData(): GraphicsData {
    const graphicsData: GraphicsData = {
      objects: [],
      meshDefs: []
    };

    if (!this._mesh) return graphicsData;

    const entity = this.entity;
    if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.hidden) || 
        entity.isFlagOn(HSCore.Model.EntityFlagEnum.removed)) {
      return graphicsData;
    }

    const matrix = HSCore.Util.Matrix3DHandler.getMatrix4(entity);
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3(1, 1, 1);
    matrix.decompose(position, quaternion, scale);

    const hostRoom = this.getHostRoom(entity);
    let hasDefaultMaterial = false;
    this._mesh.some(mesh => mesh.material.id === "default") && (hasDefaultMaterial = true);

    const baseObject: Partial<GraphicsObject> = {
      entityId: entity.ID,
      type: HSConstants.GraphicsObjectType.Mesh,
      visible: true,
      position: new Float32Array([position.x, position.y, position.z]),
      rotation: new Float32Array([quaternion.x, quaternion.y, quaternion.z, quaternion.w]),
      scale: new Float32Array([1, 1, 1]),
      customAttrs: {
        roomType: hostRoom ? `${hostRoom.roomType || "none"}-${hostRoom.ID}` : "none",
        roomArea: hostRoom ? RoomUtil.getArea(hostRoom) : 0,
        type: "Cabinet",
        hasDefaultMaterial
      }
    };

    this._mesh.forEach(meshData => {
      const materialData = this.entity.getMaterial(meshData.material.id);
      const meshMaterial = meshData.material;
      const material = this._getMaterial(meshData.uvs, materialData, meshMaterial);
      const meshKey = THREE.Math.generateUUID();

      const meshDef: MeshDefinition = {
        meshKey,
        vertexPositions: meshData.vertices,
        vertexNormals: meshData.normals,
        vertexUVs: meshData.uvs,
        vertexCount: meshData.vertices.length / 3,
        faceIndices: new Uint32Array(meshData.faces),
        indexCount: meshData.faces.length
      };

      const meshObject: GraphicsObject = Object.assign({
        seekId: "",
        material,
        mesh: meshKey,
        graphicsPath: `${this.entity.ID}/${meshKey}`
      }, baseObject) as GraphicsObject;

      graphicsData.meshDefs.push(meshDef);
      graphicsData.objects.push(meshObject);
    });

    const modelGraphicData = this._getModelGraphicData();
    Logger.console.log("modelGraphicData", modelGraphicData);

    if (modelGraphicData.objects) {
      graphicsData.objects.push(...modelGraphicData.objects);
    }

    return graphicsData;
  }

  private _getModelGraphicData(): GraphicsData {
    const result: GraphicsData = {
      objects: [],
      meshDefs: []
    };

    if (!this.entity.metaInfo?.length) return result;

    const globalMatrix = HSCore.Util.Matrix3DHandler.getGlobalMatrix4(this.entity);

    this.entity.metaInfo.forEach((metaInfo: MetaInfo, index: number) => {
      if (!metaInfo.matrix) return;

      const localMatrix = new THREE.Matrix4().fromArray(Array.from(metaInfo.matrix)).multiply(globalMatrix);
      const position = new THREE.Vector3();
      const quaternion = new THREE.Quaternion();
      const scale = new THREE.Vector3();
      localMatrix.decompose(position, quaternion, scale);

      const bounding = this._getContentBound(metaInfo);
      const contentMaterialData = this._getContentMaterialData(metaInfo, bounding, index);
      result.objects.push(...contentMaterialData.objects);
    });

    return result;
  }

  private _getContentBound(metaInfo: MetaInfo): number[] {
    const originMeta = metaInfo.originMeta;
    const matrix = new THREE.Matrix4().fromArray(metaInfo.matrix);
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    matrix.decompose(position, quaternion, scale);

    const euler = new THREE.Euler().setFromQuaternion(quaternion);
    const geometry = new THREE.BoxGeometry(originMeta.XLength, originMeta.YLength, originMeta.ZLength);
    geometry.translate(position.x, position.y, position.z);
    geometry.rotateZ(-euler.z);
    geometry.computeBoundingBox();

    const boundingBox = geometry.boundingBox!;
    return [
      boundingBox.min.x,
      boundingBox.min.y,
      boundingBox.min.z,
      boundingBox.max.x,
      boundingBox.max.y,
      boundingBox.max.z
    ];
  }

  private _getContentMaterialList(): unknown[] {
    return [];
  }

  private _getContentMaterialData(metaInfo: MetaInfo, bounding: number[], index: number): GraphicsData {
    const originMeta = metaInfo.originMeta;
    const materialList = this._getContentMaterialList();

    if (materialList?.length > 0 && originMeta?.extension?.objInfo?.bounding) {
      if (!originMeta.extension.objInfo.bounding) {
        const xLength = originMeta.XLength;
        const yLength = originMeta.YLength;
        const zLength = originMeta.ZLength;

        const minVertex = {
          x: -xLength / 2 * 100,
          y: -zLength / 2 * 100,
          z: 0
        };

        const maxVertex = {
          x: xLength / 2 * 100,
          y: zLength / 2 * 100,
          z: 100 * yLength
        };

        const objectName = originMeta.extension.objInfo.objectNames?.length > 0 
          ? originMeta.extension.objInfo.objectNames[0] 
          : "cbnt_body";

        originMeta.extension.objInfo.bounding = [{
          min_vertex: minVertex,
          max_vertex: maxVertex,
          obj_name: objectName
        }];
      }

      const boundingList = originMeta.extension.objInfo.bounding;
      const graphicDataList: GraphicsData[] = [];
      let isMaterialRep = true;

      if (originMeta.scaleRule) {
        isMaterialRep = false;
      }

      boundingList.forEach(boundingInfo => {
        if (boundingInfo.obj_name.includes("maxMinPoint")) return;

        const graphicData = this._setGraphicData(undefined, {
          bounding,
          meshName: boundingInfo.obj_name,
          isMaterialRep,
          index
        }, metaInfo);

        graphicDataList.push(graphicData);
      });

      let allObjects: GraphicsObject[] = [];
      const allMeshDefs: MeshDefinition[] = [];

      graphicDataList.forEach(data => {
        allObjects = allObjects.concat(data.objects);
      });

      return {
        objects: allObjects,
        meshDefs: allMeshDefs
      };
    }

    return this._setGraphicData(undefined, { bounding, index }, metaInfo);
  }

  private _setGraphicData(
    transform: TransformData | undefined, 
    options: ContentMeshOptions, 
    metaInfo: MetaInfo
  ): GraphicsData {
    const basicObject = this._toBasicObject(metaInfo.originMeta);
    const matrix = new THREE.Matrix4().fromArray(metaInfo.matrix);

    if (transform) {
      const position = transform.pos || new THREE.Vector3();
      const quaternion = transform.qut || new THREE.Quaternion();
      const scale = transform.scl || new THREE.Vector3(1, 1, 1);
      matrix.compose(position, quaternion, scale);
    }

    const graphicsPath = options?.index !== undefined 
      ? `${metaInfo.originMeta.id}/model${options.index}` 
      : `${metaInfo.originMeta.id}/model`;

    return {
      objects: [Object.assign(basicObject, {
        graphicsPath: `${this.entity.ID}/${graphicsPath}`,
        type: HSConstants.GraphicsObjectType.Model,
        bounding: new Float32Array(options.bounding),
        matrixLocal: matrix,
        material: this._getContentMaterial(metaInfo, options.meshName),
        model: metaInfo.originMeta.model3d,
        component: options.meshName,
        customAttrs: {
          roomType: "none",
          doorType: "",
          dir: undefined,
          offset: options.offset,
          isMaterialRep: options.isMaterialRep
        },
        simulatedContentId: metaInfo.originMeta.seekId,
        pocketMaterial: undefined,
        parentSeekId: undefined
      })],
      meshDefs: []
    };
  }

  private _getContentMaterial(metaInfo: MetaInfo, meshName?: string): GraphicsMaterial {
    const material: GraphicsMaterial = {
      texture: metaInfo.originMeta.modelTexture,
      diffuseMapUvTransform: new THREE.Matrix3(),
      normalMapUvTransform: new THREE.Matrix3()
    };

    return material;
  }

  private _toBasicObject(originMeta: OriginMeta): Partial<GraphicsObject> {
    return {
      entityId: this.entity.ID,
      seekId: originMeta.seekId,
      contentType: originMeta.contentType.getTypeString(),
      selected: this.entity.isFlagOn(HSCore.Model.EntityFlagEnum.selected),
      visible: this.entity.isContentValid()
    };
  }

  private _getPaveType(paveType: IMeshContent.TexturePaveType): TexturePaveTypeEnum {
    let result = TexturePaveTypeEnum.tile;

    switch (paveType) {
      case IMeshContent.TexturePaveType.Tile:
        break;
      case IMeshContent.TexturePaveType.Stretch:
        result = TexturePaveTypeEnum.stretch;
        break;
      case IMeshContent.TexturePaveType.Mirror:
        result = TexturePaveTypeEnum.mirror;
    }

    return result;
  }

  private _getMaterial(uvs: Float32Array, materialData: MaterialData, meshMaterial: MeshMaterial): GraphicsMaterial {
    let offsetX = materialData.offsetX || 0;
    let offsetY = materialData.offsetY || 0;
    let flipScaleX = materialData.flipX ? -1 : 1;
    let flipScaleY = materialData.flipY ? -1 : 1;
    let tileSizeX = materialData.tileSize_x || 1;
    let tileSizeY = materialData.tileSize_y || 1;

    if (this._getPaveType(meshMaterial.paveType) === TexturePaveTypeEnum.stretch) {
      const uvBoxSize = this._getUVbox(uvs).getSize();
      tileSizeX = uvBoxSize.x;
      tileSizeY = uvBoxSize.y;
    }

    const rotationRadians = THREE.Math.degToRad(materialData.rotation || 0);
    const rotationMatrix = new THREE.Matrix3().rotate(rotationRadians);

    let scaleU = flipScaleX / tileSizeX;
    let scaleV = flipScaleY / tileSizeY;

    if (meshMaterial?.transform) {
      const transform = meshMaterial.transform;
      flipScaleX = flipScaleY = 1;
      scaleU = flipScaleX / transform[2];
      scaleV = flipScaleY / transform[5];
      rotationMatrix.elements[0] = transform[0];
      rotationMatrix.elements[1] = transform[1];
      rotationMatrix.elements[3] = transform[3];
      rotationMatrix.elements[4] = transform[4];
      offsetX = transform[6];
      offsetY = transform[7];
    }

    const scaleMatrix = new THREE.Matrix3().scale(scaleU, scaleV);
    const scaledRotationMatrix = new THREE.Matrix3().multiplyMatrices(scaleMatrix, rotationMatrix);
    const translationMatrix = new THREE.Matrix3().translate(offsetX, offsetY);
    const finalTransform = new THREE.Matrix3().multiplyMatrices(scaledRotationMatrix, translationMatrix);

    let graphicMaterial = Util.getMaterialObject(materialData);
    graphicMaterial = Util.setGraphicMaterialParam(graphicMaterial, materialData, this.entity, false, false);
    graphicMaterial.diffuseMapUvTransform = finalTransform;
    graphicMaterial.normalMapUvTransform = new THREE.Matrix3();

    return graphicMaterial;
  }

  private _getUVbox(uvs: Float32Array): Box2 {
    const boundingBox = new Box2();

    for (let i = 0; i < uvs.length; i += 2) {
      boundingBox.expandByPoint(new Vector2(uvs[i], uvs[i + 1]));
    }

    return boundingBox;
  }
}