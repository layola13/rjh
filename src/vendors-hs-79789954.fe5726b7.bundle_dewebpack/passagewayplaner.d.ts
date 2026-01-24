/**
 * 通道规划器模块
 * 用于计算和管理室内空间中门洞等开口的通道区域
 */

import { MathAlg, Line2d, Loop, Point2d } from './math-geometry';
import { OpeningsExtractor } from './openings-extractor';

/**
 * 曲线与曲线的位置关系类型
 */
type CurveCurvePositionType = MathAlg.CurveCuvePositonType;

/**
 * 环与环的位置关系类型
 */
type LoopLoopPositionType = MathAlg.LoopLoopPositonType;

/**
 * 开口信息接口
 */
interface Opening {
  /** 开口唯一标识 */
  id: string;
  [key: string]: unknown;
}

/**
 * 开口宿主信息接口
 */
interface OpeningHostInfo {
  /** 开口ID */
  openingId: string;
  /** 开口类型（如sliding表示推拉门） */
  contentType: string;
  /** 开口与楼板重叠的曲线 */
  openingFloorOverlapCurve: Line2d;
  /** 扩展后的开口与楼板重叠曲线（可选） */
  extendedOpeningFloorOverlapCurve?: Line2d;
  [key: string]: unknown;
}

/**
 * 通道信息接口
 */
interface PassagewayInfo extends OpeningHostInfo {
  /** 关联的开口对象 */
  opening?: Opening;
  /** 通道区域的闭合环 */
  loop?: Loop;
  /** 通道中心线 */
  line?: Line2d;
}

/**
 * 楼层数据接口
 */
interface FloorData {
  /** 楼层世界坐标系下的2D原始路径 */
  worldRawPath2d: {
    /** 外轮廓曲线数组 */
    outer: Line2d[];
  };
}

/**
 * SVG蒙版样式接口
 */
interface SvgMaskStyle {
  /** 填充颜色 */
  fill: string;
}

/**
 * SVG蒙版接口
 */
interface SvgMask {
  /** 蒙版区域的闭合环 */
  loop?: Loop;
  /** 蒙版样式 */
  style: SvgMaskStyle;
}

/**
 * 通道规划器类
 * 负责计算室内门洞等开口的通道区域，处理通道之间的相交、裁剪和合并
 */
export declare class PassagewayPlaner {
  /** 表示曲线相交的位置类型集合 */
  private readonly curvesIntersectTypes: CurveCurvePositionType[];
  
  /** 表示环相交的位置类型集合 */
  private readonly loopsIntersectTypes: LoopLoopPositionType[];
  
  /** 开口提取器实例 */
  private readonly extractor: OpeningsExtractor;
  
  /** 楼板外轮廓曲线数组 */
  private readonly floorOuterCurves: Line2d[];
  
  /** 所有开口对象数组 */
  private readonly openings: Opening[];
  
  /** 开口宿主信息数组 */
  private readonly hostInfos: OpeningHostInfo[];

  /**
   * 构造函数
   * @param floorData - 楼层数据，包含楼板轮廓等信息
   */
  constructor(floorData: FloorData);

  /**
   * 获取单个开口的通道信息
   * @param hostInfo - 开口宿主信息
   * @returns 包含通道区域和中心线的完整通道信息
   */
  getOpeningPassageWay(hostInfo: OpeningHostInfo): PassagewayInfo;

  /**
   * 计算通道的闭合环和中心线
   * 通过从开口中点向右侧法向延伸，找到与楼板外轮廓的交点来确定通道深度
   * @param hostInfo - 开口宿主信息
   * @returns 包含通道闭合环和中心线的对象
   */
  getPassageWayLoop(hostInfo: OpeningHostInfo): {
    loop: Loop | undefined;
    line: Line2d | undefined;
  };

  /**
   * 根据指定深度生成通道的闭合环和中心线
   * @param hostInfo - 开口宿主信息
   * @param depth - 通道深度（单位：米）
   * @returns 包含通道闭合环和中心线的对象
   */
  getLoopLine(hostInfo: OpeningHostInfo, depth: number): {
    loop: Loop;
    line: Line2d;
  };

  /**
   * 判断是否应作为推拉门处理
   * 推拉门或宽度超过1.5米的开口返回true
   * @param hostInfo - 开口宿主信息
   * @returns 是否作为推拉门处理
   */
  isAsSlidingDoor(hostInfo: OpeningHostInfo): boolean;

  /**
   * 判断两个通道是否相交
   * 通过检查通道边界曲线的相交情况和中心线是否相交来判断
   * @param passageway1 - 第一个通道信息
   * @param passageway2 - 第二个通道信息
   * @returns 两个通道是否相交
   */
  isCrossPassageways(passageway1: PassagewayInfo, passageway2: PassagewayInfo): boolean;

  /**
   * 计算两个通道中心线交点到第一个通道起点的距离
   * @param passageway1 - 第一个通道信息
   * @param passageway2 - 第二个通道信息
   * @returns 交点距离，无交点时返回-1
   */
  getIntersectPtDistance(passageway1: PassagewayInfo, passageway2: PassagewayInfo): number;

  /**
   * 用另一个通道裁剪指定通道
   * 找到中心线与裁剪通道边界的交点，缩短被裁剪通道的长度
   * @param targetPassageway - 待裁剪的通道
   * @param cuttingPassageway - 用于裁剪的通道
   * @returns 裁剪后的通道信息
   */
  cutoffPassagewayByPassageway(
    targetPassageway: PassagewayInfo,
    cuttingPassageway: PassagewayInfo
  ): PassagewayInfo;

  /**
   * 获取所有开口的通道信息
   * @returns 所有通道信息数组
   */
  getPassageways(): PassagewayInfo[];

  /**
   * 获取经过合并处理的通道信息
   * 处理通道之间的相交和裁剪关系
   * @returns 合并后的通道信息数组
   */
  getMergedPassageways(): PassagewayInfo[];

  /**
   * 根据切口线扩展通道宽度
   * 将通道开口延伸至与切口线对齐
   * @param passageway - 待扩展的通道信息
   * @param incisions - 切口线数组
   */
  expandPassagewayByIncisions(passageway: PassagewayInfo, incisions: Line2d[]): void;

  /**
   * 裁剪所有相交的通道
   * 对于相交的通道，保留距离开口更近的部分
   * @param passageways - 待处理的通道数组
   * @returns 裁剪后的通道数组
   */
  cutOffPassageways(passageways: PassagewayInfo[]): PassagewayInfo[];

  /**
   * 获取扩展并合并后的通道信息
   * 先根据切口线扩展通道，再处理相交裁剪
   * @param incisions - 切口线数组
   * @returns 处理后的通道信息数组
   */
  getExpandMergePassageways(incisions: Line2d[]): PassagewayInfo[];

  /**
   * 获取与切口线相交的通道信息
   * 过滤掉推拉门类型的通道
   * @param incisions - 切口线数组
   * @returns 与切口线相交的通道信息数组（不含推拉门）
   */
  getPassagewayIntersectWithIncisions(incisions: Line2d[]): PassagewayInfo[];

  /**
   * 生成通道的SVG蒙版数据
   * 用于可视化渲染通道区域
   * @param passageways - 通道信息数组
   * @returns SVG蒙版数据数组
   */
  getPassagewaySvgMasks(passageways: PassagewayInfo[]): SvgMask[];
}