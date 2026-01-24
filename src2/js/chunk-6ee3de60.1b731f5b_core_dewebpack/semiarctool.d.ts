/**
 * 半圆弧工具模块
 * 提供多种半圆弧类型的绘制功能，包括标准半圆弧、专业半圆弧、半轮等
 */

import { ToolType } from './ToolType';
import { DragDrawTool } from './DragDrawTool';
import { SemiArc, SemiArcPro, SemiArcPro2, HalfWheel, SemiSegmentPro } from './shapes';

/**
 * 半圆弧绘制工具类
 * 继承自拖拽绘制工具，用于在视图中创建各种类型的半圆弧切割线
 */
export declare class SemiArcTool extends DragDrawTool {
  /**
   * 构造函数
   */
  constructor();

  /**
   * 指示工具是否应该在拖拽结束后释放
   * @returns 始终返回 true，表示工具在使用后应立即释放
   */
  get shouldRelease(): boolean;

  /**
   * 完成拖拽操作的回调方法
   * 在拖拽结束时创建半圆弧切割线并添加到视图的形状管理器中
   * @param event - 拖拽事件对象
   */
  finishDrag(event: unknown): void;

  /**
   * 根据工具类型创建对应的切割线对象
   * @param toolName - 工具类型名称，对应 ToolType 枚举值
   * @returns 返回对应类型的半圆弧形状实例
   * 
   * 支持的工具类型：
   * - mullion_semi_arc_pro: 专业半圆弧
   * - mullion_semi_arc_pro2: 专业半圆弧 2
   * - mullion_half_wheel: 半轮形
   * - mullion_semi_segment_pro: 专业半分段弧
   * - 默认: 标准半圆弧
   */
  protected makeCutLine(
    toolName: ToolType
  ): SemiArc | SemiArcPro | SemiArcPro2 | HalfWheel | SemiSegmentPro;
}