import { SpinLine } from './SpinLine';
import { ToolType } from './ToolType';
import { DragDrawTool } from './DragDrawTool';

/**
 * 旋转线工具类
 * 用于在视图中创建和管理旋转线元素的拖拽绘制工具
 * @extends DragDrawTool
 */
export declare class SpinLineTool extends DragDrawTool {
  /**
   * 构造函数
   * @param view - 关联的视图实例，用于操作和渲染
   */
  constructor(view: any);

  /**
   * 指示工具是否应在操作完成后释放
   * @returns 始终返回 true，表示工具在完成操作后自动释放
   */
  get shouldRelease(): boolean;

  /**
   * 完成拖拽操作的回调方法
   * 在用户结束拖拽时被调用，创建旋转线并添加到视图的形状管理器中
   * @param event - 拖拽结束事件对象
   */
  finishDrag(event: any): void;
}