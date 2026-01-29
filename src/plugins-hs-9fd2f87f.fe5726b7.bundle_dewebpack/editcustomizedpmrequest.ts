import { DIYUtils } from './DIYUtils';
import { CustomizedPMRequest } from './CustomizedPMRequest';

interface ModelingData {
  // Define specific properties based on your modeling data structure
  [key: string]: unknown;
}

interface WebCADDocument {
  // Define specific properties based on your CAD document structure
  [key: string]: unknown;
}

interface RootEntity {
  webCADDocument: WebCADDocument;
  openDiyDocument(): Promise<void>;
}

export class EditCustomizedPMRequest extends CustomizedPMRequest {
  private _rootEntity: RootEntity;
  private _host: unknown;
  private _modelingData: ModelingData;
  private _beforeDoc: WebCADDocument;
  private _afterDoc?: WebCADDocument;

  constructor(rootEntity: RootEntity, host: unknown, modelingData: ModelingData) {
    super();
    this._rootEntity = rootEntity;
    this._host = host;
    this._modelingData = modelingData;
    this._beforeDoc = this._rootEntity.webCADDocument;
  }

  async onReceiveAsync(command: string, args: unknown): Promise<boolean> {
    if (command === 'editModel') {
      return await DIYUtils.editModel(this._rootEntity, this._modelingData, true);
    }
    
    return super.onReceiveAsync?.(command, args) ?? false;
  }

  onCommit(): void {
    super.onCommit?.();
    this._afterDoc = this._rootEntity.webCADDocument;
  }

  async onUndo(): Promise<void> {
    super.onUndo?.();
    await this._rootEntity.openDiyDocument();
    
    if (this._beforeDoc !== this._rootEntity.webCADDocument) {
      // Debug logging would go here
    }
  }

  async onRedo(): Promise<void> {
    super.onRedo?.();
    await this._rootEntity.openDiyDocument();
    
    if (this._afterDoc !== this._rootEntity.webCADDocument) {
      // Debug logging would go here
    }
  }
}