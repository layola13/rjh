interface Entity {
  signalDirty: unknown;
  signalRemoved: unknown;
}

interface Context {
  manager?: GeometryManager;
}

interface GeometryManager {
  removeItem(entity: Entity): void;
}

interface SignalHook {
  listen(signal: unknown, handler: (event?: unknown) => void): this;
  dispose(): void;
}

declare namespace HSCore {
  namespace Util {
    class SignalHook {
      constructor(instance: unknown);
      listen(signal: unknown, handler: (event?: unknown) => void): this;
      dispose(): void;
    }
  }
  namespace Doc {
    function getDocManager(): { geometryManager: GeometryManager };
  }
}

export class BaseObject {
  private _dirty: boolean;
  private eventHook: SignalHook;
  private entity: Entity | undefined;
  private context: Context | undefined;
  private geomMgr: GeometryManager;

  constructor(entity: Entity, context: Context) {
    this._dirty = true;
    this.eventHook = new HSCore.Util.SignalHook(this);
    this.entity = entity;
    this.context = context;
    this.geomMgr = context.manager || HSCore.Doc.getDocManager().geometryManager;
    this.eventHook
      .listen(this.entity.signalDirty, this.onEntityDirty)
      .listen(this.entity.signalRemoved, this.onEntityRemoved);
  }

  private onEntityDirty(event?: unknown): void {}

  private onEntityRemoved(): void {
    if (this.entity) {
      this.geomMgr.removeItem(this.entity);
    }
  }

  clear(): void {
    this.entity = undefined;
    this.context = undefined;
    this.eventHook.dispose();
    this.eventHook = undefined as unknown as SignalHook;
  }
}