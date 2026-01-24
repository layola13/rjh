/**
 * 楼板编辑添加辅助线命令
 * 用于在楼板绘制模式下添加辅助线的命令类
 */

import { AddGuideLineGizmo } from './AddGuideLineGizmo';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * 创建2D Gizmo的参数接口
 */
interface Create2DGizmoParams {
  /** 渲染上下文 */
  context: unknown;
  /** 显示层配置 */
  displayLayers: {
    /** 临时层 */
    temp: unknown;
  };
}

/**
 * 楼板编辑添加辅助线命令类
 * 继承自ExtraordinarySketch2d的CmdAddExGuideLines基类
 */
export declare class CmdAddGuideLines extends HSApp.ExtraordinarySketch2d.Cmd.CmdAddExGuideLines {
  /**
   * 构造函数
   */
  constructor();

  /**
   * 创建2D辅助线Gizmo对象
   * @param params - 包含上下文和显示层的参数对象
   * @returns 新创建的AddGuideLineGizmo实例
   */
  protected _create2DGizmo(params: Create2DGizmoParams): AddGuideLineGizmo;

  /**
   * 创建添加辅助线的请求
   * @param data - 辅助线数据参数
   * @returns 事务管理器创建的请求对象
   */
  protected _createRequest(data: unknown): unknown;

  /**
   * 获取命令描述
   * @returns 命令的中文描述字符串
   */
  getDescription(): string;

  /**
   * 获取命令所属的日志分类
   * @returns 楼板绘制日志分组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes.RoofsDrawing;
}