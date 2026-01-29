import { HSCore } from './HSCore';
import { CustomizedPMRequest } from './CustomizedPMRequest';

interface ModelingData {
  instanceMetas: unknown;
  [key: string]: unknown;
}

interface FloorplanScene {
  addChild(model: unknown): void;
}

interface Floorplan {
  scene: FloorplanScene;
}

interface CustomizedPMModel {
  setFlagOn(flag: number): void;
}

declare namespace HSApp {
  namespace Util {
    namespace CustomizedPMModel {
      function createCustomizedPMModel(data: ModelingData): CustomizedPMModel;
      function updateChildrenByWebCADDocument(
        model: CustomizedPMModel,
        instanceMetas: unknown,
        open: boolean
      ): Promise<void>;
    }
  }
}

export class CreateCustomizedPMRequest extends CustomizedPMRequest {
  private _modelingData: ModelingData;
  private _host: unknown;
  private _floorplan: Floorplan;

  constructor(modelingData: ModelingData, host: unknown, floorplan: Floorplan) {
    super();
    this._modelingData = modelingData;
    this._host = host;
    this._floorplan = floorplan;
  }

  private async createModel(open: boolean = false): Promise<CustomizedPMModel> {
    const model = HSApp.Util.CustomizedPMModel.createCustomizedPMModel(this._modelingData);
    model.setFlagOn(HSCore.Model.EntityFlagEnum.freezed);
    this._floorplan.scene.addChild(model);
    await HSApp.Util.CustomizedPMModel.updateChildrenByWebCADDocument(
      model,
      this._modelingData.instanceMetas,
      open
    );
    return model;
  }

  async onReceiveAsync(action: string, params: { open?: boolean }): Promise<unknown> {
    if (action === 'createModel') {
      return await this.createModel(params.open);
    }
    return super.onReceiveAsync?.(action, params) ?? false;
  }

  onCommit(): void {
    super.onCommit?.();
  }

  onUndo(): void {
    super.onUndo?.();
  }

  onRedo(): void {
    super.onRedo?.();
  }
}