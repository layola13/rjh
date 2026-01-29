/**
 * 家具尺寸标注模块
 * 用于在2D平面视图中为家具显示智能尺寸标注
 */

import { ContentDimension } from './ContentDimension';
import { HSCore } from '../core';
import { HSApp } from '../app';
import { HSCatalog } from '../catalog';
import * as THREE from 'three';
import * as SAT from 'sat';
import * as GeLib from '../geometry';

/**
 * 点坐标接口
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 3D点坐标接口
 */
interface Point3D extends Point2D {
  z: number;
}

/**
 * 线性尺寸标注数据
 */
interface LinearDimensionGizmoData {
  /** 起点坐标 */
  startPoint: Point2D;
  /** 终点坐标 */
  endPoint: Point2D;
  /** 关联的实体（墙体或家具） */
  entity?: HSCore.Model.Wall | HSCore.Model.Content;
}

/**
 * 辅助线数据
 */
interface HelperLineData {
  /** 起点 */
  start: Point2D;
  /** 终点 */
  end: Point2D;
}

/**
 * 候选点信息
 */
interface CandidatePointInfo {
  /** 点坐标 */
  point: THREE.Vector2;
  /** 是否已更新 */
  update: boolean;
}

/**
 * 包围盒顶点数组（逆时针顺序：左上、左下、右下、右上）
 */
type BoundingBoxVertices = [Point2D, Point2D, Point2D, Point2D];

/**
 * 应用设置变更事件数据
 */
interface SettingChangedEventData {
  data: {
    fieldName: string;
    oldValue: unknown;
    value: unknown;
  };
}

/**
 * 辅助选项配置
 */
interface AuxiliaryOptions {
  /** 是否为吊顶环境 */
  isCeilingEnv?: boolean;
  /** 判断是否可以创建指定实体 */
  canCreateEntity?: (entity: HSCore.Model.Content) => boolean;
}

/**
 * 上下文配置
 */
interface GizmoContext {
  /** 辅助选项 */
  auxOptions?: AuxiliaryOptions;
}

/**
 * 家具尺寸标注类
 * 
 * 功能说明：
 * - 自动检测家具与墙体、其他家具的位置关系
 * - 显示家具到墙体的距离标注
 * - 显示家具之间的间距标注
 * - 支持平行墙体和正交墙体的智能识别
 * - 根据视图设置动态显示/隐藏标注
 */
export declare class FurnitureDimension extends ContentDimension {
  /** 最大标注距离（单位：毫米） */
  static readonly MAX_DIMENSION_LENGTHS: number;
  
  /** 最小标注距离（单位：毫米） */
  static readonly MIN_DIMENSION_LENGTHS: number;

  /** 默认辅助线延伸长度 */
  protected readonly DEFULT_LINEAR_EXTENDS_LENGTHS: number;

  /** 类型标识 */
  readonly type: 'hsw.view.svg.gizmo.FurnitureDimension';

  /** 是否启用尺寸标注功能 */
  isEnable: boolean;

  /** 是否根据家具包围盒边界计算标注（true）还是根据中心点（false） */
  accordingToBound: boolean;

  /** 角度容差（度），用于判断平行/正交关系 */
  angle_tolerance: number;

  /** 线性尺寸标注数据数组 */
  linearDimensionGizmoDatas: LinearDimensionGizmoData[];

  /** 包围盒辅助线数据（需要显示包围盒的实体列表） */
  boxHelpLineData: Array<HSCore.Model.Wall | HSCore.Model.Content>;

  /** 延伸辅助线数据数组 */
  extendsHelperLinearData: HelperLineData[];

  /** 上下文配置 */
  protected context: GizmoContext;

  /** 当前家具所在的房间 */
  private _room: HSCore.Model.Room | undefined;

  /** 与家具平行的墙体列表 */
  private _parallelWalls: HSCore.Model.Wall[];

  /** 与家具正交的墙体列表 */
  private _orthoWalls: HSCore.Model.Wall[];

  /** 平行墙体列表是否需要更新 */
  private _parallelDirty: boolean;

  /** 正交墙体列表是否需要更新 */
  private _orthoDirty: boolean;

  /**
   * 构造函数
   * @param application - 应用程序实例
   * @param context - 上下文配置
   * @param entity - 要标注的家具实体
   */
  constructor(
    application: HSApp.Application,
    context: GizmoContext,
    entity: HSCore.Model.Content
  );

  /**
   * 获取房间工具类
   */
  protected get roomUtil(): typeof HSCore.Util.Room;

  /**
   * 设置是否根据包围盒边界计算标注
   * @param value - true: 使用包围盒边界, false: 使用中心点
   */
  setAccordingToBound(value: boolean): void;

