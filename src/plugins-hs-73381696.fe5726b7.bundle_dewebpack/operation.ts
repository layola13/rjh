enum OperationType {
  saveDesign = "saveDesign"
}

interface OperationConfig {
  type: OperationType;
  getStartSignal: (context: PluginContext) => Signal | undefined;
  getEndSignal: (context: PluginContext) => Signal | undefined;
}

interface PluginContext {
  pluginManager: PluginManager;
}

interface PluginManager {
  getPlugin(type: string): Plugin | null;
}

interface Plugin {
  signalSaveStart?: Signal;
  signalSaveSucceeded?: Signal;
}

interface Signal {
  // Signal interface placeholder
}

const logger = log.logger("HSApp.Plugin.Metrics.Performance.Operation");
logger.silence = true;

const operationConfigs: OperationConfig[] = [
  {
    type: OperationType.saveDesign,
    getStartSignal: (context: PluginContext): Signal | undefined => {
      const plugin = context.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence);
      return plugin?.signalSaveStart;
    },
    getEndSignal: (context: PluginContext): Signal | undefined => {
      const plugin = context.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence);
      return plugin?.signalSaveSucceeded;
    }
  }
];

export class Operation {
  private static _signalHook = new HSCore.Util.SignalHook(Operation);

  /**
   * Activates performance monitoring for configured operations
   */
  static active(context: PluginContext): void {
    operationConfigs.forEach((config) => {
      const { type, getStartSignal, getEndSignal } = config;
      const startSignal = getStartSignal(context);
      const endSignal = getEndSignal(context);

      if (startSignal && endSignal) {
        this._signalHook.listen(startSignal, () => {
          logger.time(type);
        });

        this._signalHook.listen(endSignal, () => {
          logger.timeEnd(type, true);
        });
      }
    });
  }

  /**
   * Clears all signal listeners
   */
  static clear(): void {
    this._signalHook.unlistenAll();
  }
}