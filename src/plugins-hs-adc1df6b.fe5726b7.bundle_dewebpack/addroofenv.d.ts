/**
 * 屋顶添加状态枚举
 */
export enum ENAddRoofStatus {
  /** 初始状态 */
  Beginning = "beginning",
  /** 预览状态 */
  Preview = "preview",
  /** 已生成状态 */
  Generated = "generated"
}

/**
 * 屋顶状态管理器
 * 用于跟踪屋顶创建过程中的状态和数据
 */
declare class RoofStatusManager {
  private _status: ENAddRoofStatus;
  private _roof?: unknown;

  /**
   * 获取当前状态
   */
  getStatus(): ENAddRoofStatus;

  /**
   * 设置当前状态
   * @param status - 新的状态值
   */
  setStatus(status: ENAddRoofStatus): void;

  /**
   * 获取当前屋顶实例
   */
  getRoof(): unknown | undefined;

  /**
   * 设置屋顶实例
   * @param roof - 屋顶对象
   */
  setRoof(roof?: unknown): void;

  /**
   * 清除所有状态，重置为初始状态
   */
  clear(): void;
}

/**
 * 插件类型映射表
 */
interface PluginMap {
  [HSFPConstants.PluginType.LayerEdit]?: unknown;
  [HSFPConstants.PluginType.StatusBar]?: unknown;
  [HSFPConstants.PluginType.ResizeWidget]?: unknown;
  [HSFPConstants.PluginType.ViewSwitch]?: unknown;
  [HSFPConstants.PluginType.Catalog]?: unknown;
  [HSFPConstants.PluginType.PropertyBar]?: unknown;
  [HSFPConstants.PluginType.ContextualTools]?: unknown;
  [HSFPConstants.PluginType.Persistence]?: { getAutoSaveOn(): boolean; setAutoSaveOn(enabled: boolean): void };
  [HSFPConstants.PluginType.Feedback]?: { showFeedbackEntry(): void };
  [HSFPConstants.PluginType.Toolbar]?: { toolTipSignalHook: { dispatch(payload: unknown): void } };
}

/**
 * 环境初始化参数
 */
interface AddRoofEnvOptions {
  /** 应用实例 */
  app: unknown;
  /** 处理器实例 */
  handler: AddRoofHandler;
  /** 依赖的插件集合 */
  dependencies: PluginMap;
}

/**
 * 屋顶处理器接口
 */
interface AddRoofHandler {
  /** 获取视图控制器 */
  getViewController(): {
    showGizmo(): void;
    hideGizmo(): void;
  };
  /** 获取资源 */
  getResource(): {
    defaultRoofMeta?: { meta: unknown };
  };
  /** 关闭添加环境 */
  closeAddEnv(): void;
  /** 显示生成循环 */
  showGenerativeLoops(data: unknown): void;
  /** 隐藏生成循环 */
  hideGenerativeLoops(): void;
  /** 是否显示所有图层 */
  isShowAllLayer(): boolean;
}

/**
 * 鼠标事件数据
 */
interface MouseEventData {
  /** 拾取结果 */
  pickResults?: Array<{ viewObject?: unknown }>;
  /** 原始事件 */
  event: MouseEvent & { clientX: number; clientY: number; button?: number };
}

/**
 * 视图选项
 */
interface ViewOptions {
  type?: string;
}

/**
 * 完整视图配置
 */
interface FullViewOptions {
  viewOptions2D: ViewOptions[];
  viewOptions3D: ViewOptions[];
  secondaryViewOptions: ViewOptions[];
  showTip: boolean;
  showPopOver: boolean;
}

/**
 * 屋顶添加环境类
 * 继承自通用环境，管理屋顶创建的整个生命周期
 */
export declare class AddRoofEnv extends HSApp.Environment.CommonEnvironment {
  /** 处理器实例 */
  handler: AddRoofHandler;
  
  /** 状态管理器 */
  status: RoofStatusManager;
  
  /** 事务管理器 */
  private _transMgr: unknown;
  
  /** 信号钩子 */
  private _signalHook: HSCore.Util.SignalHook;
  
  /** 插件映射 */
  private _plugins: PluginMap;
  
  /** 隐藏的实体列表 */
  private _hiddenEntities: unknown[];
  
  /** 当前会话 */
  private _session?: unknown;
  
  /** 自动保存是否开启 */
  private _isAutoSaveOn?: boolean;

  /**
   * 构造函数
   * @param options - 初始化选项
   */
  constructor(options: AddRoofEnvOptions);

  /**
   * 绑定事件钩子
   */
  private _bindHooks(): void;

  /**
   * 解绑所有事件钩子
   */
  private _unbindHooks(): void;

  /**
   * 注册热键（ESC取消）
   */
  private _registerHotkey(): void;

  /**
   * 注销热键
   */
  private _unregisterHotkey(): void;

  /**
   * 撤销操作回调
   * @param event - 撤销事件数据
   */
  private _onUndone(event: { data?: { request?: { type?: string; oldRoof?: unknown } } }): void;

  /**
   * 重做操作回调
   * @param event - 重做事件数据
   */
  private _onRedone(event: { data?: { request?: { type?: string; roof?: unknown } } }): void;

  /**
   * 环境激活时调用
   * @param data - 激活数据
   */
  onActivate(data: unknown): void;

  /**
   * 环境停用时调用
   */
  onDeactivate(): void;

  /**
   * 初始化插件
   * @param dependencies - 依赖的插件集合
   */
  private _initPlugins(dependencies: PluginMap): void;

  /**
   * 处理相关插件（如禁用自动保存）
   */
  private _handleRelativePlugins(): void;

  /**
   * 重置相关插件状态
   */
  private _resetRelativePlugins(): void;

  /**
   * 隐藏实体（隐藏地面图层的面）
   */
  private _hideEntities(): void;

  /**
   * 恢复隐藏的实体
   */
  private _resetHiddenEntities(): void;

  /**
   * 判断是否点击在三角形小工具上
   * @param pickResults - 拾取结果
   */
  private _isOnTriangleGizmo(pickResults?: Array<{ viewObject?: unknown }>): boolean;

  /**
   * 判断是否点击在循环小工具上
   * @param pickResults - 拾取结果
   */
  private _isOnLoopGizmo(pickResults?: Array<{ viewObject?: unknown }>): boolean;

  /**
   * 接收并处理事件
   * @param eventType - 事件类型
   * @param eventData - 事件数据
   * @returns 是否阻止事件传播
   */
  onReceive(eventType: string, eventData: MouseEventData): boolean;

  /**
   * 完成屋顶创建流程
   */
  private _complete(): void;

  /**
   * 创建预览屋顶
   * @param loopGizmo - 循环小工具实例
   */
  private _createPreviewRoof(loopGizmo: {
    getLevelLayer(): unknown;
    getLoopInfo(): { loop: { linkWallIds: unknown } };
    getRelativeHeight(): number;
  }): void;

  /**
   * 显示成功提示
   */
  private _showSuccessTip(): void;

  /**
   * 结束预览，正式生成屋顶
   */
  private _endPreview(): void;

  /**
   * 获取视图选项
   * @returns 视图配置对象或null
   */
  getViewOptions(): FullViewOptions | null;

  /**
   * 获取2D视图选项
   * @returns 2D视图配置数组
   */
  get2DViewOptions(): ViewOptions[];

  /**
   * 取消操作（私有方法）
   */
  private _cancel(): void;
}