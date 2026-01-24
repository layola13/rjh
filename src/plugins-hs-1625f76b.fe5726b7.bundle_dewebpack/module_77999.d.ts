/**
 * 3D场景内容移动事务请求
 * 
 * 该类用于管理3D场景中内容对象（如墙体开口、板块开口等）的移动操作，
 * 包括位置变换、旋转变换、宿主分配和父级关系更新。
 * 支持撤销/重做功能。
 */

/**
 * 位置和变换信息接口
 */
interface TransformState {
  /** X坐标位置 */
  x?: number;
  /** Y坐标位置 */
  y?: number;
  /** Z坐标位置 */
  z?: number;
  /** Z轴旋转角度 */
  rotation?: number;
  /** X轴旋转角度 */
  XRotation?: number;
  /** Y轴旋转角度 */
  YRotation?: number;
  /** 宿主对象 */
  host?: HSCore.Model.IHost;
  /** 父级对象 */
  parent?: HSCore.Model.IParent;
}

/**
 * 位置信息接口（用于板块开口影响计算）
 */
interface PositionInfo {
  /** X轴位置 */
  xPos: number;
  /** Y轴位置 */
  yPos: number;
}

/**
 * 内容移动事务请求类
 * 
 * 继承自 HSCore.Transaction.Request，实现内容对象的移动、旋转和重新分配操作。
 * 支持自动适配、几何体更新和影响区域计算。
 * 
 * @extends HSCore.Transaction.Request
 */
declare class ContentMoveRequest extends HSCore.Transaction.Request {
  /**
   * 要移动的内容对象
   * @private
   */
  private _content: HSCore.Model.IContent;

  /**
   * 移动前的状态信息（用于撤销）
   * @private
   */
  private _previous: TransformState;

  /**
   * 移动后的目标状态信息
   * @private
   */
  private _next: TransformState;

  /**
   * 是否可以执行自动适配
   * @private
   */
  private _canDoAutoFit: boolean;

  /**
   * 是否已经执行过自动适配
   * @private
   */
  private _hasAutoFit: boolean;

  /**
   * 板块开口影响的墙面列表（缓存）
   * @private
   */
  private _slabOpeningAffectedWallFaces?: HSCore.Model.WallFace[];

  /**
   * 构造函数
   * 
   * @param content - 要移动的内容对象
   * @param previous - 移动前的状态信息
   * @param next - 移动后的目标状态信息
   * @param canDoAutoFit - 是否可以执行自动适配，默认为 false
   * @param hasAutoFit - 是否已经执行过自动适配，默认为 true
   */
  constructor(
    content: HSCore.Model.IContent,
    previous: TransformState,
    next: TransformState,
    canDoAutoFit?: boolean,
    hasAutoFit?: boolean
  );

  /**
   * 提交事务时的回调
   * 执行实际的移动操作
   * @public
   */
  onCommit(): void;

  /**
   * 执行内容移动操作
   * 
   * 更新内容对象的位置、旋转、宿主和父级关系，
   * 并根据需要触发自动适配和几何体重建。
   * 
   * @param forceAutoFit - 是否强制执行自动适配，默认为 false
   * @private
   */
  private _moveContent(forceAutoFit?: boolean): void;

  /**
   * 自定义移动逻辑（子类可重写）
   * 
   * 提供扩展点，允许子类在移动操作后执行额外的自定义逻辑。
   * 
   * @param forceAutoFit - 是否强制执行自动适配
   * @protected
   */
  protected customizedMove(forceAutoFit?: boolean): void;

  /**
   * 保存当前状态用于恢复
   * 
   * 将当前内容对象的位置、旋转、宿主和父级信息保存到 _previous 中，
   * 用于撤销/重做操作。
   * 
   * @private
   */
  private _saveRestoreData(): void;

  /**
   * 撤销/重做操作的内部处理
   * 
   * 交换 _previous 和 _next 的值，并执行移动操作。
   * 
   * @private
   */
  private _onUndoRedo(): void;

  /**
   * 撤销操作回调
   * @public
   */
  onUndo(): void;

  /**
   * 重做操作回调
   * @public
   */
  onRedo(): void;

  /**
   * 更新开口的混合贴图和地板几何体
   * 
   * 针对墙体开口，更新宿主面的几何体和混合贴图。
   * 针对板块开口，更新关联天花板和地板的几何体和混合贴图。
   * 
   * @public
   */
  updateMixPaintAndFloorGeometryOfOpening(): void;

  /**
   * 更新板块洞口影响的墙面
   * 
   * 计算板块开口移动前后影响的所有墙面，并标记其几何体为脏状态，
   * 触发重新计算和渲染。
   * 
   * @public
   */
  updateSlabHoleAffectedWalls(): void;

  /**
   * 获取事务描述
   * 
   * @returns 返回 "移动物品"
   * @public
   */
  getDescription(): string;

  /**
   * 获取事务类别
   * 
   * @returns 返回 HSFPConstants.LogGroupTypes.ContentOperation
   * @public
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

export default ContentMoveRequest;