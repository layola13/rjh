import { HSCore } from './635589';
import { LogTriggerType } from './985785';

interface TrackEvent {
  options?: {
    triggerType?: LogTriggerType;
    notSend?: boolean;
    noDuration?: boolean;
    actionTypeSuffix?: string;
  };
  params?: Record<string, unknown> & {
    group?: string;
    realDuration?: number;
    duration?: number;
  };
  id: string;
  log?: {
    customizedInfo?: {
      realDuration?: number;
      duration?: number;
    };
  };
}

interface DispatchPayload {
  actionType: string;
  params: Record<string, unknown>;
  options: {
    triggerType: LogTriggerType;
    notSend?: boolean;
    noDuration: boolean;
    actionTypeSuffix?: string;
  };
}

interface UserTrackLogger {
  on(event: string, handler: (data: TrackEvent) => void): void;
}

interface App {
  userTrackLogger: UserTrackLogger;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

declare const HSApp: HSApp;

class UserTrackSignalManager {
  public userTrackLogger: UserTrackLogger;
  public pushSignal: HSCore.Util.Signal<DispatchPayload>;

  constructor() {
    this.pushSignal = new HSCore.Util.Signal<DispatchPayload>();
    this.listenStart = this.listenStart.bind(this);
    this.listenEnd = this.listenEnd.bind(this);
    this.userTrackLogger = HSApp.App.getApp().userTrackLogger;
    this.userTrackLogger.on('usertack-push-log', this.listenStart);
    this.userTrackLogger.on('usertack-push-end', this.listenEnd);
  }

  listenStart(event: TrackEvent): void {
    const { options, params, id } = event;
    
    if (options?.triggerType === LogTriggerType.START && params?.group) {
      this.pushSignal.dispatch({
        actionType: id,
        params,
        options: {
          triggerType: LogTriggerType.START,
          notSend: true,
          noDuration: true
        }
      });
    }
  }

  listenEnd(event: TrackEvent): void {
    const { options, params, id, log } = event;
    
    if (options?.triggerType === LogTriggerType.END && params?.group) {
      const enhancedParams = {
        ...params,
        realDuration: log?.customizedInfo?.realDuration,
        duration: log?.customizedInfo?.duration
      };

      this.pushSignal.dispatch({
        actionType: id,
        params: enhancedParams,
        options: {
          triggerType: LogTriggerType.END,
          noDuration: true,
          actionTypeSuffix: ''
        }
      });
    }
  }
}

const signalManager = new UserTrackSignalManager();

interface ListenerModule {
  getListenSignal(): HSCore.Util.Signal<DispatchPayload>;
  listen(event: { data: unknown }): unknown[];
}

const listenerModules: ListenerModule[] = [
  {
    getListenSignal(): HSCore.Util.Signal<DispatchPayload> {
      return signalManager.pushSignal;
    },
    listen(event: { data: unknown }): unknown[] {
      return [event.data];
    }
  }
];

export default listenerModules;