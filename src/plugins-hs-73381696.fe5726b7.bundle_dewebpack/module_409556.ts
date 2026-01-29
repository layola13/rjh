import { createLogData } from './858122';

interface LogData {
  saveUserSetting: unknown;
}

interface UserSettingPlugin {
  signalUserSettingToLog: unknown;
}

interface PluginManager {
  getPlugin(pluginType: string): UserSettingPlugin;
}

interface ListenEventData {
  data: {
    data: unknown;
  };
}

interface ListenEvent {
  data: ListenEventData;
}

interface PluginContext {
  pluginManager: PluginManager;
}

interface LogListener {
  getListenSignal(context: PluginContext): unknown;
  listen(event: ListenEvent): LogData[];
}

const logListeners: LogListener[] = [
  {
    getListenSignal(context: PluginContext): unknown {
      return context.pluginManager
        .getPlugin(HSFPConstants.PluginType.UserSetting)
        .signalUserSettingToLog;
    },

    listen(event: ListenEvent): LogData[] {
      const userData = event.data.data;
      return [
        createLogData('click.userSetting', {
          saveUserSetting: userData,
        }),
      ];
    },
  },
];

export default logListeners;