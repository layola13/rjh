import { ORIENTATION } from './geometry';
import { Hinge, HardwareShape } from './hardware';

/**
 * 端点铰链类
 * 用于表示安装在窗扇边缘端点位置的铰链硬件
 * 继承自基础铰链类，提供端点特定的行为和约束
 */
export declare class EndpointHinge extends Hinge {
  /**
   * 铰链管理器引用
   */
  manager: any;

  /**
   * 编辑工具实例（可选）
   */
  editTool: any | undefined;

  /**
   * 硬件形状类型，固定为端点铰链
   */
  hardwareShape: HardwareShape.EndpointHinge;

  /**
   * 尺寸标注对象
   */
  dim: {
    hidden: boolean;
    [key: string]: any;
  };

  /**
   * 构造函数
   * @param manager - 铰链管理器实例
   */
  constructor(manager: any);

  /**
   * 硬件形状的长度
   * 基于窗扇多边形和铰链边缘索引计算
   * @returns 铰链边缘的长度，如果多边形为空或索引无效则返回-1
   */
  get hardwareShapeLength(): number;

  /**
   * 是否可拖拽
   * 端点铰链固定在端点位置，不允许拖拽
   * @returns 始终返回false
   */
  get draggable(): boolean;

  /**
   * 从另一个铰链实例克隆属性
   * @param source - 源铰链实例
   * @returns 当前实例（支持链式调用）
   */
  cloneFrom(source: EndpointHinge): this;

  /**
   * 重新创建一个新的端点铰链实例
   * 创建新实例并克隆当前实例的所有属性
   * @returns 新的端点铰链实例
   */
  recreate(): EndpointHinge;

  /**
   * 计算硬件形状的方向向量
   * 根据窗扇多边形的方向和偏移位置确定铰链的安装方向
   * - 逆时针方向：起始点旋转π/4，结束点旋转-π/4
   * - 顺时针方向：起始点旋转-π/4，结束点旋转π/4
   * @returns 方向向量
   */
  hardwareShapeDirection(): any;

  /**
   * 获取默认的百分比偏移值数组
   * 端点铰链只能安装在边缘的两个端点（0%或100%位置）
   * @returns 偏移值数组 [0, 1]
   */
  defaultPercentOffsets(): [0, 1];

  /**
   * 内部百分比偏移值（0表示起始端点，1表示结束端点）
   * @internal
   */
  protected _percentOffset: number;

  /**
   * 关联的窗扇对象
   */
  sash: {
    polygon: {
      isEmpty: boolean;
      orientation: ORIENTATION;
      edge(index: number): {
        length: number;
        tangentInStart(): { rotate(angle: number): any };
        tangentInEnd(): { rotate(angle: number): any };
      };
    };
  };

  /**
   * 当前铰链所在的边缘对象
   */
  edge: {
    tangentInStart(): { rotate(angle: number): any };
    tangentInEnd(): { rotate(angle: number): any };
  };
}