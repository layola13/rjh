/**
 * 差异对比工具类
 * 提供模型对比、几何计算、内容边界检测等功能
 */
declare class DiffToolUtil {
  /**
   * 比较两个对象的属性是否相等
   * 包括内容、位置(x,y,z)、尺寸(XSize,YSize,ZSize)、旋转(XRotation,YRotation,ZRotation)
   * @param first - 第一个对象
   * @param second - 第二个对象
   * @returns 属性是否完全相等
   */
  static propertyEqual(
    first: HSCore.Model.ModelObject,
    second: HSCore.Model.ModelObject
  ): boolean;

  /**
   * 判断两个模型的内容是否相同
   * @param first - 第一个模型对象
   * @param second - 第二个模型对象
   * @returns 内容是否相同
   */
  static isSameContent(
    first: HSCore.Model.ModelObject,
    second: HSCore.Model.ModelObject
  ): boolean;

  /**
   * 计算参数化开口在给定线段上的投影范围
   * @param startPoint - 线段起点
   * @param endPoint - 线段终点
   * @param polygonVertices - 多边形顶点数组
   * @returns 投影的起点和终点坐标数组，如果不存在平行关系则返回空数组
   */
  static calcParametricOpeningFromTo(
    startPoint: Vector2,
    endPoint: Vector2,
    polygonVertices: Vector2[]
  ): Vector2[];

  /**
   * 获取两条线段的重叠参数范围
   * @param lineStart - 基准线段起点
   * @param lineEnd - 基准线段终点
   * @param testStart - 测试线段起点
   * @param testEnd - 测试线段终点
   * @returns 重叠区间的参数数组 [minParam, maxParam]，无重叠则返回空数组
   */
  static getOverlappedParameters(
    lineStart: Vector2,
    lineEnd: Vector2,
    testStart: Vector2,
    testEnd: Vector2
  ): number[];

  /**
   * 计算矩形的轮廓顶点
   * @param center - 矩形中心点
   * @param width - 矩形宽度
   * @param height - 矩形高度
   * @param rotation - 旋转角度（弧度）
   * @returns 四个顶点坐标数组
   */
  static computeOutline(
    center: Vector2,
    width: number,
    height: number,
    rotation: number
  ): Vector2[];

  /**
   * 获取内容对象的边界信息
   * @param content - 内容对象
   * @param useHostWidth - 是否使用宿主墙体宽度（可选）
   * @returns 边界信息对象
   */
  static getContentBound(
    content: HSCore.Model.Content,
    useHostWidth?: boolean
  ): {
    center: Vector2;
    width: number;
    height: number;
    rotation: number;
  };

  /**
   * 获取内容对象所在父墙体的宽度
   * @param content - 内容对象
   * @returns 墙体宽度值
   */
  static getContentParentWallWidth(content: HSCore.Model.Content): number;

  /**
   * 获取墙体宽度
   * @param wall - 墙体对象
   * @returns 墙体宽度，若无墙体则返回全局默认宽度
   */
  static getWallWidth(wall: HSCore.Model.Wall | null | undefined): number;

  /**
   * 判断是否为角落飘窗
   * @param content - 内容对象
   * @returns 是否为角落飘窗
   */
  static isCornerBayWindow(content: HSCore.Model.ModelObject): boolean;

  /**
   * 判断是否为飘窗
   * @param content - 内容对象
   * @returns 是否为飘窗
   */
  static isBayWindow(content: HSCore.Model.ModelObject): boolean;

  /**
   * 判断是否为转角窗
   * @param content - 内容对象
   * @returns 是否为转角窗
   */
  static isCornerWindow(content: HSCore.Model.ModelObject): boolean;

  /**
   * 判断是否为落地窗
   * @param content - 内容对象
   * @returns 是否为落地窗
   */
  static isFloorBaseWindow(content: HSCore.Model.ModelObject): boolean;

