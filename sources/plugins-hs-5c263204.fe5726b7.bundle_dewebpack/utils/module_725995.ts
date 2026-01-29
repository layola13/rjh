interface Position {
  x: number;
  y: number;
  z: number;
}

interface Dimension {
  type: 'top' | 'bottom' | 'toFloor' | 'left' | 'right';
}

interface Component {
  localId: string;
  states?: {
    ID_board_thickness?: {
      __value: number;
    };
  };
  XLength?: number;
  ZLength?: number;
}

interface TransactionSession {
  commit(): void;
}

interface TransactionManager {
  startSession(options: { undoRedo: boolean }): TransactionSession;
  createRequest(requestType: string, args: unknown[]): unknown;
  commit(request: unknown): void;
}

interface Context {
  transManager: TransactionManager;
}

interface GizmoManager {
  _onSelectionChanged(): void;
}

interface CommandManager {
  complete(command: Command): void;
}

declare const HSApp: {
  App: {
    getApp(): {
      activeView: {
        gizmoManager: GizmoManager;
      };
      pluginManager: {
        getPlugin(name: string): unknown;
      };
    };
  };
  Cmd: {
    Command: new (...args: any[]) => Command;
  };
};

declare const HSFPConstants: {
  RequestType: {
    ChangeComponentPositionRequest: string;
  };
};

declare const LiveHint: {
  show(message: string, duration?: number, arg3?: unknown, options?: { status: string; canclose: boolean }): void;
  statusEnum: {
    warning: string;
    canops: string;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

interface TopPassemblyHelper {
  getTopPAssemblyInFp(component: Component): Component;
}

declare const TopPassemblyHelper: TopPassemblyHelper;

abstract class Command {
  protected context!: Context;
  protected mgr!: CommandManager;
}

const HINT_DURATION = 6000;
const BOARD_THICKNESS_MULTIPLIER_SIDE = 1.5;
const BOARD_THICKNESS_MULTIPLIER_VERTICAL = 2;
const DECIMAL_PRECISION = 3;

class ChangeComponentPositionCommand extends Command {
  private readonly _component: Component;
  private readonly _position: Position;
  private readonly dim: Dimension;
  private readonly _topPassembly: Component;
  private readonly gizmoManager: GizmoManager;
  private readonly isAddedComponent: boolean;

  constructor(component: Component, position: Position, dimension: Dimension) {
    super();
    this._component = component;
    this._position = position;
    this.dim = dimension;
    this._topPassembly = TopPassemblyHelper.getTopPAssemblyInFp(this._component);
    this.gizmoManager = HSApp.App.getApp().activeView.gizmoManager;
    this.isAddedComponent =
      this._component.localId.indexOf('id_vertical') > -1 ||
      this._component.localId.indexOf('id_horizontal') > -1 ||
      this._component.localId.indexOf('id_passembly_lightstrip_board') > -1;
  }

  onExecute(): void {
    const boardThickness = this._topPassembly.states?.ID_board_thickness?.__value ?? 0;

    if (
      this.dim.type === 'top' ||
      this.dim.type === 'bottom' ||
      this.dim.type === 'toFloor'
    ) {
      const maxZ = (this._topPassembly.ZLength ?? 0) - BOARD_THICKNESS_MULTIPLIER_VERTICAL * boardThickness;
      const positionZ = Number(this._position.z.toFixed(DECIMAL_PRECISION));
      const maxZFixed = Number(maxZ.toFixed(DECIMAL_PRECISION));

      if (positionZ > maxZFixed || positionZ < boardThickness) {
        this.showExceedingWarning();
        return;
      }
    } else if (this.dim.type === 'left' || this.dim.type === 'right') {
      const maxX = (this._topPassembly.XLength ?? 0) / 2 - (BOARD_THICKNESS_MULTIPLIER_SIDE * boardThickness) / 2;
      const positionX = Number(Math.abs(this._position.x).toFixed(DECIMAL_PRECISION));
      const maxXFixed = Number(maxX.toFixed(DECIMAL_PRECISION));

      if (positionX > maxXFixed) {
        this.showExceedingWarning();
        return;
      }
    }

    const transManager = this.context.transManager;
    const session = transManager.startSession({ undoRedo: true });

    HSApp.App.getApp().pluginManager.getPlugin('hsw.plugin.snapping');

    const request = transManager.createRequest(
      HSFPConstants.RequestType.ChangeComponentPositionRequest,
      [this._component, this._position, this.dim]
    );

    transManager.commit(request);
    session.commit();
    this.mgr.complete(this);
  }

  canUndoRedo(): boolean {
    return false;
  }

  private showExceedingWarning(): void {
    LiveHint.show(
      ResourceManager.getString('plugin_customizedcabinet_component_exceeding'),
      HINT_DURATION,
      undefined,
      {
        status: LiveHint.statusEnum.warning,
        canclose: false,
      }
    );

    setTimeout(() => {
      LiveHint.show(
        ResourceManager.getString('plugin_customizedcabinet_component_mode'),
        undefined,
        null,
        {
          canclose: true,
          status: LiveHint.statusEnum.canops,
        }
      );
    }, HINT_DURATION);

    this.gizmoManager._onSelectionChanged();
  }
}

export default ChangeComponentPositionCommand;