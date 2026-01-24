import { FenesTool } from './FenesTool';
import { EventType } from './EventType';
import { OpenDirection } from './OpenDirection';
import { EdgeFinder, Direction } from './EdgeFinder';
import { ShapeType } from './ShapeType';
import vector from './vector';

/**
 * 下滑窗扇工具类
 * 用于创建和配置向下开启且带有滑动功能的窗扇
 */
export declare class DownWithSlideSashTool extends FenesTool {
  /**
   * 添加窗扇到视图
   * @param position - 窗扇添加的位置坐标
   */
  addFenes(position: Point): void;

  /**
   * 广播顶视图变更事件
   * @param frame - 发生变更的顶部框架
   */
  protected broadcastTopViewChange(frame: TopFrame): void;

  /**
   * 判断把手是否朝向右侧
   * @param sash - 需要判断的窗扇对象
   * @returns 如果把手朝右返回true，否则返回false
   */
  protected handleToRight(sash: Sash): boolean;
}

/**
 * 点坐标接口
 */
interface Point {
  x: number;
  y: number;
}

/**
 * 窗扇对象接口
 */
interface Sash {
  /** 父级框架 */
  parent: Frame;
  /** 窗扇多边形 */
  polygon: Polygon;
  /** 顶部框架 */
  topFrame: TopFrame;
  /** 五金件管理器 */
  hardwareManager: HardwareManager;
  /** 碰撞检测 */
  hitTest(point: Point): boolean;
  /** 绘制窗扇 */
  draw(view: View): void;
}

/**
 * 框架接口
 */
interface Frame {
  polygon: Polygon;
}

/**
 * 多边形接口
 */
interface Polygon {
  /** 边界盒 */
  box: BoundingBox;
}

/**
 * 边界盒接口
 */
interface BoundingBox {
  /** 中心点 */
  center: Point;
}

/**
 * 五金件管理器接口
 */
interface HardwareManager {
  /** 开启方向 */
  openDirection: OpenDirection;
  /** 滑动方向 */
  slide: OpenDirection;
  /** 把手 */
  handle: Handle;
  /** 更新多边形 */
  updatePoly(): void;
}

/**
 * 把手接口
 */
interface Handle {
  /** 边缘索引 */
  edgeIndex: number;
}

/**
 * 顶部框架类型
 */
type TopFrame = unknown;

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
  /** 形状映射 */
  shapem: ShapeItem[];
  /** 添加窗扇 */
  addSash(position: Point, type: ShapeType): void;
}

/**
 * 形状项接口
 */
interface ShapeItem {
  /** 窗扇管理器 */
  sashManager: SashManager;
}

/**
 * 窗扇管理器接口
 */
interface SashManager {
  /** 窗扇列表 */
  sashes: Sash[];
}

/**
 * 事件总线接口
 */
interface EventBus {
  /** 发射事件 */
  emit(event: TopViewChangeEvent): void;
}

/**
 * 顶视图变更事件接口
 */
interface TopViewChangeEvent {
  type: EventType;
  payload: {
    view: View;
    frame: TopFrame;
  };
}