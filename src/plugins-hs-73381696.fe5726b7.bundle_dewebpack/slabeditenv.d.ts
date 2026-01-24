import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

/**
 * Slab (楼板) 编辑环境类
 * 提供楼板编辑相关的交互功能，包括绘制、修改、保存等操作
 */
export class SlabEditEnv extends HSApp.Environment.CommonEnvironment {
  /** 工具栏实例 */
  toolbar: SlabEditToolbar;
  
  /** 编辑处理器 */
  handler: unknown;
  
  /** 当前编辑的图层 */
  layer: HSCore.Model.Layer;
  
  /** 模式控制器 */
  modeController: ModeController;
  
  /** 目录插件实例 */
  catalogPlugin: unknown;
  
  /** 调整大小控件插件 */
  resizeWidgetPlugin: unknown;
  
  /** 视图切换插件 */
  viewSwitchPlugin: unknown;
  
  /** 属性栏实例 */
  propertyBar: unknown;
  
  /** 当前编辑会话 */
  private _session?: TransactionSession;
  
  /** 保存的旧工具栏ID */
  oldToolbarId?: string;
  
  /** Gizmo 控制器 */
  gizmo?: unknown;
  
  /** 草图构建器 */
  sketchBuilder: HSCore.Model.LayerSketch2dBuilder;
  
  /** 草图视图 */
  private _sketchView?: Sketch;
  
  /** Gizmo 工厂 */
  private _gizmoFactory?: GizmoFactory;

  /**
   * 构造函数
   * @param options - 初始化选项
   * @param options.app - 应用实例
   * @param options.handler - 编辑处理器
   * @param options.dependencies - 依赖的插件集合
   */
  constructor(options: SlabEditEnvOptions);

  /**
   * 激活编辑环境
   * @param options - 激活选项
   * @param options.layer - 要编辑的图层，默认为当前活动图层
   */
  onActivate(options?: { layer?: HSCore.Model.Layer }): void;

  /**
   * 停用编辑环境，清理资源并恢复 UI 状态
   */
  onDeactivate(): void;

  /**
   * 获取当前草图视图
   * @returns 草图视图实例
   */
  getSketchView(): Sketch | undefined;

  /**
   * 创建草图视图并注册到 2D 视图中
   * @private
   */
  private _createSketchView(): void;

  /**
   * 销毁草图视图并从 2D 视图中移除
   * @private
   */
  private _destroySketchView(): void;

  /**
   * 初始化用户界面（工具栏等）
   * @private
   */
  private _initUI(): void;

  /**
   * 是否支持单房间模式
   * @returns false - 楼板编辑不支持单房间模式
   */
  supportSingleRoomMode(): boolean;

  /**
   * 触发测量工具命令
   */
  onMeasureTool(): void;

  /**
   * 添加辅助线
   */
  onAddGuideLine(): void;

  /**
   * 清除所有辅助线
   */
  onClearGuideLines(): void;

  /**
   * 应用并保存更改
   */
  onApplySave(): void;

  /**
   * 重置所有更改，撤销到进入编辑前状态
   */
  onResetChanges(): void;

  /**
   * 完成编辑，提交事务并处理跨图层开口
   */
  onCompleteEdit(): void;

  /**
   * 隐藏不需要的面板（视图切换、尺寸控件、目录、属性栏、相机等）
   * @private
   */
  private _hidePanels(): void;

  /**
   * 恢复之前隐藏的面板
   * @private
   */
  private _restorePanels(): void;

  /**
   * 注册快捷键（删除键）
   * @private
   */
  private _registerHotkeys(): void;

  /**
   * 注销快捷键
   * @private
   */
  private _unregisterHotkeys(): void;

  /**
   * 删除选中的元素（辅助线或面）
   */
  onDelete(): void;

  /**
   * 执行圆角操作
   */
  onFillet(): void;

  /**
   * 添加线段（多边形模式）
   */
  onAddLine(): void;

  /**
   * 添加矩形
   */
  onAddRect(): void;

  /**
   * 添加正多边形
   */
  onAddPolygon(): void;

  /**
   * 添加圆形
   */
  onAddCircle(): void;
}

/**
 * 楼板编辑环境初始化选项
 */
export interface SlabEditEnvOptions {
  /** 应用程序实例 */
  app: HSApp.Application;
  /** 编辑事件处理器 */
  handler: unknown;
  /** 依赖的插件映射 */
  dependencies: Record<string, unknown>;
}

/**
 * 楼板编辑工具栏
 */
export class SlabEditToolbar {
  sketchBuilder?: HSCore.Model.LayerSketch2dBuilder;

  constructor(dependencies: Record<string, unknown>);

  /**
   * 激活工具栏
   * @param env - 编辑环境实例
   * @param isOutdoor - 是否为室外图层
   * @param sketchBuilder - 草图构建器
   * @returns 旧工具栏ID
   */
  activate(env: SlabEditEnv, isOutdoor: boolean, sketchBuilder: HSCore.Model.LayerSketch2dBuilder): string;

  /**
   * 初始化工具栏
   * @param isOutdoor - 是否为室外图层
   */
  init(isOutdoor: boolean): void;

  /**
   * 恢复到指定工具栏
   * @param toolbarId - 工具栏ID
   */
  restore(toolbarId?: string): void;
}

/**
 * 模式控制器
 */
export class ModeController {
  /** 启用模式控制 */
  on(): void;
  /** 禁用模式控制 */
  off(): void;
}

/**
 * 事务会话接口
 */
export interface TransactionSession {
  /** 提交事务 */
  commit(): void;
  /** 中止事务 */
  abort(): void;
}

/**
 * 草图视图类
 */
export class Sketch {
  constructor(
    context: unknown,
    parent: unknown,
    maskLayer: unknown,
    interactiveSketch: HSApp.ExtraordinarySketch2d.InteractiveSketch
  );

  /**
   * 初始化草图视图
   * @param layer - 关联的图层
   */
  init(layer: HSCore.Model.Layer): void;

  /** 标记图形需要重绘 */
  dirtyGraph(): void;
}

/**
 * Gizmo 工厂类
 */
export class GizmoFactory {
  constructor(view: unknown, app: HSApp.Application);
}

export default {
  SlabEditEnv
};