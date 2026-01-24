/**
 * 2D草图和自定义特征模型的请求类型常量定义
 * @module Sketch2DRequestTypes
 */

/**
 * 2D草图操作请求类型
 */
export interface Sketch2dRequests {
  /** 绘制线条 */
  DrawLines: string;
  /** 绘制矩形 */
  DrawRectangle: string;
  /** 绘制正多边形 */
  DrawRegularPolygon: string;
  /** 绘制圆形 */
  DrawCircle: string;
  /** 删除点 */
  DeletePoint: string;
  /** 删除曲线 */
  DeleteCurve: string;
  /** 删除面 */
  DeleteFace: string;
  /** 移动点 */
  MovePoint: string;
  /** 移动曲线 */
  MoveCurve: string;
  /** 移动面 */
  MoveFaces: string;
  /** 修改圆形半径 */
  ChangeCircleRadius: string;
  /** 修改圆弧矢高 */
  ChangeArcSagitta: string;
  /** 将线条转换为圆弧 */
  ConvertLineToArc: string;
  /** 清除全部 */
  ClearAll: string;
  /** 复制面 */
  CopyFaces: string;
  /** 偏移路径 */
  OffsetPath: string;
  /** 绘制圆角 */
  DrawFillet: string;
  /** 阵列 */
  Array: string;
  /** 轴向阵列 */
  AxialArray: string;
  /** 线性阵列 */
  LinearArray: string;
  /** 添加引导线 */
  AddGuideLine: string;
  /** 删除引导线 */
  DeleteGuideLine: string;
}

/**
 * 特殊2D草图操作请求类型
 */
export interface ExtraordinarySketch2dRequests {
  /** 绘制线条 */
  DrawLines: string;
  /** 绘制矩形 */
  DrawRectangle: string;
  /** 绘制圆形 */
  DrawCircle: string;
  /** 绘制正多边形 */
  DrawRegularPolygon: string;
  /** 添加引导线 */
  AddGuideLine: string;
  /** 删除引导线 */
  DeleteGuideLine: string;
  /** 修改圆形半径 */
  ChangeCircleRadius: string;
  /** 修改圆弧矢高 */
  ChangeArcSagitta: string;
  /** 删除 */
  Delete: string;
  /** 移动面 */
  MoveFaces: string;
  /** 移动曲线 */
  MoveCurve: string;
  /** 移动点 */
  MovePoint: string;
  /** 将线条转换为圆弧 */
  ConvertLineToArc: string;
  /** 绘制圆角 */
  DrawFillet: string;
}

/**
 * 自定义特征模型操作请求类型
 */
export interface CustomizedFeatureModelRequests {
  /** 复制自定义特征模型请求 */
  CopyCustomizedFeatureModelRequest: string;
  /** 自定义特征模型请求 */
  CustomizedFeatureModelRequest: string;
  /** 修改拉伸值 */
  ChangeExtrusionValue: string;
  /** 清除全部 */
  ClearAll: string;
}

/**
 * N型自定义特征模型操作请求类型
 */
export interface NCustomizedFeatureModelRequests {
  /** 复制N型自定义特征模型请求 */
  CopyNCustomizedFeatureModelRequest: string;
  /** N型自定义特征模型请求 */
  NCustomizedFeatureModelRequest: string;
  /** 清除全部 */
  ClearAll: string;
  /** 创建N型自定义特征模型请求 */
  CreateNCustomizedFeatureModelRequest: string;
  /** 清除N型自定义特征模型请求 */
  ClearNCustomizedFeatureModelRequest: string;
  /** 拆分N型自定义面组混合绘制 */
  SplitNCustomizedFaceGroupMixPaint: string;
  /** 立面清除材质请求 */
  ElevationClearMaterialRequest: string;
  /** 剖面和立面复制请求 */
  SectionAndElevationCopyRequest: string;
}

/**
 * 所有请求类型的集合
 */
export interface RequestTypes {
  /** 2D草图请求 */
  Sketch2d: Readonly<Sketch2dRequests>;
  /** 特殊2D草图请求 */
  ExtraordinarySketch2d: Readonly<ExtraordinarySketch2dRequests>;
  /** 自定义特征模型请求 */
  CustomizedFeatureModel: Readonly<CustomizedFeatureModelRequests>;
  /** N型自定义特征模型请求 */
  NCustomizedFeatureModel: Readonly<NCustomizedFeatureModelRequests>;
}

/**
 * 请求类型常量对象（冻结，不可修改）
 */
declare const requestTypes: Readonly<RequestTypes>;

export default requestTypes;