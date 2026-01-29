import { CmdDecoration } from './CmdDecoration';
import { MouseStateEnum } from './MouseState';

interface Material {
  textureUrl: string;
  textureURI: string;
}

interface Face {
  material: Material;
}

interface TransactionRequest {
  // Define transaction request structure as needed
}

interface TransactionManager {
  createRequest(requestType: string, data: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface Context {
  transManager: TransactionManager;
}

interface App {
  transManager: TransactionManager;
}

type MouseStateChangedHandler = (state: MouseStateEnum) => void;

export class CmdDecorationEx extends CmdDecoration {
  private _multifaceMaterial: Material;
  private _selectedFaces: Face[];
  private _mouseStateChangedHandler?: MouseStateChangedHandler;
  protected context!: Context;

  constructor(multifaceMaterial: Material, selectedFaces: Face[], context: Context) {
    super(selectedFaces[0].material, context);
    
    this._multifaceMaterial = multifaceMaterial;
    this._multifaceMaterial.textureUrl = this._multifaceMaterial.textureURI;
    this._selectedFaces = selectedFaces;
  }

  get currentMaterial(): Material {
    return this._multifaceMaterial;
  }

  set currentMaterial(material: Material) {
    this._multifaceMaterial = material;
  }

  protected _onReceiveMessageContent(): boolean {
    return false;
  }

  protected _executeImpl(param1: unknown, param2: unknown): void {
    const app: App = (globalThis as any).HSApp.App.getApp();
    const requestData: unknown[] = [this._selectedFaces[0], param1, param2];
    const request = app.transManager.createRequest(
      (globalThis as any).HSFPConstants.RequestType.ApplyToAllWallFacePaper,
      requestData
    );
    this.context.transManager.commit(request);
  }

  updateCursorStatus(target: unknown, param2: unknown): void {
    if (!this._mouseStateChangedHandler) {
      return;
    }

    if (this.canPaint(target, param2)) {
      const state = MouseStateEnum.Paint;
      this._mouseStateChangedHandler(state);
    } else {
      this._mouseStateChangedHandler(MouseStateEnum.Disabled);
    }
  }

  canPaint(target: unknown, _param2?: unknown): boolean {
    return target instanceof (globalThis as any).HSCore.Model.Face;
  }
}