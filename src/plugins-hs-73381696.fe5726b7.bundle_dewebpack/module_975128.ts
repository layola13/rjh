import { createLogData } from './858122';

interface PluginManager {
  getPlugin(pluginType: string): PersistencePlugin;
}

interface PersistencePlugin {
  signalSaveStart: Signal;
  signalSaveSucceeded: Signal;
  signalSaveFailed: Signal;
  signalSaveProcess: Signal;
  signalAutoSaveProcess: Signal;
  signalAutoSaveChanged: Signal;
}

interface Signal {
  // Signal type definition
}

interface SaveData {
  saveType: SaveType;
  saveInfo?: unknown;
  needLog?: boolean;
  process?: string;
  description?: string;
  [key: string]: unknown;
}

interface AutoSaveData {
  autoSaveOn: boolean;
}

interface ListenerContext {
  pluginManager: PluginManager;
}

interface ListenerEvent<T> {
  data: T;
}

type SaveType = 'save' | 'saveas' | 'update' | 'edit';

interface LogListener<T = unknown> {
  getListenSignal(context: ListenerContext): Signal;
  listen(event: ListenerEvent<T>): LogData[];
}

interface LogData {
  name?: string;
  params?: Record<string, unknown>;
  enableNotes?: boolean;
}

const SAVE_TYPE_NAMES: Record<SaveType, string> = {
  save: '新建设计',
  saveas: '另存为设计',
  update: '更新设计',
  edit: '编辑设计'
};

const listeners: LogListener[] = [
  {
    getListenSignal(context: ListenerContext): Signal {
      return context.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence).signalSaveStart;
    },
    listen(event: ListenerEvent<SaveData>): LogData[] {
      const { saveType } = event.data;
      return [
        createLogData(
          'save.Design',
          {
            description: `${SAVE_TYPE_NAMES[saveType]}开始`,
            group: HSFPConstants.LogGroupTypes.SaveDesign,
            type: saveType,
            typeName: SAVE_TYPE_NAMES[saveType]
          },
          false,
          'start'
        )
      ];
    }
  },
  {
    getListenSignal(context: ListenerContext): Signal {
      return context.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence).signalSaveSucceeded;
    },
    listen(event: ListenerEvent<SaveData>): LogData[] {
      const { saveType } = event.data;
      return [
        createLogData(
          'save.Design',
          {
            description: `${SAVE_TYPE_NAMES[saveType]}完成`,
            group: HSFPConstants.LogGroupTypes.SaveDesign,
            type: saveType,
            typeName: SAVE_TYPE_NAMES[saveType],
            validOperation: true
          },
          true,
          'end'
        )
      ];
    }
  },
  {
    getListenSignal(context: ListenerContext): Signal {
      return context.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence).signalSaveFailed;
    },
    listen(event: ListenerEvent<SaveData>): LogData[] {
      const { saveType, saveInfo } = event.data;
      return [
        createLogData(
          'save.Design',
          {
            description: `${SAVE_TYPE_NAMES[saveType]}完成`,
            saveInfo,
            type: saveType,
            typeName: SAVE_TYPE_NAMES[saveType],
            validOperation: false,
            group: HSFPConstants.LogGroupTypes.SaveDesign
          },
          true,
          'end'
        )
      ];
    }
  },
  {
    getListenSignal(context: ListenerContext): Signal {
      return context.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence).signalSaveProcess;
    },
    listen(event: ListenerEvent<SaveData>): LogData[] {
      const data = event.data;
      if (data.needLog) {
        const saveParams = { ...data };
        return [
          {
            name: `save.Process.Design.${data.process}`,
            params: {
              saveParams,
              description: data.description ?? data.process,
              type: data.saveType,
              typeName: SAVE_TYPE_NAMES[data.saveType],
              group: HSFPConstants.LogGroupTypes.SaveDesign
            },
            enableNotes: true
          }
        ];
      }
      return [];
    }
  },
  {
    getListenSignal(context: ListenerContext): Signal {
      return context.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence).signalAutoSaveProcess;
    },
    listen(event: ListenerEvent<unknown>): LogData[] {
      return [];
    }
  },
  {
    getListenSignal(context: ListenerContext): Signal {
      return context.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence).signalAutoSaveChanged;
    },
    listen(event: ListenerEvent<AutoSaveData>): LogData[] {
      const { autoSaveOn } = event.data;
      return [
        {
          name: 'save.autoSaveChanged',
          params: {
            description: autoSaveOn ? '开启自动保存' : '关闭自动保存',
            autoSaveOn
          },
          enableNotes: true
        }
      ];
    }
  }
];

export default listeners;