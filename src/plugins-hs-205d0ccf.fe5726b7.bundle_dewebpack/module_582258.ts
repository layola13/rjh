import { Handler } from './Handler';

interface PluginMetadata {
  name: string;
  description: string;
  dependencies: string[];
}

interface RecommendationOptions {
  [key: string]: unknown;
}

interface Application {
  app: unknown;
}

abstract class IPlugin {
  protected _handler?: Handler;

  constructor(metadata: PluginMetadata) {}

  abstract onActive(context: Application, config: unknown): void;
  abstract onDeactive(): void;
}

class RecommendedCorrelationModelPlugin extends IPlugin {
  protected _handler!: Handler;

  constructor() {
    super({
      name: "recommended correlation model plugin",
      description: "Choose models to recommend correlation models",
      dependencies: [
        HSFPConstants.PluginType.ContextualTools,
        HSFPConstants.PluginType.Catalog
      ]
    });
  }

  onActive(context: Application, config: unknown): void {
    this._handler = new Handler(context.app, config);
    this._handler.init();
  }

  onDeactive(): void {
    this._handler._uninit();
  }

  updateRecommend(): void {
    this._handler.updateRecommend({}, true);
  }

  getRecommendationProducts(
    firstParam: unknown,
    secondParam: unknown,
    thirdParam: unknown
  ): unknown {
    return this._handler.getRecommendationProducts(
      firstParam,
      secondParam,
      thirdParam
    );
  }

  setNoShowDialog(shouldHide: boolean): unknown {
    return this._handler.setNoShowDialog(shouldHide);
  }

  getNoShowDialog(): unknown {
    return this._handler.getNoShowDialog();
  }
}

HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.RecommendModels,
  RecommendedCorrelationModelPlugin
);