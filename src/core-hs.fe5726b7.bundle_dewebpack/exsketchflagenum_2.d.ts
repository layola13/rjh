/**
 * 草图标志枚举
 * 用于标识草图元素的各种状态和属性
 */
export enum ExSketchFlagEnum {
  // 具体枚举值需要从源模块导入
}

/**
 * 点类型枚举
 * 定义2D草图中点的类型
 */
export enum ExPointType {
  // 具体枚举值需要从源模块导入
}

/**
 * 草图辅助线类型枚举
 * 定义辅助线的各种类型（如水平线、垂直线等）
 */
export enum ExSketchGuidelineType {
  // 具体枚举值需要从源模块导入
}

/**
 * 草图背景接口
 * 定义草图背景图像的基础属性和方法
 */
export interface IExBackground {
  // 背景相关属性和方法
}

/**
 * 草图基础接口
 * 所有草图元素的基础接口
 */
export interface IExSketchBase {
  // 基础草图属性和方法
}

/**
 * 2D点接口
 * 表示二维空间中的点
 */
export interface IExPoint2d {
  // 点的坐标和相关方法
}

/**
 * 2D曲线接口
 * 表示二维空间中的曲线基础接口
 */
export interface IExCurve2d {
  // 曲线的基础属性和方法
}

/**
 * 2D直线接口
 * 表示二维空间中的直线
 */
export interface IExLine2d extends IExCurve2d {
  // 直线特有的属性和方法
}

/**
 * 2D圆接口
 * 表示二维空间中的完整圆
 */
export interface IExCircle2d extends IExCurve2d {
  // 圆的属性（圆心、半径等）
}

/**
 * 2D圆弧接口
 * 表示二维空间中的圆弧
 */
export interface IExCircleArc2d extends IExCurve2d {
  // 圆弧的属性（起始角、终止角等）
}

/**
 * 边接口
 * 表示拓扑结构中的边元素
 */
export interface IExEdge {
  // 边的属性和方法
}

/**
 * 共边接口
 * 表示拓扑结构中的共边（有向边）
 */
export interface IExCoedge {
  // 共边的属性和方法
}

/**
 * 线框接口
 * 表示由边组成的线框结构
 */
export interface IExWire {
  // 线框的属性和方法
}

/**
 * 2D面接口
 * 表示二维空间中的面
 */
export interface IExFace2d {
  // 面的属性和方法
}

/**
 * 辅助线接口
 * 表示草图中的辅助线元素
 */
export interface IExGuideLine {
  // 辅助线的属性和方法
}

/**
 * 草图数据接口
 * 包含草图的完整数据结构
 */
export interface IExSketchData {
  // 草图数据的属性
}

/**
 * 可草图化接口
 * 表示可以被添加到草图中的对象
 */
export interface IExSketchable {
  // 可草图化对象的方法
}

/**
 * 草图构建器接口
 * 用于构建草图的构建器模式接口
 */
export interface IExSketchBuilder {
  // 构建器的方法
}

/**
 * 构建器区域接口
 * 用于构建草图区域的接口
 */
export interface IExBuilderRegion {
  // 区域构建相关方法
}

/**
 * 构建器曲线接口
 * 用于构建草图曲线的接口
 */
export interface IExBuilderCurve {
  // 曲线构建相关方法
}

/**
 * 非凡圆类
 * 实现2D圆的具体类
 */
export declare class ExtraordinaryCircle2d implements IExCircle2d {
  // 圆的实现
}

/**
 * 非凡圆弧类
 * 实现2D圆弧的具体类
 */
export declare class ExtraordinaryCircleArc2d implements IExCircleArc2d {
  // 圆弧的实现
}

/**
 * 非凡曲线类
 * 实现2D曲线的具体类
 */
export declare class ExtraordinaryCurve2d implements IExCurve2d {
  // 曲线的实现
}

/**
 * 非凡直线类
 * 实现2D直线的具体类
 */
export declare class ExtraordinaryLine2d implements IExLine2d {
  // 直线的实现
}

/**
 * 非凡点类
 * 实现2D点的具体类
 */
export declare class ExtraordinaryPoint2d implements IExPoint2d {
  // 点的实现
}

/**
 * 非凡共边类
 * 实现共边的具体类
 */
export declare class ExtraordinaryCoedge implements IExCoedge {
  // 共边的实现
}

/**
 * 非凡边类
 * 实现边的具体类
 */
export declare class ExtraordinaryEdge implements IExEdge {
  // 边的实现
}

/**
 * 非凡线框类
 * 实现线框的具体类
 */
export declare class ExtraordinaryWire implements IExWire {
  // 线框的实现
}

/**
 * 非凡2D面类
 * 实现2D面的具体类
 */
export declare class ExtraordinaryFace2d implements IExFace2d {
  // 面的实现
}

/**
 * 非凡2D草图构建器类
 * 实现草图构建器的具体类
 */
export declare class ExtraordinarySketch2dBuilder implements IExSketchBuilder {
  // 草图构建器的实现
}

/**
 * 非凡辅助线类
 * 实现辅助线的具体类
 */
export declare class ExtraordinaryGuideline implements IExGuideLine {
  // 辅助线的实现
}

/**
 * 非凡背景类
 * 实现草图背景的具体类
 */
export declare class ExtraordinaryBackground implements IExBackground {
  // 背景的实现
}

/**
 * 非凡草图基础类
 * 实现草图基础功能的具体类
 */
export declare class ExtraordinarySketchBase implements IExSketchBase {
  // 草图基础的实现
}