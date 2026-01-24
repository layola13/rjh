import { Box3, Vector3 } from './math';
import { ContentType } from './ContentType';
import { RegionType } from './RegionType';
import { Content, FakeContent } from './Content';
import { RoomObject } from './RoomObject';
import { BodyOperator } from './BodyOperator';
import { EntityTypeChecker } from './EntityTypeChecker';

/**
 * 3D坐标点序列化格式
 */
export interface Vector3Dump {
  x: number;
  y: number;
  z: number;
}

/**
 * 缩放参数
 */
export interface ScaleParams {
  XScale: number;
  YScale: number;
  ZScale: number;
}

/**
 * 边界信息
 */
export interface BoundInfo {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * 曲线与面标签关联
 */
export interface CurveFaceTagInfo {
  curve: unknown;
  faceTags: string[];
}

/**
 * 世界坐标系2D路径序列化数据
 */
export interface WorldRawPath2dDump {
  outer: CurveFaceTagInfo[];
  holes: CurveFaceTagInfo[][];
}

/**
 * 楼层约束对象序列化数据
 */
export interface FloorConstraintDump {
  tag: string;
  bound: BoundInfo;
  floorTags: string[];
  ceilingTags: string[];
  layerHeight: number;
  roomType: string;
  worldRawPath2dDump: WorldRawPath2dDump;
}

/**
 * 内容盒子序列化数据
 */
export interface ContentBoxDump {
  seekId: string;
  contentType: string;
  tag: string;
  hostTag?: string;
  categories: string[];
  x: number;
  y: number;
  z: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  XLength: number;
  YLength: number;
  ZLength: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  flip?: number;
  groupType?: RegionType;
  children?: ContentBoxDump[];
}

/**
 * 区域约束对象序列化数据
 */
export interface RegionConstraintDump {
  id: string;
  box3Pts: Vector3Dump[];
  direction: Vector3Dump;
  type: string;
  rotation: Vector3Dump;
}

/**
 * 内容约束对象序列化数据
 */
export interface ContentConstraintDump extends RegionConstraintDump {
  contentType: string;
  seekId: string;
  position: Vector3Dump;
  flip?: number;
  size: Vector3Dump;
  scale: ScaleParams;
  topViewOutline: Vector3Dump[];
  hostId?: string;
  categories: string[];
  originTag: string;
}

/**
 * 内容组约束对象序列化数据
 */
export interface ContentGroupConstraintDump extends ContentConstraintDump {
  groupType: RegionType;
  children: ContentConstraintDump[];
}

/**
 * 内容候选项
 */
export interface ContentCandidate {
  candidate: {
    content?: Content;
    type?: RegionType;
    contents?: Content[];
  };
  used: number;
}

/**
 * 约束关系
 */
export interface Constraint {
  // 具体约束属性根据实际业务定义
  [key: string]: unknown;
}

/**
 * 基础约束对象
 * 所有空间约束对象的抽象基类
 */
export declare abstract class BaseConstraintObject {
  /** 唯一标识符 */
  readonly id: string;
  
  /** 3D包围盒 */
  box3: Box3;
  
  /** 方向向量 */
  direction: Vector3;

  /**
   * 构造函数
   * @param box3 - 3D包围盒
   * @param direction - 方向向量
   */
  constructor(box3: Box3, direction: Vector3);
}

/**
 * 区域约束对象
 * 表示一个空间区域的约束信息
 */
export declare class RegionConstraintObject extends BaseConstraintObject {
  /** 内容对象列表 */
  contents?: Content[];
  
  /** 内容约束对象列表 */
  contentConstraintObjects?: ContentConstraintObject[];
  
  /** 旋转角度 */
  rotation?: Vector3;
  
  /** 约束类型 */
  type?: string;
  
  /** 楼层数据 */
  floorDump?: FloorConstraintDump;

  /**
   * 从内容序列化数据创建区域约束对象
   * @param contentDumps - 内容序列化数据数组
   * @returns 区域约束对象实例
   */
  static fromContentDumps(contentDumps: ContentBoxDump[]): RegionConstraintObject;

  /**
   * 从内容对象创建区域约束对象
   * @param contents - 内容对象数组
   * @returns 区域约束对象实例
   */
  static fromContentObjects(contents: Content[]): RegionConstraintObject;

