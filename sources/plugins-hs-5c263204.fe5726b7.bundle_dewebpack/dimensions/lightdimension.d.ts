/**
 * 光源定位标注模块
 * 为光源实体提供精确定位的尺寸标注功能
 */

import { HSCore, HSCatalog } from 'HSCore';
import { HSApp } from 'HSApp';
import { Vector2, Line2d, Loop, PolyCurve, Interval, MathAlg } from 'MathLib';
import { BaseDimension } from 'BaseDimension';

// ==================== 类型定义 ====================

/**
 * 曲线信息
 */
interface CurveInfo {
  /** 关联的实体对象 */
  entity: HSCore.Model.Entity;
  /** 二维曲线 */
  curve: Line2d;
}

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
 * 辅助线数据
 */
interface HelperLinearData {
  /** 辅助线起点 */
  start: Vector2;
  /** 辅助线终点 */
  end: Vector2;
}

/**
 * 辅助框数据（Content实体）
 */
type HelperBoxData = HSCore.Model.Content;

/**
 * 标注信息集合
 */
interface DimensionInfo {
  /** 线性标注数据列表 */
  linearDimensionData: LinearDimensionData[];
  /** 辅助线数据列表 */
  helperLinearData: HelperLinearData[];
  /** 辅助框数据列表 */
  helperBoxData: HelperBoxData[];
}

/**
 * 重叠信息
 */
interface OverlapInfo {
  /** 边界线索引（0-3） */
  lineIndex: number;
  /** 重叠的曲线 */
  curve: Line2d;
}

/**
 * 边界信息
 */
interface BoundInfo {
  /** 左边距 */
  left: number;
  /** 顶部边距 */
  top: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
}

/**
 * 辅助数据计算结果
 */
interface HelperDataResult {
  /** 辅助线数据 */
  helperLinearData?: HelperLinearData;
  /** 辅助框数据 */
  helperBoxData?: HelperBoxData;
}

// ==================== 主类定义 ====================

/**
 * 光源尺寸标注类
 * 为光源（点光源、聚光灯等）提供智能定位标注功能
 * 
 * @extends BaseDimension
 */
export declare class LightDimension extends BaseDimension {
  /** 类型标识 */
  static readonly type: 'hsw.view.svg.gizmo.LightDimension';
  
  /** 日志记录器 */
  static readonly logger: any;

  /** 结构面曲线信息缓存 */
  structureCurvesInfo: CurveInfo[];
  
  /** 内容物曲线信息缓存 */
  contentCurvesInfo: CurveInfo[];
  
  /** 是否以中心点为基准进行标注 */
  accordingToCenter: boolean;
  
  /** 线性标注数据列表 */
  linearDimensionGizmoDatas: LinearDimensionData[];
  
  /** 扩展辅助线数据 */
  extendsHelperLinearData: HelperLinearData[];
  
  /** 轮廓辅助数据 */
  outlineHelpData: HelperBoxData[];
  
  /** 边界框辅助线数据 */
  boxHelpLineData: (HSCore.Model.Content | HelperBoxData)[];
  
  /** 边界框渲染元素 */
  BoundaryboxElement: any[];

  /**
   * 构造函数
   * @param entity - 光源实体对象
   * @param viewportElement - 视口元素
   * @param context - 上下文对象
   */
  constructor(
    entity: HSCore.Model.PointLight | HSCore.Model.SpotLight,
    viewportElement: any,
    context: any
  );

  /**
   * 设置是否按中心点标注
   * @param accordingToCenter - true为按中心点，false为按边界
   */
  setAccordingToCenter(accordingToCenter: boolean): void;

  /**
   * 计算子元素标注信息
   * 根据光源与周围结构/内容物的关系生成标注数据
   */
  computeChildGizmoInfo(): void;

  /**
   * 根据边界线获取标注信息
   * @param boundaryLine - 边界线
   * @param allCurves - 所有候选曲线
   * @returns 标注信息（包含线性标注、辅助线、辅助框）
   */
  getDimensionInfoByLine(
    boundaryLine: Line2d,
    allCurves: CurveInfo[]
  ): {
    linearDimensionData: LinearDimensionData;
    helperLinearData?: HelperLinearData;
    helperBoxData?: HelperBoxData;
  };

  /**
   * 根据边界线筛选候选曲线
   * @param boundaryLine - 边界线
   * @param allCurves - 所有曲线
   * @returns 与边界线相交的候选曲线列表
   */
  getCandidateCurvesInfoByLine(
    boundaryLine: Line2d,
    allCurves: CurveInfo[]
  ): CurveInfo[];

  /**
   * 获取最近的交点信息
   * @param boundaryLine - 边界线
   * @param candidates - 候选曲线列表
   * @returns 最近交点的标注信息
   */
  getNearestIntersectInfo(
    boundaryLine: Line2d,
    candidates: CurveInfo[]
  ): {
    linearDimensionData: LinearDimensionData;
    helperLinearData?: HelperLinearData;
    helperBoxData?: HelperBoxData;
  };

