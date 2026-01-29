import { OperationId, BaseOperation } from './operations';

interface ExecuteContext {
  isQuestionTone: number;
  isFuncDone: boolean;
  recommendedOperationTypes?: string[];
  reply?: unknown;
}

interface RenderPlugin {
  exitRenderEnvironment(): void;
}

interface PluginManager {
  getPlugin(pluginId: string): RenderPlugin;
}

interface App {
  activeEnvironmentId: string;
  pluginManager: PluginManager;
}

export class OpExitControl extends BaseOperation {
  private app: App;

  constructor() {
    super();
  }

  static getId(): string {
    return OperationId.Exit;
  }

  onExecute(context: ExecuteContext): void {
    if (context.isQuestionTone === 0) {
      const backButton = document.querySelector<HTMLElement>(
        '#renderImageBrowser .ribpCommonHeader .back-button'
      );
      
      if (backButton) {
        backButton.click();
      }

      setTimeout(() => {
        const backContainer = document.querySelector<HTMLElement>(
          '#renderImageBrowser .ribpGridHeader .back-container'
        );
        if (backContainer) {
          backContainer.click();
        }
      }, 10);

      if (this.app.activeEnvironmentId === 'render') {
        this.app.pluginManager
          .getPlugin('hsw.plugin.render.Plugin')
          .exitRenderEnvironment();
      }

      context.isFuncDone = true;
      const recommendedOps = OpExitControl.getRecommendedOperationTypes(
        OpExitControl.getId()
      );
      context.recommendedOperationTypes = recommendedOps;
    }

    this.onFinish('success', context.reply, context);
  }

  private static getRecommendedOperationTypes(operationId: string): string[] {
    return [];
  }

  protected onFinish(status: string, reply: unknown, context: ExecuteContext): void {
    // Implementation handled by BaseOperation
  }
}