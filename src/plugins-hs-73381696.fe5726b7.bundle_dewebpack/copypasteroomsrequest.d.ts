import { Vector3, Loop, Polygon, MathAlg } from './geom';
import { HSCore } from './core';

/**
 * 房间复制粘贴数据结构
 */
interface CopiedData {
  /** 墙体集合 */
  walls: HSCore.Model.Wall[];
  /** 门窗等开口集合 */
  openings: HSCore.Model.Opening[];
  /** 墙体连接点信息 */
  wallJoints: WallJointInfo[];
  /** 楼板开口集合 */
  slabOpenings: HSCore.Model.SlabOpening[];
  /** 结构构件集合 */
  structures: HSCore.Model.Structure[];
  /** 梁构件集合 */
  beams: HSCore.Model.Beam[];
  /** 空间分割曲线 */
  splitCurves: HSCore.Model.Curve[];
  /** 房间快照数据 */
  roomSnapshots: RoomSnapshot[];
  /** 楼板草图孔洞 */
  slabSketch2dHoles: SlabSketch2dHole[];
  /** 粘贴前的房间列表 */
  beforeRooms: HSCore.Model.Floor[];
}

/**
 * 墙体连接点信息
 */
interface WallJointInfo {
  /** 连接类型 */
  type: string;
  /** 关联的墙体信息列表 */
  wallInfos: unknown[];
}

/**
 * 房间快照
 */
interface RoomSnapshot {
  /** 房间楼层实体 */
  floor: HSCore.Model.Floor;
  /** 房间多边形轮廓 */
  polygon: PolygonData;
}

/**
 * 多边形数据结构
 */
interface PolygonData {
  /** 外轮廓环 */
  outer: Loop;
  /** 内孔洞环数组 */
  holes: Loop[];
}

/**
 * 楼板草图孔洞
 */
interface SlabSketch2dHole {
  /** 孔洞唯一标识 */
  id: number;
  /** 孔洞轮廓环 */
  loop: Loop;
}

/**
 * 房间数据结构
 */
interface RoomData {
  /** 房间楼层实体 */
  floor: HSCore.Model.Floor;
  /** 房间多边形轮廓 */
  polygon: PolygonData;
}

/**
 * 偏移向量
 */
interface Offset {
  /** X轴偏移量 */
  x: number;
  /** Y轴偏移量 */
  y: number;
}

/**
 * 可平移实体接口
 */
interface TranslatableEntity {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** 父节点 */
  parent?: HSCore.Model.Layer;
  /** 平移方法 */
  translate?(offset: Vector3): void;
  /** 是否为墙体部件 */
  isWallPart?(): boolean;
  /** Z轴缩放 */
  ZScale?: number;
  /** 同步图层高度 */
  syncLayerHeight?(): void;
}

/**
 * 房间复制粘贴请求类
 * 
 * 负责处理房间及其关联构件（墙体、开口、结构、梁等）的复制粘贴操作。
 * 支持跨图层粘贴，自动处理几何变换、拓扑关系重建和属性继承。
 * 
 * @extends HSCore.Transaction.Common.StateRequest
 */
export declare class CopyPasteRoomsRequest extends HSCore.Transaction.Common.StateRequest {
  /** 当前户型平面图实例 */
  floorplan: HSCore.Model.Floorplan;
  
  /** 当前活动图层 */
  activeLayer: HSCore.Model.Layer;
  
  /** 目标粘贴图层 */
  targetLayer: HSCore.Model.Layer;
  
  /** 粘贴后生成的房间数据 */
  toRooms: RoomData[];
  
  /** 粘贴前已存在的房间列表 */
  beforeRooms: HSCore.Model.Floor[];
  
  /** 粘贴后所有房间列表 */
  afterRooms: HSCore.Model.Floor[];
  
  /** 复制的数据集合 */
  copied: CopiedData;
  
  /** 粘贴位置偏移量 */
  offset: Offset;
  
  /** 是否复制楼板（内部标志） */
  private _copySlab: boolean;

  /**
   * 构造函数
   * 
   * @param copiedData - 复制的数据对象
   * @param offset - 粘贴位置相对于原始位置的偏移量
   * @param targetLayer - 目标图层，若未指定则使用当前活动图层
   */
  constructor(
    copiedData: CopiedData,
    offset: Offset,
    targetLayer?: HSCore.Model.Layer
  );

  /**
   * 判断是否可以执行事务字段操作
   * 
   * @returns 始终返回 true，表示该请求支持事务操作
   */
  canTransactField(): boolean;

  /**
   * 粘贴墙体及其开口
   * 
   * 将复制的墙体、门窗开口按偏移量平移后添加到目标图层，
   * 并重建墙体连接点拓扑关系。
   */
  pasteWallWithOpenings(): void;

  /**
   * 粘贴楼板开口
   * 
   * 将复制的楼板开口平移并添加到目标图层，
   * 刷新开口与楼板的宿主关系。
   */
  pasteSlabOpenings(): void;

  /**
   * 粘贴结构构件
   * 
   * 包括柱、墙等结构构件，处理图层高度同步。
   */
  pasteStructures(): void;

  /**
   * 粘贴梁构件
   * 
   * 将复制的梁按偏移量平移后添加到目标图层。
   */
  pasteBeams(): void;

  /**
   * 粘贴空间分割线
   * 
   * 根据分割曲线重新划分目标房间的内部空间。
   */
  pasteSpaceSplits(): void;

  /**
   * 粘贴房间类型
   * 
   * 根据几何匹配关系，将原房间的类型属性应用到新房间。
   */
  pasteRoomTypes(): void;

  /**
   * 提交事务
   * 
   * 执行完整的粘贴流程并调用父类的提交方法。
   */
  onCommit(): void;

  /**
   * 平移实体坐标
   * 
   * @param entity - 需要平移的实体对象
   * @private
   */
  private _translateEntity(entity: TranslatableEntity): void;

  /**
   * 执行房间粘贴核心逻辑
   * 
   * 按顺序执行：墙体粘贴 → 楼板编辑 → 开口粘贴 → 结构粘贴 → 梁粘贴 
   * → 房间重建 → 空间分割 → 类型应用。
   * 
   * @returns 始终返回 true 表示执行成功
   * @private
   */
  private _pasteRooms(): boolean;

  /**
   * 粘贴楼板编辑（孔洞）
   * 
   * 将复制的楼板孔洞按偏移量平移并分配新ID后添加到目标图层。
   */
  pasteSlabEdits(): void;

  /**
   * 收集新生成的房间
   * 
   * 通过对比粘贴前后的房间列表，提取新增房间及其几何信息。
   */
  collectToRooms(): void;

  /**
   * 收集户型中的所有房间
   * 
   * @returns 房间楼层实体数组
   */
  collectFloorplanRooms(): HSCore.Model.Floor[];
}