  /**
   * 判断是否为普通窗户
   * @param content - 内容对象
   * @returns 是否为普通窗户
   */
  static isOrdinaryWindow(content: HSCore.Model.ModelObject): boolean;

  /**
   * 计算局部坐标到父坐标的2D变换矩阵
   * @param transform - 包含位置和旋转信息的对象
   * @returns 3x3变换矩阵
   */
  static calcLocalToParentMatrix2d(transform: {
    x: number;
    y: number;
    ZRotation: number;
  }): Matrix3;

  /**
   * 判断是否为新版差异工具支持的窗户类型
   * @param content - 内容对象
   * @returns 是否为支持的窗户类型
   */
  static isNewDiffToolWindow(content: HSCore.Model.ModelObject): boolean;

  /**
   * 判断是否为新版差异工具支持的内容类型
   * 包括梁、柱、地漏、房间加热器、障碍物等
   * @param content - 内容对象
   * @returns 是否为支持的内容类型
   */
  static isNewDiffToolContent(content: HSCore.Model.Content): boolean;

  /**
   * 判断点是否在房间内
   * @param point - 待检测的点坐标
   * @param room - 房间对象
   * @returns 点是否在房间内（包括边界）
   */
  static isPointInRoom(
    point: { x: number; y: number },
    room: HSCore.Model.Room
  ): boolean;

  /**
   * 判断多个内容对象是否位于同一房间轮廓线上
   * @param contents - 内容对象数组
   * @param room - 房间对象
   * @returns 是否都在同一轮廓线上
   */
  static isContentsOnSameRoomOutline(
    contents: Array<{ bound: Bound; outline: Vector2[] }>,
    room: HSCore.Model.Room
  ): boolean;

  /**
   * 判断2D线段是否与结构体相交
   * @param line - 2D线段
   * @param structure - 结构对象
   * @returns 是否相交
   */
  static isLine2dCrossStructure(
    line: Line2d,
    structure: { worldRawPath2d: { outer: Line2d[]; holes: Line2d[][] } }
  ): boolean;

  /**
   * 获取场景中最底层的图层
   * @param content - 内容对象
   * @returns 最底层图层对象
   */
  static getBottomLayer(content: {
    scene: { rootLayer: Layer };
  }): Layer | null;
}

/**
 * 导出的差异工具类
 */
export { DiffToolUtil };

/**
 * 辅助类型定义
 */
interface Vector2 {
  x: number;
  y: number;
  vecRotate(angle: number): void;
  add(other: Vector2): void;
  static O(): Vector2;
}

interface Matrix3 {
  applyRotate(origin: Vector2, angle: number): void;
  applyTranslate(translation: { x: number; y: number }): void;
}

interface Line2d {
  constructor(start: Vector2, end: Vector2);
}

interface Loop {
  constructor(vertices: Line2d[]);
}

interface Polygon {
  constructor(loops: Loop[]);
}

interface Bound {
  isValid(): boolean;
}

interface Layer {
  prev: Layer | null;
}

declare namespace HSCore.Model {
  class ModelObject {
    x: number;
    y: number;
    z: number;
    XSize: number;
    YSize: number;
    ZSize: number;
    XRotation: number;
    YRotation: number;
    ZRotation: number;
    rotation: number;
    seekId: string;
    getHost(): Wall | null;
  }

  class CustomizedModel extends ModelObject {
    contentType: ContentType;
  }

  class Content extends ModelObject {
    contentType: ContentType;
  }

  class Wall extends ModelObject {
    width: number;
  }

  class Opening extends ModelObject {}

  class ParametricOpening extends ModelObject {
    relatedWalls: Wall[];
  }

  class Obstacle extends Content {}

  class Room {
    worldRawPath2d: {
      outer: Line2d[];
      holes: Line2d[][];
    };
  }
}

interface ContentType {
  isSame(other: ContentType): boolean;
  isTypeOf(typeName: string): boolean;
}