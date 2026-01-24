/**
 * 硬装饰移动命令
 * 负责处理硬装饰内容的拖拽移动、吸附、宿主更换等操作
 */

import { Vector3 } from '815362';
import { HSApp } from '518193';
import { HSCore } from '635589';
import { OptionTypeEnum } from '934901';

/**
 * 保存的原始数据结构
 */
interface SavedContentData {
  /** 内容对象 */
  content: HSCore.Model.Content;
  /** 原始位置 */
  position: Vector3;
  /** 原始缩放 */
  scale: Vector3;
  /** 原始旋转 */
  rotation: Vector3;
  /** 原始宿主 */
  host: HSCore.Model.Entity | null;
  /** 原始父级 */
  parent: HSCore.Model.Layer | null;
}

/**
 * 移动选项配置
 */
interface MoveOptions {
  /** 宿主表面 */
  hostFace?: HSCore.Model.Face;
  /** 是否限制在房间内 */
  constraintInRoom?: boolean;
  /** 是否忽略吸附偏移 */
  ignoreSnapOffset?: boolean;
  /** 是否启用自动适应方向 */
  autoFitDirectionEnable?: boolean;
  /** 视图类型 */
  viewType?: HSApp.View.ViewModeEnum;
  /** 移动方式 */
  moveby?: string;
}

/**
 * 拖拽事件参数
 */
interface DragEventParams {
  /** 鼠标位置 [x, y, z?] */
  position?: number[];
  /** 移动偏移 [dx, dy, dz?] */
  offset?: number[];
  /** 原始事件 */
  event: MouseEvent | KeyboardEvent;
  /** 拾取的图层 */
  pickedLayer?: HSCore.Model.Layer;
  /** 拾取结果列表 */
  pickResults: PickResult[];
  /** 是否追踪鼠标 */
  trackingMouse?: boolean;
  /** 模型到屏幕的缩放比例 */
  modelToScreen?: number;
  /** 移动向量 */
  vectors?: Vector3[];
  /** 是否线性移动 */
  linearMove?: boolean;
  /** 拾取的宿主 */
  host?: HSCore.Model.Entity;
}

/**
 * 拾取结果
 */
interface PickResult {
  /** 视图对象 */
  viewObject: {
    /** 实体对象 */
    entity: HSCore.Model.Entity;
  };
}

/**
 * 移动偏移和操作选项
 */
interface MoveOffsetAndOptions {
  /** 移动偏移量 */
  offset: number[];
  /** 操作选项 */
  op: MoveOperationOptions;
}

/**
 * 移动操作选项
 */
interface MoveOperationOptions {
  /** Ctrl键是否按下 */
  ctrlKey: boolean;
  /** Shift键是否按下 */
  shiftKey: boolean;
  /** Alt键是否按下 */
  altKey: boolean;
  /** 移动向量 */
  vectors?: Vector3[];
  /** 是否线性移动 */
  linearMove?: boolean;
  /** 鼠标位置 */
  mousePosition: { x: number; y: number; z: number };
  /** 拾取的图层 */
  pickedLayer: HSCore.Model.Layer;
  /** 拾取结果 */
  pickResults: PickResult[];
}

/**
 * 吸附配置选项
 */
interface SnappingOptions {
  /** 吸附偏移距离 */
  snapOffset?: number;
  /** 是否启用自动适应 */
  autoFitEnable: boolean;
  /** 是否忽略吸附偏移 */
  ignoreSnapOffset?: boolean;
  /** 移动向量 */
  vectors?: Vector3[];
  /** 是否禁用Z轴吸附 */
  notZ?: boolean;
  /** 固定Z值 */
  fixedZValue?: number;
  /** 是否自由移动（Ctrl键） */
  freeMove: boolean;
  /** 是否在空间中拉伸（Alt键） */
  stretchInSpace: boolean;
  /** 是否限制在房间内 */
  constraintInRoom: boolean;
  /** 是否限制在多边形内 */
  constraintInPolygon: boolean;
  /** 限制多边形 */
  polygon?: unknown;
  /** 所在房间 */
  room: HSCore.Model.Room | null;
  /** 是否尝试吸附到所有内容 */
  trySnapToAllContents: boolean;
  /** 是否使用默认地面 */
  defaultGround: boolean;
  /** 拾取结果 */
  pickResults: PickResult[];
  /** 是否线性移动 */
  linearMove?: boolean;
  /** 鼠标位置 */
  mousePosition?: { x: number; y: number; z: number };
  /** 操作类型 */
  manipulationType?: string;
  /** 是否正在拖拽Gizmo */
  draggingGizmo: boolean;
}

