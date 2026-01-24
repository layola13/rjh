/**
 * 天花板可见性切换命令
 * 用于控制天花板的显示和隐藏状态
 */
export declare class CmdToggleCeilingVisibility extends HSApp.Cmd.Command {
  /**
   * 天花板对象引用
   */
  ceiling: unknown;

  /**
   * 天花板的可见性状态
   */
  visible: boolean;

  /**
   * 事务请求对象
   * @private
   */
  private _request: unknown;

  /**
   * 构造函数
   * @param ceiling - 天花板对象
   * @param visible - 是否可见，默认为 true
   */
  constructor(ceiling: unknown, visible?: boolean);

  /**
   * 执行命令
   * 创建并提交天花板可见性切换的事务请求
   */
  onExecute(): void;

  /**
   * 清理命令资源
   */
  onCleanup(): void;

  /**
   * 判断命令是否支持撤销/重做
   * @returns 返回 true 表示支持撤销重做
   */
  canUndoRedo(): boolean;

  /**
   * 获取命令的描述信息
   * @returns 返回格式化的描述文本，如 "天花板显示" 或 "天花板隐藏"
   */
  getDescription(): string;

  /**
   * 获取命令所属的日志分类
   * @returns 返回楼板操作类型的日志分组
   */
  getCategory(): HSFPConstants.LogGroupTypes.SlabOperation;

  /**
   * 获取当前命令的参数配置
   * @returns 包含活动区域和点击统计信息的参数对象
   */
  getCurrentParams(): {
    /**
     * 活动操作区域
     */
    activeSection: HSFPConstants.LogGroupTypes.SlabOperation;
    
    /**
     * 点击统计信息
     */
    clicksRatio: {
      /**
       * 操作标识符
       */
      id: "toggleCeiling";
      
      /**
       * 操作显示名称
       */
      name: "开关天花板";
    };
  };
}