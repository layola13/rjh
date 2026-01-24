/**
 * 滑动窗模块 - 位置和CC条管理
 * @module SlidePosition
 */

import { EdgeJointWay } from './EdgeJointWay';
import { Direction, slideJoinType, ccTypeEnum, sizeTypeEnum, EdgeFinder } from './EdgeFinder';
import { ShapeType, EmptyTrackPosition } from './ShapeType';

/**
 * 滑动位置枚举
 */
export enum SlidePosition {
  /** 向上 */
  up = 'up',
  /** 向下 */
  down = 'down',
  /** 左侧碰撞 */
  collisionLeft = 'collisionLeft',
  /** 右侧碰撞 */
  collisionRight = 'collisionRight',
  /** 边缘 */
  edge = 'edge',
  /** 单重叠 */
  single = 'single',
  /** 双重叠 */
  double = 'double',
  /** 无 */
  none = 'none',
}

/**
 * 框架信息接口
 */
interface Frame {
  /** 框架ID */
  id: number;
  /** 边缘连接方式 */
  readonly ejw: EdgeJointWay[];
  /** 视图管理器 */
  view: {
    shapeManager: {
      shapem: Array<{
        sashManager: { slides: Slide[] };
        mulManager: { glasses: Glass[] };
      }>;
    };
  };
  /** 框架管理器 */
  frameManager: {
    /** 边缘连接方式 */
    ejw: EdgeJointWay[];
    /** 条形构件集合 */
    bars: Bar[];
  };
  /** 窗扇管理器 */
  sashManager: {
    /** 滑动窗扇集合 */
    slides: Slide[];
    /** 所有窗扇 */
    allSashes: Sash[];
  };
  /** 中梃管理器 */
  mulManager: {
    /** 条形构件集合 */
    bars: Bar[];
    /** 玻璃集合 */
    glasses: Glass[];
  };
}

/**
 * 滑动窗扇接口
 */
interface Slide {
  /** 窗扇ID */
  id: number;
  /** 多边形信息 */
  polygon: Polygon;
  /** 轨道数量 */
  realTracksCount: number;
  /** 屏幕轨道数量 */
  screenTracksCount: number;
  /** 窗扇集合 */
  sashes: Array<{
    columnIndex: number;
    trackIndex: number;
    trackNo: number;
  }>;
  /** 应用选项 */
  appliedOption: {
    items: unknown[][];
  };
  /** 是否水平扩展 */
  expandHorizontally: boolean;
  /** 空轨道追加位置 */
  emptyTrackAppended?: EmptyTrackPosition;
  /** 列数 */
  columnCount: number;
}

/**
 * 窗扇接口
 */
interface Sash {
  /** 列索引 */
  columnIndex: number;
  /** 轨道索引 */
  trackIndex: number;
  /** 轨道编号 */
  trackNo: number;
  /** 中梃管理器 */
  mulManager: {
    glasses: Glass[];
  };
}

/**
 * 玻璃接口
 */
interface Glass {
  /** 压条信息 */
  bead?: {
    frameManager: {
      bars: Bar[];
    };
  };
  /** 多边形信息 */
  polygon: Polygon;
}

/**
 * 条形构件接口
 */
interface Bar {
  /** 条形构件ID */
  id: number;
  /** 形状类型 */
  type: ShapeType;
  /** 多边形信息 */
  polygon: Polygon;
  /** 所在位置（框架/中梃） */
  where?: 'FrameMullion' | string;
  /** 轨道数量 */
  trackCount?: number;
  /** 屏幕轨道数量 */
  screenTracksCount?: number;
  /** 顶部框架 */
  topFrame?: unknown;
}

/**
 * 多边形接口
 */
interface Polygon {
  /** 边集合 */
  edges: Edge[];
  /** 方向 */
  orientation?: number;
  /** 多边形形状 */
  mulShape?: {
    middle(): unknown;
  };
}

/**
 * 边接口
 */
interface Edge {
  /**
   * 判断点是否在边上
   * @param point - 点坐标
   */
  contains(point: unknown): boolean;
  /**
   * 获取边中点
   */
  middle(): unknown;
}

/**
 * CC配置信息接口
 */
interface CCConfig {
  /** 形状ID */
  shapeId: number;
  /** 框架ID */
  frameId?: number;
  /** 类型 */
  type: ccTypeEnum | ShapeType;
  /** 位置 */
  position?: Direction;
  /** 尺寸类型 */
  sizeType?: sizeTypeEnum;
  /** 轨道编号 */
  trackNo?: number;
  /** 轨道数量 */
  trackCount?: number;
  /** 屏幕轨道数量 */
  screenTracksCount?: number;
  /** 轨道索引 */
  trackIndex?: number;
  /** 滑动连接类型 */
  slideJoinType?: slideJoinType;
  /** 滑动重叠数量 */
  slideOverlapCount?: number;
  /** 滑动位置 */
  slidePosition?: SlidePosition;
  /** 滑动位置类型 */
  slidePosType?: SlidePosition[];
  /** 安装位置 */
  installPosition?: string;
  /** 位置类型 */
  posType?: string;
  /** 切角角度 */
  cutAngle?: string;
  /** CC值 */
  cc?: number;
}

/**
 * 端点对接信息接口
 */
