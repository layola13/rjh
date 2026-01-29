import { Handler } from './Handler';
import { HSCore } from './HSCore';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface ActiveParams {
  app: unknown;
}

interface InitOptions {
  app: unknown;
}

class CommissionPlugin extends HSApp.Plugin.IPlugin {
  private _handler: Handler;

  constructor() {
    super({
      name: "Commission Plugin",
      description: "calculation Commission for floorplan",
      dependencies: []
    } as PluginConfig);

    this._handler = new Handler();
  }

  onActive(event: ActiveParams, context: unknown): void {
    super.onActive?.(event, context);

    this._handler.init({
      app: event.app
    });
  }

  onDeactive(): void {
    this._handler.cleanup();
  }

  show(): void {
    this._handler.setShowCommissionBar(true);
  }

  hide(): void {
    this._handler.setShowCommissionBar(false);
  }

  getUpdateCommissionSignal(): unknown {
    return this._handler.getUpdateCommissionSignal();
  }

  getCommissionId(): unknown {
    return this._handler.getCommissionId();
  }

  getCurrentStoreName(): string {
    return this._handler.getCurrentStoreName();
  }

  isEACommission(): boolean {
    return this._handler.isEACommission();
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.Commission,
  CommissionPlugin,
  HSCore.Util.Object.nullFunction
);