/**
 * 门槛石状态变更请求模块
 * 用于处理门洞的门槛石材质启用/禁用操作
 */

/**
 * 门槛石状态变更请求类
 * 继承自 HSCore.Transaction.Common.StateRequest
 * 负责管理门槛石材质状态的事务性变更
 */
export class ChangeDoorStoneStatusRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 关联的门洞对象
   */
  private readonly _opening: HSCore.Model.Opening | HSCore.Model.ParametricDoor | HSCore.Model.DOpening;

  /**
   * 门槛石材质是否启用
   */
  private readonly _isDoorStoneMaterialEnabled: boolean;

  /**
   * 需要刷新几何体的楼层集合
   */
  private readonly _dirtyFloors: Set<HSCore.Model.Floor>;

  /**
   * 构造函数
   * @param opening - 门洞实例（Opening/ParametricDoor/DOpening）
   * @param isDoorStoneMaterialEnabled - 是否启用门槛石材质
   */
  constructor(
    opening: HSCore.Model.Opening | HSCore.Model.ParametricDoor | HSCore.Model.DOpening,
    isDoorStoneMaterialEnabled: boolean
  ) {
    super();
    this._opening = opening;
    this._isDoorStoneMaterialEnabled = isDoorStoneMaterialEnabled;
    this._dirtyFloors = new Set<HSCore.Model.Floor>();
  }

  /**
   * 提交事务时执行
   * 设置门槛石材质状态，更新面混合绘制，标记需要刷新的楼层
   */
  onCommit(): void {
    this._opening.setDoorStoneMaterialStatus(this._isDoorStoneMaterialEnabled);

    if (this._isDoorStoneMaterialEnabled) {
      this._opening.updateFaceMixPaint(true);
    }

    if (
      this._opening instanceof HSCore.Model.Opening ||
      this._opening instanceof HSCore.Model.ParametricDoor ||
      this._opening instanceof HSCore.Model.DOpening
    ) {
      this._opening.getRefreshFloors().forEach((floor: HSCore.Model.Floor) => {
        this._dirtyFloors.add(floor);
      });
    }

    this._dirtyFloors.forEach((floor: HSCore.Model.Floor) => {
      floor.dirtyGeometry();
    });

    super.onCommit([]);
  }

  /**
   * 撤销操作时执行
   * 标记楼层几何体需要刷新
   */
  onUndo(): void {
    super.onUndo([]);
    this._dirtyFloors.forEach((floor: HSCore.Model.Floor) => {
      floor.dirtyGeometry();
    });
  }

  /**
   * 重做操作时执行
   * 标记楼层几何体需要刷新
   */
  onRedo(): void {
    super.onRedo([]);
    this._dirtyFloors.forEach((floor: HSCore.Model.Floor) => {
      floor.dirtyGeometry();
    });
  }

  /**
   * 判断字段是否可以事务化
   * @returns 始终返回 true
   */
  canTransactField(): boolean {
    return true;
  }
}

/**
 * 门槛石操作命令类
 * 继承自 HSApp.Cmd.Command
 * 用于执行门槛石状态变更的高层命令
 */
export default class ChangeDoorStoneCommand extends HSApp.Cmd.Command {
  /**
   * 关联的实体对象
   */
  entity: unknown;

  /**
   * 构造函数
   * @param entity - 关联的实体对象
   */
  constructor(entity: unknown) {
    super();
    this.entity = entity;
  }

  /**
   * 执行命令
   * @param opening - 门洞对象
   * @param isDoorStoneMaterialEnabled - 是否启用门槛石材质
   * @param contextualToolsPlugin - 上下文工具插件实例
   */
  onExecute(
    opening: HSCore.Model.Opening | HSCore.Model.ParametricDoor | HSCore.Model.DOpening,
    isDoorStoneMaterialEnabled: boolean,
    contextualToolsPlugin: unknown
  ): void {
    this.contextualToolsPlugin = contextualToolsPlugin;

    const request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.ChangeDoorStoneStatus,
      [opening, isDoorStoneMaterialEnabled, contextualToolsPlugin]
    );

    this.context.transManager.commit(request);
  }

  /**
   * 是否支持撤销/重做
   * @returns 返回 false，不支持撤销重做
   */
  canUndoRedo(): boolean {
    return false;
  }

  /**
   * 获取命令描述
   * @returns 命令描述文本
   */
  getDescription(): string {
    return "过门石";
  }

  /**
   * 获取命令分类
   * @returns 命令所属的日志分组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}