  /**
   * 计算子标注信息（主入口方法）
   * 
   * 计算流程：
   * 1. 确定家具所在房间
   * 2. 检测平行墙体并计算标注
   * 3. 如果没有平行墙体标注，则计算与正交墙体和其他家具的标注
   */
  computeChildGizmoInfo(): void;

  /**
   * 计算家具到平行墙体的尺寸标注
   * @param walls - 平行墙体列表
   */
  private _computeParallelWallDimension(walls: HSCore.Model.Wall[]): void;

  /**
   * 判断家具是否为正交放置（旋转角度为0°或90°的倍数）
   * @param content - 家具实体
   * @returns 是否正交
   */
  private _isContentOrtho(content: HSCore.Model.Content): boolean;

  /**
   * 判断家具与墙体是否平行
   * @param content - 家具实体
   * @param wall - 墙体实体
   * @returns 是否平行（角度差在容差范围内）
   */
  private _isParallel(
    content: HSCore.Model.Content,
    wall: HSCore.Model.Wall
  ): boolean;

  /**
   * 计算家具与所有候选实体的尺寸标注
   * 
   * 算法说明：
   * - 将家具和候选实体投影到XZ和YZ平面
   * - 使用SAT碰撞检测算法判断投影是否重叠
   * - 对重叠的实体，计算最近的四个方向（左、右、前、后）的距离
   * 
   * @param entities - 候选实体列表（墙体和家具）
   */
  private _computeTotalEntityGizmoInfo(
    entities: Array<HSCore.Model.Wall | HSCore.Model.Content>
  ): void;

  /**
   * 处理水平方向（X轴）的标注信息
   * @param leftEntity - 左侧最近的实体
   * @param leftDistance - 到左侧实体的距离
   * @param rightEntity - 右侧最近的实体
   * @param rightDistance - 到右侧实体的距离
   */
  private _dealHorizontalInfo(
    leftEntity: HSCore.Model.Wall | HSCore.Model.Content | undefined,
    leftDistance: number,
    rightEntity: HSCore.Model.Wall | HSCore.Model.Content | undefined,
    rightDistance: number
  ): void;

  /**
   * 处理垂直方向（Y轴）的标注信息
   * @param frontEntity - 前方最近的实体
   * @param frontDistance - 到前方实体的距离
   * @param backEntity - 后方最近的实体
   * @param backDistance - 到后方实体的距离
   */
  private _dealVerticalInfo(
    frontEntity: HSCore.Model.Wall | HSCore.Model.Content | undefined,
    frontDistance: number,
    backEntity: HSCore.Model.Wall | HSCore.Model.Content | undefined,
    backDistance: number
  ): void;

  /**
   * 获取宿主墙体信息（用于镶嵌在墙体中的家具，如窗户）
   * 
   * 处理逻辑：
   * - 获取墙体左右面的路径点
   * - 计算家具中心到墙体的垂直距离
   * - 如果已有标注线，将其延伸到墙体表面
   * - 否则创建新的标注线
   * 
   * @param wall - 宿主墙体
   */
  private _getHostWallInfo(wall: HSCore.Model.Wall): void;

  /**
   * 获取墙体面的路径点
   * @param face - 墙体面实体
   * @returns 路径点数组（Z坐标为0的点）
   */
  private _getFacePathPoints(face: HSCore.Model.StructureFace): Point3D[];

  /**
   * 获取墙体的包围盒顶点
   * @param wall - 墙体实体
   * @returns 包围盒四个顶点
   */
  private _getWallBox(wall: HSCore.Model.Wall): BoundingBoxVertices;

  /**
   * 获取家具的包围盒顶点
   * @param content - 家具实体
   * @returns 包围盒四个顶点（左上、左下、右下、右上）
   */
  private _getContentBox(content: HSCore.Model.Content): BoundingBoxVertices;

  /**
   * 查找候选家具实体
   * 
   * 筛选条件：
   * - 不是当前家具本身
   * - 未被删除或隐藏
   * - 有父级实体（已放置在场景中）
   * - 不是门窗类型
   * - 与当前家具在同一房间
   * - 与当前家具的包围盒不相交（避免重叠）
   * 
   * @param room - 房间实体
   * @returns 候选家具列表
   */
  private _findCandidateContents(
    room: HSCore.Model.Room
  ): HSCore.Model.Content[];

  /**
   * 判断距离值是否在合法范围内
   * @param value - 距离值
   * @returns 是否合法（在最小和最大标注距离之间）
   */
  private _isLegalValue(value: number): boolean;

  /**
   * 设置变更事件处理器
   * @param event - 设置变更事件数据
   */
  private _onSettingChanged(event: SettingChangedEventData): void;
}