/**
 * DXF文件解析和处理模块
 * 提供DXF文件的缓存、读取、解析和几何数据分析功能
 */

import Point from './Point'; // 假设从模块19导入
import DxfParser from './DxfParser'; // 假设从模块164导入
import GeometryUtils from './GeometryUtils'; // 假设从模块16导入
import Config from './Config'; // 假设从模块8导入

/**
 * DXF实体类型 - POLYLINE（多段线）
 */
export declare class ClassEntityPOLYLINE {
  // 占位类，用于标识POLYLINE实体类型
}

/**
 * DXF文件缓存项
 * 用于缓存已解析的DXF文件数据，避免重复解析
 */
export declare class DXFCacheItem {
  /** DXF文件路径 */
  readonly filePath: string;
  
  /** 解析后的DXF文件数据 */
  readonly fileData: unknown;

  /**
   * 构造DXF缓存项
   * @param filePath - DXF文件路径
   * @param fileData - 解析后的DXF数据对象
   */
  constructor(filePath: string, fileData: unknown);
}

/**
 * 点坐标接口
 */
export interface IPoint {
  x: number;
  y: number;
}

/**
 * DXF解析数据类
 * 存储解析后的各类图层几何数据（轮廓、孔、焊盘等）
 */
export declare class DxfClass {
  /** 轮廓线（LXC层） */
  lxcs: IPoint[][];
  
  /** 轮廓线A区域（LXC-A层） */
  lxc_as: IPoint[][];
  
  /** 轮廓线孔洞（LXC-Hole层） */
  lxc_hs: IPoint[][];
  
  /** 内层轮廓线（LXCIN层） */
  lxc_ins: IPoint[][];
  
  /** 内层1 A区域（LXCIN-1-A层） */
  lxc_in1as: IPoint[][];
  
  /** 内层1 孔洞（LXCIN-1-Hole层） */
  lxc_in1hs: IPoint[][];
  
  /** 内层2 A区域（LXCIN-2-A层） */
  lxc_in2as: IPoint[][];
  
  /** 内层2 孔洞（LXCIN-2-Hole层） */
  lxc_in2hs: IPoint[][];
  
  /** 外层轮廓线（LXCOUT层） */
  lxc_outs: IPoint[][];
  
  /** 外层1 A区域（LXCOUT-1-A层） */
  lxc_out1as: IPoint[][];
  
  /** 外层1 孔洞（LXCOUT-1-Hole层） */
  lxc_out1hs: IPoint[][];
  
  /** 外层2 A区域（LXCOUT-2-A层） */
  lxc_out2as: IPoint[][];
  
  /** 外层2 孔洞（LXCOUT-2-Hole层） */
  lxc_out2hs: IPoint[][];
  
  /** 焊盘（JT层） */
  jts: IPoint[][];
  
  /** 过孔（GD层） */
  gds: IPoint[][];
  
  /** 孔口（KK层） */
  kks: IPoint[][];
  
  /** 边界框最小X坐标（毫米） */
  minX_mm: number;
  
  /** 边界框最小Y坐标（毫米） */
  minY_mm: number;
  
  /** 边界框最大X坐标（毫米） */
  maxX_mm: number;
  
  /** 边界框最大Y坐标（毫米） */
  maxY_mm: number;

  constructor();

  /**
   * 分析所有几何数据，计算边界框
   * 遍历所有点集合，更新minX_mm、minY_mm、maxX_mm、maxY_mm
   */
  Analysis(): void;
}

/**
 * CAD多边形类
 * 支持带凸度（bulge）的多段线，可表示圆弧
 */
export declare class CADPolygon {
  /** 多边形顶点列表 */
  pts: IPoint[];
  
  /** 凸度数组，对应每个顶点的圆弧弯曲程度（0表示直线） */
  bulges: number[];

  constructor();

  /**
   * 获取多边形顺时针状态
   * @returns 如果顶点顺序为顺时针返回true，否则返回false
   */
  GetCWStatus(): boolean;

  /**
   * 规范化多边形的顺时针状态
   * @param isCW - 期望的顺时针状态（默认true）
   * 如果当前状态与期望不符，则反转顶点顺序和凸度符号
   */
  NormalCWStatus(isCW?: boolean): void;
}

