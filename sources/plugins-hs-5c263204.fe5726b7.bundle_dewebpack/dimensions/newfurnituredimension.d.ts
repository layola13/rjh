import type { HSCore } from 'HSCore';
import type { HSCatalog } from 'HSCatalog';
import type { HSApp } from 'HSApp';
import type { Vector2, Line2d, Loop, PolyCurve, Interval, Curve2d } from 'GeometryTypes';
import type { ContentDimension } from './ContentDimension';

/**
 * 线性标注数据
 */
interface LinearDimensionData {
  /** 标注起点 */
  startPoint: Vector2;
  /** 标注终点 */
  endPoint: Vector2;
}

/**
 * 辅助线性数据
 */
interface HelperLinearData {
  /** 辅助线起点 */
  start: Vector2;
  /** 辅助线终点 */
  end: Vector2;
}

/**
 * 曲线信息
 */
interface CurveInfo {
  /** 关联的实体对象 */
  entity: HSCore.Model.Entity | HSCore.Model.Content | HSCore.Model.StructureFace;
  /** 曲线对象 */
  curve: Line2d;
}

/**
 * 重叠标注信息
 */
interface OverlapDimensionInfo {
  /** 线性标注数据数组 */
  linearDimensionData: LinearDimensionData[];
  /** 辅助线性数据数组 */
  helperLinearData: HelperLinearData[];
  /** 辅助盒子数据数组 */
  helperBoxData: HSCore.Model.Content[];
}

/**
 * 重叠信息
 */
interface OverlapInfo {
  /** 线索引 */
  lineIndex: number;
  /** 曲线对象 */
  curve: Curve2d;
}

/**
 * 标注信息
 */
interface DimensionInfo {
  /** 线性标注数据 */
  linearDimensionData?: LinearDimensionData;
  /** 辅助线性数据 */
  helperLinearData?: HelperLinearData;
  /** 辅助盒子数据 */
  helperBoxData?: HSCore.Model.Content;
}

/**
 * 计算辅助数据结果
 */
interface CalculateHelperDataResult {
  /** 辅助线性数据 */
  helperLinearData?: HelperLinearData;
  /** 辅助盒子数据 */
  helperBoxData?: HSCore.Model.Content;
}

/**
 * 设置变更事件数据
 */
interface SettingChangedEventData {
  data: {
    /** 字段名称 */
    fieldName: string;
    /** 旧值 */
    oldValue: unknown;
    /** 新值 */
    value: boolean;
  };
}

/**
 * 边界信息
 */
interface BoundInfo {
  /** 左边界 */
  left: number;
  /** 上边界 */
  top: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
}

/**
 * 家具标注小部件类
 * 用于在SVG视图中显示家具的精确尺寸标注
 * 
 * @extends ContentDimension
 */
export declare class NewFurnitureDimension extends ContentDimension {
  /** 小部件类型标识 */
  readonly type: 'hsw.view.svg.gizmo.FurnitureDimension';
  
  /** 线性标注小部件数据集合 */
  linearDimensionGizmoDatas: LinearDimensionData[];
  
  /** 扩展辅助线性数据集合 */
  extendsHelperLinearData: HelperLinearData[];
  
  /** 盒子辅助线数据集合 */
  boxHelpLineData: HSCore.Model.Content[];
  
  /** 轮廓辅助数据集合 */
  outlineHelpData: HSCore.Model.Content[];
  
  /** 是否根据中心点计算标注 */
  accordingToCenter: boolean;
  
  /** 关联的内容实体 */
  entity: HSCore.Model.Content;
  
  /** 结构曲线信息集合 */
  structureCurvesInfo: CurveInfo[];
  
  /** 内容曲线信息集合 */
  contentCurvesInfo: CurveInfo[];
  
  /** 是否启用精确定位 */
  isEnable: boolean;

  /**
   * 构造函数
   * @param app 应用实例
   * @param svgElement SVG元素
   * @param entity 内容实体
   */
  constructor(app: HSApp.App, svgElement: SVGElement, entity: HSCore.Model.Content);

  /**
   * 设置变更事件处理器
   * 监听 contentPrecisionLocation 设置项变化并更新显示
   * @param event 设置变更事件数据
   */
  protected _onSettingChanged(event: SettingChangedEventData): void;

  /**
   * 设置是否根据中心点计算标注
   * @param accordingToCenter 是否根据中心点
   */
  setAccordingToCenter(accordingToCenter: boolean): void;

