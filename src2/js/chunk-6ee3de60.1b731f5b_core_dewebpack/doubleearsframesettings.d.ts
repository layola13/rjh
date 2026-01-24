import Vector from './Vector';
import { Direction } from './Direction';
import { FrameSettings } from './FrameSettings';
import { EdgeJointWay } from './EdgeJointWay';
import { Kfc2Polygon, PolyType } from './Polygon';

/**
 * 双耳框架设置类
 * 用于管理和配置双耳多边形框架的各种属性，包括耳朵位置、连接方式、底座和拉伸高度等
 */
export declare class DoubleEarsFrameSettings extends FrameSettings {
  /**
   * 获取框架关联的多边形对象
   * @returns 框架的多边形实例
   */
  get poly(): Polygon;

  /**
   * 获取耳朵的位置方向
   * @returns 耳朵位置（上/下/左/右等方向）
   */
  get earPosition(): Direction;

  /**
   * 设置耳朵的位置方向
   * 当位置改变时会触发多边形重新布局、重建和视图更新
   * 注意：仅对非Kfc2Polygon类型生效
   * @param value - 新的耳朵位置
   */
  set earPosition(value: Direction);

  /**
   * 设置边缘连接方式
   * 为多边形的每条边设置连接方式，特殊处理索引3、4、5、6的边
   * - 索引3、6：使用默认连接方式
   * - 索引4、5：使用垂直连接方式
   * @param value - 连接方式枚举值
   */
  set jointWay(value: EdgeJointWay);

  /**
   * 获取是否具有底座
   * @returns 如果是Kfc2Polygon类型返回false，否则返回多边形的hasBase属性
   */
  get hasBase(): boolean;

  /**
   * 设置是否具有底座
   * 仅当耳朵位置在上方(Direction.Up)时允许修改
   * 修改后会重置拉伸高度为0并触发重建
   * @param value - 是否启用底座
   */
  set hasBase(value: boolean);

  /**
   * 获取拉伸高度
   * @returns 索引4位置的拉伸高度值
   */
  get pullingHeight(): number;

  /**
   * 设置拉伸高度
   * 仅当耳朵位置在上方(Direction.Up)时允许修改
   * 值必须大于等于0且不能与当前值相同
   * @param value - 新的拉伸高度（非负数）
   */
  set pullingHeight(value: number);

  /**
   * 获取多边形类型
   * @returns 如果是Kfc2Polygon实例返回kfc2类型，否则返回doubleEars类型
   */
  get polyType(): PolyType;
}

/**
 * 多边形接口（基础类型定义）
 */
interface Polygon {
  /** 耳朵位置方向 */
  earPosition: Direction;
  /** 是否具有底座 */
  hasBase: boolean;
  /** 各边的拉伸高度数组 */
  pullingHeight: number[];
  /** 多边形的边集合 */
  edges: Edge[];
  /** 多边形的边界盒 */
  box: BoundingBox;
  /** 多边形的位置坐标 */
  position: Vector;
  /** 初始化布局 */
  initLayout(): void;
  /** 平移多边形 */
  translate(offset: Vector): void;
}

/**
 * 边界盒接口
 */
interface BoundingBox {
  /** 边界盒中心点 */
  center: Vector;
}

/**
 * 边对象接口
 */
interface Edge {
  // 边的具体属性根据实际实现定义
}

/**
 * 框架接口
 */
interface Frame {
  /** 框架的多边形 */
  polygon: Polygon;
  /** 框架管理器 */
  frameManager: FrameManager;
  /** 隐藏辅助元素 */
  hideAssist(): void;
}

/**
 * 框架管理器接口
 */
interface FrameManager {
  /** 边缘连接方式数组 */
  ejw: EdgeJointWay[];
  /** 重建多边形 */
  recreated(polygon: Polygon, view: View): void;
}

/**
 * 视图接口
 */
interface View {
  /** 当前活动图层 */
  activeLayer: Layer;
  /** 快照管理器 */
  mometoManager: MomentoManager;
}

/**
 * 图层接口
 */
interface Layer {
  /** 批量重绘 */
  batchDraw(): void;
}

/**
 * 快照管理器接口
 */
interface MomentoManager {
  /** 创建检查点 */
  checkPoint(): void;
}