import { HSCore } from './HSCore';
import { OpeningUtil } from './OpeningUtil';

interface DepMates {
  [key: string]: unknown;
}

interface MetaInfo {
  depMates: DepMates;
}

interface Position {
  x: number;
  y: number;
}

interface ParametricOpeningSpec {
  host: unknown;
  parent: unknown;
  parametricOpening: unknown;
}

interface Meta {
  clone(): Meta;
  userFreeData?: {
    models?: unknown;
  };
}

export default class ParametricOpeningStateRequest extends HSCore.Transaction.Common.StateRequest {
  private _meta: Meta;
  private _metaInfo: DepMates;
  private _host: unknown;
  private _position?: Position;
  private _rotation?: number;
  private _scale: unknown;
  private _spec?: ParametricOpeningSpec;
  public result?: unknown;

  constructor(
    meta: Meta,
    position: Position | undefined,
    rotation: number | undefined,
    scale: unknown,
    host: unknown,
    _param5: unknown,
    _param6: unknown,
    metaInfo: MetaInfo
  ) {
    super();
    this._meta = meta;
    this._metaInfo = metaInfo.depMates;
    this._host = host;
    this._position = position;
    this._rotation = rotation;
    this._scale = scale;
  }

  onCommit(): unknown {
    const clonedMeta = this._meta.clone();
    if (clonedMeta.userFreeData) {
      delete clonedMeta.userFreeData.models;
    }

    const app = HSApp.App.getApp();
    const floorplan = app.floorplan;

    const parametricOpening = HSCore.Util.Content.isParametricDoor(this._meta)
      ? HSCore.Model.ParametricDoor.create(this._meta)
      : HSCore.Model.ParametricOpening.create(this._meta);

    parametricOpening.buildOpening(clonedMeta, this._metaInfo);

    const activeLayer = floorplan.scene.activeLayer;

    if (this._position) {
      parametricOpening.x = this._position.x;
      parametricOpening.y = this._position.y;
    }

    parametricOpening.z = OpeningUtil.getDefaultHeight(parametricOpening);

    if (this._rotation !== undefined) {
      parametricOpening.rotate = this._rotation;
    }

    const spec = HSCore.Util.Content.getParametricOpeningSpec(parametricOpening);
    spec.host = this._host;
    spec.parent = activeLayer;

    this._spec = spec;

    HSCore.Util.Content.addParametricOpening(this._spec);

    this.result = parametricOpening;

    super.onCommit();

    return parametricOpening;
  }

  onUndo(): void {
    if (this._spec) {
      HSCore.Util.Content.removeParametricOpening(this._spec.parametricOpening);
    }
    super.onUndo();
  }

  onRedo(): void {
    super.onRedo();
    if (this._spec) {
      HSCore.Util.Content.addParametricOpening(this._spec);
    }
  }

  canTransactField(): boolean {
    return true;
  }
}