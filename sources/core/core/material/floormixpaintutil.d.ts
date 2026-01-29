/**
 * 地板混合涂装工具类
 * 提供地板背景路径计算和开口路径处理功能
 */
export declare class FloorMixpaintUtil {
  /**
   * 获取唯一的房间信息
   * @param floor - 地板对象
   * @returns 房间信息对象，如果不存在则返回undefined
   * @private
   */
  private static _getUniqueRoomInfo(
    floor: FloorObject
  ): RoomInfo | undefined;

  /**
   * 获取包含开口的地板背景路径
   * @param floor - 地板对象
   * @param useLocalCoordinates - 是否使用本地坐标系，默认为true
   * @returns 带有外轮廓和孔洞的路径对象，或者简单的2D路径数组
   */
  static getFloorBackgroundWithOpening(
    floor: FloorObject,
    useLocalCoordinates?: boolean
  ): PathWithHoles | Path2D;

  /**
   * 获取地板上所有相关的开口路径
   * @param floor - 地板对象
   * @returns 开口路径数组
   */
  static getOpeningPaths(floor: FloorObject): Path2D[];
}

/**
 * 地板对象接口
 */
interface FloorObject {
  /** 房间信息列表 */
  roomInfos: RoomInfo[];
  /** 世界坐标系下的原始2D路径 */
  worldRawPath2d: Path2D;
  /** 本地坐标系下的原始2D路径 */
  rawPath2d: Path2D;
  /** 表面对象 */
  surfaceObj: SurfaceObject;
}

/**
 * 房间信息接口
 */
interface RoomInfo {
  /** 房间内的结构元素（墙体、开口等） */
  structures?: Structure[];
}

/**
 * 表面对象接口
 */
interface SurfaceObject {
  /** 本地坐标到世界坐标的变换矩阵 */
  localToWorld: Matrix4;
}

/**
 * 结构元素类型（墙体或其他建筑元素）
 */
type Structure = HSCore.Model.Wall | unknown;

/**
 * 2D路径类型（曲线数组）
 */
type Path2D = Curve2D[];

/**
 * 带孔洞的路径对象
 */
interface PathWithHoles {
  /** 外轮廓路径 */
  outer: Path2D[];
  /** 孔洞路径数组 */
  holes: Path2D[][];
}

/**
 * 2D曲线类型
 */
interface Curve2D {
  // 曲线的具体实现由ClipperService定义
}

/**
 * 3D曲线类型
 */
interface Curve3D {
  /**
   * 应用变换矩阵
   * @param matrix - 变换矩阵
   */
  transform(matrix: Matrix4): Curve3D;
}

/**
 * 4x4变换矩阵
 */
interface Matrix4 {
  /**
   * 获取逆矩阵
   */
  inversed(): Matrix4 | null;
}

/**
 * 剪裁结果对象
 */
interface ClipResult {
  /** 外轮廓 */
  outer: Path2D;
  /** 孔洞数组 */
  holes?: Path2D[][];
}

/**
 * HSCore命名空间（第三方库）
 */
declare namespace HSCore {
  namespace Model {
    /**
     * 墙体类
     */
    class Wall {
      /** 墙体上的开口集合 */
      openings: Record<string, Opening>;
    }
  }
}

/**
 * 开口对象接口（门、窗等）
 */
interface Opening {
  // 开口的具体属性由DoorStoneMixpaintUtil定义
}