  /**
   * 获取重叠标注信息
   * @param lineIndex - 边界线索引
   * @param boundaries - 边界线数组
   * @param overlapCurve - 重叠曲线
   * @param allCurves - 所有曲线
   * @returns 重叠区域的标注信息
   */
  getOverLapDimensionInfo(
    lineIndex: number,
    boundaries: Line2d[],
    overlapCurve: Line2d,
    allCurves: CurveInfo[]
  ): DimensionInfo;

  /**
   * 计算重叠标注详细信息
   * @param boundaryLine - 边界线
   * @param targetPoint - 目标点
   * @returns 标注数据
   */
  computeOverLapDimensionInfo(
    boundaryLine: Line2d,
    targetPoint: Vector2
  ): {
    linearDimensionData: LinearDimensionData;
    helperLinearData?: HelperLinearData;
    helperBoxData?: HelperBoxData;
  };

  /**
   * 获取重叠信息
   * @param boundaries - 边界线数组
   * @param curves - 曲线列表
   * @returns 重叠信息，若无重叠返回false
   */
  getOverlapInfo(
    boundaries: Line2d[],
    curves: CurveInfo[]
  ): OverlapInfo | false;

  /**
   * 计算辅助数据
   * @param curve - 曲线
   * @param point - 点
   * @param entity - 实体
   * @returns 辅助线和辅助框数据
   */
  calculateHelperData(
    curve: Line2d | undefined,
    point: Vector2,
    entity: HSCore.Model.Entity
  ): HelperDataResult;

  /**
   * 收集所有相关曲线
   * @returns 包含结构面和内容物的所有曲线
   */
  collectTotalCurves(): CurveInfo[];

  /**
   * 获取光源的边界线
   * @returns 边界线数组（4条）
   */
  getContentBound(): Line2d[];

  /**
   * 从边界信息创建闭合环
   * @param bound - 边界信息
   * @returns 矩形闭合环
   */
  getLoopFromBound(bound: BoundInfo): Loop;

  /**
   * 将曲线转换为直线
   * @param curve - 输入曲线
   * @returns 转换后的直线，失败返回undefined
   */
  curveToLine(curve: any): Line2d | undefined;

  /**
   * 检查轮廓是否平行于结构面
   * @param outline - 轮廓点数组
   * @returns 是否平行
   */
  checkIfParallelStructureFace(outline: Vector2[]): boolean;

  /**
   * 检查内容物是否为候选对象
   * @param content - 内容物实体
   * @returns 是否符合候选条件
   */
  checkCandidateContent(content: HSCore.Model.Content): boolean;

  /**
   * 验证内容物是否有效
   * @param content - 内容物实体
   * @returns 是否有效（未删除、未隐藏、非开口等）
   */
  isValidContent(content: HSCore.Model.Content): boolean;

  /**
   * 转换索引到有效范围
   * @param index - 原始索引
   * @param min - 最小值
   * @param max - 最大值
   * @returns 转换后的索引
   */
  convertIndex(index: number, min: number, max: number): number;

  /**
   * 更新辅助框显示
   * @private
   */
  protected _updateHelperBoxs(): void;

  /**
   * 更新标注图形显示
   * @private
   */
  protected _updateGizmos(): void;

  /**
   * 更新子标注图形
   * @param gizmoData - 标注数据
   * @param childItem - 子元素
   * @private
   */
  protected _updateChildGizmo(
    gizmoData: LinearDimensionData,
    childItem: any
  ): void;

  /**
   * 更新辅助线显示
   * @private
   */
  protected _updateHelperLinears(): void;

  /**
   * 绘制轮廓辅助数据
   * @param data - 轮廓数据
   * @private
   */
  protected drawOutlineHelpData(data: HelperBoxData[]): void;

  /**
   * 查找候选内容物
   * @param layer - 图层对象
   * @returns 候选内容物列表
   * @private
   */
  private _findCandidateContents(layer: HSCore.Model.Layer): HSCore.Model.Content[];
}

/**
 * 光源标注控制器
 * 处理标注的交互逻辑（拖拽调整位置）
 * 
 * @extends HSApp.View.Base.DisplayController
 */
declare class LightDimensionController extends HSApp.View.Base.DisplayController {
  /**
   * 构造函数
   * @param context - 上下文对象
   * @param entity - 光源实体
   */
  constructor(context: any, entity: HSCore.Model.PointLight | HSCore.Model.SpotLight);

  /**
   * 分发事件处理
   * @param event - 事件对象（包含标注值变化信息）
   */
  dispatch(event: {
    data: {
      /** 新值 */
      value: number;
      /** 旧值 */
      oldValue: number;
      /** 标注数据 */
      gizmo: LinearDimensionData;
    };
  }): void;
}