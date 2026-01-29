import { createLogData } from './858122';
import { getBatchRequestInfo } from './508165';

interface TransManager {
  signalUndone: unknown;
  signalRedone: unknown;
}

interface ListenContext {
  transManager: TransManager;
}

interface RequestInfo {
  type: string;
  [key: string]: unknown;
}

interface RequestData {
  request?: RequestInfo;
}

interface ListenEventData {
  data: RequestData;
}

interface BatchRequestInfo {
  arg: unknown;
  description: string;
  group: string;
}

interface LogDataInfo {
  type: string;
  description: string;
  argInfo: unknown;
  group: string;
}

interface LogListener {
  getListenSignal: (context: ListenContext) => unknown;
  listen: (event: ListenEventData) => Array<ReturnType<typeof createLogData>>;
}

const logListeners: LogListener[] = [
  {
    getListenSignal(context: ListenContext) {
      return context.transManager.signalUndone;
    },

    listen(event: ListenEventData) {
      const { data } = event;
      
      if (data.request) {
        const requestType = data.request.type;
        const batchInfo: BatchRequestInfo = getBatchRequestInfo(data.request);
        const { arg, description, group } = batchInfo;
        
        const logInfo: LogDataInfo = {
          type: requestType,
          description: `撤销操作--${description || '需要添加描述'}`,
          argInfo: arg,
          group: group
        };
        
        return [createLogData('undo.Design', logInfo)];
      }
      
      return [];
    }
  },
  {
    getListenSignal(context: ListenContext) {
      return context.transManager.signalRedone;
    },

    listen(event: ListenEventData) {
      const { data } = event;
      
      if (data.request) {
        const requestType = data.request.type;
        const batchInfo: BatchRequestInfo = getBatchRequestInfo(data.request);
        const { arg, description, group } = batchInfo;
        
        const logInfo: LogDataInfo = {
          type: requestType,
          description: `恢复操作--${description || '需要添加描述'}`,
          argInfo: arg,
          group: group
        };
        
        return [createLogData('redo.Design', logInfo)];
      }
      
      return [];
    }
  }
];

export default logListeners;