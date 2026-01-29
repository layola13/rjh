import { ParametricModel } from './ParametricModel';
import { Util as ProfileUtil } from './ProfileUtil';
import { WebCadDocument } from './WebCadDocument';
import { Util as MaterialUtil } from './MaterialUtil';
import * as THREE from 'three';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface ProfileData {
  profile: string;
  profileSizeX: number;
  profileSizeY: number;
  normalTexture?: string;
}

interface MaterialData {
  tileSize_x?: number;
  tileSize_y?: number;
  offsetX?: number;
  offsetY?: number;
  rotation?: number;
  normalTileSize_x?: number;
  normalTileSize_y?: number;
  toJson(): MaterialJsonData;
}

interface MaterialJsonData {
  tileSize_x?: number;
  tileSize_y?: number;
  offsetX?: number;
  offsetY?: number;
  rotation?: number;
  normalTileSize_x?: number;
  normalTileSize_y?: number;
}

interface WindowPocketParameters {
  moldingPaths?: Point3D[][];
  moldingPathsWithNeighbours?: unknown[];
  profileData?: ProfileData;
  insidePaths?: Point3D[][];
  outerMoldingSizeX?: number;
  outerMoldingSizeY?: number;
  insideThickness?: number;
  materialData?: MaterialData;
}

interface MeshData {
  meshKey: string;
  customData?: {
    isPlaceHolder?: boolean;
    faceMaterialId?: string;
  };
}

interface GraphicsDataResult {
  meshDefs: unknown[];
  objects: unknown[];
}

interface CustomAttributes {
  seekIds?: string[];
  roomType: string;
  roomArea: number;
  type: string;
}

interface EntityInfo {
  entityId: string;
  type: string;
  visible: boolean;
}

interface MoldingData {
  data: {
    profile: string;
    profileSizeX: number;
    profileSizeY: number;
    yRayAsNormalDirection: boolean;
  };
}

interface UvTransformResult {
  diffuseMapUvTransform: THREE.Matrix3;
  normalMapUvTransform: THREE.Matrix3;
}

export class WindowPocket extends ParametricModel {
  private _moldingWebCadDocument?: WebCadDocument;

  constructor(entity: unknown, param2: unknown, param3: unknown, param4: unknown) {
    super(entity, param2, param3, param4);
  }

  onUpdate(): void {
    super.onUpdate();

    const parameters = this.entity.parameters as WindowPocketParameters;
    const {
      moldingPaths,
      moldingPathsWithNeighbours,
      profileData,
      insidePaths,
      outerMoldingSizeX,
      outerMoldingSizeY
    } = parameters;

    if (moldingPaths && moldingPathsWithNeighbours && profileData) {
      this._moldingWebCadDocument = new WebCadDocument();

      for (let pathIndex = 0; pathIndex < moldingPaths.length; ++pathIndex) {
        const originalPath = moldingPaths[pathIndex].map(
          point => new THREE.Vector3(point.x, point.y, point.z)
        );
        const closedPath = originalPath.slice();

        if (!GeLib.VectorUtils.isPointEqual(closedPath[0], originalPath[closedPath.length - 1])) {
          closedPath.push(closedPath[0]);
        }

        const plane = new THREE.Plane().setFromCoplanarPoints(
          closedPath[2],
          closedPath[1],
          closedPath[0]
        );
        const xRayDirection = new THREE.Vector3().subVectors(closedPath[1], closedPath[0]);
        (plane as any).xRay = xRayDirection;

        const offsetPath = this._webCADDocument.getOffsetPath(
          {
            plane: plane,
            path: closedPath
          },
          0.1
        );

        this._moldingWebCadDocument.addPath({
          xRay: xRayDirection,
          plane: plane,
          paths: [offsetPath, closedPath],
          customData: {
            isPlaceHolder: true
          }
        });

        const profile = profileData.profile;
        let profileSizeX = profileData.profileSizeX;
        let profileSizeY = profileData.profileSizeY;

        if (pathIndex === 1 && outerMoldingSizeX && outerMoldingSizeY) {
          profileSizeX = outerMoldingSizeX;
          profileSizeY = outerMoldingSizeY;
        }

        const moldingConfig: MoldingData = {
          data: {
            profile: profile,
            profileSizeX: profileSizeX,
            profileSizeY: profileSizeY,
            yRayAsNormalDirection: true
          }
        };

        this._moldingWebCadDocument.addMolding(
          HSCore.Util.String.randomGUID(),
          [originalPath],
          [moldingPathsWithNeighbours[pathIndex]],
          moldingConfig,
          0,
          false,
          true
        );
      }
    }

    if (insidePaths) {
      insidePaths.forEach(insidePath => {
        const path3D = insidePath.map(point => new THREE.Vector3(point.x, point.y, point.z));
        const plane = GeLib.PolygonUtils.getPlaneFromPolygon(path3D);

        if (plane) {
          const xRayDirection = (plane as any).xRay;
          const thickness = parameters.insideThickness || 0.005;

          this._webCADDocument.addExtrudedBody(
            {
              paths: [path3D],
              plane: plane,
              xRay: xRayDirection,
              targetNormal: plane.normal,
              planeOption: {
                independent: true
              }
            },
            thickness
          );
        }
      });
    }
  }

