interface FaceMaterialData {
  material: any;
  name: string;
  sketchComId: string;
  tag: string;
}

interface PartFaceIds {
  top: string[];
  bottom: string[];
  side: string[];
}

interface MaterialUpdateParams {
  scaleX?: number;
  scaleY?: number;
  resetScale?: boolean;
  resetPosition?: boolean;
  reset?: boolean;
  rotation?: number;
  offsetX?: number;
  offsetY?: number;
  tileSize_x?: number;
  tileSize_y?: number;
}

interface GroupFacesStyleParams {
  faceIds: string[];
  groupName: string;
  showRotationBtn: boolean;
  showEditBtn: boolean;
  onReplaceClick: () => void;
  materialRTSParam: {
    lockTextureScale: boolean;
    onScaleXChanged: (event: { detail: { value: number } }) => void;
    onScaleYChanged: (event: { detail: { value: number } }) => void;
    onLockClick: () => void;
    onOffsetXChange: (event: { detail: { value: number } }) => void;
    onOffsetYChange: (event: { detail: { value: number } }) => void;
    onRotationChange: (rotation: number) => void;
    onResetPosition: () => void;
    onResetScale: () => void;
    onReset: () => void;
  };
  onReset: () => void;
}

interface EntityMultiFaceMaterialParams {
  entity: any;
  getEntityFaceMaterial: (entity: any, faceId: string) => any;
  groupFacesStyleParams: GroupFacesStyleParams[];
}

export class RoofFacesPropertyBarHandler {
  public lockTextureScale: boolean;
  public hasFaceMaterial: boolean;
  private _mixPaintPluginHelper: any;
  private _pluginHandler: any;
  private _faceMaterialMap: Map<string, any>;
  private _defaultMaterialMap: Map<string, FaceMaterialData>;
  private _roofId?: string;

  constructor() {
    this.lockTextureScale = false;
    this.hasFaceMaterial = false;
    this._faceMaterialMap = new Map();
    this._defaultMaterialMap = new Map();
    this._mixPaintPluginHelper = HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper;
  }

