import { CmdAddExGuideLines } from './HSApp/ExtraordinarySketch2d/Cmd/CmdAddExGuideLines';
import { AddGuideLineGizmo } from './AddGuideLineGizmo';

/**
 * 楼板编辑添加辅助线命令
 * 
 * 该命令用于在2D草图编辑模式下添加辅助线，主要用于楼板编辑场景。
 * 继承自 CmdAddExGuideLines，提供了特定于楼板编辑的辅助线添加功能。
 */
export declare class CmdAddGuideLines extends CmdAddExGuideLines {
  /**
   * 构造函数
   * 创建楼板编辑辅助线添加命令实例
   */
  constructor();

  /**
   * 创建2D Gizmo（图形控制器）
   * 
   * @param options - Gizmo创建选项
   * @param options.context - 上下文对象，提供运行时环境信息
   * @param options.displayLayers - 显示图层集合
   * @param options.displayLayers.temp - 临时图层，用于显示临时图形元素
   * @returns 返回新创建的辅助线Gizmo实例
   */
  protected _create2DGizmo(options: {
    context: unknown;
    displayLayers: {
      temp: unknown;
      [key: string]: unknown;
    };
  }): AddGuideLineGizmo;

  /**
   * 创建请求对象
   * 
   * 通过事务管理器创建楼板编辑添加辅助线的请求，用于执行实际的辅助线添加操作
   * 
   * @param guideLineData - 辅助线数据，包含辅助线的位置、方向等信息
   * @returns 返回创建的请求对象，类型为 SlabEdit.AddGuideLine
   */
  protected _createRequest(guideLineData: unknown): unknown;

  /**
   * 获取命令描述
   * 
   * @returns 返回命令的中文描述字符串
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * 
   * @returns 返回命令所属的日志分组类型，用于日志记录和分类
   */
  getCategory(): string;
}