import { HSCore } from './HSCore';
import { Line2d, Arc2d, Loop } from './GeometryTypes';

/**
 * 表示草图2D顶点删除请求的类
 * 用于处理楼板编辑中删除顶点的操作，包括处理孔洞、背景区域和相关面的更新
 */
export declare class DeleteVertexRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 草图2D构建器实例
   */
  private sketch2dBuilder: HSCore.Model.ExtraordinarySketch2dBuilder;

  /**
   * 要删除的顶点坐标
   */
  private vertex: HSCore.Model.Point2d;

  /**
   * 创建删除顶点请求实例
   * @param sketch2dBuilder - 草图2D构建器，用于操作草图数据
   * @param vertex - 要删除的顶点位置
   */
  constructor(
    sketch2dBuilder: HSCore.Model.ExtraordinarySketch2dBuilder,
    vertex: HSCore.Model.Point2d
  );

  /**
   * 提交删除操作
   * 处理顶点删除后的几何重构，包括：
   * - 处理连接到该顶点的边
   * - 更新相关面和孔洞
   * - 重构背景区域
   * - 添加新生成的区域
   */
  onCommit(): void;

  /**
   * 处理孔洞相关逻辑
   * @param connectedEdges - 连接到被删除顶点的边集合
   * @param sketch - 当前草图对象
   * @param facesToRemove - 需要移除的面集合（输出参数）
   * @param regionsToAdd - 需要添加的区域列表（输出参数）
   * @private
   */
  private _handleHoles(
    connectedEdges: HSCore.Model.ExtraordinaryEdge[],
    sketch: HSCore.Model.Sketch2d,
    facesToRemove: Set<HSCore.Model.Face>,
    regionsToAdd: Array<{
      outer: Array<{ curve: Line2d | Arc2d }>;
      holes: unknown[];
      topo: string;
    }>
  ): void;

  /**
   * 处理背景区域相关逻辑
   * @param connectedEdges - 连接到被删除顶点的边集合
   * @param sketch - 当前草图对象
   * @param newBackgroundLoops - 新的背景循环列表（输出参数）
   * @private
   */
  private _handleBackground(
    connectedEdges: HSCore.Model.ExtraordinaryEdge[],
    sketch: HSCore.Model.Sketch2d,
    newBackgroundLoops: Loop[]
  ): void;

  /**
   * 简化循环，处理无效循环的情况
   * 使用布尔运算工具清理和修复几何数据
   * @param loop - 需要简化的循环
   * @returns 简化后的曲线数组列表
   * @private
   */
  private _simplifyLoop(loop: Loop): Array<Array<Line2d | Arc2d>>;

  /**
   * 撤销删除操作
   * 恢复草图到删除前的状态
   */
  onUndo(): void;

  /**
   * 重做删除操作
   * 重新应用删除顶点的更改
   */
  onRedo(): void;

  /**
   * 判断是否可以处理事务字段
   * @returns 始终返回 true，表示该请求支持事务处理
   */
  canTransactField(): boolean;

  /**
   * 获取操作描述
   * @returns 操作的中文描述文本
   */
  getDescription(): string;

  /**
   * 获取操作类别
   * @returns 日志分组类型，用于操作分类和统计
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * 草图面信息接口
 */
interface SketchFaceInfo {
  /** 是否为外部面 */
  isOuter: boolean;
  /** 关联的面对象 */
  face: HSCore.Model.Face;
  /** 线框对象 */
  wire: {
    /** 共边列表 */
    coedges: Array<{
      /** 边对象 */
      edge: {
        /** 曲线对象 */
        curve: Line2d | Arc2d | HSCore.Model.ExtraordinaryCircle2d;
      };
      /** 是否反向 */
      isRev: boolean;
      /** 转换为数学曲线 */
      toMathCurve(): Line2d | Arc2d;
    }>;
  };
}

/**
 * 区域定义接口
 */
interface RegionDefinition {
  /** 外部曲线列表 */
  outer: Array<Line2d | Arc2d>;
  /** 孔洞列表 */
  holes: unknown[];
}

/**
 * 边信息接口
 */
interface EdgeInfo {
  /** 边的曲线 */
  curve: Line2d | Arc2d;
  /** 是否为背景边 */
  isBackground?: boolean;
}