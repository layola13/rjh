import { Box3, Line2d, Loop } from './geometry';
import { BodyOperator } from './body-operator';
import { FakeContent } from './fake-content';
import { IgnoreBoxUtil } from './ignore-box-util';

/**
 * 约束类型枚举
 */
export enum ConstraintType {
  /** 距离约束 */
  Distance = 'distance'
}

/**
 * 内容盒子数据导出格式
 */
export interface ContentBoxDump {
  /** 查找ID */
  seekId: string;
  /** 分类信息 */
  categories: string[];
  /** 内容类型 */
  contentType: string;
  /** 标签 */
  tag: string;
  /** 宿主标签 */
  hostTag?: string;
  /** 实体ID */
  entityId: string;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** X轴缩放 */
  XScale: number;
  /** Y轴缩放 */
  YScale: number;
  /** Z轴缩放 */
  ZScale: number;
  /** X轴长度 */
  XLength: number;
  /** Y轴长度 */
  YLength: number;
  /** Z轴长度 */
  ZLength: number;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
  /** 翻转状态 */
  flip: boolean;
  /** 材质映射表 */
  materialMap: Record<string, unknown>;
}

/**
 * 实体数据导出格式
 */
export interface EntityDump {
  /** 实体ID */
  id: number;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** X轴尺寸 */
  XSize: number;
  /** Y轴尺寸 */
  YSize: number;
  /** Z轴尺寸 */
  ZSize: number;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
  /** 翻转状态 */
  flip: boolean;
  /** X轴缩放 */
  XScale: number;
  /** Y轴缩放 */
  YScale: number;
  /** Z轴缩放 */
  ZScale: number;
  /** X轴长度 */
  XLength: number;
  /** Y轴长度 */
  YLength: number;
  /** Z轴长度 */
  ZLength: number;
}

/**
 * 组对象数据导出格式
 */
export interface GroupDump extends EntityDump {
  /** 成员列表 */
  members: EntityDump[];
}

/**
 * 空间约束接口
 */
export interface SpaceConstraint {
  // 空间约束的具体属性根据实际需求定义
}

/**
 * 位置更新参数
 */
export interface PositionUpdate {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
}

/**
 * 地板数据导出格式
 */
export interface FloorDump {
  /** 世界原始路径2D导出数据 */
  worldRawPath2dDump: {
    /** 外部曲线 */
    outer: Array<{
      /** 曲线数据 */
      curve: unknown;
    }>;
  };
  // 其他地板相关属性
  [key: string]: unknown;
}

/**
 * 组合对象接口
 */
export interface GroupCo {
  /** 目标内容 */
  targetContent?: FakeContent;
  /** 内容 */
  content?: FakeContent;
  /** 子元素 */
  children: Array<{
    targetContent?: FakeContent;
    content?: FakeContent;
  }>;
}

/**
 * 从内容盒子获取临时内容
 * @param contentBox - 内容盒子数据
 * @returns 伪内容对象
 */
export declare function getTempContentFromContentBox(contentBox: ContentBoxDump): FakeContent;

/**
 * 将内容转换为内容盒子导出格式
 * @param content - 内容对象
 * @returns 内容盒子导出数据
 */
export declare function contentToContentBoxDump(content: FakeContent): ContentBoxDump;

/**
 * 实体对象基类
 * 表示场景中的基础实体，包含位置、尺寸、旋转等基本属性
 */
export declare class EntityObject {
  /** 子元素列表 */
  children: EntityObject[];
  /** 灵魂数据（扩展属性） */
  soulData: Record<string, unknown>;
  /** 是否固定 */
  isFixed: boolean;
  /** 内容对象 */
  content: FakeContent;
  /** 父对象 */
  parent?: EntityObject;
  /** 包围盒 */
  box: Box3;
  /** 空间约束 */
  private _spaceConstraint?: SpaceConstraint;

  constructor();

  /**
   * 从内容对象创建实体
   * @param content - 内容对象
   * @param parent - 父对象
   * @returns 实体对象
   */
  static fromContent(content: FakeContent, parent?: EntityObject): EntityObject;

  /**
   * 从内容盒子创建实体
   * @param contentBox - 内容盒子数据
   * @param parent - 父对象
   * @returns 实体对象
   */
  static fromContentBox(contentBox: ContentBoxDump, parent?: EntityObject): EntityObject;

  /**
   * 更新位置
   * @param position - 新位置
   */
  updatePosition(position: PositionUpdate): void;

  /**
   * 获取唯一父对象
   * @returns 父对象
   */
  getUniqueParent(): EntityObject | undefined;

  /**
   * 添加子对象
   * @param child - 子对象
   */
  add(child: EntityObject): void;

  /**
   * 获取顶层父对象
   * @returns 顶层父对象
   */
  getTopParent(): EntityObject | undefined;

  /**
   * 获取第一个父对象
   * @returns 父对象
   */
  getFirstParent(): EntityObject | undefined;

