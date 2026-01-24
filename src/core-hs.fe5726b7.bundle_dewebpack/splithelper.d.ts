import type { Layer } from './Layer';
import type { Face } from './Face';
import type { RoomRegion } from './RoomRegion';
import type { TrimmedSurface } from './geometry/TrimmedSurface';
import type { Curve2d, Line2d, Arc2d } from './geometry/Curve2d';
import type { Line3d } from './geometry/Line3d';
import type { Vector3 } from './geometry/Vector3';
import type { Polygon } from './geometry/Polygon';
import type { Loop } from './geometry/Loop';
import type { BrepFace } from './geometry/BrepFace';
import type { Material } from './Material';

/**
 * 房间区域分割曲线类型
 */
export enum RoomSplitCurveType {
  /** 已废弃的分割 */
  Deprecated = 'deprecated',
  /** 空间分割 */
  Space = 'space',
  /** 楼板分割 */
  Slab = 'slab',
}

/**
 * 空间楼板适配类型
 */
export enum SpaceSlabFitType {
  /** 不适配 */
  No = 'no',
}

/**
 * 楼板面类型
 */
export enum SlabFaceType {
  /** 顶面 */
  top = 'top',
}

/**
 * 拓扑名称信息
 */
export interface TopoName {
  /** 源ID */
  sourceId?: string;
  /** ID */
  id: string;
  clone(): TopoName;
}

/**
 * 分割曲线端点数据
 */
export interface SplitCurveEndData {
  /** 拓扑名称 */
  topoName: TopoName;
  /** 在原曲线上的百分比位置 */
  percent: number;
}

/**
 * 房间分割曲线数据
 */
export interface RoomSplitCurve {
  /** 2D曲线 */
  curve: Curve2d;
  /** 起点数据 */
  startData?: SplitCurveEndData;
  /** 终点数据 */
  endData?: SplitCurveEndData;
  /** 分割类型 */
  type: RoomSplitCurveType;
}

/**
 * 空间信息
 */
export interface SpaceInfo {
  /** 路径 */
  path: { outer: Curve2d[]; holes: Curve2d[][] };
  /** 地面面片 */
  floors: Face[];
  /** 楼板面片 */
  slabFaces: Face[];
  /** 天花板面片 */
  ceilings: Face[];
  /** 梁面片 */
  beamFaces: Face[];
  /** 结构面片 */
  structureFaces: Array<{ id: string; faceInfo?: { curve: Curve2d } }>;
}

/**
 * 分割结果
 */
interface SplitResult {
  /** 房间区域 */
  roomRegion: RoomRegion;
  /** 分割曲线列表 */
  splitCurves: Curve2d[];
}

/**
 * 材质匹配结果
 */
export interface MaterialMatchResult {
  /** BRep面 */
  brepFace: BrepFace;
  /** 额外键 */
  extraKey?: string;
  /** 匹配的面 */
  face?: Face;
  /** 材质 */
  material?: Material;
  /** 旧面信息 */
  oldFaceInfo?: unknown;
}

/**
 * 房间区域分割辅助类
 * 负责处理楼板、梁等构件的区域分割、合并、材质匹配等操作
 */
export declare class SplitHelper {
  private readonly _layer: Layer;

  /**
   * @param layer - 所属图层
   */
  constructor(layer: Layer);

  /**
   * 获取楼板构建器
   */
  private get _slabBuilder(): unknown;

  /**
   * 获取房间构建器
   */
  private get _roomBuilder(): unknown;

  /**
   * 通过迁移方式分割整个区域
   * @param face - 要分割的面
   * @param curves - 分割曲线列表
   */
  splitWholeRegionsByMigrate(face: Face, curves: Curve2d[]): void;

  /**
   * 分割区域
   * @param face - 要分割的面
   * @param curves - 分割曲线列表
   * @returns 是否成功分割
   */
  splitRegion(face: Face, curves: Curve2d[]): boolean;

  /**
   * 删除区域
   * @param face - 要删除的面
   * @returns 是否成功删除
   */
  deleteRegion(face: Face): boolean;

  /**
   * 判断是否为通过房间废弃的空间
   */
  isDeprecatedSpaceByRoom(): boolean;

