/**
 * 删除房间命令
 * 用于删除指定楼层的房间及其关联内容
 */
declare class CmdDeleteNGRoom extends HSApp.Cmd.Command {
  /**
   * 楼层实体
   */
  floor: unknown;

  /**
   * 楼层对应的图层
   */
  private _layer: unknown;

  /**
   * 创建删除房间命令实例
   * @param floor - 要删除的楼层对象
   */
  constructor(floor: unknown);

  /**
   * 获取与指定墙体列表相关的内容
   * @param walls - 墙体数组
   * @returns 返回需要重新分配和需要移除的内容列表
   */
  getRelateContents(walls: unknown[]): {
    /**
     * 需要重新分配的内容数组（如非角窗、非开口、非定制模型等）
     */
    toBeReassign: unknown[];
    /**
     * 需要移除的内容数组（如开口、定制模型、踢脚线、墙附等）
     */
    toBeRemoved: unknown[];
  };

  /**
   * 执行删除房间操作
   * 1. 取消选择并清除墙体悬停状态
   * 2. 删除关联的产品和组件
   * 3. 移除墙面组件
   * 4. 删除关联墙体
   */
  onExecute(): void;

  /**
   * 创建移除墙面组件的请求
   * @returns 返回移除墙面组件的事务请求
   */
  private _removeWFARequest(): unknown;

  /**
   * 完成回调
   * 通知命令管理器操作已完成
   */
  private _onComplete(): void;

  /**
   * 清理资源
   */
  onCleanup(): void;

  /**
   * 是否支持撤销/重做
   * @returns false - 该命令不支持撤销重做
   */
  canUndoRedo(): boolean;

  /**
   * 获取命令描述
   * @returns "删除房间"
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 墙体操作日志分组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * 导出删除房间命令类
 */
export { CmdDeleteNGRoom };