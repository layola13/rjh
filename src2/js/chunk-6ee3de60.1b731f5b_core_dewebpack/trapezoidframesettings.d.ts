/**
 * 梯形框架设置类
 * 继承自FrameSettings，用于管理梯形形状的框架配置
 */
export declare class TrapezoidFrameSettings extends FrameSettings {
  /**
   * 获取与框架关联的多边形对象
   * @returns 框架的多边形实例
   */
  readonly poly: Polygon;

  /**
   * 获取或设置多边形的方向
   * @remarks
   * 设置新方向时会触发以下操作：
   * - 旋转多边形到指定方向
   * - 通知框架管理器重新创建多边形
   * - 隐藏辅助元素
   * - 重绘活动图层
   * - 创建历史记录检查点
   */
  direction: Direction;
}

/**
 * 多边形对象接口
 */
interface Polygon {
  /** 多边形的朝向方向 */
  direction: Direction;
  
  /**
   * 将多边形旋转到指定方向
   * @param direction - 目标方向
   */
  turnTo(direction: Direction): void;
}

/**
 * 框架基类
 */
interface Frame {
  /** 框架关联的多边形 */
  polygon: Polygon;
  
  /** 框架管理器实例 */
  frameManager: FrameManager;
  
  /**
   * 隐藏辅助显示元素
   */
  hideAssist(): void;
}

/**
 * 框架管理器接口
 */
interface FrameManager {
  /**
   * 通知多边形已被重新创建
   * @param polygon - 重新创建的多边形
   * @param view - 关联的视图
   */
  recreated(polygon: Polygon, view: View): void;
}

/**
 * 视图接口
 */
interface View {
  /** 当前活动的图层 */
  activeLayer: Layer;
  
  /** 历史记录管理器 */
  mometoManager: MomentoManager;
}

/**
 * 图层接口
 */
interface Layer {
  /**
   * 批量绘制图层内容（性能优化）
   */
  batchDraw(): void;
}

/**
 * 历史记录管理器接口
 */
interface MomentoManager {
  /**
   * 创建当前状态的检查点
   */
  checkPoint(): void;
}

/**
 * 方向枚举类型
 * 表示多边形可能的朝向
 */
type Direction = number | string;

/**
 * 框架设置基类
 * TrapezoidFrameSettings的父类
 */
declare class FrameSettings {
  /** 关联的框架实例 */
  protected frame: Frame;
  
  /** 关联的视图实例 */
  protected view: View;
}