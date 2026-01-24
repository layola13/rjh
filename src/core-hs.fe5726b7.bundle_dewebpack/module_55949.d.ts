/**
 * 表面几何信息元数据
 */
interface SurfaceMeta {
  /** 外轮廓坐标点数组 */
  outer: Point2D[];
  /** 内孔洞坐标点数组集合 */
  holes: Point2D[][];
  /** 边界包围盒对象 */
  bound: HSCore.Util.BrepBound;
  /** 表面宽度 */
  width: number;
  /** 表面高度 */
  height: number;
}

/**
 * 二维坐标点
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 几何索引数组
 */
type GeometryIndices = number[];

/**
 * 几何对象结构
 */
interface Geometry {
  /** 几何坐标点数组 */
  geometry: THREE.Vector2[];
  /** 索引数组 */
  indices?: GeometryIndices;
}

/**
 * 支持的表面类型（墙体、地板、天花板、面）
 */
type SupportedElement =
  | HSCore.Model.Wall
  | HSCore.Model.Floor
  | HSCore.Model.Ceiling
  | HSCore.Model.Face;

/**
 * 墙体表面类型或方向
 */
type WallSurfaceType =
  | HSCore.Model.WallSurfaceTypeEnum
  | 'left'
  | 'right';

/**
 * 房间表面类型
 */
type RoomSurfaceType = HSCore.Model.RoomSurfaceTypeEnum;

/**
 * 计算墙体或面的矩形UV坐标
 * @param startIndex - 起始顶点索引
 * @param endIndex - 结束顶点索引
 * @param height - 高度值
 * @param scale - 缩放因子，默认为1
 * @returns 四个角点的UV坐标数组
 */
declare function calculateRectangleUV(
  this: Geometry,
  startIndex: number,
  endIndex: number,
  height: number,
  scale?: number
): Point2D[];

/**
 * 获取墙体指定表面的背景路径坐标
 * @param wall - 墙体对象
 * @param surfaceType - 表面类型（内侧/外侧/顶部/起始端/结束端）
 * @returns 表面轮廓坐标点数组
 */
declare function getWallBackgroundPath(
  wall: HSCore.Model.Wall,
  surfaceType: WallSurfaceType
): Point2D[];

/**
 * 获取模型元素指定表面的背景路径坐标
 * @param element - 模型元素（墙体/地板/天花板/面）
 * @param surfaceType - 表面类型
 * @returns 表面轮廓坐标点数组
 */
export declare function getBackgroundPath(
  element: SupportedElement,
  surfaceType: WallSurfaceType | RoomSurfaceType
): Point2D[];

/**
 * 获取模型元素表面的完整元数据信息
 * @param element - 模型元素
 * @param surfaceType - 表面类型
 * @returns 包含轮廓、孔洞、边界和尺寸的元数据对象
 */
export declare function getSurfaceMeta(
  element: SupportedElement,
  surfaceType: WallSurfaceType | RoomSurfaceType
): SurfaceMeta;