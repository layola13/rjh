import { createLogData } from './module_858122';
import { HSConstants } from './module_635589';

interface TransactionManager {
  signalCreated: unknown;
  signalCommitted: unknown;
}

interface CommandManager {
  current: unknown;
}

interface App {
  cmdManager: CommandManager;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

declare const HSApp: HSApp;

interface Request {
  type: string;
  isInteractive(): boolean;
  getDescription(): string | null;
  getCategory(): string;
  getCurrentParams?(): CurrentParams | null;
}

interface CurrentParams {
  activeSection?: string;
  activeSectionName?: string;
  clicksRatio?: Record<string, unknown>;
}

interface TransactionData {
  request?: Request;
}

interface ListenEventData {
  data: TransactionData;
}

interface LoggerContext {
  transManager: TransactionManager;
}

interface LogDescription {
  description: string;
  group: string;
  activeSection?: string;
  activeSectionName?: string;
  clicksRatio?: Record<string, unknown>;
}

interface Logger {
  getListenSignal(context: LoggerContext): unknown;
  listen(event: ListenEventData): ReturnType<typeof createLogData>[] | undefined;
}

const EXCLUDED_REQUEST_TYPES: string[] = [HSConstants.RequestType.Composite];

const loggers: Logger[] = [
  {
    getListenSignal(context: LoggerContext): unknown {
      return context.transManager.signalCreated;
    },

    listen(event: ListenEventData): ReturnType<typeof createLogData>[] | undefined {
      const transactionData = event.data;
      if (!transactionData.request) {
        return undefined;
      }

      const request = transactionData.request;
      const requestType = request.type;

      if (EXCLUDED_REQUEST_TYPES.includes(requestType)) {
        return undefined;
      }

      if (HSApp.App.getApp().cmdManager.current) {
        return undefined;
      }

      const isInteractive = request.isInteractive();
      const logDescription: LogDescription = {
        description: request.getDescription() || '需要添加操作描述',
        group: request.getCategory()
      };

      if (isInteractive) {
        logDescription.description = `${logDescription.description}开始`;
        return [createLogData(requestType, logDescription, false, 'start')];
      }

      return undefined;
    }
  },
  {
    getListenSignal(context: LoggerContext): unknown {
      return context.transManager.signalCommitted;
    },

    listen(event: ListenEventData): ReturnType<typeof createLogData>[] | undefined {
      const transactionData = event.data;
      if (!transactionData.request) {
        return undefined;
      }

      const request = transactionData.request;
      const requestType = request.type;

      if (EXCLUDED_REQUEST_TYPES.includes(requestType)) {
        return undefined;
      }

      if (HSApp.App.getApp().cmdManager.current) {
        return undefined;
      }

      const isInteractive = request.isInteractive();
      const description = request.getDescription();
      const currentParams = request.getCurrentParams?.();

      const sectionInfo: LogDescription = {
        description: description || '需要添加操作描述',
        group: request.getCategory()
      };

      if (currentParams) {
        const { activeSection, activeSectionName, clicksRatio } = currentParams;

        if (activeSection && activeSectionName && clicksRatio) {
          sectionInfo.activeSection = activeSection;
          sectionInfo.activeSectionName = activeSectionName;
          sectionInfo.clicksRatio = clicksRatio;
        }
      }

      if (isInteractive) {
        sectionInfo.description = `${sectionInfo.description}结束`;
        return [createLogData(requestType, sectionInfo, false, 'end')];
      }

      return [createLogData(requestType, sectionInfo, false)];
    }
  }
];

export default loggers;