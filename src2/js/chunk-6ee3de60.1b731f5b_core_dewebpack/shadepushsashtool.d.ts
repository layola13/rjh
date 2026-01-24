import { ToolType } from './path/to/ToolType';
import { FenesTool } from './path/to/FenesTool';

/**
 * 遮阳推拉窗工具类
 * 用于在视图中添加单层或双层遮阳推拉窗
 */
export class ShadePushSashTool extends FenesTool {
  /**
   * 工具名称，用于区分单层和双层遮阳推拉窗
   */
  name?: ToolType;

  /**
   * 添加门窗功能
   * 根据工具类型添加单层或双层遮阳推拉窗到视图中
   * 
   * @param position - 门窗的位置或配置参数
   */
  addFenes(position: unknown): void;
}