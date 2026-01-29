interface Position {
  x: number;
  y: number;
}

interface GizmoParam {
  EditFlag: number;
}

interface CornerWindowParameters {
  [key: string]: unknown;
}

interface CornerWindow {
  parameters: CornerWindowParameters;
  x: number;
  y: number;
}

interface TransactionData {
  type: string;
  data: CornerWindow[];
}

declare const HSFPConstants: {
  RequestType: {
    EditCornerWindow: string;
  };
};

declare const HSCore: {
  Model: {
    BayWindow: new (...args: unknown[]) => unknown;
    POrdinaryWindow: new (...args: unknown[]) => unknown;
    CornerWindowParamsEnum: {
      sideA: number;
      sideC: number;
    };
  };
  Transaction: {
    Common: {
      StateRequest: new (...args: unknown[]) => StateRequest;
    };
  };
};

declare const _: {
  cloneDeep<T>(value: T): T;
  extend<T, U>(target: T, source: U): T & U;
};

abstract class StateRequest {
  onUndo(args: unknown[]): void;
  onRedo(args: unknown[]): void;
}

export default class EditCornerWindowRequest extends StateRequest {
  private _cornerWindow: CornerWindow;
  private _parameters: CornerWindowParameters;
  private _gizmoParam: GizmoParam;
  private _movePosition: Position;
  private _position?: Position;
  private _initialPosition?: Position;

  constructor(
    cornerWindow: CornerWindow,
    parameters: CornerWindowParameters,
    gizmoParam: GizmoParam,
    movePosition: Position
  ) {
    super();
    this._cornerWindow = cornerWindow;
    this._parameters = parameters;
    this._gizmoParam = gizmoParam;
    this._movePosition = movePosition;
  }

  onCommit(): CornerWindow | undefined {
    if (!this._cornerWindow) {
      return undefined;
    }

    const clonedParameters = _.cloneDeep(this._cornerWindow.parameters);
    
    if (this._parameters) {
      _.extend(clonedParameters, this._parameters);
    }
    
    this._parameters = clonedParameters;
    this._apply();

    if (this._position) {
      this._initialPosition = _.cloneDeep(this._position);
      this._initialPosition.x = this._cornerWindow.x;
      this._initialPosition.y = this._cornerWindow.y;
      this._cornerWindow.x = this._position.x;
      this._cornerWindow.y = this._position.y;
    }

    return this._cornerWindow;
  }

  setPosition(position: Position): void {
    this._position = position;
  }

  onUndo(): void {
    this._apply();
    
    if (this._initialPosition) {
      this._cornerWindow.x = this._initialPosition.x;
      this._cornerWindow.y = this._initialPosition.y;
    }
    
    super.onUndo([]);
  }

  onRedo(): void {
    this._apply();
    
    if (this._position) {
      this._cornerWindow.x = this._position.x;
      this._cornerWindow.y = this._position.y;
    }
    
    super.onRedo([]);
  }

  onCompose(transaction: TransactionData): boolean {
    if (transaction.type !== HSFPConstants.RequestType.EditCornerWindow) {
      return false;
    }

    const transactionData = transaction.data;
    return this._cornerWindow === transactionData[0];
  }

  private _apply(): void {
    const clonedParameters = _.cloneDeep(this._cornerWindow.parameters);
    this._cornerWindow.parameters = this._parameters;
    this._parameters = clonedParameters;

    if (
      this._gizmoParam &&
      (this._cornerWindow instanceof HSCore.Model.BayWindow ||
        this._cornerWindow instanceof HSCore.Model.POrdinaryWindow)
    ) {
      const editFlag = this._gizmoParam.EditFlag;
      const sideA = HSCore.Model.CornerWindowParamsEnum.sideA;
      const sideC = HSCore.Model.CornerWindowParamsEnum.sideC;

      if (editFlag === sideA || editFlag === sideC) {
        this._initialPosition = {
          x: this._cornerWindow.x,
          y: this._cornerWindow.y
        };
        this._cornerWindow.x = this._movePosition.x;
        this._cornerWindow.y = this._movePosition.y;
        this._movePosition = this._initialPosition;
      }
    }
  }
}