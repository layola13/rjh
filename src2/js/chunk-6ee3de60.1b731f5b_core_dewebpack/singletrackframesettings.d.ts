import { Direction } from './Direction';
import { EdgeJointWay } from './EdgeJointWay';
import { FrameSettings } from './FrameSettings';

/**
 * 单轨框架设置类
 * 用于管理单个轨道框架的配置属性，包括多边形、隐藏状态、拉伸高度和接合方式
 */
export declare class SingleTrackFrameSettings extends FrameSettings {
  /**
   * 获取框架的多边形对象
   * @returns 框架关联的多边形实例
   */
  get poly(): Polygon;

  /**
   * 获取有效的边缘接合方式ID列表
   * @returns 多边形的有效EdgeJointWay ID数组
   */
  get ejwIds(): number[];

  /**
   * 获取隐藏的方向列表
   * @returns 多边形隐藏的方向数组
   */
  get hidden(): Direction[];

  /**
   * 设置隐藏的方向
   * 会重置拉伸高度映射、清空边缘接合方式数组，并触发视图重绘和检查点
   * @param value - 要隐藏的方向数组
   */
  set hidden(value: Direction[]);

  /**
   * 获取拉伸高度
   * 仅当隐藏方向数组长度为1时返回对应方向的拉伸高度，否则返回0
   * @returns 拉伸高度值（单位未指定）
   */
  get pullingHeight(): number;

  /**
   * 设置拉伸高度
   * 将向下方向的拉伸高度设置为指定值，并触发框架重建、视图重绘和检查点
   * @param value - 要设置的拉伸高度值
   */
  set pullingHeight(value: number);

  /**
   * 获取边缘接合方式
   * 如果存在有效的ejwId则返回对应的接合方式，否则返回默认值
   * @returns 边缘接合方式枚举值
   */
  get jointWay(): EdgeJointWay;

  /**
   * 设置边缘接合方式
   * 为所有有效的ejwId设置相同的接合方式，并触发框架重建、视图重绘和检查点
   * @param value - 要设置的边缘接合方式
   */
  set jointWay(value: EdgeJointWay);
}

/**
 * 多边形接口（从使用推断）
 */
interface Polygon {
  /** 有效的边缘接合方式ID列表 */
  validEjwIds: number[];
  /** 隐藏的方向列表 */
  hidden: Direction[];
  /** 拉伸高度映射表（方向 -> 高度值） */
  pullingHeight: Map<Direction, number>;
}