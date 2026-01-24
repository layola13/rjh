/**
 * 灯带实体参数配置
 */
interface LightBandParameters {
  /** 灯带路径 */
  path?: string;
  /** 参数集合 */
  parameters?: {
    /** 是否翻转 */
    flip?: boolean;
    [key: string]: unknown;
  };
  /** 配置选项 */
  options?: Record<string, unknown>;
  /** 错误代码，-1表示无错误 */
  error?: number;
}

/**
 * 单选按钮配置项
 */
interface RadioButtonConfig {
  /** 按钮图标资源 */
  src: [string, string];
}

/**
 * 灯带属性栏数据配置
 */
interface LightBandPropertyData {
  /** CSS类名 */
  className: string;
  /** 显示标签文本 */
  label: string;
  /** 按钮配置数组 */
  btns: RadioButtonConfig[];
  /** 
   * 值变化回调
   * @param selectedIndex - 选中的按钮索引 (0: 未翻转, 1: 已翻转)
   */
  onchange: (selectedIndex: number) => void;
  /** 默认选中索引 */
  selectedIndex: number;
}

/**
 * 属性栏控件项配置
 */
interface PropertyBarItem {
  /** 控件唯一标识 */
  id: string;
  /** 控件类型枚举 */
  type: PropertyBarControlTypeEnum;
  /** 显示顺序 */
  order: number;
  /** 控件数据配置 */
  data: LightBandPropertyData;
}

/**
 * 灯带实体接口
 */
interface LightBandEntity {
  /**
   * 获取灯带参数配置
   * @returns 灯带参数对象
   */
  getParameters(): LightBandParameters;
}

/**
 * 模型实例接口
 */
interface ModelInstance {
  /**
   * 根据ID获取灯带实体
   * @param id - 灯带实体ID
   * @returns 灯带实体对象
   */
  getLightBandEntityById(id: string): LightBandEntity;
}

/**
 * 命令接口
 */
interface Command {
  // 命令执行接口
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /**
   * 创建命令
   * @param commandType - 命令类型
   * @param args - 命令参数数组
   * @returns 命令实例
   */
  createCommand(commandType: string, args: unknown[]): Command;
  
  /**
   * 执行命令
   * @param command - 要执行的命令
   */
  execute(command: Command): void;
  
  /**
   * 接收参数变更
   * @param key - 参数键名
   * @param value - 参数值
   */
  receive(key: string, value: unknown): void;
  
  /**
   * 完成命令执行
   */
  complete(): void;
}

/**
 * 目录插件接口
 */
interface CatalogPlugin {
  // 目录插件相关方法
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  /**
   * 获取指定类型的插件
   * @param pluginType - 插件类型
   * @returns 插件实例
   */
  getPlugin(pluginType: string): CatalogPlugin;
}

/**
 * 应用程序接口
 */
interface App {
  /** 插件管理器 */
  pluginManager: PluginManager;
  /** 命令管理器 */
  cmdManager: CommandManager;
}

/**
 * 全局HSApp命名空间
 */
declare namespace HSApp {
  namespace App {
    /**
     * 获取应用实例
     * @returns 应用程序实例
     */
    function getApp(): App;
  }
}

/**
 * 全局常量定义
 */
declare namespace HSFPConstants {
  enum PluginType {
    Catalog = 'Catalog'
  }
  
  enum CommandType {
    EditCustomizedModelLightBand = 'EditCustomizedModelLightBand'
  }
}

/**
 * 属性栏控件类型枚举
 */
declare enum PropertyBarControlTypeEnum {
  radioButton = 'radioButton'
}

/**
 * 资源管理器
 */
declare namespace ResourceManager {
  /**
   * 根据键获取国际化字符串
   * @param key - 资源键名
   * @returns 本地化字符串
   */
  function getString(key: string): string;
}

/**
 * 自定义灯带属性管理器
 * 用于生成和管理自定义建模中的灯带属性栏控件
 */
export default class CustomizedLightBandPropertyManager {
  /** 应用程序实例 */
  private readonly app: App;
  
  /** 目录插件实例 */
  private readonly catalogPlugin: CatalogPlugin;
  
  /** 命令管理器实例 */
  private readonly cmdMgr: CommandManager;

  /**
   * 构造函数
   * 初始化应用、插件和命令管理器实例
   */
  constructor();

  /**
   * 获取自定义灯带属性栏控件项列表
   * @param modelInstance - 模型实例，包含灯带实体数据
   * @param lightBandId - 灯带实体唯一标识符
   * @returns 属性栏控件项数组，如果参数无效或出错则返回空数组
   * 
   * @remarks
   * - 当lightBandId包含"manualAddLightBand"时，会添加翻转控制按钮
   * - 翻转按钮允许用户切换灯带的方向（正向/反向）
   * - 所有参数变更通过命令模式执行，支持撤销/重做
   */
  getCustomizedLightBandItems(
    modelInstance: ModelInstance, 
    lightBandId: string
  ): PropertyBarItem[];
}