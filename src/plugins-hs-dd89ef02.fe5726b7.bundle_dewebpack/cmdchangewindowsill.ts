interface MaterialData {
  seekId: string;
  [key: string]: unknown;
}

interface WindowSillParameters {
  materialData?: MaterialData;
  innerSillPoints?: unknown[];
  outerSillPoints?: unknown[];
  doubleSillPoints?: unknown[];
  outerMoldingIndices?: number[];
  extendValue?: number;
  secondExtendValue?: number;
}

interface WindowSill {
  parameters: WindowSillParameters;
}

interface TransactionSession {
  abort(): void;
  commit(): void;
}

interface TransactionManager {
  startSession(): TransactionSession;
  createRequest(requestType: string, params: unknown[]): unknown;
  commit(request: unknown): void;
}

interface CommandContext {
  transManager: TransactionManager;
  app: {
    signalContextualtoolRefresh: { dispatch(): void };
    signalPropertyBarRefresh: { dispatch(): void };
  };
}

interface CommandManager {
  complete(command: Command): void;
}

interface KeyboardEvent {
  keyCode: number;
}

interface ContentMessage {
  productType: string;
  seekId?: string;
  [key: string]: unknown;
}

abstract class Command {
  protected context!: CommandContext;
  protected mgr!: CommandManager;

  abstract onExecute(): void;
  onReceive?(message: string, data: unknown): boolean;
}

export class CmdChangeWindowSill extends Command {
  private _windowSill: WindowSill;
  private _session!: TransactionSession;

  constructor(windowSill: WindowSill) {
    super();
    this._windowSill = windowSill;
  }

  onExecute(): void {
    const transManager = this.context.transManager;
    this._session = transManager.startSession();
  }

  onReceive(message: string, data: unknown): boolean {
    let handled = false;

    switch (message) {
      case 'keydown': {
        const keyEvent = data as KeyboardEvent;
        if (keyEvent.keyCode === HSApp.Util.Keyboard.KeyCodes.ESC) {
          this._cancelEdit();
        } else if (
          keyEvent.keyCode === HSApp.Util.Keyboard.KeyCodes.DELETE ||
          keyEvent.keyCode === HSApp.Util.Keyboard.KeyCodes.TAB
        ) {
          this._applyEdit();
        }
        break;
      }

      case 'changeMaterialRotation':
        this._changeMaterialRotation();
        handled = true;
        break;

      case 'complete':
        this._applyEdit();
        break;

      case HSFPConstants.CommandMessage.Content: {
        const contentData = data as ContentMessage;
        if (contentData.productType === HSCatalog.ProductTypeEnum.Material) {
          this._applyMaterial(contentData);
          handled = true;
        }
        this.context.app.signalContextualtoolRefresh.dispatch();
        this.context.app.signalPropertyBarRefresh.dispatch();
        break;
      }

      default:
        handled = super.onReceive?.(message, data) ?? false;
    }

    return handled;
  }

  private _applyMaterial(materialData: ContentMessage): void {
    const currentMaterial = this._windowSill.parameters.materialData;

    if (!currentMaterial || !materialData || currentMaterial.seekId !== materialData.seekId) {
      const request = this.context.transManager.createRequest(
        HSFPConstants.RequestType.ChangeWindowSillMaterial,
        [this._windowSill, materialData]
      );
      this.context.transManager.commit(request);
    }
  }

  private _changeMaterialRotation(): void {
    const request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.ChangeWindowSillMaterialRotation,
      [this._windowSill]
    );
    this.context.transManager.commit(request);
  }

  private _cancelEdit(): void {
    this._session.abort();
    this.mgr.complete(this);
  }

  private _applyEdit(): void {
    this._session.commit();
    this.mgr.complete(this);
  }
}

export class CmdChangeWindowSillSide extends Command {
  private _windowSill: WindowSill;
  private _side: HSCore.Model.Parametrization.WindowSillSideType;

  constructor(windowSill: WindowSill, side: HSCore.Model.Parametrization.WindowSillSideType) {
    super();
    this._windowSill = windowSill;
    this._side = side;
  }

  onExecute(): void {
    const windowSill = this._windowSill;

    if (!windowSill?.parameters) {
      return;
    }

    const params = windowSill.parameters;
    const { innerSillPoints, outerSillPoints, doubleSillPoints, outerMoldingIndices } = params;

    let points: unknown[] = [];
    let secondMoldingIndices: number[] = [];
    let extendValue = params.extendValue;
    let secondExtendValue = params.secondExtendValue;
    const side = this._side;

    switch (side) {
      case HSCore.Model.Parametrization.WindowSillSideType.INNER:
        points = innerSillPoints ?? [];
        secondExtendValue = undefined;
        break;

      case HSCore.Model.Parametrization.WindowSillSideType.OUTER:
        points = outerSillPoints ?? [];
        extendValue = undefined;
        break;

      case HSCore.Model.Parametrization.WindowSillSideType.DOUBLE:
        points = doubleSillPoints ?? [];
        secondMoldingIndices = outerMoldingIndices ?? [];
        break;

      default:
        return;
    }

    const transManager = this.context.transManager;
    const request = transManager.createRequest(
      HSFPConstants.RequestType.ChangeParametricModelParameters,
      [
        windowSill,
        {
          side,
          points,
          secondMoldingIndices,
          extendValue,
          secondExtendValue,
        },
        true,
      ]
    );

    transManager.commit(request);
    this.mgr.complete(this);
  }

  getDescription(): string {
    return '改变窗台石面';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export class CmdChangeWindowSillExtend extends Command {
  private _windowSill: WindowSill;
  private _value: number;
  private _isInner: boolean;

  constructor(windowSill: WindowSill, value: number, isInner: boolean) {
    super();
    this._windowSill = windowSill;
    this._value = value;
    this._isInner = isInner;
  }

  onExecute(): void {
    const windowSill = this._windowSill;

    if (!windowSill?.parameters) {
      return;
    }

    const transManager = this.context.transManager;
    const extendValue = this._isInner ? this._value : windowSill.parameters.extendValue;
    const secondExtendValue = this._isInner ? windowSill.parameters.secondExtendValue : this._value;

    const request = transManager.createRequest(
      HSFPConstants.RequestType.ChangeParametricModelParameters,
      [
        windowSill,
        {
          extendValue,
          secondExtendValue,
        },
        true,
      ]
    );

    transManager.commit(request);
    this.mgr.complete(this);
  }

  getDescription(): string {
    return '改变窗台石宽度';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}