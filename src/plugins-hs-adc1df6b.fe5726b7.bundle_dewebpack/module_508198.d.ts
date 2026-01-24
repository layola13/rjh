/**
 * 性能监控管理器
 * 监控2D/3D视图的渲染性能,并在FPS过低时发出警告
 */
declare module 'PerformanceManager' {
  /**
   * 3D性能状态变化事件数据
   */
  interface Performance3DChangeEventData {
    /** 性能状态: "low" 表示低性能 */
    status: 'low';
    /** 是否为启动时的提示 */
    startup?: 'true';
  }

  /**
   * FPS统计事件数据
   */
  interface FpsCountedEventData {
    /** FPS数组,包含多个采样点的帧率 */
    fpsArray: number[];
  }

  /**
   * 状态栏项目数据
   */
  interface StatusBarItemData {
    /** 当前渲染速度等级 */
    level: number;
    /** 当选择不同等级时的回调 */
    onLevelSelected: (level: number) => void;
    /** 不再显示启动提示的回调 */
    onNoMoreShowStartupHint: () => void;
    /** 本次会话中不再显示启动提示的回调 */
    onSessionlyNomoreShowStartupHint: () => void;
    /** 不再显示低FPS提示的回调 */
    onNoMoreShowFpsLowHint: () => void;
    /** 3D性能变化信号 */
    signal3dPerformanceChanged: HSCore.Util.Signal<Performance3DChangeEventData>;
  }

  /**
   * 状态栏项目定义
   */
  interface StatusBarItem {
    /** 唯一标识符 */
    id: string;
    /** 项目类型 */
    type: StatusBarItemTypeEnum.Performance3dWidget;
    /** 排序顺序 */
    order: number;
    /** 项目数据 */
    data: StatusBarItemData;
  }

  /**
   * 命令事件数据
   */
  interface CommandEventData {
    data: {
      /** 命令实例 */
      cmd: Command;
    };
  }

  /**
   * 视图激活事件数据
   */
  interface ViewActivatedEventData {
    // 视图激活相关数据
  }

  /**
   * 填充状态栏事件数据
   */
  interface PopulateStatusBarEventData {
    data: {
      /** 右侧状态栏项目列表 */
      rightItems: StatusBarItem[];
    };
  }

  /**
   * 命令基类
   */
  interface Command {
    /** 命令类型 */
    type: HSFPConstants.CommandType;
    /** 命令关联的内容(用于MoveContent命令) */
    content?: ModelContent;
    /** 命令输出结果(用于PlaceProduct/ResizeContent命令) */
    output?: ModelContent | ModelContent[];
  }

  /**
   * 模型内容接口
   */
  interface ModelContent {
    /**
     * 判断是否为指定模型类的实例
     * @param modelClass 模型类常量
     */
    instanceOf(modelClass: HSConstants.ModelClass): boolean;
  }

  /**
   * WebGL 2D视图接口
   */
  interface WebGL2DView {
    /** 冻结视图渲染 */
    freeze(): void;
    /** 恢复视图渲染 */
    unfreeze(): void;
  }

  /**
   * WebGL 3D视图接口
   */
  interface WebGL3DView {
    /** 冻结视图渲染 */
    freeze(): void;
    /** 恢复视图渲染 */
    unfreeze(): void;
  }

  /**
   * 应用实例接口
   */
  interface Application {
    /** 命令管理器 */
    cmdManager: CommandManager;
    /** 应用设置 */
    appSettings: AppSettings;
    /** 当前激活的环境ID */
    activeEnvironmentId: HSFPConstants.Environment;
    /** 视图激活信号 */
    signalViewActivated: HSCore.Util.Signal<ViewActivatedEventData>;
    
    /**
     * 获取激活的2D视图
     */
    getActive2DView(): WebGL2DView | null;
    
    /**
     * 获取激活的3D视图
     */
    getActive3DView(): WebGL3DView | null;
    
    /**
     * 判断2D视图是否激活
     */
    is2DViewActive(): boolean;
    
    /**
     * 判断3D视图是否激活
     */
    is3DViewActive(): boolean;
  }

  /**
   * 命令管理器接口
   */
  interface CommandManager {
    /** 命令开始信号 */
    signalCommandStarted: HSCore.Util.Signal<CommandEventData>;
    /** 命令恢复信号 */
    signalCommandResumed: HSCore.Util.Signal<CommandEventData>;
    /** 命令暂停信号 */
    signalCommandSuspending: HSCore.Util.Signal<CommandEventData>;
    /** 命令终止信号 */
    signalCommandTerminating: HSCore.Util.Signal<CommandEventData>;
  }

  /**
   * 应用设置接口
   */
  interface AppSettings {
    /** 渲染速度等级 */
    renderSpeedLevel: number;
  }