/**
 * 吸附策略配置
 */
interface SnappingStrategyConfig {
  /** 策略类列表 */
  strategies: Array<new (...args: unknown[]) => HSApp.Snapping.Strategy>;
  /** 策略选项 */
  option: Record<string, {
    /** 吸附回调 */
    doSnappingCallback?: (...args: unknown[]) => unknown;
    /** 验证回调 */
    vialidatorCallback?: (...args: unknown[]) => boolean;
  }>;
}

/**
 * 宿主变更事件数据
 */
interface HostChangedEventData {
  /** 旧宿主 */
  oldHost: HSCore.Model.Entity | null;
  /** 新宿主 */
  newHost: HSCore.Model.Entity | null;
}

/**
 * 硬装饰移动命令类
 * 继承自基础命令类，实现硬装饰内容的拖拽移动功能
 */
export declare class CmdMoveInHardDecoration extends HSApp.Cmd.Command {
  /** 移动的内容列表 */
  private _contents: HSCore.Model.Content[];
  
  /** 第一个内容（主内容） */
  private _firstContent: HSCore.Model.Content;
  
  /** 保存的原始数据 */
  private _saved: SavedContentData[];
  
  /** 移动基准点 */
  private _basePoint: Vector3;
  
  /** 移动选项配置 */
  private _option: MoveOptions;
  
  /** 宿主表面列表 */
  private _hostFaces?: HSCore.Model.Face[];
  
  /** 移动请求对象 */
  private _moveRequest: HSApp.Trans.Request | null;
  
  /** 事务会话 */
  private _session: HSApp.Trans.Session | null;
  
  /** 吸附辅助器 */
  private _snappingHelper?: HSApp.Snapping.Helper;
  
  /** 吸附偏移量 */
  private _snapOffset?: number;
  
  /** 是否启用自动适应方向 */
  private _autoFitDirectionEnable: boolean;
  
  /** 吸附到的实体 */
  private _snappedEntity?: HSCore.Model.Entity;
  
  /** 是否忽略吸附偏移 */
  private _ignoreSnapOffset?: boolean;
  
  /** 是否限制在房间内 */
  private _constraintInRoom: boolean;
  
  /** Alt键是否按下 */
  private _altKeyDown: boolean;
  
  /** 移动内容Gizmo */
  private _moveContentGizmo?: unknown;
  
  /** 小图预览控制器 */
  private _miniImagePreviewCtrl?: unknown;
  
  /** 鼠标提示文本 */
  private _mouseTip?: string;
  
  /** 旧光标状态 */
  private _oldCursor?: string;
  
  /** 应用实例 */
  private _app: HSApp.App;
  
  /** 是否为2D视图 */
  private _is2D: boolean;
  
  /** 宿主变更信号 */
  private _signalHostChanged: HSCore.Util.Signal<HostChangedEventData>;
  
  /** 移动吸附信号 */
  private _signalMoveSnapped: HSCore.Util.Signal<unknown[]>;

  /**
   * 构造函数
   * @param contents - 要移动的内容对象或对象数组
   * @param options - 移动选项配置
   */
  constructor(contents: HSCore.Model.Content | HSCore.Model.Content[], options: MoveOptions);

  /**
   * 获取移动的内容列表
   */
  get contents(): HSCore.Model.Content[];

  /**
   * 命令执行时调用
   * @param params - 执行参数
   */
  onExecute(params?: MoveOptions): void;

  /**
   * 命令完成时调用
   */
  onComplete(): void;

  /**
   * 命令取消时调用
   */
  onCancel(): void;

  /**
   * 接收消息处理
   * @param message - 消息类型
   * @param params - 消息参数
   * @returns 是否处理成功
   */
  onReceive(message: string, params: DragEventParams): boolean;

