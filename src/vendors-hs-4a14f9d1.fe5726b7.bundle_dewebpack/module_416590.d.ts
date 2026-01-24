/**
 * 参数化窗SDK类型定义
 * @module PmWindowSDK
 */

/** 窗部件标签常量 */
export const TAG_WINDOW_PART = "wd_part";

/** 墙标签常量 */
export const WINDOW_PART_TAG_WALL = "w";

/** 默认窗部件ID标签 */
export const WINDOW_PART_TAG_STONE = "defaultWinPartIds";

/** 2D视图标签常量 */
export const WINDOW_PART_TAG_2DVIEW = "p";

/** 默认窗部件UUID列表 */
export const defaultWinPartIds: readonly string[];

/**
 * 挤出参数接口（用于布尔运算）
 */
export interface IExtrudeParamForBoolean {
  /** 挤出参数的唯一标识 */
  id: string;
  /** 挤出面（平面坐标系） */
  surface: any; // math.Plane
  /** 挤出路径 */
  path: {
    /** 外轮廓曲线数组 */
    outer: any[]; // Curve2d[]
    /** 孔洞曲线数组 */
    holes?: any[][]; // Curve2d[][]
  };
  /** 起始偏移距离 */
  start: number;
  /** 结束偏移距离 */
  end: number;
}

/**
 * 窗数据接口
 */
export interface IPmWindowData {
  /** 数据模型 */
  dataModel: {
    /** BREP壳体数据 */
    brepShells: any[];
    /** 差集操作数据 */
    diff: IExtrudeParamForBoolean[][];
    /** SVG信息 */
    svgInfo: {
      /** 合并后的环路 */
      loop: any; // Polygon[]
      /** 墙体环路数组 */
      walls: any[]; // Loop[]
    };
    /** 并集操作数据 */
    union: IExtrudeParamForBoolean[];
    /** 子部件列表 */
    childrenParts: IChildPartData[];
    /** 内容列表 */
    contents: any[];
    /** 线条装饰数据 */
    moldings: any[];
  };
  /** 2D视图数据（可选） */
  view2d?: I2DViewItem[];
  /** 元数据 */
  meta: {
    /** X方向长度 */
    xLength: number;
    /** Y方向长度 */
    yLength: number;
    /** Z方向高度 */
    zLength: number;
  };
  /** 属性面板数据 */
  propertyPanelData: any;
  /** 尺寸标注配置（可选） */
  demension?: any;
  /** 默认墙体路径（可选） */
  defaultWallPath?: any; // Polygon
}

/**
 * 子部件数据接口
 */
export interface IChildPartData {
  /** 元素ID */
  eId: number;
  /** SeekID（产品库ID） */
  seekId: string;
  /** 自定义参数 */
  params: Record<string, number | string>;
  /** 是否可见 */
  visible: boolean;
  /** 变换矩阵 */
  matrix: any; // Matrix4
  /** 3D路径 */
  path3d: any[]; // Curve3d[]
  /** 2D路径（带宽度） */
  path: Array<{
    /** 曲线 */
    cv: any; // Curve3d
    /** 宽度 */
    w: number;
  }>;
}

/**
 * 2D视图项接口
 */
export interface I2DViewItem {
  /** 几何数据（单个曲线或曲线数组） */
  geo: any | any[]; // Curve2d | Polygon[]
  /** 样式配置 */
  style: {
    /** Z索引（可选） */
    zIdx?: number;
    [key: string]: any;
  };
}

/**
 * 打开文档选项
 */
export interface IOpenDocumentOptions {
  /** 单位缩放比例，默认0.001 */
  unitScale?: number;
  /** 墙体参数（可选） */
  wallParams?: Record<string, any>;
}

/**
 * 获取窗数据选项
 */
export interface IGetWindowDataOptions {
  /** 是否使用默认值 */
  useDefaultValue?: boolean;
  /** 是否为旧文件 */
  isOldFile?: boolean;
  /** 是否为子部件 */
  isSubPart?: boolean;
  /** 是否计算握柄 */
  calcGrip?: boolean;
}

/**
 * 差集与并集操作结果
 */
