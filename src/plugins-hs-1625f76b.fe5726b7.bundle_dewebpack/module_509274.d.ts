/**
 * 选择提示管理器
 * 用于管理和显示场景中对象选择时的操作提示信息
 */
export default class SelectionTipManager {
  /**
   * 选择管理器实例
   */
  private _selectionMgr: any;

  /**
   * 当前操作提示文本
   */
  private _operationTip: string;

  /**
   * 上一次的操作提示文本（用于恢复）
   */
  private _oldOperationTip: string;

  constructor();

  /**
   * 获取属性栏提示项配置
   * @param tipText - 可选的提示文本，不传则使用当前操作提示
   * @returns 属性栏控件配置对象
   */
  getHelpTipsItem(tipText?: string): {
    id: string;
    type: PropertyBarControlTypeEnum;
    order: number;
    data: {
      text: string;
    };
  };

  /**
   * 设置操作提示文本
   * @param tip - 提示文本内容
   * @param preserve - 是否保存为旧提示（用于后续恢复）
   */
  setTip(tip: string, preserve?: boolean): void;

  /**
   * 获取当前操作提示文本
   * @returns 当前提示文本
   */
  getTip(): string;

  /**
   * 清除操作提示
   * @param restoreOld - 是否恢复为上一次保存的提示
   */
  clearTip(restoreOld?: boolean): void;

  /**
   * 处理选择变化事件
   * @param event - 选择事件对象
   */
  handleSelection(event: {
    data?: {
      oldEntities?: any[];
      newEntities?: any[];
    };
  }): void;

  /**
   * 处理高亮变化事件
   * @param event - 高亮事件对象
   */
  handleHighlight(event: {
    data?: {
      oldEntity?: any;
      newEntity?: any;
    };
  }): void;

  /**
   * 处理命令终止事件
   * @param event - 命令事件对象
   */
  handleCmdTerminate(event: {
    data?: {
      cmd?: any;
    };
  }): void;

  /**
   * 判断选择对象是否可恢复之前的提示
   * @param entity - 实体对象
   * @returns 是否可恢复
   */
  private _getSelectionRecoverable(entity: any): boolean;

  /**
   * 根据选择的实体获取对应的提示信息
   * @param entity - 选中的实体对象
   * @returns 提示配置对象
   */
  private _getSelectionTip(entity: any): {
    tip: string;
    preserved: boolean;
  };
}