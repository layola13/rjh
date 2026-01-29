import { App } from './App';
import { Command } from './Command';
import { FloorPlan } from './FloorPlan';
import { TransactionManager, TransactionRequest, TransactionSession } from './TransactionManager';
import { Layer } from './Layer';
import { Scene } from './Scene';

interface UnderlayCommandContext {
  transManager: TransactionManager;
}

interface RemoveUnderlayParams {
  all?: boolean;
  layer?: Layer;
}

interface CommandExecuteParams {
  underlay?: unknown;
  layer?: Layer;
}

export default class UnderlayCommand extends Command {
  private fp: FloorPlan;
  private session?: TransactionSession;
  protected context!: UnderlayCommandContext;

  constructor() {
    super();
    const app = App.getApp();
    this.fp = app.floorplan;
  }

  onExecute(): void {
    // No implementation
  }

  onCleanup(): void {
    // No implementation
  }

  private _commit(underlay?: unknown, layer?: Layer): void {
    const transManager = this.context.transManager;
    const targetLayer = layer ?? this.fp.scene.activeLayer;
    const request: TransactionRequest = transManager.createRequest(
      HSFPConstants.RequestType.UpdateUnderlay,
      [underlay, targetLayer]
    );
    transManager.commit(request);
  }

  onReceive(command: string, params: unknown): void {
    switch (command) {
      case 'drawunderlay':
        this._commit(params);
        break;
      case 'removeunderlay':
        this._removeUnderlay(params as RemoveUnderlayParams);
        break;
      default:
        super.onReceive(command, params);
    }
  }

  private _removeUnderlay(params: RemoveUnderlayParams): void {
    if (params.all) {
      this.session = this.context.transManager.startSession();
      this.fp.scene.forEachLayer((layer: Layer) => {
        return this._commit(undefined, layer);
      });
      this.session.commit();
    } else {
      this._commit(undefined, params.layer);
    }
  }

  onComplete(params: unknown): void {
    super.onComplete(params);
    const floorplan = App.getApp().floorplan;
    floorplan.signalUnderlayChanged.dispatch(floorplan.scene.activeLayer.underlay);
  }
}