/**
 * 背景墙基础工具类
 * 提供参数化墙体的缩放、面裁剪判断、房间内容检测等功能
 */
declare class NCPBackgroundWallBaseUtil {
  /**
   * 调整参数化墙体的尺寸
   * @param walls - 需要调整的墙体数组
   * @param origin - 缩放原点坐标
   * @param scale - 三轴缩放比例 { x?, y?, z? }，默认为 1
   */
  static resizeParametricWalls(
    walls: Array<ParametricWall>,
    origin: Vector3,
    scale: ScaleVector
  ): void;

  /**
   * 获取与指定面共线的所有面（用于裁剪）
   * @param face - 起始面对象
   * @param resultMap - 可选的结果缓存Map，用于递归收集
   * @returns 包含所有共线面的Map（键为face.id，值为face对象）
   */
  static getSameLineFaceForClip(
    face: WallFace,
    resultMap?: Map<string, WallFace>
  ): Map<string, WallFace>;

  /**
   * 判断内容对象是否在指定房间内
   * @param content - 待检测的内容实体
   * @param room - 目标房间（必须是Face类型）
   * @param strictMode - 是否启用严格模式，默认false
   * @returns 是否在房间内
   */
  static isContentInRoom(
    content: ContentEntity,
    room: HSCore.Model.Face | null,
    strictMode?: boolean
  ): boolean;
}

/**
 * 参数化墙体对象接口
 */
interface ParametricWall {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** 旋转角度（度数） */
  rotation: number;
  /** X方向长度 */
  XLength: number;
  /** Y方向长度 */
  YLength: number;
  /** Z方向高度 */
  ZLength: number;
  /** 根据尺寸初始化墙体 */
  initBySize(): void;
}

/**
 * 三维向量缩放参数
 */
interface ScaleVector {
  /** X轴缩放比例 */
  x?: number;
  /** Y轴缩放比例 */
  y?: number;
  /** Z轴缩放比例 */
  z?: number;
}

/**
 * 墙面对象接口
 */
interface WallFace {
  /** 面唯一标识 */
  id: string;
  /** 面信息（包含前后连接关系） */
  faceInfo?: {
    prev?: WallFace;
    next?: WallFace;
  };
  /** 表面对象（提供法线等几何信息） */
  surfaceObj: {
    getNormal(): Vector3;
  };
}

/**
 * 内容实体接口
 */
interface ContentEntity {
  /** 宿主对象（可能是墙面） */
  host?: {
    roomInfos?: Array<RoomInfo>;
  };
  /** 实体标签 */
  tag?: string;
}

/**
 * 房间信息接口
 */
interface RoomInfo {
  /** 关联的楼层面数组 */
  floors: HSCore.Model.Face[];
}

/**
 * 三维向量类型（简化声明）
 */
interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export { NCPBackgroundWallBaseUtil };