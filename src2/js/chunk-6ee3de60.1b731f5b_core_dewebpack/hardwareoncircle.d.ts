import type { Point, Vector } from './geometry';
import type { Hardware } from './Hardware';
import type { Sash } from './sash';
import type { Direction } from './Direction';

/**
 * 表示圆形多边形的接口
 */
interface CirclePolygon {
  /** 圆心坐标 */
  center: Point;
  /** 圆的半径 */
  r: number;
}

/**
 * 硬件组件在圆形路径上的抽象类
 * 继承自 Hardware 基类，用于处理安装在圆形窗框上的五金件定位
 */
export declare abstract class HardwareOnCircle extends Hardware {
  /**
   * 从基准线到硬件的距离
   * @default sash.profileSize / 2
   */
  protected _distanceFromBaseline: number;

  /**
   * 获取关联窗扇的圆形多边形表示
   */
  get circle(): CirclePolygon;

  /**
   * 获取硬件在圆上的投影位置（未考虑偏移）
   * 根据停靠方向返回圆上的对应点：
   * - Down: 圆心下方，距离为半径
   * - Up: 圆心上方，距离为半径
   * - Right: 圆心右侧，距离为半径
   * - Left: 圆心左侧，距离为半径
   */
  get projectionPosition(): Point;

  /**
   * 获取硬件的最终位置（投影位置 + 偏移量）
   */
  get position(): Point;

  /**
   * 获取硬件的中心位置
   * @returns 与 position 相同
   */
  get centerPosition(): Point;

  /**
   * 将硬件对齐到指定目标
   * @param target - 对齐目标
   * @param options - 对齐选项
   * @remarks 当前实现为空，可能需要子类重写
   */
  alignTo(target: unknown, options: unknown): void;

  /**
   * 计算从投影位置到实际位置的偏移向量
   * @returns 从圆心指向投影位置的单位向量，乘以 _distanceFromBaseline
   */
  protected positionOffset(): Vector;

  /**
   * 关联的窗扇对象
   */
  sash: Sash;

  /**
   * 硬件的停靠方向
   */
  dockDirection: Direction;
}