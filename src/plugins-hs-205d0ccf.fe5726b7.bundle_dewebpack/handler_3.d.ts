/**
 * 状态栏尺寸限制控制处理器
 * 负责在特定环境下向状态栏添加尺寸限制锁定/解锁功能
 * 
 * @module Handler
 * @originalId 304067
 */

/**
 * 状态栏项配置数据接口
 */
interface StatusBarItemData {
  /** 按钮唯一标识 */
  id: string;
  /** 按钮样式类名 */
  className: string;
  /** 按钮位置 */
  position: 'rightFloat';
  /** 获取当前锁定状态 */
  getValue: () => boolean;
  /** 获取图标字符串（锁定/解锁图标） */
  getImgStr: () => string;
  /** 获取按钮文本（本地化字符串） */
  getText: () => string;
  /** 点击事件处理函数 */
  onClick: () => void;
}

/**
 * 状态栏项配置接口
 */
interface StatusBarItem {
  /** 状态栏项唯一标识 */
  id: string;
  /** 状态栏项类型枚举 */
  type: StatusBarItemTypeEnum;
  /** 显示顺序 */
  order: number;
  /** 状态栏项具体配置数据 */
  data: StatusBarItemData;
}

/**
 * 状态栏填充事件数据接口
 */
interface PopulateStatusBarEventData {
  /** 状态栏右侧项集合 */
  rightItems: {
    /** 在指定位置插入项集合 */
    xInsertCollection: (index: number, items: StatusBarItem[]) => void;
  };
}

/**
 * 状态栏填充事件接口
 */
interface PopulateStatusBarEvent {
  /** 事件携带的数据 */
  data: PopulateStatusBarEventData;
}

/**
 * 初始化参数接口
 */
interface InitParams {
  /** 上下文对象 */
  context: {
    /** 应用实例 */
    app: HSApp;
  };
  /** 插件依赖映射 */
  dependencies: {
    [HSFPConstants.PluginType.ContextualTools]?: ContextualToolsPlugin;
  };
}

/**
 * 上下文工具插件接口
 */
interface ContextualToolsPlugin {
  /** 状态栏填充信号 */
  signalPopulateStatusBar: {
    /** 监听信号事件 */
    listen: (callback: (event: PopulateStatusBarEvent) => void, context: unknown) => void;
  };
}

/**
 * 应用实例接口
 */
interface HSApp {
  /** 当前激活的环境ID */
  activeEnvironmentId: string;
  /** 设计元数据管理器 */
  designMetadata: {
    /** 获取元数据值 */
    get: (key: string) => boolean;
    /** 设置元数据值 */
    set: (key: string, value: boolean) => void;
  };
  /** 选择管理器 */
  selectionManager: {
    /** 取消所有选择 */
    unselectAll: () => void;
  };
  /** 用户行为追踪记录器 */
  userTrackLogger: {
    /** 推送追踪事件 */
    push: (eventName: string, eventData: TrackEventData, options?: Record<string, unknown>) => void;
  };
}

/**
 * 用户行为追踪事件数据接口
 */
interface TrackEventData {
  /** 活跃区域 */
  activeSection: string;
  /** 活跃区域名称 */
  activeSectionName: string;
  /** 事件描述 */
  description: string;
  /** 附加参数信息 */
  argInfo: {
    /** 尺寸限制是否已解锁 */
    isSizeLimitUnlock: boolean;
  };
}

/**
 * 状态栏项类型枚举（外部定义）
 */
declare enum StatusBarItemTypeEnum {
  SizeLimitWidget = 'SizeLimitWidget'
}

/**
 * 常量定义（外部定义）
 */
declare namespace HSFPConstants {
  enum PluginType {
    ContextualTools = 'ContextualTools'
  }
  
  enum Environment {
    Default = 'Default',
    NCustomizedBackgroundWall = 'NCustomizedBackgroundWall',
    NCustomizedCeilingModel = 'NCustomizedCeilingModel',
    NCustomizedPlatform = 'NCustomizedPlatform',
    AddRoofEnv = 'AddRoofEnv'
  }
}

/**
 * 资源管理器（外部定义）
 */
declare namespace ResourceManager {
  /**
   * 获取本地化字符串
   * @param key - 资源键名
   */
  function getString(key: string): string;
}

/**
 * 状态栏处理器类
 * 管理尺寸限制功能在状态栏的显示与交互
 */
export declare class Handler {
  /**
   * 应用实例引用
   */
  app?: HSApp;

  /**
   * 初始化处理器
   * @param params - 初始化参数，包含应用上下文和插件依赖
   */
  init(params: InitParams): void;

  /**
   * 状态栏填充事件回调
   * 在支持的环境下向状态栏右侧添加尺寸限制控制项
   * 
   * @param event - 状态栏填充事件对象
   */
  onPopulateStatusBar(event: PopulateStatusBarEvent): void;

  /**
   * 初始化状态栏项配置
   * 创建尺寸限制锁定/解锁按钮配置
   * 
   * @returns 状态栏项配置数组
   */
  initStatusBarItems(): StatusBarItem[];
}