  /**
   * 计算子小部件信息
   * 分析内容边界与周围结构，生成标注数据
   */
  computeChildGizmoInfo(): void;

  /**
   * 根据线获取标注信息
   * @param line 参考线
   * @param curves 候选曲线集合
   * @returns 标注信息
   */
  getDimensionInfoByLine(line: Line2d, curves: CurveInfo[]): DimensionInfo;

  /**
   * 根据线获取候选曲线信息
   * 筛选与给定线相交的曲线
   * @param line 参考线
   * @param curves 曲线集合
   * @returns 候选曲线信息数组
   */
  getCandidateCurvesInfoByLine(line: Line2d, curves: CurveInfo[]): CurveInfo[];

  /**
   * 转换索引到有效范围
   * @param index 原始索引
   * @param minIndex 最小索引
   * @param maxIndex 最大索引
   * @returns 转换后的索引
   */
  convertIndex(index: number, minIndex: number, maxIndex: number): number;

  /**
   * 获取重叠信息
   * 检测内容边界与结构曲线的重叠关系
   * @param boundLines 边界线数组
   * @param curves 曲线集合
   * @returns 重叠信息，无重叠返回 false
   */
  getOverlapInfo(boundLines: Line2d[], curves: CurveInfo[]): OverlapInfo | false;

  /**
   * 计算重叠标注信息
   * @param line 参考线
   * @param point 参考点
   * @returns 重叠标注信息
   */
  computeOverLapDimensionInfo(line: Line2d, point: Vector2): DimensionInfo;

  /**
   * 计算辅助数据
   * @param curve 曲线对象
   * @param point 参考点
   * @param entity 实体对象
   * @returns 辅助数据结果
   */
  calculateHelperData(
    curve: Curve2d | undefined,
    point: Vector2,
    entity: HSCore.Model.Entity | undefined
  ): CalculateHelperDataResult;

  /**
   * 收集所有相关曲线
   * 包括结构面曲线和内容轮廓曲线
   * @returns 曲线信息数组
   */
  collectTotalCurves(): CurveInfo[];

  /**
   * 从边界信息创建循环
   * @param bound 边界信息
   * @returns 矩形循环对象
   */
  getLoopFromBound(bound: BoundInfo): Loop;

  /**
   * 获取内容边界线数组
   * @returns 边界线数组
   */
  getContentBound(): Line2d[];

  /**
   * 将曲线转换为线段
   * @param curve 曲线对象
   * @returns 线段对象，转换失败返回 undefined
   */
  curveToLine(curve: Curve2d | undefined): Line2d | undefined;

  /**
   * 检查轮廓是否平行于结构面
   * @param outline 轮廓点数组
   * @returns 是否平行
   */
  checkIfParallelStructureFace(outline: Vector2[] | undefined): boolean;

  /**
   * 检查候选内容是否有效
   * @param content 候选内容对象
   * @returns 是否为有效候选
   */
  checkCandidateContent(content: HSCore.Model.Content): boolean;

  /**
   * 查找候选内容集合
   * 遍历容器中的所有内容，筛选符合条件的候选对象
   * @param container 容器对象（房间或图层）
   * @returns 候选内容数组
   */
  protected _findCandidateContents(
    container: HSCore.Model.Room | HSCore.Model.Layer
  ): HSCore.Model.Content[];

  /**
   * 获取重叠标注信息
   * 处理与相邻线的重叠情况，生成完整标注数据
   * @param lineIndex 线索引
   * @param boundLines 边界线数组
   * @param curve 重叠曲线
   * @param allCurves 所有曲线集合
   * @returns 重叠标注信息
   */
  getOverLapDimensionInfo(
    lineIndex: number,
    boundLines: Line2d[],
    curve: Curve2d,
    allCurves: CurveInfo[]
  ): OverlapDimensionInfo;

  /**
   * 获取最近交点信息
   * 找到与参考线最近的交点并生成标注数据
   * @param line 参考线
   * @param curves 候选曲线集合
   * @returns 标注信息
   */
  getNearestIntersectInfo(line: Line2d, curves: CurveInfo[]): DimensionInfo;

  /**
   * 验证内容是否有效
   * 检查内容是否被删除、隐藏或不可创建
   * @param content 内容对象
   * @returns 是否有效
   */
  isValidContent(content: HSCore.Model.Content): boolean;
}