/**
 * 自定义灯带属性栏处理器
 * 负责管理灯带实体的属性面板配置和交互逻辑
 */

/**
 * 灯带参数接口
 */
interface LightBandParameters {
  /** 灯带路径定义 */
  path: any;
  /** 灯带参数配置 */
  parameters: {
    /** 是否翻转 */
    flip: boolean;
    [key: string]: any;
  };
  /** 灯带选项配置 */
  options: Record<string, any>;
  /** 错误码，-1表示无错误 */
  error?: number;
}

/**
 * 灯带实体接口
 */
interface LightBandEntity {
  /**
   * 获取灯带参数
   * @returns 灯带参数对象
   */
  getParameters(): LightBandParameters;
}

/**
 * 灯带管理器接口
 */
interface LightBandManager {
  /**
   * 根据ID获取灯带实体
   * @param id - 灯带实体ID
   * @returns 灯带实体对象
   */
  getLightBandEntityById(id: string): LightBandEntity;
}

/**
 * 属性栏复选框配置
 */
interface PropertyBarCheckBlock {
  /** 图标类名 */
  icon: string;
  /** 是否选中 */
  checked: boolean;
}

/**
 * 属性栏复选块数据
 */
interface PropertyBarCheckBlockData {
  /** 显示标签 */
  label: string;
  /** 复选框配置数组 */
  blocks: PropertyBarCheckBlock[];
  /**
   * 值变化回调
   * @param index - 复选框索引
   * @param checked - 新的选中状态
   */
  onChange: (index: number, checked: boolean) => void;
}

/**
 * 属性栏项配置
 */
interface PropertyBarItem {
  /** 唯一标识符 */
  id: string;
  /** 父节点ID */
  parentId: string;
  /** 显示标签（可选） */
  label?: string;
  /** 属性栏类型 */
  type: string;
  /** 项目数据或子项（可选） */
  data?: PropertyBarCheckBlockData;
  /** 子项列表（可选） */
  items?: PropertyBarItem[];
  /** 排序顺序（可选） */
  order?: number;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /**
   * 创建命令
   * @param type - 命令类型
   * @param args - 命令参数
   * @returns 命令对象
   */
  createCommand(type: string, args: any[]): any;
  
  /**
   * 执行命令
   * @param command - 命令对象
   */
  execute(command: any): void;
  
  /**
   * 接收命令数据
   * @param key - 数据键
   * @param value - 数据值
   */
  receive(key: string, value: any): void;
  
  /**
   * 完成命令执行
   */
  complete(): void;
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  /**
   * 获取插件实例
   * @param type - 插件类型
   * @returns 插件对象
   */
  getPlugin(type: string): any;
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
 * 自定义灯带属性栏处理器类
 * 用于处理自定义灯带的属性面板交互和数据更新
 */
export declare class CustomizedLightBandPropertyBarHandler {
  /** 应用程序实例 */
  private readonly app: App;
  
  /** 目录插件实例 */
  private readonly catalogPlugin: any;
  
  /** 命令管理器实例 */
  private readonly cmdMgr: CommandManager;
  
  /**
   * 构造函数
   * 初始化应用实例、插件和命令管理器
   */
  constructor();
  
  /**
   * 获取自定义灯带属性栏配置项
   * 根据灯带实体和ID生成属性面板配置
   * 
   * @param lightBandManager - 灯带管理器实例
   * @param lightBandId - 灯带实体唯一标识符
   * @returns 属性栏配置项数组，如果参数无效或发生错误则返回空数组
   * 
   * @example
   *