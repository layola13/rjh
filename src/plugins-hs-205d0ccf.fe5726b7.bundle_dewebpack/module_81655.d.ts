/**
 * Screenshot Plugin Module
 * 提供网页截图和裁剪功能的插件系统
 * @module hsw.plugin.screenshot
 */

declare namespace HSW.Plugin.Screenshot {
  // ==================== 枚举定义 ====================

  /**
   * 截图比例键枚举
   * 定义可选的截图宽高比类型
   */
  enum RatioKeyEnum {
    /** 自由比例 */
    FREE = 'FREE',
    /** 原始比例 */
    ORIGIN = 'ORIGIN',
    /** 1:1 正方形比例 */
    R_1_1 = 'R_1_1',
    /** 4:3 标准比例 */
    R_4_3 = 'R_4_3',
    /** 16:9 宽屏比例 */
    R_16_9 = 'R_16_9',
  }

  /**
   * 截图比例值枚举
   * 存储各比例对应的数值
   */
  enum RatioValueEnum {
    /** 自由比例(无限制) */
    FREE = -1,
    /** 原始比例 */
    ORIGIN = 1.5,
    /** 1:1 比例 */
    R_1_1 = 1,
    /** 4:3 比例 */
    R_4_3 = 1.333333,
    /** 16:9 比例 */
    R_16_9 = 1.777778,
  }

  // ==================== 接口定义 ====================

  /**
   * 插件配置接口
   */
  interface PluginConfig {
    /** 插件名称 */
    name: string;
    /** 插件描述 */
    description: string;
    /** 依赖的其他插件 */
    dependencies: string[];
  }

  /**
   * 截图保存数据接口
   */
  interface SnapshotData {
    /** 图片文件 Blob 对象 */
    file: Blob;
    /** MIME 类型 */
    type: string;
  }

  /**
   * 截图区域坐标接口
   */
  interface ScreenshotRegion {
    /** 宽度 */
    width: number;
    /** 高度 */
    height: number;
    /** 左边距 */
    left: number;
    /** 上边距 */
    top: number;
  }

  /**
   * 文档保存选项接口
   */
  interface SaveDocumentOptions {
    /** 输出格式 */
    format: 'image/png' | 'image/jpeg';
    /** 输出宽度 */
    width: number;
    /** 输出高度 */
    height: number;
    /** 是否前台渲染 */
    forground: boolean;
  }

  /**
   * 视图类型
   */
  type ViewType = '2d' | '3d';

  // ==================== 核心类定义 ====================

  /**
   * 截图插件主类
   * 继承自 HSApp.Plugin.IPlugin
   */
  class Plugin extends HSApp.Plugin.IPlugin {
    /**
     * 保存快照的信号
     * 用于通知其他模块截图已保存
     */
    signalSavingSnapshot: HSCore.Util.Signal<SnapshotData>;

    /**
     * 构造函数
     * 初始化插件配置
     */
    constructor();

    /**
     * 插件激活时的回调
     * @param context - 插件上下文,包含 app 实例
     * @param dependencies - 依赖的其他插件实例映射
     */
    onActive(
      context: { app: HSApp.Application },
      dependencies: Record<string, HSApp.Plugin.IPlugin>
    ): void;

    /**
     * 插件停用时的回调
     */
    onDeactive(): void;
  }

  // ==================== 处理器对象 ====================

  /**
   * 截图业务逻辑处理器
   * 管理截图的核心功能
   */
  interface Handler {
    /** 保存快照信号 */
    signalSavingSnapshot: HSCore.Util.Signal<SnapshotData>;

    /** 当前选中的比例键 */
    ratioKey: RatioKeyEnum;

    /** 应用实例引用 */
    app: HSApp.Application | null;

    /** 持久化插件引用 */
    persistPlugin: HSApp.Plugin.IPlugin | null;

    /**
     * 初始化处理器
     * @param app - 应用实例
     * @param dependencies - 依赖插件映射
     */
    init(
      app: HSApp.Application,
      dependencies: Record<string, HSApp.Plugin.IPlugin>
    ): void;

    /**
     * 比例选择器变更处理
     * @param ratioKey - 新选择的比例键
     */
    onRatioSelectorHandler(ratioKey: RatioKeyEnum): void;

    /**
     * 取消按钮点击处理
     */
    onCancelBtnClk(): void;

    /**
     * 截图按钮点击处理
     * 执行截图、裁剪和保存操作
     */
    onTakeSnapshotBtnClk(): void;

    /**
     * 视图切换处理
     * 在 2D 和 3D 视图间切换
     */
    onViewChangeHandler(): void;

    /**
     * 开始截图流程
     * 显示截图 UI 并设置初始状态
     */
    start(): void;

    /**
     * 结束截图流程
     * 隐藏 UI 并恢复应用状态
     */
    end(): void;
  }

  // ==================== UI 控制器 ====================

  /**
   * UI 控制器接口
   * 管理截图界面的显示和交互
   */
  interface UIController {
    /** 截图按钮点击回调 */
    onTakeSnapshotBtnClk: () => void;

    /** 取消按钮点击回调 */
    onCancelBtnClk: () => void;

