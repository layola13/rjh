interface PluginManager {
  getPlugin(type: string): PersistencePlugin;
}

interface PersistencePlugin {
  signalSaveFailed: Signal;
  signalAutoSaveFailed: Signal;
}

interface Signal {
  // Signal interface definition
}

interface Context {
  pluginManager: PluginManager;
}

interface ErrorData {
  error?: unknown;
  saveType?: string;
  saveReturnData?: unknown;
}

interface ListenEventData {
  data?: ErrorData;
}

interface ErrorResult {
  errorStack?: Error;
  errorInfo?: Record<string, unknown>;
}

interface MonitorParams {
  description: string;
  group: string;
  errorStack?: Error;
  errorInfo: Record<string, unknown>;
}

interface MonitorEvent {
  name: string;
  params: MonitorParams;
}

interface ErrorListener {
  getListenSignal(context: Context): Signal;
  listen(event: ListenEventData): MonitorEvent[];
}

function parseError(error: unknown): ErrorResult {
  if (!error) {
    return {};
  }

  if (error instanceof Error) {
    return {
      errorStack: error
    };
  }

  if (typeof error === 'object' && error !== null) {
    const errorObj = error as Record<string, unknown>;
    if (errorObj.originError instanceof Error) {
      return {
        errorStack: errorObj.originError,
        errorInfo: errorObj
      };
    }
    return {
      errorInfo: errorObj
    };
  }

  if (typeof error === 'string' || typeof error === 'number') {
    return {
      errorInfo: {
        message: error
      }
    };
  }

  return {
    errorInfo: error as Record<string, unknown>
  };
}

const errorListeners: ErrorListener[] = [
  {
    getListenSignal(context: Context): Signal {
      return context.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence).signalSaveFailed;
    },
    listen(event: ListenEventData): MonitorEvent[] {
      const data = event.data ?? {};
      const { errorStack, errorInfo } = parseError(data.error);

      return [{
        name: 'save.error',
        params: {
          description: '保存过程出错',
          group: 'customizeError',
          errorStack,
          errorInfo: {
            ...(errorInfo ?? {}),
            saveType: data.saveType,
            saveReturnData: JSON.parse(JSON.stringify(data.saveReturnData ?? null))
          }
        }
      }];
    }
  },
  {
    getListenSignal(context: Context): Signal {
      return context.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence).signalAutoSaveFailed;
    },
    listen(event: ListenEventData): MonitorEvent[] {
      const data = event.data ?? {};
      const { errorStack, errorInfo } = parseError(data.error);

      return [{
        name: 'autoSave.error',
        params: {
          description: '自动保存过程出错',
          group: 'customizeError',
          errorStack,
          errorInfo: {
            ...errorInfo,
            saveReturnData: JSON.parse(JSON.stringify(data.saveReturnData ?? null))
          }
        }
      }];
    }
  }
];

export default errorListeners;