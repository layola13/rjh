import { LogTriggerType } from './375717';
import { CommandTypes } from './579007';
import { HSApp } from './518193';

interface CommandData {
  cmd?: {
    type: string;
    getDescription?: () => string;
  };
  status?: string;
}

interface SignalData {
  data: CommandData;
}

interface CommandParams {
  actionType?: string;
  description?: string;
  notUseful?: boolean;
}

interface LogOptions {
  triggerType: LogTriggerType;
  notSend?: boolean;
  enableNotes?: boolean;
}

interface LogParams {
  description: string;
  group: string;
  groupName: string;
  status?: string;
}

interface LogEntry {
  actionType: string;
  options: LogOptions;
  params: LogParams;
}

interface CommandManager {
  signalCommandCreated: unknown;
  signalCommandTerminated: unknown;
}

interface AppContext {
  cmdManager: CommandManager;
}

interface CommandTypeConfig {
  getParams?: (app: unknown, data: CommandData) => CommandParams;
}

interface LogListener {
  getListenSignal: (context: AppContext) => unknown;
  listen: (event: SignalData) => LogEntry[] | void;
}

const logListeners: LogListener[] = [
  {
    getListenSignal: (context: AppContext) => {
      return context.cmdManager.signalCommandCreated;
    },
    listen: (event: SignalData): LogEntry[] | void => {
      const commandData = event.data;
      const app = HSApp.App.getApp();
      const commandType = commandData?.cmd?.type;

      if (!CommandTypes[commandType]) {
        return [];
      }

      let actionType = '';
      let description = '';
      const commandTypeConfig = CommandTypes[commandType] as CommandTypeConfig;

      if (commandTypeConfig instanceof Object && commandTypeConfig?.getParams) {
        const params = commandTypeConfig.getParams(app, commandData);
        const { actionType: paramActionType, description: paramDescription, notUseful } = params;

        if (notUseful) {
          return;
        }

        actionType = paramActionType || '';
        description = paramDescription || '';
      }

      actionType = actionType || commandType;
      description = description || commandData.cmd?.getDescription?.() || actionType;

      return [
        {
          actionType,
          options: {
            triggerType: LogTriggerType.START,
            notSend: true,
            enableNotes: false,
          },
          params: {
            description,
            group: actionType,
            groupName: description,
          },
        },
      ];
    },
  },
  {
    getListenSignal: (context: AppContext) => {
      return context.cmdManager.signalCommandTerminated;
    },
    listen: (event: SignalData): LogEntry[] | void => {
      const commandData = event.data;
      const app = HSApp.App.getApp();
      const commandType = commandData?.cmd?.type;

      if (CommandTypes[commandType]) {
        let actionType = '';
        let description = '';
        const commandTypeConfig = CommandTypes[commandType] as CommandTypeConfig;

        if (commandTypeConfig instanceof Object && commandTypeConfig?.getParams) {
          const params = commandTypeConfig.getParams(app, commandData);
          const { actionType: paramActionType, description: paramDescription, notUseful } = params;

          if (notUseful) {
            return;
          }

          actionType = paramActionType || '';
          description = paramDescription || '';
        }

        actionType = actionType || commandType;
        description = description || commandData.cmd?.getDescription?.() || actionType;

        return [
          {
            actionType,
            options: {
              triggerType: LogTriggerType.END,
            },
            params: {
              description,
              status: commandData.status,
              group: actionType,
              groupName: description,
            },
          },
        ];
      }
    },
  },
];

export default logListeners;