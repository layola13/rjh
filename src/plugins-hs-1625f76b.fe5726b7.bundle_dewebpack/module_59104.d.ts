/**
 * 内容操作插件类型定义
 * @module ContentManipulationPlugin
 * @description 提供内容的移动、调整大小、旋转等操作功能
 */

declare namespace HSApp.Plugin {
  /**
   * 内容操作插件类
   * @class ContentManipulationPlugin
   * @extends {IPlugin}
   * @description 负责处理编辑器中内容元素的操作和变换，包括移动、缩放、旋转等功能
   */
  class ContentManipulationPlugin extends IPlugin {
    /**
     * 上下文工具栏高度刷新信号
     * @description 用于通知其他组件上下文工具栏高度变化
     */
    signalContextualtoolElevationRefresh: HSCore.Util.Signal<ContentManipulationPlugin>;

    /**
     * 内部处理器实例
     * @private
     * @description 封装具体的内容操作逻辑
     */
    private _handler: ContentManipulationHandler;

    /**
     * 构造函数
     * @description 初始化插件配置，包括名称、描述和依赖项
     */
    constructor();

    /**
     * 插件激活回调
     * @param editor - 编辑器实例
     * @param context - 插件上下文对象
     * @description 当插件被激活时调用，初始化处理器
     */
    onActive(editor: unknown, context: unknown): void;

    /**
     * 显示尺寸卡片
     * @description 在内容操作时显示尺寸信息提示卡片
     */
    showSizecard(): void;

    /**
     * 隐藏尺寸卡片
     * @description 隐藏尺寸信息提示卡片
     */
    hideSizecard(): void;

    /**
     * 插件停用回调
     * @description 当插件被停用时调用，执行清理操作
     */
    onDeactive(): void;

    /**
     * 替换自定义装饰类型
     * @param elementId - 元素标识符
     * @param moldingType - 新的装饰类型
     * @description 更新单个元素的自定义装饰样式
     */
    replaceCustomizedMoldingType(elementId: unknown, moldingType: unknown): void;

    /**
     * 批量替换自定义装饰类型
     * @param replacements - 替换配置数组
     * @description 一次性更新多个元素的自定义装饰样式
     */
    replaceNCustomizedMoldingType(replacements: unknown[]): void;

    /**
     * 注册变换控制器（Gizmo）
     * @param gizmo - 变换控制器实例
     * @returns 注册结果或标识符
     * @description 注册用于可视化操作内容的交互控件
     */
    registerGizmo(gizmo: unknown): unknown;

    /**
     * 注销变换控制器
     * @param gizmoId - 控制器标识符
     * @param immediate - 是否立即注销
     * @description 移除已注册的变换控制器
     */
    unregisterGizmo(gizmoId: unknown, immediate?: boolean): void;
  }

  /**
   * 内容操作处理器类
   * @internal
   * @description 封装内容操作的具体实现逻辑
   */
  class ContentManipulationHandler {
    /**
     * 初始化处理器
     * @param editor - 编辑器实例
     * @param context - 上下文对象
     */
    init_(editor: unknown, context: unknown): void;

    /**
     * 显示尺寸卡片内部实现
     */
    showsizecard_(): void;

    /**
     * 隐藏尺寸卡片内部实现
     */
    hidesizecard_(): void;

    /**
     * 获取属性栏V2处理器集合
     * @returns 属性栏处理器对象
     */
    getPropertyBarV2Handlers(): PropertyBarV2Handlers;

    /**
     * 注册变换控制器内部实现
     * @param gizmo - 控制器实例
     * @returns 注册结果
     */
    _registerGizmo(gizmo: unknown): unknown;

    /**
     * 注销变换控制器内部实现
     * @param gizmoId - 控制器标识符
     * @param immediate - 是否立即注销
     */
    _unregisterGizmo(gizmoId: unknown, immediate?: boolean): void;
  }

  /**
   * 属性栏V2处理器接口
   * @internal
   * @description 处理属性栏相关操作
   */
  interface PropertyBarV2Handlers {
    /**
     * 替换自定义装饰类型
     */
    replaceCustomizedMoldingType(elementId: unknown, moldingType: unknown): void;

    /**
     * 批量替换自定义装饰类型
     */
    replaceNCustomizedMoldingType(replacements: unknown[]): void;
  }
}

declare namespace HSFPConstants {
  /**
   * 插件类型枚举
   */
  enum PluginType {
    /** 内容操作插件 */
    ContentManipulation = "ContentManipulation",
    /** 上下文工具插件 */
    ContextualTools = "ContextualTools",
    /** 属性栏插件 */
    PropertyBar = "PropertyBar",
    /** 左侧菜单插件 */
    LeftMenu = "LeftMenu"
  }
}

declare namespace HSCore.Util {
  /**
   * 信号类（观察者模式）
   * @template T - 信号发送者类型
   */
  class Signal<T> {
    constructor(sender: T);
  }
}