  /**
   * 判断是否为通过楼板废弃的空间
   */
  isDeprecatedSpaceBySlab(): boolean;

  /**
   * 获取梁底面的分割曲线
   * @param face - 梁底面
   * @returns 3D分割曲线列表
   */
  getBeamBottomFaceSplitCurves(face: Face): Line3d[];

  /**
   * 获取梁侧面的分割曲线
   * @param face - 梁侧面
   * @returns 3D分割曲线列表
   */
  getBeamSideFaceSplitCurves(face: Face): Line3d[];

  /**
   * 获取垂直面的分割曲线
   * @param face - 垂直面
   * @param zOffset - Z轴偏移
   * @returns 3D分割曲线列表
   */
  private _getVerticalFaceSplitCurves(face: Face, zOffset?: number): Line3d[];

  /**
   * 获取水平面的分割曲线
   * @param face - 水平面
   * @param roomRegion - 房间区域（可选）
   * @returns 3D分割曲线列表
   */
  private _getHorizontalFaceSplitCurves(face: Face, roomRegion?: RoomRegion): Line3d[];

  /**
   * 获取楼板底面的分割曲线
   * @param face - 楼板底面
   * @param roomRegion - 房间区域（可选）
   * @returns 3D分割曲线列表
   */
  getSlabBottomFaceSplitCurves(face: Face, roomRegion?: RoomRegion): Line3d[];

  /**
   * 延伸曲线到边界
   * @param splitCurve - 分割曲线
   * @param path - 边界路径
   * @returns 延伸后的曲线
   */
  private _getExtendCurve(splitCurve: RoomSplitCurve, path: { outer: Curve2d[]; holes: Curve2d[][] }): Curve2d;

  /**
   * 获取楼板顶面的分割曲线
   * @param roomRegion - 房间区域
   * @returns 3D分割曲线列表
   */
  getSlabTopFaceSplitCurves(roomRegion?: RoomRegion): Line3d[];

  /**
   * 获取楼板侧面的分割曲线
   * @param face - 楼板侧面
   * @param slabHeight - 楼板高度
   * @returns 3D分割曲线列表
   */
  getSlabSideFaceSplitCurves(face: Face, slabHeight: number): Line3d[];

  /**
   * 将2D曲线转换为3D曲线
   * @param curve - 2D曲线
   * @param zValue - Z坐标值
   * @returns 3D曲线
   */
  private _getCurve3dByCurve2d(curve: Curve2d, zValue: number): Line3d | Arc2d;

  /**
   * 获取结构面的分割曲线
   * @param faceId - 面ID
   * @returns 3D分割曲线列表
   */
  getStructureFaceSplitCurves(faceId: string): Line3d[];

  /**
   * 匹配材质
   * @param sourceFaces - 源面列表
   * @param targetFaces - 目标BRep面列表
   * @returns 材质匹配结果列表
   */
  matchMaterial(sourceFaces: Face[], targetFaces: BrepFace[]): MaterialMatchResult[];

  /**
   * 对垂直裁剪表面进行排序
   * @param referenceFace - 参考面
   * @param surfaces - 待排序的表面列表
   */
  sortVerticalTrimmedSurface(referenceFace: TrimmedSurface, surfaces: TrimmedSurface[]): void;

  /**
   * 根据楼板刷新已废弃的房间分割曲线
   */
  refreshDeprecatedRoomSplitCurvesBySlab(): void;

  /**
   * 根据楼板刷新房间分割曲线
   * @param slabPaths - 楼板路径列表
   */
  refreshRoomSplitCurvesBySlab(slabPaths: Array<{ outer: Curve2d[]; holes: Curve2d[][] }>): void;

  /**
   * 检查曲线是否有效（能否将区域分割成至少2个部分）
   * @param path - 区域路径
   * @param curves - 分割曲线列表
   * @returns 是否有效
   */
  private _checkCurveValid(path: { outer: Curve2d[]; holes: Curve2d[][] }, curves: Curve2d[]): boolean;

