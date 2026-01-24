import { FillersTool } from './FillersTool';
import { ShapeType } from './ShapeType';

/**
 * 填充工具 - 空填充类型
 * 用于移除或清空图形的填充效果
 */
export declare class FillerEmptyTool extends FillersTool {
  /**
   * 构造函数
   * 继承自 FillersTool 的所有属性和方法
   */
  constructor();

  /**
   * 更改填充器类型为空填充
   * @param context - 操作上下文对象，提供 changeFillerType 方法
   * @param target - 需要更改填充类型的目标对象
   * @returns 无返回值，但会触发目标对象的重绘
   * @description 将目标对象的填充类型设置为 None（无填充），并在视图中重新绘制
   */
  changeFillerType(
    context: {
      /**
       * 更改填充类型的方法
       * @param target - 目标对象
       * @param shapeType - 新的形状类型
       * @returns 更新后的对象，可能包含 draw 方法
       */
      changeFillerType(
        target: unknown,
        shapeType: ShapeType
      ): { draw?(view: unknown): void } | null | undefined;
    },
    target: unknown
  ): void;

  /**
   * 视图对象引用
   * 用于渲染和绘制操作
   */
  view: unknown;
}