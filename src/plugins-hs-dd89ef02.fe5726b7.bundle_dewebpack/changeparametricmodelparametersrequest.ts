interface ParametricModel {
  parameters: Record<string, unknown>;
  getUniqueParent(): ParentModel;
  dirtyGeometry(): void;
}

interface ParentModel {
  buildPartsInfo(): void;
  dirtyGeometry(): void;
}

interface TransactionRequest {
  onUndo(args: unknown[]): void;
  onRedo(args: unknown[]): void;
}

declare const HSCore: {
  Transaction: {
    Request: new (...args: unknown[]) => TransactionRequest;
  };
};

declare const _: {
  cloneDeep<T>(value: T): T;
  extend<T, U>(target: T, source: U): T & U;
};

export class ChangeParametricModelParametersRequest extends HSCore.Transaction.Request {
  private _parametricModel: ParametricModel;
  private _parameters: Record<string, unknown>;
  private _needUpdate: boolean;

  constructor(
    parametricModel: ParametricModel,
    parameters: Record<string, unknown>,
    needUpdate: boolean
  ) {
    super();
    this._parametricModel = parametricModel;
    this._parameters = parameters;
    this._needUpdate = needUpdate;
  }

  onCommit(): void {
    const model = this._parametricModel;
    if (model?.parameters) {
      const clonedParameters = _.cloneDeep(model.parameters);
      _.extend(clonedParameters, this._parameters);
      this._parameters = clonedParameters;
      this._apply();
    }
  }

  onUndo(): void {
    this._apply();
    super.onUndo([]);
  }

  onRedo(): void {
    this._apply();
    super.onRedo([]);
  }

  private _apply(): void {
    const model = this._parametricModel;
    const clonedParameters = _.cloneDeep(model.parameters);
    model.parameters = this._parameters;
    this._parameters = clonedParameters;

    if (this._needUpdate) {
      model.getUniqueParent().buildPartsInfo();
    }

    model.dirtyGeometry();
    model.getUniqueParent().dirtyGeometry();
  }
}