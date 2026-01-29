import { HSCore } from '../path/to/HSCore';
import { HSApp } from '../path/to/HSApp';
import { HSCatalog } from '../path/to/HSCatalog';
import { HSFPConstants } from '../path/to/HSFPConstants';
import * as THREE from 'three';
import * as _ from 'lodash';

type RoofModel = HSCore.Model.NCustomizedFeatureModel | HSCore.Model.NCustomizedModelMolding | any;
type FaceId = string | number;
type MaterialMeta = any;
type MaterialData = HSCore.Material.Material | any;

/**
 * Command for replacing material on parameterized roof faces
 */
export default class ReplaceRoofMaterialCommand extends HSApp.Cmd.Command {
    private readonly _roof: RoofModel;
    private readonly _meta: MaterialMeta;
    private readonly _faceIds: FaceId[];

    constructor(roof: RoofModel, meta: MaterialMeta, faceIds: FaceId[]) {
        super();
        this._roof = roof;
        this._meta = meta;
        this._faceIds = faceIds;
    }

    public onExecute(): void {
        this._replaceMaterial();
    }

    private _replaceMaterial(): void {
        const app = HSApp.App.getApp();

        if (this._faceIds.every(faceId => 
            this._roof.isFaceSupportPaintMaterialByMeshKey(faceId) || 
            this._roof.isFaceSupportPaintMaterial(faceId)
        )) {
            HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper
                .getPatternDataAsync(this._roof, this._faceIds, this._meta)
                .then(patternDataMap => {
                    const materialMap = new Map<FaceId, any>();

                    patternDataMap.forEach((data, faceId) => {
                        if (data instanceof HSCore.Material.Material) {
                            const mixpaint = data.mixpaint;
                            
                            if (data.rotation) {
                                const mixPave = mixpaint.mixPave;
                                const pavingOption = mixPave?.getUniqueRegion()?.pattern?.pavingOption;
                                
                                if (pavingOption) {
                                    pavingOption.rotation = -data.rotation;
                                }
                            }
                            
                            materialMap.set(faceId, mixpaint);
                        } else {
                            materialMap.set(faceId, data);
                        }
                    });

                    let request: any;

                    if (this._roof instanceof HSCore.Model.NCustomizedFeatureModel) {
                        const session = app.transManager.startSession();
                        request = app.transManager.createRequest(
                            HSFPConstants.RequestType.ApplyNCustomizedModelMaterial,
                            [this._roof, materialMap]
                        );
                        app.transManager.commit(request);
                        session.commit();
                    } else {
                        request = HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper
                            .getCustomizedModelRequest(this._roof, patternDataMap);
                        app.transManager.commit(request);
                    }

                    this._postReplace();
                })
                .catch(() => {
                    this._postReplace(true);
                });
        } else {
            const clonedMeta = _.cloneDeep(this._meta);
            const materialDataObject = HSCore.Material.Util.getMaterialDataObjectFromCatalogMeta(clonedMeta);
            const materialMap = new Map<FaceId, any>();

            this._faceIds.forEach(faceId => {
                const clonedMaterial = materialDataObject.clone();

                if (this._meta.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Wallwrap)) {
                    const facePaths = this._roof.getFacePaths(faceId);
                    const projectionPlane = this._roof.getFaceProjectionPlane(faceId);

                    if (projectionPlane && facePaths && facePaths.length) {
                        const projectionMatrix = HSCore.Util.Math.getPlaneProjectionMatrix(
                            projectionPlane,
                            projectionPlane.projectPoint(new THREE.Vector3())
                        );

                        const projectedPoints = facePaths[0].map(point =>
                            new THREE.Vector3(point.x, point.y, point.z).applyMatrix4(projectionMatrix)
                        );

                        const bounds = HSCore.Util.Math.getBounds(projectedPoints);
                        const [, , width, height] = bounds;

                        clonedMaterial.tileSize_x = width;
                        clonedMaterial.tileSize_y = height;
                    }
                }

                materialMap.set(faceId, clonedMaterial);
            });

            if (this._roof instanceof HSCore.Model.NCustomizedModelMolding) {
                const firstMaterial = materialMap.values().next()?.value || {};
                const request = app.transManager.createRequest(
                    HSFPConstants.RequestType.ApplyNCustomizedModelMoldingMaterial,
                    [[this._roof], firstMaterial]
                );
                app.transManager.commit(request);
                this._postReplace();
                return;
            }

            if (this._roof instanceof HSCore.Model.NCustomizedFeatureModel) {
                const request = app.transManager.createRequest(
                    HSFPConstants.RequestType.ApplyNCustomizedModelMaterial,
                    [this._roof, materialMap]
                );
                app.transManager.commit(request);
                this._postReplace();
            } else {
                const request = HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper
                    .getCustomizedModelRequest(this._roof, materialMap);
                app.transManager.commit(request);
                this._postReplace();
            }
        }
    }

    private _postReplace(isCancelled: boolean = false): void {
        if (isCancelled) {
            this.mgr?.cancel();
        } else {
            this.mgr?.complete();
        }

        const app = HSApp.App.getApp();
        
        app.pluginManager.getPlugin(HSFPConstants.PluginType.ContextualTools)?.refresh();
        app.pluginManager.getPlugin(HSFPConstants.PluginType.PropertyBar)?.update();
        app.pluginManager.getPlugin(HSFPConstants.PluginType.MaterialImage)?.resetMaterialUrlCache();
    }

    public getDescription(): string {
        return "修改参数化屋顶材质";
    }

    public getCategory(): string {
        return HSFPConstants.LogGroupTypes.HardOperation;
    }
}