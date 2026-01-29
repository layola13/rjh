import { createLogData } from './module_858122';
import { 
  dumpSelectionInfo, 
  operationClassify, 
  validOperation, 
  isSingleRoomModeEnd 
} from './module_508165';
import { commandName } from './module_953541';

interface CommandParams {
  activeSection?: string;
  activeSectionName?: string;
  clicksRatio?: Record<string, unknown>;
  [key: string]: unknown;
}

interface Command {
  type: string;
  isInteractive(): boolean;
  getDescription(): string | undefined;
  getCategory(): string | undefined;
  getCurrentParams(): CommandParams | undefined;
}

interface CommandEvent {
  data: {
    cmd: Command;
  };
}

interface LogArgInfo {
  selectionInfo: unknown;
  activeSection?: string;
  activeSectionName?: string;
  clicksRatio?: Record<string, unknown>;
  [key: string]: unknown;
}

interface LogInfo {
  description: string;
  argInfo: LogArgInfo;
  group: string;
  type?: string;
  validOperation?: unknown;
}

interface SignalListener {
  getListenSignal(app: { cmdManager: { signalCommandCreated: unknown; signalCommandTerminated: unknown } }): unknown;
  listen(event: CommandEvent): Array<unknown> | undefined;
}

const listeners: SignalListener[] = [
  {
    getListenSignal(app) {
      return app.cmdManager.signalCommandCreated;
    },

    listen(event: CommandEvent) {
      if (!event.data.cmd) {
        return undefined;
      }

      const cmd = event.data.cmd;
      const commandType = cmd.type;
      const isInteractive = cmd.isInteractive();
      const description = cmd.getDescription();
      const category = cmd.getCategory();
      const currentParams = cmd.getCurrentParams();
      const durationCommands = commandName.duration;

      if (commandName.excludes.includes(commandType) || (!isInteractive && !durationCommands[commandType])) {
        return undefined;
      }

      let argInfo: LogArgInfo = {
        selectionInfo: dumpSelectionInfo()
      };

      if (currentParams) {
        argInfo = Object.assign(argInfo, currentParams);
      }

      const operationDescription = description || durationCommands[commandType];
      const logInfo: LogInfo = {
        description: operationDescription ? `${operationDescription}开始` : '需要添加操作描述',
        argInfo,
        group: category || operationClassify(commandType)
      };

      const selectedEntitiesType = HSApp.Util.LoggerUtil.getSelectedEntitiesType();
      if (selectedEntitiesType) {
        Object.assign(logInfo, { type: selectedEntitiesType });
      }

      return [createLogData(commandType, logInfo, false, 'start')];
    }
  },
  {
    getListenSignal(app) {
      return app.cmdManager.signalCommandTerminated;
    },

    listen(event: CommandEvent) {
      const cmd = event.data.cmd;
      const commandType = cmd.type;
      const excludedCommands = commandName.excludes;

      if (!cmd || excludedCommands.includes(commandType)) {
        return undefined;
      }

      const isInteractive = cmd.isInteractive();
      const description = cmd.getDescription();
      const category = cmd.getCategory();
      const currentParams = cmd.getCurrentParams();

      let argInfo: LogArgInfo = {
        selectionInfo: dumpSelectionInfo()
      };

      const sectionInfo = {
        activeSection: '',
        activeSectionName: '',
        clicksRatio: {}
      };

      if (currentParams) {
        argInfo = Object.assign(argInfo, currentParams);
        const { activeSection, activeSectionName, clicksRatio } = currentParams;

        if (activeSection && activeSectionName && clicksRatio) {
          Object.assign(sectionInfo, {
            activeSection,
            activeSectionName,
            clicksRatio
          });
        }
      }

      const selectedEntitiesType = HSApp.Util.LoggerUtil.getSelectedEntitiesType();
      const durationCommands = commandName.duration;
      const triggerCommands = commandName.trigger;

      const logInfo: LogInfo = {
        description: description || durationCommands[commandType] || triggerCommands[commandType] || '需要添加操作描述',
        argInfo,
        group: category || operationClassify(commandType)
      };

      if (selectedEntitiesType) {
        Object.assign(logInfo, { type: selectedEntitiesType });
      }

      if (sectionInfo.activeSection) {
        Object.assign(logInfo, sectionInfo);
      }

      if (isInteractive || durationCommands[commandType]) {
        logInfo.description = `${logInfo.description}结束`;
        const validOp = validOperation(commandType);

        if (validOp !== undefined) {
          Object.assign(logInfo, { validOperation: validOp });
        }

        isSingleRoomModeEnd(commandType);

        return [createLogData(commandType, logInfo, false, 'end')];
      }

      return [createLogData(commandType, logInfo, false)];
    }
  }
];

export default listeners;