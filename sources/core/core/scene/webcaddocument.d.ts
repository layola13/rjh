/**
 * WebCAD文档类型定义
 * 用于处理CAD文档的路径、成型和拉伸操作
 */

import * as THREE from 'three';

/**
 * 计算选项配置
 */
export interface ComputeOptions {
  /** 是否在快速计算模式下执行 */
  isDuringFastComputation?: boolean;
}

/**
 * 路径数据类型
 * 可能包含Vector2、Vector3或Plane等THREE.js对象
 */
export type PathData = any; // 需要根据实际WebCADModelAPI定义具体类型

/**
 * 拉伸体配置
 */
export interface ExtrudedBodyConfig {
  /** 路径数据 */
  pathData: PathData;
  /** 拉伸值 */
  value: number;
}

/**
 * 成型配置元组
 * [路径数组, 配置数组, 参数1, 标志位1, 标志位2, 布尔标志]
 */
export type MoldingConfig = [
  paths: any[],
  configs: any[],
  param: any,
  flag1: number,
  flag2: number,
  boolFlag: boolean
];

/**
 * 文档JSON数据结构
 */
export interface DocumentJSON {
  /** 是否在快速计算模式下 */
  isDuringFastComputation?: boolean;
  [key: string]: any;
}

/**
 * 图形数据结构
 */
export interface GraphicsData {
  /** 面数据数组 */
  faces: any[];
  [key: string]: any;
}

/**
 * 材质数据接口（来自HSCore.Material）
 */
export interface MaterialData {
  /** 转换为JSON格式 */
  toJson(): any;
}

/**
 * WebCAD文档类
 * 提供CAD文档的创建、编辑和计算功能
 */
export declare class WebCadDocument {
  /**
   * 路径列表
   * @private
   */
  private _paths: PathData[];

  /**
   * 成型配置映射表
   * @private
   */
  private _moldings: Map<string, MoldingConfig>;

  /**
   * 拉伸体列表
   */
  extrudedBodies: ExtrudedBodyConfig[];

  /**
   * 脏标记，表示是否需要重新计算
   */
  dirty: boolean;

  /**
   * 文档JSON数据
   * @private
   */
  private _documentJSON: DocumentJSON;

  /**
   * 网格数据缓存
   * @private
   */
  private _meshes: any[];

  /**
   * 构造函数
   * @param documentJSON - 可选的初始文档JSON数据
   */
  constructor(documentJSON?: DocumentJSON);

  /**
   * 添加单个路径
   * @param path - 路径数据
   * @returns 当前文档实例（支持链式调用）
   */
  addPath(path: PathData): this;

  /**
   * 批量添加路径
   * @param paths - 路径数据数组
   * @returns 当前文档实例（支持链式调用）
   */
  addPaths(paths: PathData[]): this;

  /**
   * 获取偏移路径
   * @param pathId - 路径标识
   * @param offset - 偏移量
   * @returns 偏移后的路径数据
   */
  getOffsetPath(pathId: any, offset: number): PathData;

  /**
   * 添加成型配置
   * @param key - 成型唯一标识
   * @param paths - 路径数组
   * @param configs - 配置数组
   * @param param - 参数
   * @param flag1 - 标志位1（默认0）
   * @param flag2 - 标志位2（默认0）
   * @param boolFlag - 布尔标志（默认true）
   * @returns 当前文档实例（支持链式调用）
   */
  addMolding(
    key: string,
    paths: any[],
    configs: any[],
    param: any,
    flag1?: number,
    flag2?: number,
    boolFlag?: boolean
  ): this;

  /**
   * 异步计算文档图形数据
   * @param options - 计算选项
   * @returns Promise，解析为网格数据数组
   */
  computeAsync(options?: ComputeOptions): Promise<any[]>;

  /**
   * 同步计算文档图形数据
   * @param options - 计算选项
   */
  compute(options?: ComputeOptions): void;

  /**
   * 添加拉伸体
   * @param pathData - 路径数据
   * @param value - 拉伸值
   * @returns 当前文档实例（支持链式调用）
   */
  addExtrudedBody(pathData: PathData, value: number): this;

  /**
   * 设置地板计划材质数据
   * @param materialMap - 材质映射表（键为ID，值为MaterialData或JSON）
   * @returns 更新后的文档JSON
   */
  setFPMaterialData(materialMap: Map<string | number, MaterialData | any>): DocumentJSON;

  /**
   * 设置捕捉平面
   * @param planes - 平面数据
   * @returns 更新后的文档JSON
   */
  setSnappingPlanes(planes: any): DocumentJSON;

  /**
   * 创建捕捉OBJ数据
   * @returns 捕捉对象数据
   */
  createSnappingOBJ(): any;

  /**
   * 获取图形数据（同步）
   * @param options - 计算选项
   * @returns 网格数据数组
   */
  getGraphicsData(options?: ComputeOptions): any[];

  /**
   * 获取图形数据（异步，带降级处理）
   * @param options - 计算选项
   * @returns Promise，解析为网格数据数组
   */
  getGraphicsDataAsync(options?: ComputeOptions): Promise<any[]>;

  /**
   * 获取文档JSON数据
   * @returns 文档JSON对象
   */
  getDocumentJSON(): DocumentJSON;
}

/**
 * 全局WebCADModelAPI声明（假设为外部依赖）
 */
declare global {
  const WebCADModelAPI: {
    getGraphicsData(doc: DocumentJSON, arg?: any, options?: ComputeOptions): GraphicsData;
    getGraphicsDataAsync(doc: DocumentJSON, arg?: any, options?: ComputeOptions): Promise<GraphicsData>;
    offsetPath(doc: DocumentJSON, pathId: any, offset: number): PathData;
    addPaths(doc: DocumentJSON, paths: PathData[]): DocumentJSON;
    addPathsAsync(doc: DocumentJSON, paths: PathData[]): Promise<DocumentJSON>;
    extrudePath(doc: DocumentJSON, pathData: PathData, value: number): DocumentJSON;
    extrudePathAsync(doc: DocumentJSON, pathData: PathData, value: number): Promise<DocumentJSON>;
    addMolding(
      doc: DocumentJSON,
      path: any,
      config: any,
      param: any,
      flag1: boolean,
      flag2: boolean,
      boolFlag: boolean
    ): DocumentJSON;
    addMoldingAsync(
      doc: DocumentJSON,
      path: any,
      config: any,
      param: any,
      flag1: boolean,
      flag2: boolean,
      boolFlag: boolean
    ): Promise<DocumentJSON>;
    setFPMaterialData(doc: DocumentJSON, materialMap: Map<string | number, any>): DocumentJSON;
    setSnappingPlanes(doc: DocumentJSON, planes: any): DocumentJSON;
    createSnappingOBJ(doc: DocumentJSON): any;
  };

  namespace HSCore {
    namespace Material {
      interface MaterialData {
        toJson(): any;
      }
    }
  }
}

export {};