interface Component {
  parents: Record<string, Assembly>;
  ZLength: number;
}

interface Assembly {
  states: {
    ID_door_thickness: {
      __value: number;
    };
  };
  ZLength: number;
}

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Dimension {
  width: number;
  height: number;
  depth: number;
}

interface GizmoManager {
  _onSelectionChanged(): void;
}

interface View {
  gizmoManager: GizmoManager;
}

interface App {
  activeView: View;
  getApp(): App;
}

interface TransactionSession {
  commit(): void;
}

interface TransactionRequest {
  // Transaction request structure
}

interface TransactionManager {
  startSession(options: { undoRedo: boolean }): TransactionSession;
  createRequest(
    requestType: string,
    params: [Component, Position, Dimension]
  ): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface Context {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
  Cmd: {
    Command: new () => Command;
  };
};

declare const HSFPConstants: {
  RequestType: {
    ChangeDrawerPositionRequest: string;
  };
};

declare const LiveHint: {
  show(
    message: string,
    duration?: number,
    arg2?: undefined | null,
    options?: {
      status?: string;
      canclose?: boolean;
    }
  ): void;
  statusEnum: {
    warning: string;
    canops: string;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

abstract class Command {
  context!: Context;
  mgr!: CommandManager;
}

class ChangeDrawerPositionCommand extends Command {
  private _component: Component;
  private _position: Position;
  private _dim: Dimension;
  private parentPassembly: Assembly;
  private gizmoManager: GizmoManager;

  constructor(component: Component, position: Position, dimension: Dimension) {
    super();
    this._component = component;
    this._position = position;
    this._dim = dimension;
    this.parentPassembly = Object.values(this._component.parents)[0];
    this.gizmoManager = HSApp.App.getApp().activeView.gizmoManager;
  }

  onExecute(): void {
    this.parentPassembly.states.ID_door_thickness.__value;

    const maxZ = this.parentPassembly.ZLength - this._component.ZLength;
    const currentZ = this._position.z;
    const DECIMAL_PRECISION = 3;
    const WARNING_DURATION = 6000;

    if (
      currentZ.toFixed(DECIMAL_PRECISION) > maxZ.toFixed(DECIMAL_PRECISION) ||
      currentZ.toFixed(DECIMAL_PRECISION) < "0.000"
    ) {
      LiveHint.show(
        ResourceManager.getString("plugin_customizedcabinet_component_exceeding"),
        WARNING_DURATION,
        undefined,
        {
          status: LiveHint.statusEnum.warning,
          canclose: false,
        }
      );

      setTimeout(() => {
        LiveHint.show(
          ResourceManager.getString("plugin_customizedcabinet_component_mode"),
          undefined,
          null,
          {
            canclose: true,
            status: LiveHint.statusEnum.canops,
          }
        );
      }, WARNING_DURATION);

      this.gizmoManager._onSelectionChanged();
      return;
    }

    const transManager = this.context.transManager;
    const session = transManager.startSession({ undoRedo: true });
    const request = transManager.createRequest(
      HSFPConstants.RequestType.ChangeDrawerPositionRequest,
      [this._component, this._position, this._dim]
    );

    transManager.commit(request);
    session.commit();
    this.mgr.complete(this);
  }

  canUndoRedo(): boolean {
    return false;
  }
}

export default ChangeDrawerPositionCommand;