    /** 比例选择器变更回调 */
    onRatioSelectorHandler: (ratioKey: RatioKeyEnum) => void;

    /** 视图切换回调 */
    onViewChangeHandler: () => void;

    /** 结束回调 */
    onEnd: () => void;

    /**
     * 初始化 UI 控制器
     * @param onTakeSnapshot - 截图回调
     * @param onCancel - 取消回调
     * @param onRatioChange - 比例变更回调
     * @param onViewChange - 视图切换回调
     * @param onEnd - 结束回调
     */
    init(
      onTakeSnapshot: () => void,
      onCancel: () => void,
      onRatioChange: (ratioKey: RatioKeyEnum) => void,
      onViewChange: () => void,
      onEnd: () => void
    ): void;

    /**
     * 键盘事件处理
     * @param event - 键盘事件
     * - ESC(27): 取消截图
     * - Enter(13): 执行截图
     * - Tab(9): 切换视图
     */
    keydownHandler(event: KeyboardEvent): void;

    /**
     * 切换到指定视图
     * @param viewType - 视图类型
     */
    onSwitchView(viewType: ViewType): void;

    /**
     * 重置视图层级
     * @param viewType - 视图类型
     */
    onResetView(viewType: ViewType): void;

    /**
     * 显示截图 UI
     * @param ratioKey - 初始比例键
     * @param viewType - 当前视图类型
     */
    start(ratioKey: RatioKeyEnum, viewType: ViewType): void;

    /**
     * 隐藏截图 UI
     * @param viewType - 当前视图类型
     */
    end(viewType: ViewType): void;

    /**
     * 初始化工具栏菜单项
     * @param toolbar - 工具栏实例
     */
    initToolbarMenuItem(toolbar: HSApp.UI.Toolbar): void;
  }

  // ==================== 模块导出 ====================

  /**
   * 枚举集合
   */
  const Enum: {
    RATIO_KEY_ENUM: typeof RatioKeyEnum;
    RATIO_ENUM: typeof RatioValueEnum;
  };

  /**
   * 业务处理器实例
   */
  const Handler: Handler;

  /**
   * UI 控制器实例
   */
  const UI: UIController;
}

// ==================== 全局声明扩展 ====================

declare namespace HSApp.Plugin {
  /**
   * 插件注册函数
   * @param pluginName - 插件完整名称
   * @param pluginClass - 插件类构造函数
   */
  function registerPlugin(
    pluginName: string,
    pluginClass: new () => IPlugin
  ): void;
}

declare namespace HSApp.Util {
  /**
   * 图片工具类
   */
  namespace Image {
    /**
     * 裁剪图片
     * @param image - 源图片
     * @param left - 左边距
     * @param top - 上边距
     * @param width - 裁剪宽度
     * @param height - 裁剪高度
     * @returns 裁剪后的图片
     */
    function clip(
      image: HTMLImageElement,
      left: number,
      top: number,
      width: number,
      height: number
    ): HTMLCanvasElement & {
      xRelease(): void;
      xAppendDbgInfo(info: string): void;
      toDataURL(type: string): string;
    };
  }

  /**
   * Base64 编码工具
   */
  namespace Base64 {
    /**
     * 解码 Base64 字符串为字节数组
     * @param str - Base64 字符串
     * @param urlSafe - 是否为 URL 安全编码
     * @returns 字节数组
     */
    function decodeStringToByteArray(
      str: string,
      urlSafe: boolean
    ): number[];
  }

  /**
   * 事件追踪器
   */
  namespace EventTrack {
    function instance(): {
      track(group: EventGroupEnum, eventName: string): void;
    };
  }

  enum EventGroupEnum {
    Toolbar = 'Toolbar',
  }
}

declare namespace HSCore.Util {
  /**
   * 信号类(观察者模式)
   */
  class Signal<T = void> {
    /**
     * 派发信号
     * @param data - 传递的数据
     */
    dispatch(data: T): void;

    /**
     * 添加监听器
     * @param callback - 回调函数
     */
    add(callback: (data: T) => void): void;

    /**
     * 移除监听器
     * @param callback - 回调函数
     */
    remove(callback: (data: T) => void): void;
  }
}

/**
 * FileSaver.js 库的全局函数
 * @param blob - 要保存的 Blob 对象
 * @param filename - 文件名
 */
declare function saveAs(blob: Blob, filename: string): void;

/**
 * 全局资源管理器
 */
declare const ResourceManager: {
  /**
   * 获取国际化字符串
   * @param key - 字符串键
   * @returns 本地化后的字符串
   */
  getString(key: string): string;

  /**
   * 加载资源
   * @param url - 资源 URL
   * @param type - 加载类型
   * @returns Promise 返回加载的资源
   */
  load(
    url: string,
    type: HSApp.Io.Load.LoadTypeEnum
  ): Promise<
    HTMLImageElement & {
      xRelease(): void;
      xAppendDbgInfo(info: string): void;
    }
  >;

  /**
   * 获取资源管理器单例
   */
  getInstance(): {
    getString(key: string): string;
  };
};

/**
 * 全局用户对象
 */
declare const adskUser: {
  /**
   * 检查用户是否已登录
   * @returns 是否登录
   */
  isLogin(): boolean;
};