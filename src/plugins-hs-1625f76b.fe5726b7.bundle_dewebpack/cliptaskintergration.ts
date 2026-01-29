interface SignalData {
  show?: boolean;
  state?: NCPClipTaskManagerState;
}

interface SignalEvent {
  data: SignalData;
}

interface IdleDeadline {
  timeRemaining(): number;
}

interface EntityWithHost {
  host?: HSCore.Model.Wall;
}

interface WallFace {
  contents: Record<string, HSCore.Model.Content>;
}

namespace HSCore {
  export namespace Model {
    export class Entity {}
    export class Opening {}
    export class ParametricOpening {}
    export class Wall {
      faces: Record<string, Record<string, WallFace>>;
    }
    export class NCustomizedParametricBackgroundWall {}
    export class NCPBackgroundWallUnit {}
    export type Content = NCustomizedParametricBackgroundWall | NCPBackgroundWallUnit | unknown;
  }

  export namespace Util {
    export class SignalHook {
      constructor(context: unknown);
      listen(signal: Signal, callback: (event: SignalEvent) => void): void;
      unlistenAll(): void;
    }

    export class Signal {
      dispatch(data: SignalData): void;
    }

    export class NCPClipTaskManager {
      static clipTaskSignal: Signal;
      static enable(): void;
      static disable(): void;
    }

    export class NCustomizedFeatureModel {
      static getObstacleInfos(entity: HSCore.Model.Entity): unknown[];
    }
  }
}

enum NCPClipTaskManagerState {
  Finished = 'Finished'
}

interface LiveHintOptions {
  status: string;
  animation: boolean;
}

declare const LiveHint: {
  show(message: string, param2?: unknown, param3?: unknown, options?: LiveHintOptions): void;
  hide(): void;
  statusEnum: {
    loading: string;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

declare function requestIdleCallback(callback: (deadline: IdleDeadline) => void): void;

export class ClipTaskIntergration {
  private static _ins?: ClipTaskIntergration;
  private _signalHook: HSCore.Util.SignalHook;

  constructor() {
    this._signalHook = new HSCore.Util.SignalHook(this);
  }

  static getInstance(): ClipTaskIntergration {
    if (!this._ins) {
      this._ins = new ClipTaskIntergration();
    }
    return this._ins;
  }

  runClipTaskDefer(task: () => void, shouldDispatch?: boolean): void {
    if (shouldDispatch) {
      HSCore.Util.NCPClipTaskManager.clipTaskSignal.dispatch({
        show: true
      });
    }

    let idleTime = 0;
    requestIdleCallback((deadline: IdleDeadline) => {
      idleTime = deadline.timeRemaining();
    });

    setTimeout(() => {
      return task();
    }, idleTime);
  }

  private _existBackgroundWallOnHost(entity: EntityWithHost): boolean {
    const host = entity.host;
    if (!host || !(host instanceof HSCore.Model.Wall)) {
      return false;
    }

    return Object.values(host.faces)
      .flatMap((face) => Object.values(face))
      .flatMap((faceData) => Object.values(faceData.contents))
      .some((content) =>
        content instanceof HSCore.Model.NCustomizedParametricBackgroundWall ||
        content instanceof HSCore.Model.NCPBackgroundWallUnit
      );
  }

  listenClipTaskSignal(
    tipMessage: string = ResourceManager.getString('plugin_parametric_background_clip_tip')
  ): void {
    HSCore.Util.NCPClipTaskManager.enable();

    let startTime = 0;
    let isShowing = false;

    this._signalHook.listen(
      HSCore.Util.NCPClipTaskManager.clipTaskSignal,
      (event: SignalEvent) => {
        if (event.data.show) {
          if (!isShowing) {
            isShowing = true;
            LiveHint.hide();
            LiveHint.show(tipMessage, undefined, undefined, {
              status: LiveHint.statusEnum.loading,
              animation: false
            });
            startTime = new Date().getTime();
          }
        } else if (event.data.state === NCPClipTaskManagerState.Finished) {
          const elapsedTime = new Date().getTime() - startTime;
          const minDisplayTime = 1000;
          const delayTime = elapsedTime < minDisplayTime ? minDisplayTime - elapsedTime : 0;

          setTimeout(() => {
            isShowing = false;
            LiveHint.hide();
            this.unlistenClipTaskSignal();
          }, delayTime);
        }
      }
    );
  }

  unlistenClipTaskSignal(): void {
    HSCore.Util.NCPClipTaskManager.disable();
    this._signalHook.unlistenAll();
  }

  isNeedShowUI(entity: HSCore.Model.Entity | HSCore.Model.Opening | HSCore.Model.ParametricOpening): boolean {
    let needShow = false;

    if (entity instanceof HSCore.Model.Entity) {
      needShow = HSCore.Util.NCustomizedFeatureModel.getObstacleInfos(entity).length !== 0;
    }

    if (entity instanceof HSCore.Model.Opening || entity instanceof HSCore.Model.ParametricOpening) {
      needShow = this._existBackgroundWallOnHost(entity as EntityWithHost);
    }

    return needShow;
  }
}