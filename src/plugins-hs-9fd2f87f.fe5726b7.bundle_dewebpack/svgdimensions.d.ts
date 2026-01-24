/**
 * SVG标注尺寸模块
 * 用于在平面图上绘制建筑物的内外部尺寸标注
 */

import { HSCore } from './hscore';
import { SvgBase } from './svg-base';
import { Line, Util } from './geometry-utils';

/**
 * 长度单位类型
 */
type LengthUnit = 'mm' | 'cm' | 'm' | 'km' | 'ft' | 'in';

/**
 * 长度单位转换系数映射表（相对于米）
 */
interface UnitConversionMap {
  ft: number;  // 英尺：0.3048
  in: number;  // 英寸：0.0254
  cm: number;  // 厘米：0.01
  m: number;   // 米：1
  km: number;  // 千米：1000
  mm: number;  // 毫米：0.001
}

/**
 * 二维坐标接口
 */
interface Coordinate {
  x: number;
  y: number;
}

/**
 * 标注样式配置
 */
interface DimensionStyle {
  /** 标注偏移量 */
  dimOffset: HSCore.Util.Math.Vec2;
  /** 文本偏移量 */
  textOffset: HSCore.Util.Math.Vec2;
  /** 延伸线起始偏移 */
  dimExtOffset1: HSCore.Util.Math.Vec2;
  /** 延伸线结束偏移 */
  dimExtOffset2: HSCore.Util.Math.Vec2;
  /** 是否为外部标注 */
  isExterior: boolean;
  /** 外部路径点集合 */
  outerPath?: Coordinate[];
  /** 标注类型（左/右/上/下） */
  type: DimensionSide;
}

/**
 * 标注方向枚举
 */
type DimensionSide = 'left' | 'bottom' | 'right' | 'top';

/**
 * 单侧标注数据结构
 */
interface DimensionSideData {
  /** 基准线 */
  baseLine?: Line;
  /** 第一级标注点 */
  first?: Coordinate[];
  /** 第二级标注点 */
  second?: Coordinate[];
  /** 第三级标注点 */
  third?: Coordinate[];
  /** 外轮廓路径 */
  outerPath?: Coordinate[];
}

/**
 * 外部标注数据集合
 */
interface ExteriorDimensionData {
  left: DimensionSideData;
  bottom: DimensionSideData;
  right: DimensionSideData;
  top: DimensionSideData;
}

/**
 * 分数解析结果
 */
interface FractionalParseResult {
  /** 英寸值 */
  inchValue: number | undefined;
  /** 是否为负数 */
  isNegative: boolean;
}

/**
 * 标注显示级别配置
 */
interface DimensionLevels {
  /** 显示第一级 */
  first: boolean;
  /** 显示第二级 */
  second: boolean;
  /** 显示第三级 */
  third: boolean;
}

/**
 * 标注阈值配置
 */
interface DimensionThreshold {
  /** 第一级阈值 */
  first: number;
  /** 第二级阈值 */
  second: number;
}

/**
 * 标注配置接口
 */
interface DimensionSettings {
  /** 显示级别配置 */
  showLevels: DimensionLevels;
  /** 基准偏移距离 */
  offsetBase: number;
  /** 级别间距 */
  levelSpan: number;
  /** 线条颜色 */
  lineColor?: string;
  /** 文本颜色 */
  textColor: string;
  /** 字体大小 */
  fontSize: number;
  /** 文本偏移量 */
  textOffset: number;
  /** 内侧延伸距离 */
  innerExtend: number;
  /** 外侧延伸距离 */
  outerExtend: number;
  /** 是否显示端点 */
  showEndPoint: boolean;
  /** 显示文本阈值 */
  showTextThreshold?: number;
  /** 尺寸阈值配置 */
  threshold: DimensionThreshold;
}

/**
 * 单个标注线段类
 * 表示平面图上的一条尺寸标注
 */
declare class DimensionSegment {
  /** 标注起点 */
  readonly start: HSCore.Util.Math.Vec2;
  
  /** 标注终点 */
  readonly end: HSCore.Util.Math.Vec2;
  
  /** 文本位置 */
  readonly textPosition: HSCore.Util.Math.Vec2;
  
  /** 文本额外偏移（用于拥挤区域） */
  textOffset: HSCore.Util.Math.Vec2 | undefined;
  
