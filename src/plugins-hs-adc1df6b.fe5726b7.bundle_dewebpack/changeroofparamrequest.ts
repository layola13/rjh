import { HSCore } from './HSCore';

interface RoofParamInfo {
  name: string;
  value: unknown;
  oldValue: unknown;
}

interface Roof {
  getUniqueParent(): unknown;
  setParamsToRoof(params: Record<string, unknown>): void;
}

interface Layer {
  roomBuilder: {
    build(): void;
  };
}

export class ChangeRoofParamRequest extends HSCore.Transaction.Request {
  private readonly _roof: Roof;
  private readonly _infos: RoofParamInfo[];

  constructor(roof: Roof, infos: RoofParamInfo[]) {
    super();
    this._roof = roof;
    this._infos = infos;
  }

  private _refreshBuilder(): void {
    const parent = this._roof.getUniqueParent();
    if (parent instanceof HSCore.Model.Layer) {
      (parent as Layer).roomBuilder.build();
    }
  }

  onCommit(): Roof {
    const params: Record<string, unknown> = {};
    this._infos.forEach((info) => {
      params[info.name] = info.value;
    });
    this._roof.setParamsToRoof(params);
    this._refreshBuilder();
    super.onCommit();
    return this._roof;
  }

  onUndo(): void {
    const params: Record<string, unknown> = {};
    this._infos.forEach((info) => {
      params[info.name] = info.oldValue;
    });
    this._roof.setParamsToRoof(params);
    this._refreshBuilder();
  }

  onRedo(): void {
    const params: Record<string, unknown> = {};
    this._infos.forEach((info) => {
      params[info.name] = info.value;
    });
    this._roof.setParamsToRoof(params);
    this._refreshBuilder();
  }
}