  private _constructMeshObject(
    accumulator: GraphicsDataResult,
    meshData: MeshData,
    customAttrs: CustomAttributes,
    entityInfo: EntityInfo,
    renderData: { profileData?: ProfileData; materialData?: MaterialData }
  ): GraphicsDataResult {
    const { profileData, materialData } = renderData;

    if (meshData.customData?.isPlaceHolder) {
      return accumulator;
    }

    if (materialData && profileData) {
      const materialJson = materialData.toJson();

      if (meshData.customData?.faceMaterialId) {
        const parsedProfile = HSCore.Util.ProfileParser.parse(profileData.profile);
        const profileDistance = ProfileUtil.getProfileDistance(
          parsedProfile,
          profileData.profileSizeX,
          profileData.profileSizeY
        );

        materialJson.tileSize_x = materialJson.tileSize_x || 1;
        materialJson.tileSize_y = materialJson.tileSize_y || 1;

        const aspectRatio = materialJson.tileSize_x / materialJson.tileSize_y;
        materialJson.normalTileSize_x = profileDistance * aspectRatio;
        materialJson.normalTileSize_y = profileDistance;
      }

      accumulator.meshDefs.push(MaterialUtil.applyMoldingMaterialToUV(meshData, materialJson));

      const materialObject = MaterialUtil.getMaterialObject(materialJson || {});
      (materialObject as any).moldingMaterialRotation = materialJson.rotation;
      (materialObject as any).rotation = materialJson.rotation;

      const isProfileMaterial =
        meshData.customData?.faceMaterialId &&
        meshData.customData.faceMaterialId.indexOf('/profile') !== -1;

      if (profileData.normalTexture && isProfileMaterial) {
        (materialObject as any).normalTexture = profileData.normalTexture;
        (materialObject as any).seekId = (materialObject as any).seekId;
      }

      const calculateUvTransforms = (material: MaterialJsonData): UvTransformResult => {
        const tileSizeX = material.tileSize_x || 1;
        const tileSizeY = material.tileSize_y || 1;
        const offsetX = material.offsetX ?? 0;
        const offsetY = material.offsetY ?? 0;
        const rotationRad = THREE.Math.degToRad(material.rotation || 0);

        const diffuseTransform = new THREE.Matrix3();
        diffuseTransform.setUvTransform(offsetX, offsetY, 1 / tileSizeX, 1 / tileSizeY, rotationRad, 0, 0);

        const normalTileSizeX = material.normalTileSize_x || 1;
        const normalTileSizeY = material.normalTileSize_y || 1;
        const normalTransform = new THREE.Matrix3();
        normalTransform.setUvTransform(0, 0, 1 / normalTileSizeX, 1 / normalTileSizeY, 0, 0, 0);

        return {
          diffuseMapUvTransform: diffuseTransform,
          normalMapUvTransform: normalTransform
        };
      };

      const { diffuseMapUvTransform, normalMapUvTransform } = calculateUvTransforms(materialJson);

      (materialObject as any).diffuseMapUvTransform = diffuseMapUvTransform;
      (materialObject as any).normalMapUvTransform = normalMapUvTransform;
      (materialObject as any).pocketMaterial = true;

      accumulator.objects.push(
        Object.assign(
          {
            graphicsPath: `${entityInfo.entityId}/${meshData.meshKey}`,
            mesh: meshData.meshKey,
            material: materialObject,
            customAttrs: customAttrs
          },
          entityInfo
        )
      );
    }

    return accumulator;
  }

