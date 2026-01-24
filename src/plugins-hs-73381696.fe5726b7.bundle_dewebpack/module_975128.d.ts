/**
 * 保存操作类型枚举
 */
type SaveType = 'save' | 'saveas' | 'update' | 'edit';

/**
 * 保存操作类型的中文名称映射
 */
interface SaveTypeNames {
  save: '新建设计';
  saveas: '另存为设计';
  update: '更新设计';
  edit: '编辑设计';
}

/**
 * 日志分组类型
 */
declare namespace HSFPConstants {
  enum LogGroupTypes {
    SaveDesign = 'SaveDesign'
  }
  
  enum PluginType {
    Persistence = 'Persistence'
  }
}

/**
 * 保存数据接口
 */
interface SaveData {
  /** 保存类型 */
  saveType: SaveType;
  /** 保存信息（仅失败时存在） */
  saveInfo?: unknown;
}

/**
 * 保存过程数据接口
 */
interface SaveProcessData {
  /** 是否需要记录日志 */
  needLog: boolean;
  /** 保存类型 */
  saveType: SaveType;
  /** 当前进度标识 */
  process: string;
  /** 进度描述 */
  description?: string;
  /** 其他动态属性 */
  [key: string]: unknown;
}

/**
 * 自动保存变更数据接口
 */
interface AutoSaveChangedData {
  /** 是否开启自动保存 */
  autoSaveOn: boolean;
}

/**
 * 事件数据包装接口
 */
interface EventData<T> {
  data: T;
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  /**
   * 获取指定类型的插件
   * @param pluginType 插件类型
   */
  getPlugin(pluginType: HSFPConstants.PluginType): PersistencePlugin;
}

/**
 * 持久化插件接口
 */
interface PersistencePlugin {
  /** 保存开始信号 */
  signalSaveStart: Signal<SaveData>;
  /** 保存成功信号 */
  signalSaveSucceeded: Signal<SaveData>;
  /** 保存失败信号 */
  signalSaveFailed: Signal<SaveData>;
  /** 保存过程信号 */
  signalSaveProcess: Signal<SaveProcessData>;
  /** 自动保存过程信号 */
  signalAutoSaveProcess: Signal<unknown>;
  /** 自动保存变更信号 */
  signalAutoSaveChanged: Signal<AutoSaveChangedData>;
}

/**
 * 信号类型（泛型）
 */
type Signal<T> = unknown;

/**
 * 应用上下文接口
 */
interface AppContext {
  /** 插件管理器实例 */
  pluginManager: PluginManager;
}

/**
 * 日志数据接口
 */
interface LogData {
  /** 日志名称 */
  name: string;
  /** 日志参数 */
  params: {
    /** 描述信息 */
    description: string;
    /** 日志分组 */
    group: HSFPConstants.LogGroupTypes;
    /** 保存类型 */
    type: SaveType;
    /** 保存类型名称 */
    typeName: string;
    /** 是否有效操作（成功/失败标识） */
    validOperation?: boolean;
    /** 保存信息（失败时） */
    saveInfo?: unknown;
    /** 保存参数（过程中） */
    saveParams?: Record<string, unknown>;
    /** 自动保存开关状态 */
    autoSaveOn?: boolean;
  };
  /** 是否启用备注 */
  enableNotes: boolean;
}

/**
 * 监听器配置接口
 */
interface ListenerConfig<T = unknown> {
  /**
   * 获取要监听的信号
   * @param context 应用上下文
   * @returns 返回对应的信号对象
   */
  getListenSignal(context: AppContext): Signal<T>;
  
  /**
   * 监听器处理函数
   * @param event 事件数据
   * @returns 返回日志数据数组
   */
  listen(event: EventData<T>): LogData[] | undefined;
}

/**
 * 创建日志数据的工具函数
 * @param name 日志名称
 * @param params 日志参数
 * @param enableNotes 是否启用备注
 * @param stage 阶段标识（start/end）
 * @returns 返回格式化的日志数据
 */
declare function createLogData(
  name: string,
  params: LogData['params'],
  enableNotes: boolean,
  stage?: 'start' | 'end'
): LogData;

/**
 * 保存设计相关的监听器配置数组
 * 包含以下监听器：
 * 1. 保存开始监听器
 * 2. 保存成功监听器
 * 3. 保存失败监听器
 * 4. 保存过程监听器
 * 5. 自动保存过程监听器
 * 6. 自动保存状态变更监听器
 */
declare const saveDesignListeners: [
  ListenerConfig<SaveData>,
  ListenerConfig<SaveData>,
  ListenerConfig<SaveData>,
  ListenerConfig<SaveProcessData>,
  ListenerConfig<unknown>,
  ListenerConfig<AutoSaveChangedData>
];

export default saveDesignListeners;