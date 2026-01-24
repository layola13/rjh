import type { Point, Vector, Line } from 'geometry-library';
import type { Tool, ToolType } from './tool';
import type { View } from './view';
import type { VShape } from './shape';
import type { Frame } from './frame';

/**
 * 边缘定义接口
 */
interface Edge {
  /** 起点 */
  start: Point;
  /** 终点 */
  end: Point;
}

/**
 * 角连接器机器人属性接口
 */
interface CornerJoinerRobot {
  /** 角边缘 */
  cornerEdge: Edge;
  /** 主机边缘 */
  hostEdge: Edge;
  /**
   * 平移变换
   * @param vec - 平移向量
   */
  translate(vec: Vector): void;
  /**
   * 绘制到视图
   * @param view - 目标视图
   */
  draw(view: View): void;
  /**
   * 偏斜框架
   * @param view - 目标视图
   */
  skewFrame(view: View): void;
}

/**
 * 形状属性接口
 */
interface ShapeAttrs {
  /** 机器人实例 */
  robot: CornerJoinerRobot;
  /** 可选的数据属性 */
  data?: {
    /** 是否为角分组 */
    isCornerGroup?: boolean;
  };
}

/**
 * 可视化形状接口
 */
interface VShapeWithRobot extends VShape {
  /** 形状属性 */
  attrs: ShapeAttrs;
  /** 父节点 */
  parent?: VShapeWithRobot;
  /**
   * 获取属性值
   * @param key - 属性键
   */
  getAttr(key: string): unknown;
}

/**
 * 帧工具类接口
 */
interface FrameUtil {
  new (view: View): FrameUtil;
  /**
   * 获取与边缘相交的框架（一次性）
   * @param edge - 边缘对象
   * @returns 相交的框架数组
   */
  getIntersectFramesOnce(edge: Edge): Frame[];
}

/**
 * 框架接口
 */
interface Frame {
  /** 关联的图形 */
  gshape: VShapeWithRobot;
}

/**
 * 形状辅助类接口
 */
interface ShapeHelper {
  /**
   * 恢复形状矩阵变换
   * @param shape - 目标形状
   */
  restoreShapeMatrix(shape: VShapeWithRobot): void;
}

/**
 * 编辑角连接器工具
 * 用于处理框架角连接器的拖拽编辑和吸附对齐
 */
export declare class EditCornerJoiner extends Tool {
  /** 当前视图实例 */
  private readonly view: View;
  
  /** 前一个鼠标点位 */
  private prevPt: Point;
  
  /** 拖拽偏移向量 */
  private dragOffsetVec: Vector;
  
  /** 吸附框架缓存 */
  private snapFrames: Frame[];
  
  /** 当前操作的可视化形状 */
  private vshape?: VShapeWithRobot;
  
  /** 磁性吸附点 */
  private magneticPoint?: Point;

  /**
   * 构造角连接器编辑工具
   * @param view - 编辑器视图实例
   */
  constructor(view: View);

  /**
   * 获取当前角连接器机器人实例
   * @returns 角连接器机器人对象
   */
  get cornerJoiner(): CornerJoinerRobot;

  /**
   * 拖拽开始事件处理
   * @param event - 鼠标事件
   */
  dragstart(event: MouseEvent & { target: VShapeWithRobot }): void;

  /**
   * 拖拽移动事件处理
   * 实时检测吸附点并更新形状位置
   * @param event - 鼠标事件
   */
  dragmove(event: MouseEvent): void;

  /**
   * 执行变换任务
   * @param applySkew - 是否应用偏斜变换，默认为 false
   */
  private doTask(applySkew?: boolean): void;

  /**
   * 鼠标操作完成事件处理
   * 应用最终变换并创建历史检查点
   * @param event - 鼠标事件
   */
  mousedone(event: MouseEvent): void;

  /**
   * 检测吸附点
   * @param edge - 待检测的边缘
   * @param robot - 角连接器机器人实例
   * @param showSnap - 是否显示吸附提示
   * @returns 吸附点坐标，无吸附时返回 undefined
   */
  private detectSnaps(
    edge: Edge,
    robot: CornerJoinerRobot,
    showSnap: boolean
  ): Point | undefined;

  /**
   * 隐藏吸附提示
   */
  private hideSnaps(): void;
}

/**
 * 计算两个数组的差集
 * @param arr1 - 第一个数组
 * @param arr2 - 第二个数组
 * @returns 在 arr1 中但不在 arr2 中的元素数组
 */
declare function arrayDifference<T>(arr1: T[], arr2: T[]): T[];