export interface IDiffUnionResult {
  /** 差集数据 */
  diff: IExtrudeParamForBoolean[][];
  /** 并集数据 */
  union: IExtrudeParamForBoolean[];
}

/**
 * 石材与修补墙体结果
 */
export interface IStonesAndPatchedWallsResult {
  /** 石材多边形数组 */
  stones: any[]; // Polygon[]
  /** 修补墙体多边形数组 */
  patchedWalls: any[]; // Polygon[]
}

/**
 * 获取子部件列表
 * @param doc - 文档对象
 * @param unitScale - 单位缩放比例
 * @param isOldFile - 是否为旧文件格式
 * @returns 子部件数据数组
 */
export function getChildrenParts(
  doc: any,
  unitScale: number,
  isOldFile?: boolean
): IChildPartData[];

/**
 * 通过窗SDK编辑参数
 * @param doc - 文档对象
 * @param params - 参数键值对
 * @param useDefaultValue - 是否使用默认值
 * @returns 是否成功
 */
export function editParamsByWinSDK(
  doc: any,
  params: Record<string, any>,
  useDefaultValue: boolean
): boolean;

/**
 * 获取差集与并集数据
 * @param doc - 文档对象
 * @param docId - 文档ID
 * @param unitScale - 单位缩放比例
 * @param offsetDistance - 偏移距离（可选）
 * @returns 差集与并集操作结果
 */
export function getDiffUnion(
  doc: any,
  docId: string,
  unitScale: number,
  offsetDistance?: number
): IDiffUnionResult;

/**
 * 获取石材与修补墙体数据
 * @param doc - 文档对象
 * @returns 石材与修补墙体结果
 */
export function getStonesAndPatchedWalls(doc: any): IStonesAndPatchedWallsResult;

/**
 * 参数化窗SDK主类
 */
export class PmWindowSDK {
  /** SDK版本号 */
  static readonly version: string;

  /**
   * 参数变化回调函数
   * @param docId - 文档ID
   * @param paramName - 参数名称
   * @param paramValue - 参数值
   * @returns 是否应用变更
   */
  static onParamsChangedCallback: (
    docId: string,
    paramName: string,
    paramValue: any
  ) => boolean;

  /**
   * 解析子部件SeekID列表
   * @param fileData - 压缩文件数据
   * @returns SeekID数组
   */
  static parseSubpartSeekIds(fileData: ArrayBuffer | Uint8Array): string[];

  /**
   * 打开参数化窗文档
   * @param docId - 文档唯一标识
   * @param docData - 文档数据
   * @param instanceId - 实例ID
   * @param options - 打开选项
   * @returns 文档ID，失败返回undefined
   */
  static openDocument(
    docId: string,
    docData: any,
    instanceId: string,
    options?: IOpenDocumentOptions
  ): string | undefined;

  /**
   * 关闭文档
   * @param docId - 文档ID
   * @param instanceId - 实例ID
   * @returns 是否成功关闭
   */
  static closeDocument(docId: string, instanceId: string): boolean;

  /**
   * 获取窗数据
   * @param docIdOrDoc - 文档ID或文档对象
   * @param instanceId - 实例ID
   * @param params - 自定义参数（可选）
   * @param includeDefaultWallPath - 是否包含默认墙体路径，默认false
   * @param wallOffsetDistance - 墙体偏移距离，默认0
   * @param options - 获取选项
   * @returns 窗数据对象，失败返回undefined
   */
  static getWindowData(
    docIdOrDoc: string | any,
    instanceId: string,
    params?: Record<string, any>,
    includeDefaultWallPath?: boolean,
    wallOffsetDistance?: number,
    options?: IGetWindowDataOptions
  ): IPmWindowData | undefined;
}

/**
 * 数据库窗子部件类
 */
export class DBWinSubPart {
  // 具体实现参见原模块
}

/**
 * 窗子部件类
 */
export class WinSubPart {
  // 具体实现参见原模块
}

/**
 * 属性面板窗子部件类型枚举
 */
export enum EN_PROPERTY_PANEL_WIN_SUB_PART_TYPE {
  // 枚举值参见原模块
}

/**
 * 文件工具类
 */
export class FileUtil {
  // 具体实现参见原模块
}