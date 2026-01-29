import { createLogData } from './858122';

interface DesignTypeNames {
  floorplan: string;
  personal: string;
  historyVersion: string;
}

const designTypeNames: DesignTypeNames = {
  floorplan: "户型库打开",
  personal: "个人设计",
  historyVersion: "历史版本"
};

interface DesignData {
  type: keyof DesignTypeNames;
  description: string;
}

interface ListenEventData {
  data?: {
    type?: keyof DesignTypeNames;
    description?: string;
    firstFlush?: boolean;
  };
}

interface UtrackArgs {
  get(key: string): DesignTrackingInfo | undefined;
  set(key: string, value: DesignTrackingInfo): void;
}

interface TrackingContext {
  utrackArgs: UtrackArgs;
}

interface DesignTrackingInfo {
  description?: string;
  type?: keyof DesignTypeNames;
  typeName?: string;
}

interface LogData {
  name: string;
  params: {
    description: string;
    type?: keyof DesignTypeNames;
    typeName?: string;
    group?: string;
  };
  sendNow: boolean;
}

interface Plugin {
  signalStartLoadingDesign: unknown;
}

interface PluginManager {
  getPlugin(pluginType: string): Plugin;
}

interface DocumentContext {
  pluginManager: PluginManager;
  signalDocumentClosed: unknown;
  signalDocumentOpened: unknown;
}

interface LoadingTaskManager {
  signalFlushEnd: unknown;
}

interface EventListener {
  getListenSignal(context: DocumentContext): unknown;
  listen(event: ListenEventData, context: TrackingContext): LogData[];
}

declare const HSFPConstants: {
  PluginType: {
    Persistence: string;
  };
  LogGroupTypes: {
    OpenDesign: string;
  };
};

declare const HSApp: {
  View: {
    Base: {
      LoadingTaskManager: {
        instance(): LoadingTaskManager;
      };
    };
  };
};

const eventListeners: EventListener[] = [
  {
    getListenSignal(context: DocumentContext): unknown {
      return context.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence).signalStartLoadingDesign;
    },

    listen(event: ListenEventData, context: TrackingContext): LogData[] {
      const data = event.data as DesignData;
      const type = data.type;
      const description = `${data.description}开始`;

      context.utrackArgs.set("open.Design", {
        description: data.description,
        type: type,
        typeName: designTypeNames[type]
      });

      return [
        createLogData(
          "open.Design",
          {
            description: description,
            type: type,
            typeName: designTypeNames[type],
            group: HSFPConstants.LogGroupTypes.OpenDesign
          },
          false,
          "start"
        )
      ];
    }
  },
  {
    getListenSignal(context: DocumentContext): unknown {
      return HSApp.View.Base.LoadingTaskManager.instance().signalFlushEnd;
    },

    listen(event: ListenEventData, context: TrackingContext): LogData[] {
      if (event.data?.firstFlush) {
        const trackingInfo = context.utrackArgs.get("open.Design");
        const description = trackingInfo?.description ? `${trackingInfo.description}结束` : "";
        const type = trackingInfo?.type ?? "" as keyof DesignTypeNames;

        context.utrackArgs.set("open.Design", {});

        return [
          createLogData(
            "open.Design",
            {
              description: description,
              type: type,
              typeName: designTypeNames[type],
              group: HSFPConstants.LogGroupTypes.OpenDesign
            },
            true,
            "end"
          )
        ];
      }

      return [];
    }
  },
  {
    getListenSignal(context: DocumentContext): unknown {
      return context.signalDocumentClosed;
    },

    listen(event: ListenEventData, context: TrackingContext): LogData[] {
      return [
        {
          name: "document.Closed",
          params: {
            description: "关闭方案"
          },
          sendNow: false
        }
      ];
    }
  },
  {
    getListenSignal(context: DocumentContext): unknown {
      return context.signalDocumentOpened;
    },

    listen(event: ListenEventData, context: TrackingContext): LogData[] {
      return [
        {
          name: "document.Opened",
          params: {
            description: "方案打开完成"
          },
          sendNow: false
        }
      ];
    }
  }
];

export default eventListeners;