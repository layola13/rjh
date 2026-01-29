import { BaseObject } from './BaseObject';
import { Util } from './Util';
import { TransUtil } from './TransUtil';

export class CustomizedPMInstanceModel extends BaseObject {
  private _index: number;

  constructor(
    entity: HSCore.Model.Entity,
    scene: unknown,
    options: unknown
  ) {
    super(entity, scene, options);
    this._index = 0;
    
    this.signalHook.listen(entity.signalMaterialChanged, () => {
      this.geometryDirty = true;
    });
  }

  toGraphicsData(): GraphicsData {
    const graphicsData: GraphicsData = {
      objects: [],
      meshDefs: [],
      edgeInfos: []
    };

    if (!this.entity.isDiyDocOpened()) {
      return graphicsData;
    }

    if (
      this.entity.isFlagOn(HSCore.Model.EntityFlagEnum.hidden) ||
      this.entity.isFlagOn(HSCore.Model.EntityFlagEnum.removed)
    ) {
      return graphicsData;
    }

    const modelingDocId = this.entity.modelingDocId;
    const instanceIds = this.entity.instanceId ? [this.entity.instanceId] : undefined;
    const graphicsDataArray = DiySdk.DmDiyApi.getGraphicsData(modelingDocId, instanceIds);

    for (let i = 0; i < graphicsDataArray.length; ++i) {
      const meshInfo = graphicsDataArray[i].meshInfo;
      const materialInfo = graphicsDataArray[i].matInfo;

      for (let j = 0; j < meshInfo.length; j++) {
        const meshData = meshInfo[j];
        const materialData = materialInfo?.[j];
        const modelMesh = this._createModelMesh(meshData, materialData);

        if (modelMesh) {
          graphicsData.meshDefs.push(modelMesh.meshDef);
          graphicsData.objects.push(modelMesh.object);
        }
      }

      const edgeInfo = graphicsDataArray[i].edgeInfo;
      graphicsData.edgeInfos.push(edgeInfo);
    }

    return graphicsData;
  }

  onCleanup(): void {
    super.onCleanup();
  }

  onUpdatePosition(): void {
    const entity = this.entity;
    this._matrixLocal = entity.getTransformMatrix();
    TransUtil.convertMatrixUnit(this._matrixLocal, undefined);
  }

  private _createModelMesh(
    meshData: MeshData,
    materialData?: MaterialData
  ): ModelMesh | undefined {
    let material: MaterialObject;

    if (materialData) {
      material = Util.getMaterialObject(materialData);
      if (
        !materialData.texture &&
        !materialData.normalTexture &&
        !materialData.textureURI
      ) {
        material.colorMode = HSCore.Material.ColorModeEnum.color;
      }
    } else {
      material = Util.getMaterialObject(this.entity.getDefaultMaterialData());
    }

    const graphicsObject: GraphicsObject = {
      type: HSConstants.GraphicsObjectType.Mesh,
      graphicsPath: `${this.entity.ID}/${this._index}`,
      mesh: `${this.entity.ID}/${this._index}`,
      material: material,
      entityId: this.entity.ID,
      customAttrs: {}
    };

    const meshDef: MeshDef = {} as MeshDef;
    meshDef.vertexCount = meshData.indices.length;

    if (meshDef.vertexCount < 3) {
      return undefined;
    }

    meshDef.indexCount = meshData.indices.length;
    meshDef.faceIndices = new Uint32Array(meshData.indices);
    meshDef.vertexNormals = new Float32Array(meshData.normals);
    meshDef.vertexPositions = new Float32Array(meshData.verts);
    meshDef.vertexUVs = new Float32Array(meshData.uvs);
    meshDef.meshKey = graphicsObject.mesh;
    meshDef.faceTag = meshData.id;
    meshDef.shapeid = meshData.eleId;

    graphicsObject.material.diffuseMapUvTransform = new THREE.Matrix3();
    graphicsObject.material.normalMapUvTransform = new THREE.Matrix3();

    if (graphicsObject.material.normalTexture && !meshData.isMoldingFace) {
      graphicsObject.material.normalTexture = '';
    }

    ++this._index;

    if (meshData.isLightBandFace) {
      graphicsObject.material.color = HSConstants.Constants.DEFAULT_CUSTOMIZEDMODEL_MATERIAL.color;
      graphicsObject.customAttrs.type = 'LightBand';
      graphicsObject.customAttrs.lightBandIndex = meshData.eleId;
    }

    return {
      meshDef,
      object: graphicsObject
    };
  }
}

interface GraphicsData {
  objects: GraphicsObject[];
  meshDefs: MeshDef[];
  edgeInfos: unknown[];
}

interface MeshData {
  indices: number[];
  normals: number[];
  verts: number[];
  uvs: number[];
  id: string;
  eleId: number;
  isMoldingFace?: boolean;
  isLightBandFace?: boolean;
}

interface MaterialData {
  texture?: string;
  normalTexture?: string;
  textureURI?: string;
}

interface MaterialObject {
  colorMode?: HSCore.Material.ColorModeEnum;
  diffuseMapUvTransform?: THREE.Matrix3;
  normalMapUvTransform?: THREE.Matrix3;
  normalTexture?: string;
  color?: number;
}

interface GraphicsObject {
  type: HSConstants.GraphicsObjectType;
  graphicsPath: string;
  mesh: string;
  material: MaterialObject;
  entityId: string;
  customAttrs: {
    type?: string;
    lightBandIndex?: number;
  };
}

interface MeshDef {
  vertexCount: number;
  indexCount: number;
  faceIndices: Uint32Array;
  vertexNormals: Float32Array;
  vertexPositions: Float32Array;
  vertexUVs: Float32Array;
  meshKey: string;
  faceTag: string;
  shapeid: number;
}

interface ModelMesh {
  meshDef: MeshDef;
  object: GraphicsObject;
}