  /** 标注样式配置 */
  readonly style: DimensionStyle;
  
  /** 是否为该组标注的最后一条 */
  readonly isLast: boolean;

  /**
   * @param start - 起点坐标
   * @param end - 终点坐标
   * @param textPosition - 文本位置坐标
   * @param style - 样式配置
   * @param isLast - 是否为最后一条标注
   */
  constructor(
    start: Coordinate,
    end: Coordinate,
    textPosition: Coordinate,
    style: DimensionStyle,
    isLast: boolean
  );

  /**
   * 获取第一延伸线起点（加上起始偏移）
   */
  getDimExt1Start(): HSCore.Util.Math.Vec2;

  /**
   * 获取第一延伸线终点（加上起始偏移）
   */
  getDimExt1End(): HSCore.Util.Math.Vec2;

  /**
   * 获取第二延伸线起点（加上结束偏移）
   */
  getDimExt2Start(): HSCore.Util.Math.Vec2;

  /**
   * 获取第二延伸线终点（加上结束偏移）
   */
  getDimExt2End(): HSCore.Util.Math.Vec2;

  /**
   * 设置文本偏移量（用于避免文本重叠）
   * @param offset - 偏移向量
   */
  setTextOffset(offset: HSCore.Util.Math.Vec2): void;

  /**
   * 根据方向向量计算文本偏移方向
   * 用于确保文本始终朝向正确的方向显示
   * @param direction - 方向向量
   * @returns 标准化的文本偏移方向
   */
  static getTextOffsetDirection(direction: Coordinate): THREE.Vector2;
}

/**
 * SVG标注尺寸主类
 * 负责生成和绘制建筑平面图的所有尺寸标注
 */
export declare class SvgDimensions extends SvgBase {
  /** 外部标注集合（墙体外侧的三级标注） */
  private _outerDimensions: DimensionSegment[];
  
  /** 内部标注集合（房间内部标注） */
  private _internalDimensions: DimensionSegment[];
  
  /** 外部四个方向的标注数据 */
  private exteriorDimData: ExteriorDimensionData;
  
  /** 基准线集合 */
  private baseLines: Line[];
  
  /** 平面图对象引用 */
  private floorplan: unknown;
  
  /** SVG图层组 */
  private _group: unknown;
  
  /** 绘制边界框 */
  private drawBound: HSCore.Util.BrepBound | undefined;
  
  /** 内部路径集合 */
  private innerPaths: Coordinate[][] | undefined;
  
  /** 外部路径集合 */
  private outerPaths: Coordinate[][] | undefined;
  
  /** 内部边界框 */
  private innerBound: HSCore.Util.BrepBound | undefined;
  
  /** 外部边界框 */
  private outerBound: HSCore.Util.BrepBound | undefined;

  /**
   * @param context - 渲染上下文
   * @param layers - 图层管理器
   */
  constructor(context: unknown, layers: unknown);

  /**
   * 构建标注数据
   * 计算所有需要标注的线段和位置
   */
  build(): void;

  /**
   * 绘制所有标注到SVG
   * 包括标注线、延伸线、文本等
   */
  draw(): void;

  /**
   * 解析英制分数格式字符串
   * 支持格式：5' 3"、5' 3 1/2"、3/4" 等
   * @param input - 输入字符串
   * @returns 解析结果
   */
  handleFractional(input: string): FractionalParseResult;

  /**
   * 将数字转换为英制分数格式
   * @param value - 数值字符串
   * @returns 格式化的英制字符串（如 "5' 3''"）
   */
  ConvertNumberToFractional(value: string): string;

  /**
   * 单位转换并格式化为分数
   * @param value - 原始数值
   * @param fromUnit - 源单位
   * @param toUnit - 目标单位
   * @returns 转换后的分数格式字符串
   */
  ConvertUnitToFractional(
    value: string,
    fromUnit: LengthUnit,
    toUnit: LengthUnit
  ): string | number;

  /**
   * 获取外部标注集合
   */
  outerDimensions(): DimensionSegment[];

  /**
   * 获取内部标注集合
   */
  internalDimensions(): DimensionSegment[];

  /**
   * 创建所有类型的标注
   * 包括外部三级标注和内部标注
   */
  private createDimensions(): void;