  /**
   * 通过添加曲线获取刷新后的分割曲线
   * @param roomRegion - 房间区域
   * @param newCurves - 新增曲线列表
   * @returns 刷新后的分割曲线列表
   */
  private _getRefreshSplitCurvesByAddCurves(roomRegion: RoomRegion, newCurves: Curve2d[]): RoomSplitCurve[];

  /**
   * 计算分割数据
   * @param roomRegion - 房间区域
   * @param curves - 曲线数据列表
   * @returns 房间分割曲线列表
   */
  calculateSplitData(
    roomRegion: RoomRegion,
    curves: Array<{ curve: Curve2d; type?: RoomSplitCurveType }>
  ): RoomSplitCurve[];

  /**
   * 判断面是否可以删除
   * @param face - 要检查的面
   * @returns 是否可删除
   */
  canDelete(face: Face): boolean;

  /**
   * 判断楼板面积是否小于房间区域
   * @returns 是否小于
   */
  isSlabLessThanRoomRegion(): boolean;

  /**
   * 判断是否存在指定类型的分割曲线
   * @param curveType - 曲线类型
   * @returns 是否存在
   */
  hasSplitCurves(curveType: RoomSplitCurveType): boolean;

  /**
   * 重置所有房间区域的分割曲线
   * @param resetFlag - 重置标志
   */
  reset(resetFlag: boolean): void;

  /**
   * 检查是否可通过迁移方式分割
   * @param face - 要分割的面
   * @param curves - 分割曲线列表
   * @returns 分割结果或undefined
   */
  private _canSplitByMigrate(face: Face, curves: Curve2d[]): SplitResult | undefined;

  /**
   * 检查是否可以分割
   * @param face - 要分割的面
   * @param curves - 分割曲线列表
   * @returns 分割结果或undefined
   */
  private _canSplit(face: Face, curves: Curve2d[]): SplitResult | undefined;

  /**
   * 根据房间区域ID获取空间信息列表
   * @param roomRegionId - 房间区域ID
   * @returns 空间信息列表
   */
  private _getSpaceInfos(roomRegionId: string): SpaceInfo[];

  /**
   * 合并房间区域曲线
   * @param curves - 分割曲线列表
   * @returns 合并后的曲线列表
   */
  mergeRoomRegionCurves(curves: RoomSplitCurve[]): RoomSplitCurve[];

  /**
   * 从房间区域移除分割曲线
   * @param roomRegion - 房间区域
   * @param curvesToRemove - 要移除的曲线列表
   */
  removeRoomRegionCurves(roomRegion: RoomRegion, curvesToRemove: RoomSplitCurve[]): void;

  /**
   * 向房间区域添加分割曲线
   * @param roomRegion - 房间区域
   * @param curves - 要添加的曲线列表
   * @param curveType - 曲线类型
   */
  addRoomRegionCurves(roomRegion: RoomRegion, curves: Curve2d[], curveType: RoomSplitCurveType): void;

  /**
   * 通过共边拓扑名称保留曲线
   * @param roomRegion - 房间区域
   * @returns 是否保留成功
   */
  private _keepByCoEdgeTopoName(roomRegion: RoomRegion): boolean;

  /**
   * 自动适配分割曲线
   * @param roomRegion - 房间区域
   */
  autoFitSplitCurves(roomRegion: RoomRegion): void;

  /**
   * 通过房间区域路径保留曲线
   * @param roomRegion - 房间区域
   * @param curves - 分割曲线列表
   * @returns 是否保留成功
   */
  private _keepByRoomRegionPath(roomRegion: RoomRegion, curves: RoomSplitCurve[]): boolean;

  /**
   * 根据楼板移除房间区域曲线
   * @param roomRegion - 房间区域
   * @param slabPolygons - 楼板多边形列表
   */
  removeRoomRegionCurvesBySlab(roomRegion: RoomRegion, slabPolygons: Polygon[]): void;

  /**
   * 根据楼板获取新增的曲线
   * @param slabPaths - 楼板路径列表
   * @returns 房间区域ID到曲线列表的映射
   */
  getAddedCurvesBySlab(slabPaths: Array<{ outer: Curve2d[]; holes: Curve2d[][] }>): Map<string, Curve2d[]>;
}