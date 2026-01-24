/**
 * 分区宽度类型枚举
 * 定义分区宽度的计算方式
 */
export enum PartitionWidth {
  /** 按比例分配宽度 */
  Ratio = "Ratio",
  /** 按固定数值分配宽度 */
  Figure = "Figure"
}

/**
 * 窗格配置接口
 * 描述单个窗格的宽度类型和数值
 */
interface SashConfig {
  /** 宽度类型：比例或固定值 */
  widthType: PartitionWidth;
  /** 宽度数值 */
  widthValue: number;
  /** 是否为次要窗格（共享主窗格的多边形） */
  isSecondary?: boolean;
}

/**
 * 分割器配置接口
 * 包含多轨道、多列的窗格配置矩阵
 */
interface SplitterConfig {
  /** 窗格配置二维数组 [轨道索引][列索引] */
  sashes: (SashConfig | undefined)[][];
}

/**
 * 内部窗格数据接口
 * 用于内部计算的简化数据结构
 */
interface InternalSashData {
  /** 轨道索引 */
  trackIdx: number;
  /** 列索引 */
  columnIdx: number;
  /** 宽度类型 */
  widthType: PartitionWidth;
  /** 宽度数值 */
  widthValue: number;
}

/**
 * 内部分割器数据接口
 */
interface InternalSplitterData {
  /** 轨道总数 */
  tracksCount: number;
  /** 窗格数据数组 */
  sashes: InternalSashData[];
}

/**
 * 分区结果接口
 * 表示分区后的多边形及其属性
 */
interface PartitionResult {
  /** 分区多边形 */
  polygon: WinPolygon;
  /** 是否为次要分区 */
  isSecondary: boolean;
}

/**
 * 点接口（假设从依赖模块导入）
 */
interface Point {
  x: number;
  y: number;
  equalTo(other: Point): boolean;
}

/**
 * 向量接口（假设从依赖模块导入）
 */
interface Vector {
  x: number;
  y: number;
}

/**
 * 线接口（假设从依赖模块导入）
 */
interface Line {
  start: Point;
  end: Point;
  middle(): Point;
}

/**
 * 边界框接口
 */
interface BoundingBox {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
}

/**
 * 边接口
 */
interface Edge {
  start: Point;
  end: Point;
  middle(): Point;
  equalTo(other: Edge): boolean;
}

/**
 * 多边形接口（假设从依赖模块导入）
 */
interface WinPolygon {
  /** 多边形的边界框 */
  box: BoundingBox;
  /** 多边形的边集合 */
  edges: Edge[];
}

/**
 * 几何工具类型定义（假设从依赖模块导入）
 */
interface GeometryUtils {
  point(x: number, y: number): Point;
  vector(x: number, y: number): Vector;
  line(point: Point, direction: Vector): Line;
}

/**
 * 分区工具类型定义（假设从依赖模块导入）
 */
declare class Partition {
  constructor(polygon: WinPolygon);
  runByLines(lines: Line[][]): Array<{
    edges: Edge[];
    [key: string]: unknown;
  }>;
}

/**
 * 重叠分区类
 * 用于将多边形按指定重叠量分割成多个子区域
 * 支持滑动窗格式的多轨道分区
 */
export declare class PartitionOverlap {
  /** 要分区的多边形 */
  private readonly polygon: WinPolygon;

  /**
   * 构造函数
   * @param polygon - 要进行分区的多边形
   */
  constructor(polygon: WinPolygon);

  /**
   * 按滑动组件方式分区
   * @param splitter - 分割器配置
   * @param overlap - 重叠量（必须大于0）
   * @param isHorizontal - 是否水平分区，默认true（水平），false为垂直
   * @returns 分区结果的二维数组 [轨道索引][列索引]
   * @throws 当overlap小于0时抛出错误
   */
  partitionSlideBySlideComp(
    splitter: SplitterConfig,
    overlap?: number,
    isHorizontal?: boolean
  ): (PartitionResult | undefined)[][];

  /**
   * 验证分割器配置的有效性
   * @param sashes - 窗格配置二维数组
   * @throws 当配置无效时抛出错误：
   *   - 长度为0
   *   - 行长度不一致
   *   - 每列不是恰好有一个主窗格（isSecondary=false）
   */
  private validateSplitter(sashes: (SashConfig | undefined)[][]): void;

  /**
   * 将分割器配置解析为分割线数组
   * @param internalData - 内部分割器数据
   * @param overlap - 重叠量
   * @param minCoord - 最小坐标值
   * @param maxCoord - 最大坐标值
   * @param isHorizontal - 是否水平方向
   * @returns 分割线的二维数组
   * @throws 当窗格数量不足或尺寸不支持时抛出错误
   */
  private parseSpliterToLines(
    internalData: InternalSplitterData,
    overlap: number,
    minCoord: number,
    maxCoord: number,
    isHorizontal?: boolean
  ): Line[][];

  /**
   * 构建点对象
   * @param primary - 主坐标值
   * @param secondary - 次坐标值
   * @param isHorizontal - 是否水平方向（true: primary=x, false: primary=y）
   * @returns 点对象
   */
  private buildPoint(primary: number, secondary: number, isHorizontal?: boolean): Point;

  /**
   * 执行分区操作
   * @param splitter - 分割器配置
   * @param overlap - 重叠量
   * @param minCoord - 最小坐标值
   * @param maxCoord - 最大坐标值
   * @param isHorizontal - 是否水平方向
   * @returns 分区结果的二维数组
   */
  private partition(
    splitter: SplitterConfig,
    overlap: number,
    minCoord: number,
    maxCoord: number,
    isHorizontal?: boolean
  ): (PartitionResult | undefined)[][];

  /**
   * 查找指定列的主窗格所在的轨道索引
   * @param sashes - 窗格配置二维数组
   * @param columnIndex - 列索引
   * @returns 主窗格的轨道索引
   * @throws 当未找到主窗格时抛出错误
   */
  private findSecondary(sashes: (SashConfig | undefined)[][], columnIndex: number): number;

  /**
   * 将外部配置解析为内部数据结构
   * @param splitter - 分割器配置
   * @returns 内部分割器数据
   */
  private parseToInternalData(splitter: SplitterConfig): InternalSplitterData;
}