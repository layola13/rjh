import { Line2d, Arc2d } from './geometry';
import { SnapHelper, CurveType, BizType, SnapUIData, SnapResult } from './snap-helper';
import { Layer } from './layer';
import { Vector2 } from './vector';

/**
 * 多边形房间绘制的捕捉辅助类
 * 用于在绘制多边形房间时提供智能捕捉功能，支持捕捉到线段、弧线和点
 */
export declare class DrawPolygonRoomSnapHelper extends SnapHelper {
  /**
   * 根据多边形的边界进行捕捉
   * @param curves - 多边形的边界曲线集合（线段或弧线）
   * @returns 捕捉后的偏移向量，如果没有捕捉到则返回 undefined
   */
  snapByPolygon(curves: Array<Line2d | Arc2d>): Vector2 | undefined;

  /**
   * 刷新户外路径的捕捉数据
   * 从户外图层中提取所有楼层的路径数据，更新内部捕捉点和曲线信息
   * 仅当当前图层为根图层时才执行
   */
  refreshForOutdoorPath(): void;

  /**
   * 内部捕捉点集合
   * @private
   */
  private _points: Vector2[];

  /**
   * 内部曲线信息集合
   * @private
   */
  private _curveBeans: CurveBean[];

  /**
   * 当前操作的图层
   * @private
   */
  private _layer: Layer;

  /**
   * 执行捕捉计算
   * @param data - 包含线段和点的捕捉数据
   * @param options - 捕捉选项配置
   * @returns 捕捉结果，包含UI数据和偏移向量
   * @private
   */
  private _snap(
    data: SnapData,
    options: SnapOptions
  ): SnapResult | undefined;

  /**
   * 处理捕捉UI数据的显示
   * @param uiData - 捕捉产生的UI数据
   * @private
   */
  private _handleSnapUIData(uiData: SnapUIData): void;

  /**
   * 创建曲线Bean对象
   * @param curveType - 曲线类型
   * @param curve - 曲线对象
   * @param bizType - 业务类型
   * @returns 曲线Bean对象
   * @private
   */
  private _getCBean(
    curveType: CurveType,
    curve: Line2d | Arc2d,
    bizType: BizType
  ): CurveBean;
}

/**
 * 捕捉数据接口
 */
interface SnapData {
  /** 可捕捉的线段集合 */
  lines: Line2d[];
  /** 可捕捉的点集合 */
  points: Vector2[];
}

/**
 * 捕捉选项配置
 */
interface SnapOptions {
  /** 是否启用正交模式 */
  orthoModeOn: boolean;
  /** 曲线类型 */
  curveType: CurveType;
  /** 捕捉步长 */
  step: number;
  /** 是否显示捕捉点 */
  showPoint: boolean;
}

/**
 * 曲线Bean对象
 * 封装曲线的类型、几何信息和业务类型
 */
interface CurveBean {
  /** 曲线类型 */
  curveType: CurveType;
  /** 曲线对象 */
  curve: Line2d | Arc2d;
  /** 业务类型 */
  bizType: BizType;
}