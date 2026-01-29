import { HSCore } from './HSCore';
import { Utils } from './Utils';
import { ENParamRoofType } from './ENParamRoofType';

interface AddRoofRequestParams {
  meta: unknown;
  layer: unknown;
  loop: unknown;
  roomHeight: number;
  linkWallIds?: string[];
  generatedType: unknown;
  isPreview: boolean;
  updateParams?: unknown;
}

interface RoofMeta {
  userFreeData: {
    parametricMeta: string;
  };
}

interface ParametricMeta {
  roofType: unknown;
}

export class AddRoofRequest extends HSCore.Transaction.Common.StateRequest {
  private _meta: unknown;
  private _layer: unknown;
  private _loop: unknown;
  private _roomHeight: number;
  private _linkWallIds: string[];
  private _generatedType: unknown;
  private _isPreview: boolean;
  private _updateParams?: unknown;
  public roof?: HSCore.Model.NCustomizedParametricRoof;

  constructor(params: AddRoofRequestParams) {
    super();
    
    const {
      meta,
      layer,
      loop,
      roomHeight,
      linkWallIds = [],
      generatedType,
      isPreview,
      updateParams
    } = params;

    this._meta = meta;
    this._layer = layer;
    this._loop = this._tryFixAddLoop(loop, meta as RoofMeta);
    this._roomHeight = roomHeight;
    this._linkWallIds = linkWallIds;
    this._generatedType = generatedType;
    this._isPreview = isPreview;
    this._updateParams = updateParams;
  }

  private _tryFixAddLoop(loop: unknown, meta: RoofMeta): unknown {
    let sortedLoop = loop;
    
    try {
      const parametricMeta: ParametricMeta = JSON.parse(meta.userFreeData.parametricMeta);
      const roofType = parametricMeta.roofType;
      sortedLoop = Utils.sortLoopByType(loop, roofType);
    } catch (error) {
      console?.error(error);
    }
    
    return sortedLoop;
  }

  public onCommit(): HSCore.Model.NCustomizedParametricRoof {
    const content = this._createContent();
    return content;
  }

  private _createContent(): HSCore.Model.NCustomizedParametricRoof {
    const roof = new HSCore.Model.NCustomizedParametricRoof();
    
    roof.initByMeta(this._meta, undefined, undefined, undefined, {
      roomHeight: this._roomHeight,
      linkWallIds: this._linkWallIds
    });
    
    roof.previewParams = this._isPreview ? {} : undefined;
    roof.initRoof(this._loop);
    roof.generatedType = this._generatedType;

    const layer = this._layer;
    
    HSCore.Util.Content.addContent({
      content: roof,
      host: null,
      parent: layer
    });

    if (this._updateParams) {
      roof.setParamsToRoof(this._updateParams);
    }

    this.roof = roof;

    if (roof.parameters.roofType !== ENParamRoofType.Plane) {
      (this._layer as any).roomBuilder.build();
    }

    return roof;
  }

  public canTransactField(): boolean {
    return true;
  }
}