interface CanvasChangeData {
  type?: string;
}

interface TrackLogCustomizedInfo {
  type?: string;
}

interface TrackLog {
  actionType: string;
  customizedInfo?: TrackLogCustomizedInfo;
}

interface UserTrackLogger {
  getLastTrackLog(): TrackLog | null;
}

interface App {
  userTrackLogger: UserTrackLogger;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

interface PluginManager {
  getPlugin(pluginType: string): ContextualToolsPlugin;
}

interface ContextualToolsPlugin {
  signalCanvasChanging: unknown;
}

interface ListenEventData {
  data?: CanvasChangeData;
}

interface TrackLogger {
  getListenSignal(event: { pluginManager: PluginManager }): unknown;
  listen(event: ListenEventData): unknown[] | undefined;
}

declare const HSFPConstants: {
  PluginType: {
    ContextualTools: string;
  };
};

declare const HSApp: HSApp;

const CANVAS_CHANGE_DESCRIPTIONS: Record<string, string> = {
  slider: "正在用slider改变2D画布大小",
  zoomOut: "点击缩小按钮",
  zoomIn: "点击放大按钮",
  fit: "点击适应画布"
};

const CANVAS_CHANGE_ACTION_TYPE = "canvas.Change";

const canvasChangeTracker: TrackLogger = {
  getListenSignal(event: { pluginManager: PluginManager }): unknown {
    return event.pluginManager
      .getPlugin(HSFPConstants.PluginType.ContextualTools)
      .signalCanvasChanging;
  },

  listen(event: ListenEventData): unknown[] | undefined {
    const data = event.data;
    const changeType = data?.type ?? "";

    if (!changeType) {
      return undefined;
    }

    const lastTrackLog = HSApp.App.getApp().userTrackLogger.getLastTrackLog();
    const customizedInfo = lastTrackLog?.customizedInfo ?? {};

    if (
      lastTrackLog &&
      lastTrackLog.actionType === CANVAS_CHANGE_ACTION_TYPE &&
      customizedInfo.type === changeType
    ) {
      return undefined;
    }

    return [
      createLogData(
        CANVAS_CHANGE_ACTION_TYPE,
        {
          description: `状态栏:${CANVAS_CHANGE_DESCRIPTIONS[changeType]}`,
          type: changeType
        },
        false
      )
    ];
  }
};

function createLogData(
  actionType: string,
  info: { description: string; type: string },
  flag: boolean
): unknown {
  // Implementation placeholder - actual implementation depends on module 858122
  return { actionType, info, flag };
}

export default [canvasChangeTracker];