  /**
   * 创建外部标注（墙体外侧）
   * 分为三级：整体尺寸、墙段尺寸、门窗尺寸
   */
  private _createExteriorDimensions(): void;

  /**
   * 计算第一级外部标注数据（整体轮廓）
   */
  private _computeExteriorFirstLevelDimensionData(): void;

  /**
   * 计算第二级外部标注数据（墙段划分）
   * @returns 各侧额外标注点集合
   */
  private _computeExteriorSecondLevelDimensionData(): Record<DimensionSide, Coordinate[]>;

  /**
   * 计算第三级外部标注数据（门窗洞口）
   * @param extraPoints - 第二级遗留的额外点
   */
  private _computeExteriorThirdLevelDimensionData(
    extraPoints: Record<DimensionSide, Coordinate[]>
  ): void;

  /**
   * 判断线段是否可以属于多个标注侧
   * @param line - 待判断线段
   * @param sidesMap - 各侧线段映射
   * @returns 可归属的侧名称数组
   */
  private _canBelongToSomeSides(
    line: Line,
    sidesMap: Map<DimensionSide, Line[]>
  ): DimensionSide[];

  /**
   * 查找线段应归属的外部标注侧
   * @param line - 线段对象
   * @returns 侧名称（left/right/top/bottom）
   */
  private _findExteriorDimensionSide(line: Line): DimensionSide | undefined;

  /**
   * 计算指定侧的标注偏移向量
   * @param side - 侧名称
   * @param distance - 偏移距离
   * @returns 偏移向量
   */
  private _computeExteriorDimOffset(
    side: DimensionSide,
    distance: number
  ): HSCore.Util.Math.Vec2;

  /**
   * 创建第一级外部标注
   * @param offsetDistance - 偏移距离
   */
  private _createExteriorFirstLevelDimensions(offsetDistance: number): void;

  /**
   * 创建第二级外部标注
   * @param offsetDistance - 偏移距离
   */
  private _createExteriorSecondLevelDimensions(offsetDistance: number): void;

  /**
   * 创建第三级外部标注
   * @param offsetDistance - 偏移距离
   */
  private _createExteriorThirdLevelDimensions(offsetDistance: number): void;

  /**
   * 通用标注创建方法
   * @param type - 标注类型标识
   * @param points - 标注点集合
   * @param style - 样式配置
   */
  private _createDimensions(
    type: string,
    points: Coordinate[],
    style: DimensionStyle
  ): void;

  /**
   * 创建单个标注线段
   * @param type - 标注类型
   * @param start - 起点
   * @param end - 终点
   * @param textPos - 文本位置
   * @param style - 样式配置
   * @param isLast - 是否为最后一条
   * @returns 创建的标注对象
   */
  private _createDimension(
    type: string,
    start: HSCore.Util.Math.Vec2,
    end: HSCore.Util.Math.Vec2,
    textPos: HSCore.Util.Math.Vec2,
    style: DimensionStyle,
    isLast: boolean
  ): DimensionSegment;

  /**
   * 从路径集合中提取最外侧线段
   * @param paths - 路径数组
   * @returns 最外侧线段数组
   */
  private _findOutmostLines(paths: Coordinate[][]): Line[];

  /**
   * 绘制标注线
   * @param start - 起点
   * @param end - 终点
   * @param style - 线条样式
   */
  private _drawLine(
    start: Coordinate,
    end: Coordinate,
    style: { color: string; width: number }
  ): void;

  /**
   * 绘制端点标记
   * @param position - 点位置
   * @param size - 点大小
   * @param color - 颜色
   */
  private _drawPoint(position: Coordinate, size: number, color: string): void;

  /**
   * 绘制标注文本
   * @param group - SVG组对象
   * @param text - 文本内容
   * @param start - 起点
   * @param end - 终点
   * @param fontSize - 字号
   * @param offset - 偏移量
   * @returns SVG文本元素
   */
  private _drawText(
    group: unknown,
    text: string,
    start: Coordinate,
    end: Coordinate,
    fontSize: number,
    offset: number
  ): unknown;

  /**
   * 将DWG长度转换为模型长度
   * @param dwgLength - DWG单位长度
   * @returns 模型单位长度
   */
  private _getModelLength(dwgLength: number): number;
}