/**
 * DXF数据类（简化版）- 用于快捷键布局（KJL）
 * 仅包含核心几何数据和边界框信息
 */
export declare class DxfClass_KJL {
  /** 轮廓线 */
  lxcs: CADPolygon[];
  
  /** 内层轮廓线 */
  lxc_ins: CADPolygon[];
  
  /** 外层轮廓线 */
  lxc_outs: CADPolygon[];
  
  /** 焊盘 */
  jts: CADPolygon[];
  
  /** 过孔 */
  gds: CADPolygon[];
  
  /** 边界框最小X坐标（毫米） */
  minX_mm: number;
  
  /** 边界框最小Y坐标（毫米） */
  minY_mm: number;
  
  /** 边界框最大X坐标（毫米） */
  maxX_mm: number;
  
  /** 边界框最大Y坐标（毫米） */
  maxY_mm: number;

  constructor();
}

/**
 * DXF数据类版本1
 * 扩展版本，支持带凸度的多边形和孔口数据
 */
export declare class DxfClass1 {
  /** 轮廓线 */
  lxcs: CADPolygon[];
  
  /** 内层轮廓线 */
  lxc_ins: CADPolygon[];
  
  /** 外层轮廓线 */
  lxc_outs: CADPolygon[];
  
  /** 焊盘 */
  jts: CADPolygon[];
  
  /** 过孔 */
  gds: CADPolygon[];
  
  /** 孔口 */
  kks: CADPolygon[];
  
  /** 边界框最小X坐标（毫米） */
  minX_mm: number;
  
  /** 边界框最小Y坐标（毫米） */
  minY_mm: number;
  
  /** 边界框最大X坐标（毫米） */
  maxX_mm: number;
  
  /** 边界框最大Y坐标（毫米） */
  maxY_mm: number;

  constructor();
}

/**
 * DXF扩展工具类
 * 提供DXF文件的服务端初始化、读取、解析和分析功能
 */
export declare class DXFExtension {
  /** DXF文件缓存数组 */
  private static cacheDXF?: DXFCacheItem[];

  /**
   * 服务端初始化DXF数据
   * 解析DXF字符串并缓存到内存中
   * @param filePath - DXF文件路径（用作缓存键）
   * @param dxfContent - DXF文件内容字符串
   */
  static ServerInitDXF(filePath: string, dxfContent: string): void;

  /**
   * 读取DXF文件
   * 优先从缓存读取，未命中则通过fetch获取并解析
   * @param filePath - DXF文件路径URL
   * @returns 解析后的DXF数据对象
   * @throws 当网络请求失败或解析失败时抛出"Fail"
   */
  static ReadDXF(filePath: string): Promise<unknown>;

  /**
   * 读取并分析DXF文件（标准版本）
   * 解析DXF文件并按图层分类几何数据，支持简化模式和LOD回退
   * @param filePath - DXF文件路径URL（支持_arc.dxf和_lod2.dxf后缀回退）
   * @param closePath - 是否闭合路径（默认false），为true时自动添加首点到末尾
   * @returns 包含所有图层几何数据和边界框的DxfClass对象
   * @throws 当文件读取或解析失败时抛出"Fail"
   */
  static ReadAnalysisDXF(filePath: string, closePath?: boolean): Promise<DxfClass>;

  /**
   * 读取并分析DXF文件（版本1）
   * 支持带凸度的多边形，规范化为逆时针顺序
   * @param filePath - DXF文件路径URL（支持_arc.dxf和_lod2.dxf后缀回退）
   * @returns 包含CADPolygon数组的DxfClass1对象
   * @throws 当文件读取或解析失败时抛出"Fail"
   */
  static ReadAnalysisDXF1(filePath: string): Promise<DxfClass1>;

  /**
   * 读取并分析DXF文件（快捷键布局版本）
   * 专用于KJL场景，支持更灵活的图层名称匹配
   * @param filePath - DXF文件路径URL
   * @returns 包含CADPolygon数组的DxfClass_KJL对象
   * @throws 当文件读取或解析失败时抛出错误信息字符串
   */
  static ReadAnalysisDXF_KJL(filePath: string): Promise<DxfClass_KJL>;
}