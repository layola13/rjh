import { HSApp } from './518193';
import { ICopilotMessage, OperationId, RecommendedOperationTypes } from './463412';
import { isAIMode } from './901869';

type SuccessCallback = (result: unknown) => void;
type FailureCallback = (error: unknown, message?: string, details?: unknown) => void;
type ProgressCallback = (progress: unknown) => void;
type SelectionQueryCallback = (
  param1: unknown,
  param2: unknown,
  param3: unknown,
  param4: unknown
) => void;

export { ICopilotMessage, OperationId };

export class BaseOperation {
  protected _scb?: SuccessCallback;
  protected _fcb?: FailureCallback;
  protected _pcb?: ProgressCallback;
  protected _selectionQuery?: SelectionQueryCallback;
  protected app: ReturnType<typeof HSApp.App.getApp>;

  constructor() {
    this.app = HSApp.App.getApp();
  }

  public execute(
    data: unknown,
    successCallback: SuccessCallback,
    failureCallback: FailureCallback,
    selectionQuery: SelectionQueryCallback,
    progressCallback: ProgressCallback
  ): void {
    this._scb = successCallback;
    this._fcb = failureCallback;
    this._pcb = progressCallback;
    this._selectionQuery = selectionQuery;
    this.onExecute(data);
  }

  protected onExecute(data: unknown): void {
    // To be implemented by subclasses
  }

  protected onQuerySelection(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown
  ): void {
    this._selectionQuery?.(param1, param2, param3, param4);
  }

  protected onStart(result: unknown): void {
    this._scb?.(result);
  }

  protected onFinish(error: unknown, message?: string, details?: unknown): void {
    this._fcb?.(error, message, details);
    this.cleanup();
  }

  protected onProcess(progress: unknown): void {
    this._pcb?.(progress);
  }

  protected checkCommandSupport(): boolean {
    const plugin = this.app.pluginManager.getPlugin(
      'hsw.plugin.renderImageBrowserPlugin.Plugin'
    );
    const isInImageBrowser = plugin?.getIsInImageBrowserEnv?.call(plugin);

    return !(
      this.app.activeEnvironmentId !== HSFPConstants.Environment.Default ||
      isInImageBrowser
    );
  }

  protected isAIMode(): boolean {
    return isAIMode();
  }

  protected cleanup(): void {
    // To be implemented by subclasses if needed
  }

  public static getId(): OperationId {
    return OperationId.Others;
  }

  public static getRecommendedOperationTypes(operationId: OperationId): unknown {
    return (
      RecommendedOperationTypes[operationId] ||
      RecommendedOperationTypes[OperationId.Others]
    );
  }

  public static createMockMessage(): ICopilotMessage {
    return {
      operationType: OperationId.Others,
      priority: 0,
      required: true,
      reply: 'mock op'
    };
  }
}

declare const HSFPConstants: {
  Environment: {
    Default: unknown;
  };
};