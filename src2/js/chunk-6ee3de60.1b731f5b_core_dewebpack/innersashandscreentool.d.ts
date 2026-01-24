import { FenesTool } from './FenesTool';
import { EventType } from './EventType';
import { OpenToward } from './OpenToward';
import { ShapeType } from './ShapeType';

/**
 * 内开扇和纱窗工具类
 * 用于在视图中添加和管理内开扇及纱窗组件
 * @extends FenesTool
 */
export declare class InnerSashAndScreenTool extends FenesTool {
  /**
   * 构造函数
   */
  constructor();

  /**
   * 添加门窗组件到指定位置
   * 该方法会：
   * 1. 在指定位置添加纱窗和扇
   * 2. 查找与指定点碰撞的所有扇
   * 3. 将碰撞扇的五金件开启方向设置为内开
   * 4. 更新扇的多边形轮廓并重绘
   * 5. 广播顶视图变更事件
   * 6. 刷新视图
   * 
   * @param point - 添加位置的坐标点
   * @returns void
   */
  addFenes(point: Point): void;

  /**
   * 广播顶视图变更事件
   * 通过事件总线发送顶视图变更通知
   * 
   * @param frame - 发生变更的顶层框架对象
   * @returns void
   */
  broadcastTopViewChange(frame: TopFrame): void;
}

/**
 * 坐标点接口
 */
interface Point {
  x: number;
  y: number;
}

/**
 * 顶层框架接口
 */
interface TopFrame {
  // 框架相关属性由实际实现定义
  [key: string]: unknown;
}

/**
 * 视图接口
 */
interface View {
  /** 形状管理器 */
  shapeManager: ShapeManager;
  /** 事件总线 */
  eventBus: EventBus;
  /** 刷新视图 */
  refresh(): void;
}

/**
 * 形状管理器接口
 */
interface ShapeManager {
  /** 形状集合 */
  shapem: Shape[];
  /**
   * 添加扇
   * @param point - 添加位置
   * @param shapeType - 形状类型（扇或纱窗）
   */
  addSash(point: Point, shapeType: ShapeType): void;
}

/**
 * 形状接口
 */
interface Shape {
  /** 扇管理器 */
  sashManager: SashManager;
}

/**
 * 扇管理器接口
 */
interface SashManager {
  /** 扇集合 */
  sashes: Sash[];
}

/**
 * 扇接口
 */
interface Sash {
  /** 顶层框架引用 */
  topFrame: TopFrame;
  /** 五金件管理器 */
  hardwareManager: HardwareManager;
  /**
   * 碰撞检测
   * @param point - 检测点坐标
   * @returns 是否发生碰撞
   */
  hitTest(point: Point): boolean;
  /**
   * 绘制扇
   * @param view - 目标视图
   */
  draw(view: View): void;
}

/**
 * 五金件管理器接口
 */
interface HardwareManager {
  /** 开启方向（内开/外开） */
  openToward: OpenToward;
  /** 更新多边形轮廓 */
  updatePoly(): void;
}

/**
 * 事件总线接口
 */
interface EventBus {
  /**
   * 发送事件
   * @param event - 事件对象
   */
  emit(event: TopViewChangeEvent): void;
}

/**
 * 顶视图变更事件接口
 */
interface TopViewChangeEvent {
  /** 事件类型 */
  type: EventType;
  /** 事件载荷 */
  payload: {
    /** 变更的视图 */
    view: View;
    /** 变更的框架 */
    frame: TopFrame;
  };
}