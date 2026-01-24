/**
 * NCustomizedBeamPropertyBarHandler - 自定义梁属性栏处理器
 * 
 * 负责生成和管理自定义梁的属性面板UI配置项，包括主梁/次梁类型切换等功能。
 * Original Module ID: 745068
 */

/**
 * 应用程序实例接口
 */
interface IHSApp {
  /** 命令管理器 */
  cmdManager: ICommandManager;
  /** 插件管理器 */
  pluginManager: IPluginManager;
}

/**
 * 应用程序静态类
 */
interface IHSAppStatic {
  App: {
    getApp(): IHSApp;
  };
}

/**
 * 命令管理器接口
 */
interface ICommandManager {
  /**
   * 创建命令实例
   * @param commandType - 命令类型
   * @param args - 命令参数
   */
  createCommand(commandType: string, args: unknown[]): ICommand;
  
  /**
   * 执行命令
   * @param command - 命令实例
   * @param options - 执行选项
   */
  execute(command: ICommand, options?: Record<string, unknown>): void;
  
  /** 完成命令执行 */
  complete(): void;
}

/**
 * 命令接口
 */
interface ICommand {
  // 命令的具体实现由外部定义
}

/**
 * 插件管理器接口
 */
interface IPluginManager {
  /**
   * 获取指定类型的插件
   * @param pluginType - 插件类型标识
   */
  getPlugin(pluginType: string): ICatalogPlugin;
}

/**
 * 目录插件接口
 */
interface ICatalogPlugin {
  // 目录插件的具体方法由外部定义
}

/**
 * 梁对象接口
 */
interface IBeam {
  /**
   * 判断是否为主梁
   * @returns true表示主梁，false表示次梁
   */
  isPrimary(): boolean;
}

/**
 * 属性栏项配置接口
 */
interface IPropertyBarItem {
  /** 唯一标识符 */
  id: string;
  /** 父节点ID */
  parentId: string;
  /** 显示标签 */
  label?: string;
  /** 属性栏类型 */
  type: string;
  /** 排序权重 */
  order?: number;
  /** 子项列表 */
  items?: IPropertyBarSubItem[];
  /** 额外数据 */
  data?: unknown;
}

/**
 * 属性栏子项配置接口
 */
interface IPropertyBarSubItem {
  /** 唯一标识符 */
  id: string;
  /** 父节点ID */
  parentId: string;
  /** 属性栏类型 */
  type: string;
  /** 排序权重 */
  order: number;
  /** 控件数据 */
  data: IRadioButtonData;
}

/**
 * 单选按钮数据接口
 */
interface IRadioButtonData {
  /** 显示标签 */
  label: string;
  /** 默认选中值 */
  defaultValue: string;
  /** 可选值列表 */
  values: string[];
  /** 是否禁用 */
  disabled: boolean;
  /** 值变化回调函数 */
  onChange: (event: IChangeEvent) => void;
}

/**
 * 值变化事件接口
 */
interface IChangeEvent {
  detail: {
    /** 选中的新值 */
    value: string;
  };
}

/**
 * 资源管理器静态类
 */
interface IResourceManager {
  /**
   * 获取国际化字符串
   * @param key - 资源键名
   */
  getString(key: string): string;
}

/**
 * 常量定义
 */
interface IHSFPConstants {
  PluginType: {
    /** 目录插件类型 */
    Catalog: string;
  };
  PropertyBarType: {
    /** 三级节点类型 */
    ThirdLevelNode: string;
    /** 单选按钮类型 */
    RadioButton: string;
  };
  CommandType: {
    /** 修改梁类型命令 */
    ChangeBeamType: string;
  };
}

/**
 * 全局变量声明
 */
declare const HSApp: IHSAppStatic;
declare const HSFPConstants: IHSFPConstants;
declare const ResourceManager: IResourceManager;

/**
 * 自定义梁属性栏处理器类
 * 
 * 用于构建自定义梁的属性面板配置，提供主梁/次梁类型切换功能。
 */
export class NCustomizedBeamPropertyBarHandler {
  /** 应用程序实例 */
  private app: IHSApp;
  
  /** 目录插件实例 */
  private catalogPlugin: ICatalogPlugin;
  
  /** 命令管理器实例 */
  private cmdMgr: ICommandManager;

  /**
   * 构造函数
   * 初始化应用程序、插件和命令管理器实例
   */
  constructor() {
    this.app = HSApp.App.getApp();
    this.catalogPlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    this.cmdMgr = this.app.cmdManager;
  }

  /**
   * 获取自定义梁的属性栏配置项
   * 
   * @param beam - 梁对象实例
   * @returns 属性栏配置项数组，如果beam为空则返回空数组
   * 
   * @example
   *