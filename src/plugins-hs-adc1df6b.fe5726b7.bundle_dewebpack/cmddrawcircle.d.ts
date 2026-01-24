import { CmdDrawExCircle } from './CmdDrawExCircle';
import { DrawCircleGizmo } from './DrawCircleGizmo';
import { HSFPConstants } from './HSFPConstants';

/**
 * 外部区域绘制圆形命令
 * 用于在2D草图中添加圆形洞口
 * @extends CmdDrawExCircle
 */
export declare class CmdDrawCircle extends CmdDrawExCircle {
  /**
   * 构造函数
   */
  constructor();

  /**
   * 创建2D交互式操作器（Gizmo）
   * @param context - 包含上下文和显示层信息的对象
   * @param context.context - 绘图上下文
   * @param context.displayLayers - 显示层对象
   * @param context.displayLayers.temp - 临时显示层
   * @returns 圆形绘制Gizmo实例
   */
  protected _create2DGizmo(context: {
    context: unknown;
    displayLayers: {
      temp: unknown;
      [key: string]: unknown;
    };
  }): DrawCircleGizmo;

  /**
   * 创建绘制圆形的请求
   * @param params - 绘制参数
   * @returns 事务请求对象
   */
  protected _createRequest(params: unknown): unknown;

  /**
   * 获取命令描述
   * @returns 命令描述文本
   */
  getDescription(): string;

  /**
   * 获取命令所属分类
   * @returns 日志分组类型：外部区域绘制
   */
  getCategory(): HSFPConstants.LogGroupTypes.OutdoorDrawing;
}