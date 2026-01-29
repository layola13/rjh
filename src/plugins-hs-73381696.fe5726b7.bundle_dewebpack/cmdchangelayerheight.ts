interface TransactionRequest {
  // Define based on your transaction manager implementation
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface Layer {
  height: number;
}

interface App {
  transManager: TransactionManager;
}

interface CurrentParams {
  activeSection: string;
  activeSectionName: string;
  clicksRatio: {
    id: string;
    name: string;
  };
}

declare namespace HSFPConstants {
  enum RequestType {
    ChangeLayerHeight = 'ChangeLayerHeight'
  }
  
  enum LogGroupTypes {
    WallOperation = 'WallOperation'
  }
}

declare namespace HSApp.Cmd {
  class Command {
    onExecute(): void;
    onCleanup(): void;
    canUndoRedo(): boolean;
    getCurrentParams(): CurrentParams;
    getDescription(): string;
    getCategory(): string;
  }
}

/**
 * Command for changing layer height
 */
export class CmdChangeLayerHeight extends HSApp.Cmd.Command {
  private app: App;
  private layer: Layer;
  private height: number;
  private _request?: TransactionRequest;

  constructor(app: App, layer: Layer, height: number) {
    super();
    this.app = app;
    this.layer = layer;
    this.height = height;
  }

  onExecute(): void {
    if (this.layer.height !== this.height) {
      this._request = this.app.transManager.createRequest(
        HSFPConstants.RequestType.ChangeLayerHeight,
        [this.layer, this.height]
      );
      this.app.transManager.commit(this._request);
    }
  }

  onCleanup(): void {
    // Cleanup logic if needed
  }

  canUndoRedo(): boolean {
    return false;
  }

  getCurrentParams(): CurrentParams {
    return {
      activeSection: HSFPConstants.LogGroupTypes.WallOperation,
      activeSectionName: '墙体操作',
      clicksRatio: {
        id: 'changeLayerHeight',
        name: '墙体高度调整'
      }
    };
  }

  getDescription(): string {
    return '修改全局墙高';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}