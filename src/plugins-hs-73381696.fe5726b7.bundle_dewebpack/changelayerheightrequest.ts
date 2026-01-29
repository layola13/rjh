import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

export class ChangeLayerHeightRequest extends HSApp.Request.LayerStructureEditRequest {
    private readonly _layer: HSCore.Model.Layer;
    private readonly _oldHeight: number;
    private readonly _height: number;

    constructor(layer: HSCore.Model.Layer, height: number) {
        super(layer);
        this._layer = layer;
        this._oldHeight = this._layer.height;
        this._height = height;
    }

    doRequest(): void {
        this._layer.height = this._height;
        this.changeCustomizedModelHeight();
        this.changeNCustomizedBeamPosition();
        this.changeNCustomizedStructurePosition();
        super.doRequest([]);
    }

    private changeCustomizedModelHeight(): void {
        this._layer.forEachContent((content: HSCore.Model.BaseModel) => {
            if (
                content instanceof HSCore.Model.CustomizedFeatureModel ||
                content instanceof HSCore.Model.NCustomizedCeilingModel ||
                content.getHost() instanceof HSCore.Model.Ceiling
            ) {
                content.z += this._height - this._oldHeight;
            }
        });
    }

    private changeNCustomizedBeamPosition(): void {
        this._layer.forEachBeam((beam: HSCore.Model.Beam) => {
            beam.z += this._height - this._oldHeight;
            beam.rebuild();
        });
    }

    private changeNCustomizedStructurePosition(): void {
        this._layer.forEachStructure((structure: HSCore.Model.Structure) => {
            if (structure.isWallPart() && structure.ZScale === 1) {
                structure.syncLayerHeight();
                structure.rebuild();
            }
        });
    }

    getGeometryChangedFaces(): HSCore.Model.Face[] {
        const faces: HSCore.Model.Face[] = super.getGeometryChangedFaces([]);
        this._layer.forEachContent((content: HSCore.Model.BaseModel) => {
            if (content instanceof HSCore.Model.CustomizedCeilingModel) {
                faces.push(content.getHost());
            }
        });
        return faces;
    }

    getDescription(): string {
        return "修改全局墙高";
    }

    getCategory(): string {
        return HSFPConstants.LogGroupTypes.WallOperation;
    }
}