  /** 空间约束访问器 */
  get spaceConstraint(): SpaceConstraint | undefined;

  /** 实体ID */
  get id(): number;

  /**
   * 设置空间约束
   * @param constraint - 空间约束
   */
  setSpaceConstraint(constraint: SpaceConstraint): void;

  /** X轴长度 */
  get XLength(): number;

  /** Y轴长度 */
  get YLength(): number;

  /** Z轴长度 */
  get ZLength(): number;

  /** X轴尺寸 */
  get XSize(): number;

  /** Y轴尺寸 */
  get YSize(): number;

  /** Z轴尺寸 */
  get ZSize(): number;

  /**
   * 遍历子元素
   * @param callback - 回调函数
   */
  traverse(callback: (child: EntityObject) => void): void;

  /** X轴旋转角度 */
  get XRotation(): number;

  /** X轴缩放 */
  get XScale(): number;

  /** Y轴旋转角度 */
  get YRotation(): number;

  /** Y轴缩放 */
  get YScale(): number;

  /** Z轴旋转角度 */
  get ZRotation(): number;

  /** Z轴缩放 */
  get ZScale(): number;

  /** X坐标 */
  get x(): number;

  /** Y坐标 */
  get y(): number;

  /** Z坐标 */
  get z(): number;

  /** 翻转状态 */
  get flip(): boolean;

  /**
   * 导出实体数据
   * @returns 实体导出数据
   */
  dump(): EntityDump;

  /**
   * 从内容对象获取包围盒
   * @param content - 内容对象
   * @returns 包围盒
   */
  static getBox3OfContent(content: FakeContent): Box3;

  /**
   * 从内容盒子获取包围盒
   * @param contentBox - 内容盒子数据
   * @returns 包围盒
   */
  static getBox3OfContentBox(contentBox: ContentBoxDump): Box3;

  /**
   * 打印日志
   */
  log(): void;
}

/**
 * 房间对象
 * 表示由地板定义的房间空间
 */
export declare class RoomObject extends EntityObject {
  /** 地板外部曲线列表 */
  floorOuterCurves: Line2d[];
  /** 地板导出数据 */
  floorDump: FloorDump;

  constructor(floorDump: FloorDump);

  /**
   * 从地板导出数据创建房间对象
   * @param floorDump - 地板导出数据
   * @returns 房间对象
   */
  static fromFloorDump(floorDump: FloorDump): RoomObject;

  /**
   * 从地板导出数据获取区域内容
   * @param floorDump - 地板导出数据
   * @returns 伪内容对象
   */
  static getRegionContent(floorDump: FloorDump): FakeContent;

  /**
   * 设置地板外部曲线
   * @param curves - 曲线列表
   */
  setFloorOuterCurves(curves: Line2d[]): void;
}

/**
 * 区域对象
 * 表示可以包含多个实体的区域
 */
export declare class RegionObject extends EntityObject {
  /**
   * 添加子对象并更新包围盒
   * @param child - 子对象
   */
  add(child: EntityObject): void;

  /**
   * 更新位置（递归更新所有子对象）
   * @param position - 新位置
   */
  updatePosition(position: PositionUpdate): void;
}

/**
 * 组对象
 * 表示多个实体的组合
 */
export declare class GroupObject extends EntityObject {
  /** 组成员列表 */
  members: EntityObject[];

  /**
   * 从组合对象创建组对象
   * @param groupCo - 组合对象
   * @param parent - 父对象
   * @param ignoreBoxConfig - 忽略盒子配置
   * @returns 组对象
   * @throws 当缺少targetContent时抛出错误
   */
  static fromGroupCo(groupCo: GroupCo, parent?: EntityObject, ignoreBoxConfig?: unknown): GroupObject;

  /**
   * 更新位置（同步更新所有成员）
   * @param position - 新位置
   */
  updatePosition(position: PositionUpdate): void;

  /** X轴长度（基于包围盒） */
  get XLength(): number;

  /** Y轴长度（基于包围盒） */
  get YLength(): number;

  /** Z轴长度（基于包围盒） */
  get ZLength(): number;

  /** X轴尺寸（等同于长度） */
  get XSize(): number;

  /** Y轴尺寸（等同于长度） */
  get YSize(): number;

  /** Z轴尺寸（等同于长度） */
  get ZSize(): number;

  /** X轴缩放（固定为1） */
  get XScale(): number;

  /** Y轴缩放（固定为1） */
  get YScale(): number;

  /** Z轴缩放（固定为1） */
  get ZScale(): number;

  /** X坐标（包围盒中心） */
  get x(): number;

  /** Y坐标（包围盒中心） */
  get y(): number;

  /** Z坐标（包围盒底部） */
  get z(): number;

  /**
   * 导出组数据（包含成员信息）
   * @returns 组导出数据
   */
  dump(): GroupDump;
}