/**
 * 编辑中梃五金件工具
 * 用于在中梃（mullion）上编辑和移动五金件的交互工具
 */

import { Utils } from './utils';
import { EditHardwareTool, ToolType } from './edit-hardware-tool';
import type { View } from './view';
import type { Hardware } from './hardware';
import type { Sash } from './sash';
import type { Point } from './point';
import type { Edge } from './edge';

/**
 * 中梃五金件编辑工具类
 * 继承自EditHardwareTool，提供在中梃上编辑五金件位置的功能
 */
export declare class EditHardwareOnMullionTool extends EditHardwareTool {
  /** 视图对象 */
  protected view: View;
  
  /** 当前操作的五金件 */
  protected hardware?: Hardware;
  
  /** 当前所属的窗扇 */
  protected sash?: Sash;
  
  /** 当前鼠标位置 */
  protected curPt?: Point;

  /**
   * 构造函数
   * @param toolType - 工具类型，默认为editHardwareOnMullion
   * @param view - 视图实例
   */
  constructor(toolType?: ToolType, view?: View);

  /**
   * 执行主要任务：计算并更新五金件在边缘上的位置
   * - 将当前鼠标点投影到五金件所在边缘
   * - 计算投影点在边缘上的相对位置（0-1）
   * - 移动五金件到新位置并重绘
   */
  doTask(): void;

  /**
   * 五金件编辑后的回调处理
   * 同步更新相同多边形ID的其他窗扇上的相同五金件
   * @param position - 五金件在边缘上的相对位置（0-1）
   * @param _unused - 保留参数（未使用）
   */
  onHardwareEdited(position: number, _unused?: unknown): void;
}