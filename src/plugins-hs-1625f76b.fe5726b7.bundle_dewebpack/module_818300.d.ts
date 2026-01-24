/**
 * 移动内容命令
 * 用于在场景中移动单个或多个内容对象，支持拖拽、吸附、分组等功能
 */
declare module HSApp.Cmd {
  /**
   * 移动内容命令类
   * 继承自 HSApp.Cmd.Command，用于处理内容对象的移动操作
   */
  export class MoveContentsCommand extends HSApp.Cmd.Command {
    /**
     * 要移动的内容对象数组
     */
    contents: HSCore.Model.Content[];

    /**
     * 目标位置（可选）
     */
    private _targetPosition?: HSCore.Util.Math.Vector3;

    /**
     * 移动选项配置
     */
    private _option?: MoveContentsOption;

    /**
     * 内容分组对象
     */
    group?: HSCore.Model.Group;

    /**
     * Ctrl 键是否按下
     */
    ctrlKeyDown: boolean;

    /**
     * Alt 键是否按下（用于挂起命令）
     */
    altKeyDown: boolean;

    /**
     * 保存的恢复数据，用于撤销操作
     */
    saved: SavedContentState[];

    /**
     * 宿主变更信号
     */
    signalHostChanged: HSCore.Util.Signal<HostChangedEvent>;

    /**
     * 命令输出结果
     */
    output: CommandOutput;

    /**
     * 命令类型
     */
    cmdType: HSFPConstants.CommandType;

    /**
     * 内部移动内容命令实例
     */
    cmdMoveContent?: HSApp.Cmd.Command;

    /**
     * 构造函数
     * @param contents - 要移动的内容对象数组
     * @param targetPosition - 目标位置（可选）
     * @param option - 移动选项配置（可选）
     * @param cmdType - 命令类型，默认为 MoveContent
     */
    constructor(
      contents: HSCore.Model.Content[],
      targetPosition?: HSCore.Util.Math.Vector3,
      option?: MoveContentsOption,
      cmdType?: HSFPConstants.CommandType
    );

    /**
     * 判断命令是否可以挂起
     * @returns 当 Alt 键按下时返回 true
     */
    canSuspend(): boolean;

    /**
     * 将内容附加到合适的宿主
     * 使用吸附策略查找最合适的宿主对象
     * @param content - 要附加的内容对象
     */
    private _attatchedHost(content: HSCore.Model.Content): void;

    /**
     * 移除分组
     * 解散当前分组并恢复选择状态
     */
    private _removeGroup(): void;

    /**
     * 检查内容对象的宿主
     * 在非 Ctrl 键按下时，为所有内容查找合适的宿主
     */
    private _checkContentsHost(): void;

    /**
     * 清理命令资源
     * 清理移动命令、移除分组、清除跟踪实体
     */
    onCleanup(): void;

    /**
     * 执行命令
     * 创建分组、保存状态、执行移动操作
     */
    onExecute(): void;

    /**
     * 保存内容对象的恢复数据
     * 记录位置、旋转、宿主等信息用于撤销
     */
    private _saveRestoreData(): void;

    /**
     * 判断内容是否已移动
     * @returns 如果内容已移动返回 true
     */
    private _isContentsMoved(): boolean;

    /**
     * 将内容移动到指定位置
     * @param content - 要移动的内容对象
     * @param position - 目标位置
     */
    private _moveToPosition(
      content: HSCore.Model.Content,
      position: Partial<HSCore.Util.Math.Vector3>
    ): void;

    /**
     * 判断内容是否可拖拽
     * 检查内容类型和当前视图状态
     * @returns 如果所有内容都可拖拽返回 true
     */
    isDraggable(): boolean;

    /**
     * 接收事件消息
     * 处理拖拽开始、拖拽中、拖拽结束、移动到等事件
     * @param eventType - 事件类型（dragstart, dragmove, dragend, mouseup, moveto）
     * @param eventData - 事件数据
     * @returns 是否继续处理事件
     */
    onReceive(eventType: string, eventData: DragEventData): boolean;

    /**
     * 取消命令
     * 取消内部移动命令
     */
    onCancel(): void;

    /**
     * 判断命令是否支持撤销/重做
     * @returns 始终返回 false
     */
    canUndoRedo(): boolean;

    /**
     * 获取吸附策略
     * 根据内容类型和视图类型创建相应的吸附策略
     * @param helper - 吸附辅助对象
     * @param content - 内容对象
     * @returns 吸附策略数组
     */
    private _getSnappingStrategies(
      helper: HSApp.Snapping.Helper,
      content: HSCore.Model.Content
    ): HSApp.Snapping.Strategy[];

    /**
     * 获取命令描述
     * @returns 命令的中文描述
     */
    getDescription(): string;

    /**
     * 获取命令分类
     * @returns 日志分组类型
     */
    getCategory(): HSFPConstants.LogGroupTypes;
  }
}

/**
 * 移动内容选项配置
 */
interface MoveContentsOption {
  /**
   * 视图类型（2D/3D）
   */
  viewType?: string;

  /**
   * 是否选择移动后的对象
   */
  select?: boolean;

  /**
   * 是否保持 Z 轴位置
   */
  keepZAxis?: boolean;

  /**
   * 是否移动分组成员
   */
  moveMembers?: boolean;

  /**
   * 保存的恢复数据
   */
  saved?: SavedContentState[];
}

/**
 * 保存的内容状态
 * 用于撤销操作时恢复对象状态
 */
interface SavedContentState {
  /**
   * X 坐标
   */
  x: number;

  /**
   * Y 坐标
   */
  y: number;

  /**
   * Z 坐标
   */
  z: number;

  /**
   * 旋转角度
   */
  rotation: number;

  /**
   * 宿主对象
   */
  host?: HSCore.Model.Content;
}

/**
 * 宿主变更事件
 */
interface HostChangedEvent {
  /**
   * 旧的宿主对象
   */
  oldHost?: HSCore.Model.Content;

  /**
   * 新的宿主对象
   */
  newHost?: HSCore.Model.Content;
}

/**
 * 命令输出结果
 */
interface CommandOutput {
  /**
   * 输出的内容对象（可能是数组或分组）
   */
  content: HSCore.Model.Content[] | HSCore.Model.Group;
}

/**
 * 拖拽事件数据
 */
interface DragEventData {
  /**
   * 原始事件对象
   */
  event: MouseEvent | DragEvent;

  /**
   * 目标位置
   */
  position?: HSCore.Util.Math.Vector3;

  /**
   * 是否保持相对位置
   */
  keepRelativePosition?: boolean;
}

/**
 * 命令注册
 * 将 MoveContentsCommand 注册到命令系统
 */
declare namespace HSApp.Cmd.Command {
  function registerCmd(
    type: HSFPConstants.CommandType,
    commandClass: typeof HSApp.Cmd.MoveContentsCommand
  ): void;
}