  toGraphicsDataAsync(): Promise<GraphicsDataResult> {
    const profileData = (this.entity.parameters as WindowPocketParameters).profileData;
    const materialData = (this.entity.parameters as WindowPocketParameters).materialData;

    const customAttrs: CustomAttributes = {
      roomType: 'none',
      roomArea: 0,
      type: 'Pocket'
    };

    const seekIds = MaterialUtil.getSeekIdSortByArea(materialData);
    if (seekIds) {
      customAttrs.seekIds = seekIds;
    }

    const entityInfo: EntityInfo = {
      entityId: this.entity.id,
      type: HSConstants.GraphicsObjectType.Mesh,
      visible: this.entity.isFlagOff(HSCore.Model.EntityFlagEnum.hidden)
    };

    const mainGraphicsPromise = this._webCADDocument.getGraphicsDataAsync().then(meshDataArray => {
      const meshes = meshDataArray || [];
      return meshes.reduce(
        (acc, mesh) =>
          this._constructMeshObject(acc, mesh, customAttrs, entityInfo, { profileData, materialData }),
        { meshDefs: [], objects: [] }
      );
    });

    let moldingGraphicsPromise: Promise<GraphicsDataResult> | undefined;
    if (this._moldingWebCadDocument) {
      moldingGraphicsPromise = this._moldingWebCadDocument.getGraphicsDataAsync().then(meshDataArray => {
        const meshes = meshDataArray || [];
        return meshes.reduce(
          (acc, mesh) =>
            this._constructMeshObject(acc, mesh, customAttrs, entityInfo, { profileData, materialData }),
          { meshDefs: [], objects: [] }
        );
      });
    }

    const allPromises = moldingGraphicsPromise ? [mainGraphicsPromise, moldingGraphicsPromise] : [mainGraphicsPromise];

    return Promise.all(allPromises)
      .then(results => {
        let meshDefs = results?.[0]?.meshDefs ?? [];
        let objects = results?.[0]?.objects ?? [];

        for (let index = 1, length = results?.length ?? 0; index < length; index++) {
          meshDefs = meshDefs.concat(results[index].meshDefs);
          objects = objects.concat(results[index].objects);
        }

        return { meshDefs, objects };
      })
      .catch(() => ({ meshDefs: [], objects: [] }));
  }

  toGraphicsData(): GraphicsDataResult {
    const profileData = (this.entity.parameters as WindowPocketParameters).profileData;
    const materialData = (this.entity.parameters as WindowPocketParameters).materialData;

    const customAttrs: CustomAttributes = {
      roomType: 'none',
      roomArea: 0,
      type: 'Pocket'
    };

    const seekIds = MaterialUtil.getSeekIdSortByArea(materialData);
    if (seekIds) {
      customAttrs.seekIds = seekIds;
    }

    const entityInfo: EntityInfo = {
      entityId: this.entity.id,
      type: HSConstants.GraphicsObjectType.Mesh,
      visible: this.entity.isFlagOff(HSCore.Model.EntityFlagEnum.hidden)
    };

    const result = this._webCADDocument.getGraphicsData().reduce(
      (acc, mesh) =>
        this._constructMeshObject(acc, mesh, customAttrs, entityInfo, { profileData, materialData }),
      { meshDefs: [], objects: [] }
    );

    if (this._moldingWebCadDocument) {
      const moldingResult = this._moldingWebCadDocument.getGraphicsData().reduce(
        (acc, mesh) =>
          this._constructMeshObject(acc, mesh, customAttrs, entityInfo, { profileData, materialData }),
        { meshDefs: [], objects: [] }
      );

      result.meshDefs = result.meshDefs.concat(moldingResult.meshDefs);
      result.objects = result.objects.concat(moldingResult.objects);
    }

    return result;
  }
}