/**
 * 3D弧形框架扩展模块
 * 提供弧形框架的立杆、横梁、防护盒等3D模型生成功能
 */

import * as BABYLON from '@babylonjs/core';
import { Point, Vector } from './geometry';
import { DXFExtension, DXFAnalysisResult } from './dxf';
import { ProfileEvolution, Frame3DInfo, FramePolygon, FrameInfo } from './frame';

/**
 * 立杆类型枚举
 */
export enum BarType {
  /** 垂直立杆 */
  V = 'V',
  /** 水平立杆 */
  H = 'H',
  /** 其他类型 */
  Other = 'Other'
}

/**
 * 型材类型枚举
 */
export enum ProfileTypesEnum {
  /** 铝型材外侧 */
  LXCOUT = 'LXCOUT',
  /** 铝型材内侧 */
  LXCIN = 'LXCIN',
  /** 铝型材 */
  LXC = 'LXC',
  /** 接头 */
  JT = 'JT',
  /** 卡扣 */
  KK = 'KK',
  /** 轨道 */
  GD = 'GD'
}

/**
 * 3D点坐标
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 立杆/横梁定义
 */
export interface Bar {
  /** 起始点 */
  startPt: Point3D;
  /** 结束点 */
  endPt: Point3D;
  /** 弧形高度（单位：米） */
  arcHeight: number;
}

/**
 * 框架信息（包含3D信息）
 */
export interface FrameInfoWith3D extends FrameInfo {
  /** 3D框架特定信息 */
  frame_3D_info: Frame3DInfo;
  /** 框架多边形边界 */
  frame_polygon: FramePolygon;
  /** 框架基础信息 */
  frame: {
    arcHeight: number;
  };
}

/**
 * 横梁信息计算结果
 */
export interface HMullionInfo {
  /** 半径（单位：米） */
  radius: number;
  /** 弧度 */
  radion: number;
  /** 右侧弧度 */
  rightRadion: number;
  /** 偏移量 */
  offset: {
    x: number;
    y: number;
  };
}

/**
 * 垂直立杆信息计算结果
 */
export interface VMullionInfo {
  /** 偏移量 */
  offset: {
    x: number;
    y: number;
  };
  /** 旋转弧度 */
  rotateRadion: number;
}

/**
 * 相对位置定义
 */
export interface RelativePosition {
  /** 名称 */
  name: string;
  /** 相对坐标 */
  relative: BABYLON.Vector2;
}

/**
 * 3D弧形框架扩展类
 * 负责生成弧形框架的各种3D模型组件
 */
export default class ThreeDArcExtension {
  /** Babylon.js场景实例 */
  private static scene: BABYLON.Scene;

  /**
   * 初始化扩展
   * @param scene - Babylon.js场景对象
   */
  static Init(scene: BABYLON.Scene): void;

  /**
   * 异步生成立杆/横梁模型
   * @param bar - 立杆/横梁定义
   * @param profileEvolution - 型材演变数据
   * @param profileType - 型材类型标识
   * @param parent - 父节点
   * @param frameInfo - 框架信息（必须包含frame_3D_info）
   * @param customOffset - 自定义Z轴偏移（单位：米），默认使用型材poszm
   * @returns 生成的3D变换节点，失败返回undefined
   * @throws 当frameInfo.frame_3D_info为null时抛出错误
   */
  static AsyncGenBar(
    bar: Bar,
    profileEvolution: ProfileEvolution,
    profileType: string,
    parent: BABYLON.TransformNode,
    frameInfo: FrameInfoWith3D,
    customOffset?: number
  ): Promise<BABYLON.TransformNode | undefined>;

  /**
   * 异步生成中挺（竖向或横向分隔构件）模型
   * @param bar - 中挺定义
   * @param profileEvolution - 型材演变数据
   * @param profileType - 型材类型标识
   * @param parent - 父节点
   * @param frameInfo - 框架信息（必须包含frame_3D_info）
   * @returns 生成的3D变换节点，失败返回undefined
   * @throws 当frameInfo.frame_3D_info为null时抛出错误
   */
  static AsyncGenMullions(
    bar: Bar,
    profileEvolution: ProfileEvolution,
    profileType: string,
    parent: BABYLON.TransformNode,
    frameInfo: FrameInfoWith3D
  ): Promise<BABYLON.TransformNode | undefined>;

  /**
   * 异步生成防护盒模型
   * @param bar - 防护盒定义
   * @param profileEvolution - 型材演变数据
   * @param profileType - 型材类型标识
   * @param parent - 父节点
   * @param frameInfo - 框架信息（必须包含frame_3D_info）
   * @returns 生成的3D变换节点，失败返回undefined
   * @throws 当frameInfo.frame_3D_info为null时抛出错误
   */
  static AsyncGenSecurityBox(
    bar: Bar,
    profileEvolution: ProfileEvolution,
    profileType: string,
    parent: BABYLON.TransformNode,
    frameInfo: FrameInfoWith3D
  ): Promise<BABYLON.TransformNode | undefined>;

  /**
   * 同步生成轨道（Guide Way）模型
   * @param name - 模型名称
   * @param dxfAnalysis - DXF分析结果
   * @param startPoint - 起始点
   * @param endPoint - 结束点
   * @param zOffset - Z轴偏移（单位：米）
   * @param parent - 父节点（可选）
   * @param frameInfo - 框架信息（必须包含frame_3D_info）
   * @returns 生成的3D变换节点，失败返回undefined
   * @throws 当frameInfo.frame_3D_info为null时抛出错误
   */
  static SyncGenGDWay(
    name: string,
    dxfAnalysis: DXFAnalysisResult,
    startPoint: Point3D,
    endPoint: Point3D,
    zOffset: number,
    parent: BABYLON.TransformNode | null,
    frameInfo: FrameInfoWith3D
  ): BABYLON.TransformNode | undefined;

  /**
   * 生成中挺或防护盒的通用方法（内部使用）
   * @param bar - 立杆/横梁定义
   * @param profileEvolution - 型材演变数据
   * @param parent - 父节点
   * @param dxfAnalysis - DXF分析结果
   * @param frameInfo - 框架信息
   * @returns 生成的3D变换节点
   * @private
   */
  private static genMullionOrSecurityBox(
    bar: Bar,
    profileEvolution: ProfileEvolution,
    parent: BABYLON.TransformNode,
    dxfAnalysis: DXFAnalysisResult,
    frameInfo: FrameInfoWith3D
  ): BABYLON.TransformNode | undefined;

  /**
   * 判断框架是否为3D弧形框架
   * @param frameInfo - 框架信息
   * @returns 是否为3D弧形框架（frameType为'3dArc'且存在arcHeight）
   */
  static isThreeDFrame(frameInfo: FrameInfo): boolean;
}