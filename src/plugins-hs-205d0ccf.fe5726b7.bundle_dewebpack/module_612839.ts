import { HSCore } from './635589';

interface RemindSignal {
  getSignal(): string | null;
  listen(data: unknown): unknown;
}

interface RemindSignalModule {
  getRemindSignalList(): RemindSignal[];
}

interface App {
  signalCustomFunctionStart?: {
    dispatch(data: unknown): void;
  };
}

interface HSApp {
  App: {
    getApp(): App | null;
  };
}

declare const HSApp: HSApp;

const modulesContext = require.context('./250687', true, /\.ts$/);
let modulesList: Array<new () => RemindSignalModule> = [];

modulesContext.keys().forEach((key: string) => {
  const moduleExport = modulesContext(key).default;
  if (moduleExport) {
    modulesList = modulesList.concat(moduleExport);
  }
});

class RemindSignalManager {
  private modules: Array<new () => RemindSignalModule>;
  private signalHook: HSCore.Util.SignalHook;
  private isInit: boolean;

  constructor() {
    this.modules = modulesList;
    this.signalHook = new HSCore.Util.SignalHook();
    this.isInit = false;
  }

  init(): void {
    if (this.isInit) {
      return;
    }

    this.isInit = true;

    this.modules.forEach((ModuleClass) => {
      const moduleInstance = new ModuleClass();
      
      moduleInstance.getRemindSignalList().forEach((remindSignal) => {
        const signal = remindSignal.getSignal();
        
        if (signal) {
          this.signalHook.listen(signal, (data: unknown) => {
            const app = HSApp.App.getApp();
            const result = remindSignal.listen(data);
            
            if (result && app?.signalCustomFunctionStart) {
              app.signalCustomFunctionStart.dispatch(result);
            }
          });
        }
      });
    });
  }

  uninit(): void {
    this.isInit = false;
    this.signalHook.unlistenAll();
  }
}

export default new RemindSignalManager();