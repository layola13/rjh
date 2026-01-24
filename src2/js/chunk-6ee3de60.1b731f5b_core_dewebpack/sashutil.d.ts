/**
 * 窗扇工具类
 * 提供窗扇对象判断和边缘对接调整功能
 */
export declare class SashUtil {
  /**
   * 判断对象是否为窗扇类型
   * @param obj - 待检测的对象
   * @returns 如果是 DoubleSash、Slide 或 Fold 类型则返回该对象，否则返回 undefined
   */
  static isSash(obj: unknown): DoubleSash | Slide | Fold | undefined;

  /**
   * 调整边缘对接配置
   * @param target - 目标窗扇对象
   * @param reference - 参考窗扇对象
   * @param currentIndex - 当前索引位置
   * @param totalCount - 总数量
   * @param isReverse - 是否反向调整，默认为 false
   * @description 当两个窗扇方向一致且都为矩形时，根据垂直边缘对齐调整对接配置
   */
  static adjustEdDock(
    target: SashObject,
    reference: SashObject,
    currentIndex: number,
    totalCount: number,
    isReverse?: boolean
  ): void;
}

/**
 * 窗扇基础对象接口
 */
interface SashObject {
  /** 窗扇方向 */
  orientation: Orientation;
  /** 边缘线段数组 */
  edges: Segment[];
  /** 边缘对接配置 */
  edDock: EdgeDock;
  /** 判断是否为矩形 */
  isRectangle(): boolean;
}

/**
 * 双层窗扇类型
 */
interface DoubleSash extends SashObject {}

/**
 * 滑动窗扇类型
 */
interface Slide extends SashObject {}

/**
 * 折叠窗扇类型
 */
interface Fold extends SashObject {}

/**
 * 边缘对接配置
 */
interface EdgeDock {
  /** 对接点配置数组 */
  docks: Dock[];
  /** 克隆当前对接配置 */
  clone(): EdgeDock;
}

/**
 * 线段类型
 */
interface Segment {
  /** 起点坐标 */
  start: Point;
  /** 终点坐标 */
  end: Point;
}

/**
 * 坐标点类型
 */
interface Point {
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
  /** 判断是否与另一个点相等 */
  equalTo(other: Point): boolean;
}

/**
 * 对接点配置类型
 */
interface Dock {
  // 对接点的具体属性由实现定义
}

/**
 * 方向枚举或类型
 */
type Orientation = string | number;

export { DoubleSash, Slide, Fold, SashObject, EdgeDock, Segment, Point, Dock, Orientation };