  get pluginHandler(): any {
    if (!this._pluginHandler) {
      const plugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.ParametricRoof);
      this._pluginHandler = plugin.handler;
    }
    return this._pluginHandler;
  }

  public clearData(): void {
    this._roofId = "";
    this._faceMaterialMap.clear();
    this._defaultMaterialMap.clear();
  }

  public getStylePropertyBarItems(entity: any): any {
    if (this._roofId !== entity.id) {
      this._roofId = entity.id;
      this._faceMaterialMap.clear();
      this._defaultMaterialMap.clear();

      entity.faceMaterials.forEach((material: any, key: string) => {
        this._faceMaterialMap.set(key, material.clone());
      });

      entity.defaultmaterialmap.forEach((materialData: any, key: string) => {
        const clonedData: FaceMaterialData = {
          material: materialData.material.clone(),
          name: materialData.name,
          sketchComId: materialData.sketchComId,
          tag: materialData.tag
        };
        this._defaultMaterialMap.set(key, clonedData);
      });
    }

    const partFaceIds: PartFaceIds = entity.getPartFaceIds();
    const groupFacesStyleParams: GroupFacesStyleParams[] = [];

    if (partFaceIds.top.length > 0) {
      groupFacesStyleParams.push(
        this._getFacesStylePropertyProps(entity, partFaceIds.top, ResourceManager.getString("material_topface"))
      );
    }

    if (partFaceIds.bottom.length > 0) {
      groupFacesStyleParams.push(
        this._getFacesStylePropertyProps(entity, partFaceIds.bottom, ResourceManager.getString("material_bottomface"))
      );
    }

    if (partFaceIds.side.length > 0) {
      groupFacesStyleParams.push(
        this._getFacesStylePropertyProps(entity, partFaceIds.side, ResourceManager.getString("material_sideface"))
      );
    }

    const params: EntityMultiFaceMaterialParams = {
      entity,
      getEntityFaceMaterial: (HSCore.Util.PaintMaterial as any).getEntityFaceMaterial,
      groupFacesStyleParams
    };

    return this._mixPaintPluginHelper.getEntityMultiFaceMaterialPropertyBarItems(params);
  }

  private _getFacesStylePropertyProps(entity: any, faceIds: string[], groupName: string): GroupFacesStyleParams {
    if (faceIds.length === 0) {
      return null as any;
    }

    const mixPaintFaceIds: string[] = [];
    const normalFaceIds: string[] = [];

    faceIds.forEach((faceId: string) => {
      const faceMaterial = (HSCore.Util.PaintMaterial as any).getEntityFaceMaterial(entity, faceId);
      if (HSCore.Util.PaintMaterial.isMixPaintMaterial(faceMaterial)) {
        mixPaintFaceIds.push(faceId);
      } else {
        normalFaceIds.push(faceId);
      }
    });

    const handler = this;
    const app = HSApp.App.getApp();
    const transManager = app.transManager;

    const applyMaterialUpdate = (params: MaterialUpdateParams): void => {
      const requests: any[] = [];
      const session = transManager.startSession();

      if (mixPaintFaceIds.length > 0) {
        const mixRequest = transManager.createRequest(
          HSFPConstants.RequestType.EditNCustomizedFacesMaterialRTS,
          [entity, mixPaintFaceIds, params]
        );
        requests.push(mixRequest);
      }

      if (normalFaceIds.length > 0) {
        let updateData: any = params;
        const currentMaterial = (HSCore.Util.PaintMaterial as any).getEntityFaceMaterial(entity, normalFaceIds[0]);

        if (params.scaleX !== undefined || params.scaleY !== undefined) {
          const materialScale = new HSPaveSDK.Material().setFrom({
            scaleX: currentMaterial.tileSize_x / currentMaterial.initTileSize_x,
            scaleY: currentMaterial.tileSize_y / currentMaterial.initTileSize_y
          });

          if (params.scaleX !== undefined) {
            HSPaveSDK.MaterialApi.editScale(materialScale, {
              lockRatio: handler.lockTextureScale,
              scaleX: params.scaleX
            });
          } else {
            HSPaveSDK.MaterialApi.editScale(materialScale, {
              lockRatio: handler.lockTextureScale,
              scaleY: params.scaleY
            });
          }

          updateData = {
            tileSize_x: currentMaterial.initTileSize_x * materialScale.scaleX,
            tileSize_y: currentMaterial.initTileSize_y * materialScale.scaleY
          };
        }

        if (params.resetScale) {
          updateData = {
            tileSize_x: currentMaterial.initTileSize_x,
            tileSize_y: currentMaterial.initTileSize_y
          };
        }

        if (params.resetPosition) {
          updateData = {
            rotation: 0,
            offsetX: 0,
            offsetY: 0
          };
        }

        if (params.reset) {
          updateData = {
            rotation: 0,
            offsetX: 0,
            offsetY: 0,
            tileSize_x: currentMaterial.initTileSize_x,
            tileSize_y: currentMaterial.initTileSize_y
          };
        }

        const materialUpdateData = handler._mixPaintPluginHelper.getEntityMaterialUpdateData(
          entity,
          normalFaceIds,
          updateData
        );
        const normalRequest = transManager.createRequest(
          HSFPConstants.RequestType.ApplyNCustomizedModelMaterial,
          [entity, materialUpdateData]
        );
        requests.push(normalRequest);
      }

      const compositeRequest = transManager.createRequest(HSConstants.RequestType.Composite, [requests]);
      transManager.commit(compositeRequest);
      session.commit();
      app.signalPropertyBarRefresh.dispatch();
    };

    return {
      faceIds,
      groupName,
      showRotationBtn: true,
      showEditBtn: true,
      onReplaceClick: () => {
        handler.pluginHandler.openReplacePanel(faceIds, entity);
      },
      materialRTSParam: {
        lockTextureScale: handler.lockTextureScale,
        onScaleXChanged: (event: { detail: { value: number } }) => {
          applyMaterialUpdate({ scaleX: event.detail.value });
        },
        onScaleYChanged: (event: { detail: { value: number } }) => {
          applyMaterialUpdate({ scaleY: event.detail.value });
        },
        onLockClick: () => {
          handler.lockTextureScale = !handler.lockTextureScale;
        },
        onOffsetXChange: (event: { detail: { value: number } }) => {
          applyMaterialUpdate({ offsetX: -event.detail.value });
        },
        onOffsetYChange: (event: { detail: { value: number } }) => {
          applyMaterialUpdate({ offsetY: event.detail.value });
        },
        onRotationChange: (rotation: number) => {
          applyMaterialUpdate({ rotation });
        },
        onResetPosition: () => {
          applyMaterialUpdate({ resetPosition: true });
        },
        onResetScale: () => {
          applyMaterialUpdate({ resetScale: true });
        },
        onReset: () => {
          applyMaterialUpdate({ reset: true });
        }
      },
      onReset: () => {
        const resetRequest = transManager.createRequest(
          HSFPConstants.RequestType.ResetRoofFaceMaterial,
          [entity, faceIds, this._defaultMaterialMap, this._faceMaterialMap]
        );
        transManager.commit(resetRequest);
        app.signalPropertyBarRefresh.dispatch();
      }
    };
  }
}