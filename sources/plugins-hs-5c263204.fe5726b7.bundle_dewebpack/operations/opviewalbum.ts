import { OperationId, BaseOperation } from './operations';

interface ExecuteParams {
  reply: string;
  recommendedOperationTypes?: string[];
  [key: string]: unknown;
}

interface PluginManager {
  getPlugin(name: string): RenderPlugin | null;
}

interface RenderPlugin {
  getHandler(): RenderHandler;
}

interface RenderHandler {
  showResult(): void;
}

interface App {
  pluginManager: PluginManager;
}

/**
 * Operation for viewing album content
 */
export class OpViewAlbum extends BaseOperation {
  protected app!: App;

  constructor() {
    super();
  }

  protected onExecute(params: ExecuteParams): void {
    const renderPlugin = this.app.pluginManager.getPlugin("hsw.plugin.render.Plugin");
    renderPlugin?.getHandler().showResult();

    const recommendedTypes = OpViewAlbum.getRecommendedOperationTypes(OpViewAlbum.getId());
    params.recommendedOperationTypes = recommendedTypes;
    
    this.onFinish("success", `${params.reply}`, params);
  }

  static getId(): OperationId {
    return OperationId.ViewAlbum;
  }

  protected onFinish(status: string, message: string, data: ExecuteParams): void {
    // Implementation inherited from BaseOperation
  }
}