  /**
   * 根据面标签获取主体面ID
   * @param faceTag - 面标签
   * @returns 面ID或undefined
   */
  getBodyFaceIdOfFaceTag(faceTag: string): string | undefined;

  /**
   * 序列化为JSON对象
   * @returns 序列化数据
   */
  dump(): RegionConstraintDump;

  /**
   * 从序列化数据加载
   * @param dump - 序列化数据
   * @returns 区域约束对象实例
   */
  static loadFromDump(dump: RegionConstraintDump): RegionConstraintObject;
}

/**
 * 楼层约束对象
 * 表示楼层空间的约束信息
 */
export declare class FloorConstraintObject extends BaseConstraintObject {
  /**
   * 从楼层对象生成序列化数据
   * @param floor - 楼层对象
   * @returns 楼层约束序列化数据
   */
  static dumpFromFloor(floor: {
    tag: string;
    bound: BoundInfo;
    roomInfos: Array<{ structureFaceInfos: unknown }>;
    worldRawPath2d: {
      outer: Array<{ curve: { getStartPt(): Vector3; getEndPt(): Vector3 }; dump(): unknown }>;
      holes: Array<Array<{ curve: { getStartPt(): Vector3; getEndPt(): Vector3 }; dump(): unknown }>>;
    };
    roomInfo?: {
      ceilings: Array<{ tag: string }>;
    };
    roomType: string;
    getUniqueParent(): { height: number };
  }): FloorConstraintDump;
}

/**
 * 内容约束对象
 * 表示单个内容物体的空间约束
 */
export declare class ContentConstraintObject extends BaseConstraintObject {
  /** 约束列表 */
  constraints: Constraint[];
  
  /** 内容到区域的约束关系 */
  c2rConstraints: Constraint[];
  
  /** 缩放参数 */
  scale: ScaleParams;
  
  /** 是否固定位置 */
  isFixed: boolean;
  
  /** 旋转角度 */
  rotation: Vector3;
  
  /** 位置坐标 */
  position: Vector3;
  
  /** 尺寸大小 */
  size: Vector3;
  
  /** 翻转标记 */
  flip?: number;
  
  /** 关联的内容对象 */
  content?: Content;
  
  /** 目标内容对象 */
  targetContent?: Content;

  /**
   * 平移变换
   * @param offset - 偏移向量
   */
  translate(offset: Vector3): void;

  /**
   * 从内容对象更新约束信息
   * @param content - 内容对象
   */
  updateFromContent(content: Content): void;

  /**
   * 从内容对象创建约束对象
   * @param content - 内容对象
   * @returns 内容约束对象实例
   */
  static fromContent(content: Content): ContentConstraintObject;

  /**
   * 从内容序列化数据创建约束对象
   * @param contentDump - 内容序列化数据
   * @returns 内容约束对象实例
   */
  static fromContentDump(contentDump: ContentBoxDump): ContentConstraintObject;

  /**
   * 获取内容对象的3D包围盒
   * @param content - 内容对象
   * @returns 3D包围盒
   */
  static getContentBox3(content: Content): Box3;

  /** 原始标签 */
  get originTag(): string;
  set originTag(value: string);

  /** 对象标签 */
  get tag(): string;

  /** 推断的对象类型 */
  get type(): string;

  /** 宿主标签 */
  get hostTag(): string | undefined;

  /** 宿主ID */
  get hostId(): string | undefined;
  set hostId(value: string | undefined);

  /** 检索ID */
  get seekId(): string;
  set seekId(value: string);

  /** 内容类型 */
  get contentType(): ContentType;
  set contentType(value: ContentType);

  /** 顶视图轮廓 */
  get topViewOutline(): Vector3[];

  /** 分类标签数组 */
  get categories(): string[];
  set categories(value: string[]);

  /** 匹配规则列表 */
  get matchRules(): Array<(target: Content | ContentConstraintObject) => boolean>;

  /**
   * 设置目标内容
   * @param candidates - 候选内容列表
   * @returns 是否设置成功
   */
  setTargetContent(candidates: ContentCandidate[]): boolean;

  /**
   * 判断是否与目标相似
   * @param target - 目标对象
   * @returns 是否相似
   */
  isSimilar(target: Content | ContentConstraintObject): boolean;

