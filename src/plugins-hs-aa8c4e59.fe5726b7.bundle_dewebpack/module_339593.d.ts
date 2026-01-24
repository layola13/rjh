/**
 * 楼层平面图背景管理器
 * 负责管理楼层平面图的背景显示和弹窗交互
 */
declare module 'module_339593' {
  import { Application } from 'HSCore';
  import { SignalHook } from 'HSCore.Util';
  
  /**
   * 初始化配置接口
   */
  interface InitConfig {
    /** 应用实例 */
    app: Application;
  }

  /**
   * 楼层平面图管理器接口
   */
  interface Floorplan {
    /** 底图变化信号 */
    signalUnderlayChanged: Signal;
  }

  /**
   * 应用实例接口
   */
  interface Application {
    /** 文档关闭信号 */
    signalDocumentClosing: Signal;
    /** 文档打开信号 */
    signalDocumentOpened: Signal;
    /** 楼层平面图实例 */
    floorplan: Floorplan;
  }

  /**
   * 信号接口
   */
  interface Signal {
    /** 信号标识 */
    readonly id: string;
  }

  /**
   * 背景切换弹窗接口
   */
  interface BackgroundTogglePopup {
    /**
     * 切换弹窗显示/隐藏
     * @param visible - 是否显示
     */
    toggle(visible: boolean): void;

    /**
     * 当背景切换状态改变时更新复选框状态
     */
    onShowBackgroundToggleSetChecked(): void;
  }

  /**
   * 楼层平面图背景管理器类
   * 管理背景显示弹窗和文档事件绑定
   */
  export default class FloorplanBackgroundManager {
    /** 应用级信号钩子 */
    private _signalHook: SignalHook;
    
    /** 上下文级信号钩子 */
    private _contextSignalHook: SignalHook;
    
    /** 应用实例引用 */
    private _app: Application;
    
    /** 背景切换弹窗实例 */
    public popup: BackgroundTogglePopup;

    constructor();

    /**
     * 初始化管理器
     * @param config - 初始化配置对象
     */
    init(config: InitConfig): void;

    /**
     * 绑定应用级事件监听
     * @param app - 应用实例
     */
    private _bindEvents(app: Application): void;

    /**
     * 解绑文档级事件监听
     */
    private _unbindDocEvents(): void;

    /**
     * 绑定文档级事件监听
     * 监听楼层平面图底图变化事件
     */
    private _bindDocEvents(): void;

    /**
     * 切换背景显示弹窗
     * @param visible - 是否显示弹窗
     */
    toggle(visible: boolean): void;
  }
}