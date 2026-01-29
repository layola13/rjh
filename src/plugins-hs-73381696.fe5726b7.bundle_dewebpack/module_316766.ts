import { computerLogList } from './module_577215';
import { performanceDateNow } from './module_985785';

interface EnvironmentData {
  newEnvironmentId?: string;
  oldEnvironmentId?: string;
  environmentId?: string;
  env?: unknown;
  oldEnv?: unknown;
}

interface SignalData {
  data?: EnvironmentData;
}

interface LastEnvironment {
  environmentId: string;
  currentTime?: number;
  performanceCurrentTime?: number;
}

interface EnvironmentManager {
  signalEnvironmentActivated: unknown;
  signalEnvironmentResumed: unknown;
}

interface AppContext {
  environmentManager: EnvironmentManager;
}

interface SuspendedEnvironment {
  id: string;
}

interface App {
  getPendingSuspendedEnvironment(): SuspendedEnvironment | null | undefined;
}

interface HSAppInstance {
  App: {
    getApp(): App;
  };
}

declare const HSApp: HSAppInstance;

interface ComputerLog {
  test(params: {
    newEnvironmentId?: string;
    oldEnvironmentId?: string;
    lastEnviroment: LastEnvironment;
  }): boolean;
  getLogDataList(params: {
    newEnvironmentId?: string;
    oldEnvironmentId?: string;
    lastEnviroment: LastEnvironment;
    env?: unknown;
    oldEnv?: unknown;
  }): unknown;
}

interface EnvironmentListener {
  getListenSignal(context: AppContext): unknown;
  lastEnviroment?: LastEnvironment;
  listen(signal: SignalData): unknown;
}

const listeners: EnvironmentListener[] = [
  {
    getListenSignal(context: AppContext): unknown {
      return context.environmentManager.signalEnvironmentActivated;
    },
    lastEnviroment: {
      environmentId: ''
    },
    listen(signal: SignalData): unknown {
      const data = signal.data ?? {};
      const newEnvironmentId = data.newEnvironmentId;
      const oldEnvironmentId = data.oldEnvironmentId;
      const env = data.env;
      const oldEnv = data.oldEnv;

      if (newEnvironmentId !== oldEnvironmentId) {
        let logDataList: unknown;
        let actualOldEnvironmentId = oldEnvironmentId;

        if (!actualOldEnvironmentId) {
          const suspendedEnvironment = HSApp.App.getApp().getPendingSuspendedEnvironment();
          actualOldEnvironmentId = suspendedEnvironment?.id;
        }

        const matchedLog = computerLogList.find((log: ComputerLog) => {
          return log.test({
            newEnvironmentId,
            oldEnvironmentId: actualOldEnvironmentId,
            lastEnviroment: this.lastEnviroment!
          });
        });

        if (matchedLog) {
          logDataList = matchedLog.getLogDataList({
            newEnvironmentId,
            oldEnvironmentId: actualOldEnvironmentId,
            lastEnviroment: this.lastEnviroment!,
            env,
            oldEnv
          });
        }

        this.lastEnviroment = {
          environmentId: oldEnvironmentId ?? '',
          currentTime: Date.now(),
          performanceCurrentTime: performanceDateNow()
        };

        return logDataList;
      }
    }
  },
  {
    getListenSignal(context: AppContext): unknown {
      return context.environmentManager.signalEnvironmentResumed;
    },
    listen(signal: SignalData): unknown {
      const data = signal.data ?? {};
      const environmentId = data.environmentId;
      const oldEnvironmentId = data.oldEnvironmentId;
      const env = data.env;
      const oldEnv = data.oldEnv;

      if (environmentId !== oldEnvironmentId) {
        let logDataList: unknown;
        const actualOldEnvironmentId = oldEnvironmentId;

        const matchedLog = computerLogList.find((log: ComputerLog) => {
          return log.test({
            newEnvironmentId: environmentId,
            oldEnvironmentId: actualOldEnvironmentId,
            lastEnviroment: this.lastEnviroment!
          });
        });

        if (matchedLog) {
          logDataList = matchedLog.getLogDataList({
            newEnvironmentId: environmentId,
            oldEnvironmentId: actualOldEnvironmentId,
            lastEnviroment: this.lastEnviroment!,
            env,
            oldEnv
          });
        }

        return logDataList;
      }
    }
  }
];

export default listeners;