/**
 * 删除图层命令类
 * 用于执行删除楼层操作的命令对象
 */
export declare class CmdDeleteLayer extends HSApp.Cmd.Command {
  /**
   * 要删除的图层对象
   */
  layer: unknown;

  /**
   * 图层在列表中的索引位置
   */
  layerIndex: number;

  /**
   * 内部请求对象，用于事务管理
   * @private
   */
  private _request: unknown | undefined;

  /**
   * 构造函数
   * @param layer - 要删除的图层对象
   * @param layerIndex - 图层索引位置
   */
  constructor(layer: unknown, layerIndex: number);

  /**
   * 执行删除图层操作
   * 当图层索引不为0且图层存在且不是根图层时，创建删除请求并提交
   */
  onExecute(): void;

  /**
   * 判断该命令是否支持撤销/重做
   * @returns false - 该命令不支持撤销重做
   */
  canUndoRedo(): false;

  /**
   * 获取命令描述信息
   * @returns 包含图层ID的描述字符串
   */
  getDescription(): string;

  /**
   * 判断该命令是否为交互式命令
   * @returns true - 该命令为交互式命令
   */
  isInteractive(): true;

  /**
   * 获取命令所属的日志分类
   * @returns 图层操作分类标识
   */
  getCategory(): typeof HSFPConstants.LogGroupTypes.LayerOperation;

  /**
   * 获取当前命令的参数信息（用于日志记录）
   * @returns 包含操作分类和点击统计信息的对象
   */
  getCurrentParams(): {
    /**
     * 活动操作区域标识
     */
    activeSection: typeof HSFPConstants.LogGroupTypes.LayerOperation;
    
    /**
     * 点击率统计信息
     */
    clicksRatio: {
      /**
       * 操作唯一标识
       */
      id: 'deleteLayer';
      
      /**
       * 操作显示名称
       */
      name: '删除楼层';
    };
  };
}