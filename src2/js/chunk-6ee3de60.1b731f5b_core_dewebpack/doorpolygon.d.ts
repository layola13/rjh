import { Direction } from './Direction';
import { SingleTrackPolygon, PolyType } from './SingleTrackPolygon';

/**
 * 门多边形类
 * 表示建筑结构中的门元素，继承自单轨多边形
 * 默认隐藏下方方向的渲染
 */
export declare class DoorPolygon extends SingleTrackPolygon {
  /**
   * 隐藏的方向数组
   * 默认包含 Direction.Down，表示门的底部不渲染
   */
  hidden: Direction[];

  /**
   * 构造函数
   * @param position - 门的位置信息
   */
  constructor(position?: any);

  /**
   * 拉伸高度
   * 控制门在垂直方向上的高度属性
   */
  pullingHeight: number;

  /**
   * 序列化为JSON对象
   * 将门多边形实例转换为可序列化的JSON对象
   * @returns 包含门类型标识的JSON对象
   */
  toJSON(): {
    type: PolyType.door;
    [key: string]: any;
  };

  /**
   * 克隆当前门多边形实例
   * 创建一个新的DoorPolygon实例，复制当前实例的位置和拉伸高度
   * @returns 克隆后的新门多边形实例
   * @internal
   */
  _clone(): DoorPolygon;
}