  /**
   * 替换父级图层
   * @param newParent - 新父级图层
   */
  private _replaceParent(newParent?: HSCore.Model.Layer): void;

  /**
   * 替换宿主
   * @param eventParams - 事件参数
   */
  private _replaceHost(eventParams: DragEventParams): void;

  /**
   * 检查参数是否有效
   * @param params - 拖拽事件参数
   * @returns 参数是否有效
   */
  private _checkParamValid(params: DragEventParams): boolean;

  /**
   * 检查内容是否已移动
   * @returns 内容是否已移动
   */
  private _isContentMoved(): boolean;

  /**
   * 移动开始时调用
   * @param params - 拖拽事件参数
   */
  private _movingBegin(params: DragEventParams): void;

  /**
   * 移动前预处理
   * @param params - 拖拽事件参数
   */
  private _preMoving(params: DragEventParams): void;

  /**
   * 移动后后处理
   * @param params - 拖拽事件参数
   */
  private _postMoving(params: DragEventParams): void;

  /**
   * 移动结束时调用
   * @param params - 拖拽事件参数
   */
  private _movingEnd(params: DragEventParams): void;

  /**
   * 执行移动操作
   * @param params - 拖拽事件参数
   */
  private _move(params: DragEventParams): void;

  /**
   * 获取移动偏移量和操作选项
   * @param params - 拖拽事件参数
   * @returns 移动偏移量和操作选项
   */
  private _getMoveOffsetAndOptions(params: DragEventParams): MoveOffsetAndOptions;

  /**
   * 更新位置
   * @param offset - 偏移量 [dx, dy, dz?]
   * @param options - 操作选项
   */
  private _updatePosition(offset: number[], options: MoveOperationOptions): void;

  /**
   * 是否可以执行吸附
   * @returns 是否可以执行吸附
   */
  private _isCanDoSnapping(): boolean;

  /**
   * 获取无效方向（受限制的移动方向）
   * @returns 无效方向向量
   */
  private _getInvalidDir(): Vector3 | undefined;

  /**
   * 创建移动请求
   */
  private _createMoveRequest(): void;

  /**
   * 保存原始数据
   */
  private _saveOriginalData(): void;

  /**
   * 检查Alt键并复制内容
   * @param event - 键盘事件
   */
  private _checkALtKeyToDuplicateContent(event?: KeyboardEvent): void;

  /**
   * 是否允许放置
   * @returns 是否允许放置
   */
  private _allowToPlace(): boolean;

  /**
   * 获取宿主对象
   * @param params - 拖拽事件参数
   * @returns 宿主对象
   */
  private _getHost(params: DragEventParams): HSCore.Model.Entity | null;

  /**
   * 显示提示视图
   * @param entity - 实体对象
   * @param params - 拖拽事件参数
   */
  private _showTipView(entity: HSCore.Model.Entity | null, params: DragEventParams): void;

  /**
   * 改变光标状态
   */
  private _changeCursorStatus(): void;

  /**
   * 是否支持图片预览
   * @returns 是否支持图片预览
   */
  private _isSupportImagePreview(): boolean;

  /**
   * 获取请求对象列表
   * @returns 请求对象列表
   */
  private _getRequest(): HSApp.Trans.Request[];

  /**
   * 终止命令
   * @param abort - 是否中止（默认false为完成）
   */
  private _terminateCmd(abort?: boolean): void;

  /**
   * 执行吸附操作
   * @param options - 操作选项
   * @param zValue - Z轴值
   * @param disableZ - 是否禁用Z轴吸附
   */
  private _doSnapping(options: MoveOperationOptions, zValue: number, disableZ?: boolean): void;

  /**
   * 创建Gizmo控制器
   */
  private _createGizmo(): void;

  /**
   * 清理移动内容Gizmo
   */
  private _cleanMoveContentGizmo(): void;

  /**
   * 初始化拾取信息
   */
  private _initPickInfo(): void;

  /**
   * 获取实体中心位置
   * @returns 中心位置向量
   */
  private _getEntityCenterPos(): THREE.Vector3;

  /**
   * 初始化吸附辅助器
   */
  private _initSnapping(): void;

  /**
   * 获取吸附策略配置
   * @returns 吸附策略配置
   */
  private _getSnappingStrategies(): SnappingStrategyConfig;
}