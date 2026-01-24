/**
 * 内容提取器模块
 * 用于从场景中提取和处理3D内容对象的几何信息
 */

import type { Loop, Box3, Box2, Vector3, Vector2, Line2d } from './geometry-types';
import type { Content, ContentType } from './content-types';
import type { Extractor } from './extractor-types';

/**
 * 内容信息接口
 * 描述单个内容对象的完整信息
 */
export interface ContentInfo {
  /** 内容唯一标识符 */
  id: string;
  /** 内容类型字符串 */
  contentType: string;
  /** 分类ID列表 */
  categoryIds: string[];
  /** 查找ID */
  seekId: string;
  /** 产品样式 */
  style: string;
  /** 实体ID */
  entityId: string;
  /** 内容名称 */
  name: string;
  /** 归一化后的位置坐标 */
  position: { x: number; y: number; z: number };
  /** 缩放比例 */
  scale: { x: number; y: number; z: number };
  /** 旋转角度 */
  rotation: { x: number; y: number; z: number };
  /** 尺寸大小 */
  size: { x: number; y: number; z: number };
  /** 3D包围盒 */
  box3: Box3;
  /** 2D包围盒 */
  box2: Box2;
}

/**
 * 凹包信息接口
 * 描述内容对象的凹包轮廓
 */
export interface ConcaveHullInfo {
  /** 凹包轮廓线段数组 */
  hullLines: Line2d[];
  /** 凹包顶点数组 */
  hullPoints: Vector2[];
}

/**
 * 提取结果接口
 * 包含所有提取的内容信息和几何数据
 */
export interface ExtractionResult {
  /** 所有内容对象的详细信息 */
  contents: ContentInfo[];
  /** 所有内容的3D总包围盒 */
  contentsBox3D: Box3;
  /** 每个内容的3D包围盒数组 */
  content3dBoxes: Box3[];
  /** 所有内容的2D总包围盒 */
  contentsBox2D: Box2;
  /** 每个内容的2D包围盒数组 */
  content2dBoxes: Box2[];
  /** 所有2D包围盒的角点坐标 */
  content2dBoxesPoints: Vector2[];
  /** 内容的凹包轮廓信息 */
  contentsConcaveHull: ConcaveHullInfo;
}

/**
 * 内容提取器类
 * 负责从场景中提取内容对象并计算其几何属性
 * 
 * @extends Extractor
 */
export declare class ContentsExtractor extends Extractor {
  /** 2D平移向量 */
  translate2D: Vector2;
  
  /** 所有内容对象（包括参数化内容） */
  allContents: Content[];
  
  /** 非参数化内容对象 */
  contents: Content[];
  
  /** 凹包凹度参数 */
  private _hullConcavity: number;
  
  /** 内容的3D包围盒数组 */
  private _box3ds?: Box3[];
  
  /** 内容的2D包围盒数组 */
  private _box2ds?: Box2[];
  
  /** 所有内容的总3D包围盒 */
  private _box3d?: Box3;

  /**
   * 构造函数
   * 
   * @param content - 要提取的内容对象
   * @param mode - 提取模式，默认为 "centroid"（质心模式）
   * @param loopPoints - 可选的循环路径点数组，用于计算2D平移
   */
  constructor(content: Content, mode?: string, loopPoints?: Vector2[]);

  /**
   * 设置2D平移向量
   * 
   * @param translate - 新的2D平移向量
   */
  setTranslate2d(translate: Vector2): void;

  /**
   * 获取单个内容对象的详细信息
   * 
   * @param content - 内容对象
   * @returns 内容信息对象
   * @private
   */
  private _getContentInfo(content: Content): ContentInfo;

  /**
   * 计算2D平移向量
   * 
   * @param loop - 循环路径
   * @returns 2D平移向量
   * @private
   */
  private _getTranslate2D(loop: Loop): Vector2;

  /**
   * 获取所有内容的3D总包围盒
   * 
   * @returns 3D包围盒
   */
  getContentsBox3d(): Box3;

  /**
   * 获取所有内容的2D总包围盒
   * 
   * @returns 2D包围盒
   */
  getContentsBox2d(): Box2;

  /**
   * 计算内容对象的凹包轮廓
   * 使用凹包算法生成包围所有内容的最小凹多边形
   * 
   * @returns 包含凹包顶点和线段的对象
   */
  getContentsConcaveHull(): ConcaveHullInfo;

  /**
   * 获取所有内容的3D包围盒数组
   * 
   * @returns 3D包围盒数组
   */
  getContent3dBoxes(): Box3[];

  /**
   * 获取所有内容的2D包围盒数组
   * 
   * @returns 2D包围盒数组
   */
  getContent2dBoxes(): Box2[];

  /**
   * 检查是否包含参数化模型
   * 
   * @returns 如果包含参数化内容则返回 true
   */
  hasParametricModel(): boolean;

  /**
   * 执行提取操作
   * 提取所有内容信息和几何数据
   * 
   * @returns 提取结果对象
   */
  extract(): ExtractionResult;
}