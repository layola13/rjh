/**
 * 修改楼层厚度命令
 * 用于在应用中执行楼板厚度的编辑操作
 */
export declare class CmdChangeLayerThickness extends HSApp.Cmd.Command {
  /**
   * 应用实例引用
   */
  private app: unknown;

  /**
   * 目标楼层对象
   */
  private layer: unknown;

  /**
   * 新的厚度值
   */
  private thickness: number;

  /**
   * 事务请求对象，用于提交到事务管理器
   */
  private _request?: unknown;

  /**
   * 构造函数
   * @param app - 应用实例
   * @param layer - 要修改的楼层对象
   * @param thickness - 新的楼板厚度值
   */
  constructor(app: unknown, layer: unknown, thickness: number);

  /**
   * 执行命令
   * 创建修改楼层厚度的请求并提交到事务管理器
   */
  onExecute(): void;

  /**
   * 清理命令资源
   */
  onCleanup(): void;

  /**
   * 判断命令是否支持撤销/重做
   * @returns false - 该命令不支持撤销重做
   */
  canUndoRedo(): boolean;

  /**
   * 获取当前命令的参数信息
   * 用于日志记录和统计
   * @returns 包含操作分组和点击统计信息的对象
   */
  getCurrentParams(): {
    /**
     * 活动操作分类 - 楼板操作
     */
    activeSection: HSFPConstants.LogGroupTypes.SlabOperation;
    /**
     * 点击统计信息
     */
    clicksRatio: {
      /**
       * 操作标识符
       */
      id: "changeLayerThickness";
      /**
       * 操作显示名称
       */
      name: "楼板厚度";
    };
  };

  /**
   * 获取命令描述
   * @returns 命令的可读描述文本
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 命令所属的日志分组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes.SlabOperation;
}