  /**
   * 序列化为JSON对象
   * @returns 序列化数据
   */
  dump(): ContentConstraintDump;

  /**
   * 从序列化数据加载
   * @param dump - 序列化数据
   * @returns 内容约束对象实例
   */
  static loadFromDump(dump: ContentConstraintDump): ContentConstraintObject;
}

/**
 * 内容组约束对象
 * 表示一组相关内容物体的空间约束
 */
export declare class ContentGroupConstraintObject extends ContentConstraintObject {
  /** 分组类型 */
  groupType: RegionType;
  
  /** 子内容约束对象列表 */
  children: ContentConstraintObject[];

  /**
   * 从内容对象创建组约束对象
   * @param content - 内容对象
   * @returns 内容组约束对象实例
   */
  static fromContent(content: Content): ContentGroupConstraintObject;

  /**
   * 从内容序列化数据创建组约束对象
   * @param contentDump - 内容序列化数据
   * @returns 内容组约束对象实例
   */
  static fromContentDump(contentDump: ContentBoxDump): ContentGroupConstraintObject;

  /**
   * 平移变换（同时平移所有子对象）
   * @param offset - 偏移向量
   */
  translate(offset: Vector3): void;

  /** 原始标签（来自第一个子对象） */
  get originTag(): string | undefined;

  /** 对象标签（来自第一个子对象） */
  get tag(): string | undefined;

  /** 宿主标签（来自第一个子对象） */
  get hostTag(): string | undefined;

  /** 宿主ID（来自第一个子对象） */
  get hostId(): string | undefined;
  set hostId(value: string | undefined);

  /** 检索ID（来自第一个子对象） */
  get seekId(): string | undefined;
  set seekId(value: string | undefined);

  /** 内容类型（来自第一个子对象） */
  get contentType(): ContentType | undefined;
  set contentType(value: ContentType | undefined);

  /** 分类标签（来自第一个子对象） */
  get categories(): string[] | undefined;
  set categories(value: string[] | undefined);

  /** 组匹配规则列表 */
  get groupMatchRules(): Array<(target: { type: RegionType; contents: Content[] }) => boolean>;

  /**
   * 设置目标内容组
   * @param candidates - 候选内容列表
   * @returns 是否设置成功
   */
  setTargetContent(candidates: ContentCandidate[]): boolean;

  /**
   * 判断是否与目标组相似
   * @param target - 目标对象
   * @returns 是否相似
   */
  isSimilar(target: ContentGroupConstraintObject): boolean;

  /**
   * 序列化为JSON对象
   * @returns 序列化数据
   */
  dump(): ContentGroupConstraintDump;

  /**
   * 从序列化数据加载
   * @param dump - 序列化数据
   * @returns 内容组约束对象实例
   */
  static loadFromDump(dump: ContentGroupConstraintDump): ContentGroupConstraintObject;
}

/**
 * 内容约束对象工厂
 * 提供统一的创建和类型判断方法
 */
export declare class ContentConstraintObjectFactory {
  /**
   * 判断是否为内容组约束对象
   * @param obj - 待判断对象
   * @returns 是否为内容组约束对象
   */
  static isContentGroupCo(obj: ContentConstraintObject): obj is ContentGroupConstraintObject;

  /**
   * 判断序列化数据是否为内容组
   * @param dump - 序列化数据
   * @returns 是否为内容组
   */
  static isContentGroupDump(dump: ContentConstraintDump | ContentGroupConstraintDump): dump is ContentGroupConstraintDump;

  /**
   * 从序列化数据加载约束对象（自动识别类型）
   * @param dump - 序列化数据
   * @returns 内容约束对象或内容组约束对象
   */
  static loadFromDump(dump: ContentConstraintDump | ContentGroupConstraintDump): ContentConstraintObject | ContentGroupConstraintObject;

  /**
   * 判断内容盒子序列化数据是否为组
   * @param dump - 内容盒子序列化数据
   * @returns 是否为内容组
   */
  static isContentGroupBoxDump(dump: ContentBoxDump): boolean;

  /**
   * 从内容序列化数据创建约束对象（自动识别类型）
   * @param dump - 内容序列化数据
   * @returns 内容约束对象或内容组约束对象
   */
  static fromContentDump(dump: ContentBoxDump): ContentConstraintObject | ContentGroupConstraintObject;
}