  /**
   * 本地存储接口
   */
  interface LocalStorage {
    /**
     * 获取存储值
     * @param key 键名
     */
    get(key: string): string | boolean | null;
    
    /**
     * 设置存储值
     * @param key 键名
     * @param value 值
     */
    set(key: string, value: string | boolean): void;
  }

  /**
   * 性能统计监控器接口
   */
  interface StatsMonitor {
    /** FPS计数完成信号 */
    signalFpsCounted: HSCore.Util.Signal<FpsCountedEventData>;
    
    /** 启动监控 */
    start(): void;
    
    /** 停止监控 */
    stop(): void;
  }

  /**
   * 性能管理器类
   * 负责监控应用的渲染性能,在检测到低FPS时触发性能警告
   */
  export default class PerformanceManager {
    /**
     * 是否已创建第一个实例的静态标记
     */
    static _firstCreated: boolean;

    /**
     * 是否激活2D视图
     */
    private _is2dViewActivated: boolean;

    /**
     * 是否激活3D视图
     */
    private _is3dViewActivated: boolean;

    /**
     * 需要监听的命令类列表
     */
    private _watchingCmds: Array<new (...args: any[]) => Command>;

    /**
     * 需要监听的命令类型列表
     */
    private _watchingCmdTypes: HSFPConstants.CommandType[];

    /**
     * 3D性能变化信号
     */
    signal3dPerformanceChanged: HSCore.Util.Signal<Performance3DChangeEventData>;

    /**
     * 低FPS阈值(默认20fps)
     */
    lowFpsThreshold: number;

    /**
     * 是否显示性能低提示
     */
    showPerformanceLowHint: boolean;

    /**
     * 是否显示性能启动提示
     */
    showPerformanceStartupHint: boolean;

    /**
     * 应用实例
     */
    private _app: Application;

    /**
     * 本地存储实例
     */
    private _localStorage: LocalStorage;

    /**
     * 统计监控器实例
     */
    private _statsMonitor: StatsMonitor;

    /**
     * 获取WebGL 2D视图
     */
    private get _webgl2dView(): WebGL2DView | null;

    /**
     * 获取WebGL 3D视图
     */
    private get _webgl3dView(): WebGL3DView | null;

    /**
     * 初始化性能管理器
     * @param app 应用实例
     * @param param2 保留参数
     * @param localStorage 本地存储实例
     */
    init(app: Application, param2: unknown, localStorage: LocalStorage): void;

    /**
     * 视图激活事件处理
     * @param event 视图激活事件数据
     */
    onViewActive(event: ViewActivatedEventData): void;

    /**
     * 命令运行事件处理
     * @param event 命令事件数据
     */
    onCommandRunning(event: CommandEventData): void;

    /**
     * 命令停止事件处理
     * @param event 命令事件数据
     */
    onCommandStopped(event: CommandEventData): void;

    /**
     * 冻结或解冻视图渲染
     * @param event 命令事件数据
     * @param shouldFreeze 是否冻结视图(默认为true)
     */
    private _freezeView(event: CommandEventData, shouldFreeze?: boolean): void;

    /**
     * 判断是否为需要监听的命令
     * @param cmd 命令实例
     * @returns 是否需要监听
     */
    private _isWatchingCommand(cmd: Command): boolean;

    /**
     * 判断是否为需要监听的命令类型
     * @param cmdType 命令类型
     * @returns 是否需要监听
     */
    private _isWatchingCommandType(cmdType: HSFPConstants.CommandType): boolean;

    /**
     * 填充状态栏事件处理
     * @param event 填充状态栏事件数据
     */
    private _onPopulateStatusBar(event: PopulateStatusBarEventData): void;

    /**
     * 初始化状态栏项目
     * @returns 状态栏项目列表
     */
    private _initStatusBarItems(): StatusBarItem[];

    /**
     * 是否显示启动性能提示
     * @returns 是否显示
     */
    private _showStartupPerformanceHint(): boolean;

    /**
     * 设置是否显示启动性能提示
     * @param show 是否显示
     */
    private _setShowStartupPerformanceHint(show: boolean): void;

    /**
     * 是否显示性能低提示
     * @returns 是否显示
     */
    private _showPerformanceLowHint(): boolean;

    /**
     * 设置是否显示性能低提示
     * @param show 是否显示
     */
    private _setShowPerformanceLowHint(show: boolean): void;

    /**
     * 显示性能提示的通用实现
     * @param key 本地存储键名
     * @returns 是否显示提示
     */
    private _showPerformanceHintImpl(key: string): boolean;

    /**
     * FPS计数完成事件处理
     * @param event FPS统计事件数据
     */
    private _onFpsCounted(event: FpsCountedEventData): void;
  }
}