interface EndpointDock {
  /** 起始对接点 */
  stDock: Dock;
  /** 结束对接点 */
  etDock: Dock;
  /**
   * 获取位置类型
   * @param topFrame - 顶部框架
   */
  posType(topFrame: unknown): string;
}

/**
 * 对接点接口
 */
interface Dock {
  /**
   * 克隆对接点
   */
  clone(): Dock;
  /**
   * 判断是否与另一个对接点相等
   * @param other - 另一个对接点
   */
  equalTo(other: Dock): boolean;
}

/**
 * 压条信息接口
 */
interface BeadInfo {
  /** 压条ID */
  id: number;
  /** 起始对接点 */
  stDock: Dock;
  /** 结束对接点 */
  etDock: Dock;
  /** 起始角度 */
  stAngle: number;
  /** 结束角度 */
  etAngle: number;
  /** CC值 */
  cc: number;
  /** 是否已合并 */
  combined: boolean;
}

/**
 * 轨道信息接口
 */
interface TrackInfo {
  /** 主机滑动窗信息 */
  host: Slide;
  /** 框架管理器 */
  frameManager: {
    bars: Bar[];
  };
  /** 轨道编号 */
  trackNo: number;
  /** 轨道索引 */
  trackIndex: number;
  /** 列索引 */
  columnIndex: number;
}

/**
 * 滑动CC条管理类
 * 负责处理滑动窗的CC条配置和位置信息
 */
export declare class SlideCCBar {
  /** 框架集合 */
  private readonly frames: Frame[];
  /** 组合窗扇集合 */
  private readonly cjs: unknown[];

  /**
   * 构造函数
   * @param frames - 框架集合
   * @param cjs - 组合窗扇集合，默认为空数组
   */
  constructor(frames: Frame[], cjs?: unknown[]);

  /**
   * 判断是否为滑动型材
   * @param shapeType - 形状类型
   * @returns 是否为滑动型材
   */
  private isSlideProfile(shapeType: ShapeType): boolean;

  /**
   * 解析滑动辅助信息
   * @param ccConfigs - CC配置集合
   */
  parseSlideAux(ccConfigs: CCConfig[]): void;

  /**
   * 添加滑动信息
   * @param ccConfigs - CC配置集合
   * @param trackInfo - 轨道信息
   */
  private addSlideInfo(ccConfigs: CCConfig[], trackInfo: TrackInfo): void;

  /**
   * 添加滑动位置类型
   * @param ccConfigs - CC配置集合
   * @param trackInfo - 轨道信息
   */
  private addSlidePosType(ccConfigs: CCConfig[], trackInfo: TrackInfo): void;

  /**
   * 获取滑动位置
   * @param ccConfig - CC配置
   */
  private getSlidePosition(ccConfig: CCConfig): void;

  /**
   * 解析滑动数量辅助信息
   * @param ccConfigs - CC配置集合
   */
  private parseSlideCountAux(ccConfigs: CCConfig[]): void;

  /**
   * 标记双侧轨道
   */
  private markDoubleSideTrack(): void;

  /**
   * 解析侧轨道辅助信息
   * @param ccConfigs - CC配置集合
   */
  private parseSideTrackAux(ccConfigs: CCConfig[]): void;

  /**
   * 匹配穿透固定侧轨道
   * @param beadBars - 压条构件集合
   * @param ccConfigs - CC配置集合
   * @returns 匹配的压条信息集合
   */
  private matchSideTrackThroughFixed(
    beadBars: Bar[],
    ccConfigs: CCConfig[]
  ): BeadInfo[];

  /**
   * 在列表中查找相同对接点的压条
   * @param beadList - 压条信息列表
   * @returns 匹配结果或undefined
   */
  private findSameDockBeadsInList(
    beadList: BeadInfo[]
  ): { jIndex: number; mIndex: number; combined: BeadInfo } | undefined;

  /**
   * 解析滑动侧轨道
   * @param frame - 框架信息
   * @param ccConfigs - CC配置集合
   * @param newConfigs - 新配置集合
   */
  private parseSlideSideTrack(
    frame: Frame,
    ccConfigs: CCConfig[],
    newConfigs: CCConfig[]
  ): void;

  /**
   * 标记型材
   * @param frames - 框架集合
   */
  private markProfiles(frames: Frame[]): void;

  /**
   * 标记滑动型材
   * @param frame - 框架信息
   * @param typeMap - 类型映射表
   * @param allBars - 所有条形构件
   */
  private markSlideProfiles(
    frame: Frame,
    typeMap: Map<number, ShapeType[]>,
    allBars: Bar[]
  ): void;

  /**
   * 解析压条信息
   * @param ccConfigs - CC配置集合
   */
  private parseBead(ccConfigs: CCConfig[]): void;

  /**
   * 查找压条
   * @param ccConfig - CC配置
   * @returns [压条构件, 所属窗扇/框架]
   */
  private findBead(ccConfig: CCConfig): [Bar | undefined, Frame | Sash | undefined];

  /**
   * 修改安装位置
   * @param ccConfig - CC配置
   * @param bars - 条形构件集合
   * @param allConfigs - 所有配置集合
   * @param edge - 边信息
   * @returns 是否成功修改
   */
  private changeInstallPosition(
    ccConfig: CCConfig,
    bars: Bar[],
    allConfigs: CCConfig[],
    edge: Edge
  ): boolean;
}