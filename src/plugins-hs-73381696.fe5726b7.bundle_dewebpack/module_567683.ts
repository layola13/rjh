interface PluginManager {
  getPlugin(pluginType: string): MarkingSystemPlugin;
}

interface MarkingSystemPlugin {
  signalMarkingToLog: Signal;
}

interface Signal {
  // Define signal properties based on your implementation
}

interface LogEventData {
  type: 'close' | 'submit' | 'open';
}

interface ListenerContext {
  pluginManager: PluginManager;
}

interface ListenerEvent {
  data: LogEventData;
}

interface ClicksRatio {
  id: string;
  name: string;
}

interface LogDataPayload {
  description: string;
  activeSection: string;
  activeSectionName: string;
  clicksRatio: ClicksRatio;
}

interface LogData {
  // Define the return type of createLogData
}

interface EventListener {
  getListenSignal(context: ListenerContext): Signal;
  listen(event: ListenerEvent): LogData[];
}

declare const HSFPConstants: {
  PluginType: {
    MarkingSystem: string;
  };
};

declare function createLogData(eventName: string, payload: LogDataPayload): LogData;

const ACTION_LABELS: Record<string, string> = {
  close: '关闭弹窗',
  submit: '提交评价',
  open: '打开弹窗'
};

const markingSystemListener: EventListener = {
  getListenSignal(context: ListenerContext): Signal {
    return context.pluginManager
      .getPlugin(HSFPConstants.PluginType.MarkingSystem)
      .signalMarkingToLog;
  },

  listen(event: ListenerEvent): LogData[] {
    const { type } = event.data;
    const clickId = `marking-${type}`;
    const actionName = ACTION_LABELS[type];
    const description = `性能评价弹窗： ${ACTION_LABELS[type]}`;

    return [
      createLogData('click.markingsystem', {
        description,
        activeSection: 'markingsystem',
        activeSectionName: '定制性能评价弹窗',
        clicksRatio: {
          id: clickId,
          name: actionName
        }
      })
    ];
  }
};

export default [markingSystemListener];