import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

interface TransactionRequest {
  // Define based on your transaction request structure
}

interface Layer {
  ID: string;
  // Add other layer properties as needed
}

interface Context {
  transManager: {
    createRequest(type: string, params: unknown[]): TransactionRequest;
    commit(request: TransactionRequest): void;
  };
}

interface CommandManager {
  complete(command: Command): void;
}

interface Command {
  context: Context;
  mgr: CommandManager;
  onExecute(): void;
  canUndoRedo(): boolean;
  getDescription(): string;
  isInteractive(): boolean;
  getCategory(): string;
  getCurrentParams(): CommandParams;
}

interface CommandParams {
  activeSection: string;
  clicksRatio: {
    id: string;
    name: string;
  };
}

export class CmdDeleteLayer extends HSApp.Cmd.Command {
  private layer: Layer;
  private layerIndex: number;
  private _request?: TransactionRequest;

  constructor(layer: Layer, layerIndex: number) {
    super();
    this.layer = layer;
    this.layerIndex = layerIndex;
    this._request = undefined;
  }

  onExecute(): void {
    if (this.layerIndex !== 0 && this.layer && !HSApp.Util.Layer.isRootLayer(this.layer)) {
      this._request = this.context.transManager.createRequest(
        HSFPConstants.RequestType.DeleteLayer,
        [this.layer]
      );
      this.context.transManager.commit(this._request);
      this.mgr.complete(this);
    }
  }

  canUndoRedo(): boolean {
    return false;
  }

  getDescription(): string {
    return `多层操作-删除楼层ID: ${this.layer.ID}`;
  }

  isInteractive(): boolean {
    return true;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.LayerOperation;
  }

  getCurrentParams(): CommandParams {
    return {
      activeSection: HSFPConstants.LogGroupTypes.LayerOperation,
      clicksRatio: {
        id: 'deleteLayer',
        name: '删除楼层'
      }
    };
  }
}