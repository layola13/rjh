/**
 * Sketch2d Module
 * 提供2D草图的核心功能，包括面、曲线、背景和引导线的管理
 */

import { Entity, Entity_IO } from './Entity';
import { Background } from './Background';
import { Face2d } from './Face2d';
import { GuideLine2d } from './GuideLine2d';
import { Sketch2dBuilder } from './Sketch2dBuilder';
import { Signal } from './Signal';
import { Line2d } from './Line2d';
import { Circle2d } from './Circle2d';
import { CircleArc2d } from './CircleArc2d';
import { Point2d } from './Point2d';
import { Curve2d } from './Curve2d';
import { Loop2d } from './Loop2d';
import * as THREE from 'three';

/**
 * 面添加事件参数
 */
export interface Face2dAddedEventArgs {
  /** 添加的面ID */
  faceId: string;
}

/**
 * 面复制事件参数
 */
export interface Face2dCopiedEventArgs {
  /** 源面ID */
  sourceId: string;
  /** 复制面ID */
  copyId: string;
  /** 源面受影响的信息 */
  sourceAffectedFaceInfo: unknown;
  /** 复制面受影响的信息 */
  copiedAffectedFaceInfo: unknown;
}

/**
 * 构建完成事件参数
 */
export interface BuildCompleteEventArgs {
  /** 复制的面属性对 */
  copyFacePropsPairs: unknown;
}

/**
 * 添加背景选项
 */
export interface AddBackgroundOptions {
  /** 是否包含背景 */
  hasBackground?: boolean;
}

/**
 * 脏材质选项
 */
export interface DirtyMaterialOptions {
  /** 面ID列表 */
  faceIds?: string[];
}

/**
 * 点坐标映射
 */
export interface PointCoordinateMap {
  [pointId: string]: {
    x: number;
    y: number;
  };
}

/**
 * 2D草图实体
 * 作为草图的根容器，管理所有2D几何元素
 */
export declare class Sketch2d extends Entity {
  /**
   * 背景对象
   * @private
   */
  private _background: Background;

  /**
   * 面添加信号
   */
  face2dAdded: Signal<Face2dAddedEventArgs>;

  /**
   * 面复制信号
   */
  face2dCopied: Signal<Face2dCopiedEventArgs>;

  /**
   * 构建完成信号
   */
  signalBuildComplete: Signal<BuildCompleteEventArgs>;

  /**
   * 构造函数
   * @param id - 实体ID
   * @param parent - 父实体
   */
  constructor(id?: string, parent?: Entity);

  /**
   * 判断是否为根节点
   * @returns 始终返回true
   */
  isRoot(): boolean;

  /**
   * 获取IO处理器
   * @returns Sketch2d_IO实例
   */
  getIO(): Sketch2d_IO;

  /**
   * 获取所有面
   */
  get faces(): Face2d[];

  /**
   * 设置所有面（替换现有面）
   */
  set faces(faces: Face2d[]);

  /**
   * 获取所有引导线
   */
  get guideLines(): GuideLine2d[];

  /**
   * 获取背景对象
   */
  get background(): Background;

  /**
   * 设置背景对象
   */
  set background(background: Background);

  /**
   * 内部设置背景方法
   * @param background - 背景对象或数据
   * @private
   */
  private _setBackground(background: Background | unknown): void;

  /**
   * 应用变换矩阵到草图
   * @param matrix - 3x3变换矩阵
   */
  transform(matrix: THREE.Matrix3): void;

  /**
   * 移除所有面
   * @param removeFromParent - 是否从父节点移除
   * @param dispose - 是否销毁
   * @param callback - 回调函数
   */
  removeAllFaces(
    removeFromParent?: boolean,
    dispose?: boolean,
    callback?: () => void
  ): void;

  /**
   * 获取背景外轮廓
   * @returns 轮廓点数组
   */
  getBackgroundOuter(): Point2d[];

  /**
   * 获取所有曲线
   * @returns 曲线数组
   */
  getAllCurves(): Curve2d[];

  /**
   * 获取所有点
   * @returns 点数组
   */
  getAllPoints(): Point2d[];

  /**
   * 创建构建器
   * @returns Sketch2d构建器实例
   */
  createBuilder(): Sketch2dBuilder;

  /**
   * 使用背景初始化
   * @param background - 背景对象或数据
   * @param addBackgroundFace - 是否添加背景面
   */
  initWithBackground(background: Background | unknown, addBackgroundFace?: boolean): void;

  /**
   * 更改背景
   * @param backgroundData - 背景数据
   * @param options - 更改选项
   */
  changeBackground(backgroundData: unknown, options: unknown): void;

  /**
   * 判断是否与给定背景相同
   * @param background - 背景对象或数据
   * @returns 是否相同
   */
  isSameBackground(background: Background | unknown): boolean;

  /**
   * 清空草图
   * @param addBackground - 是否添加背景
   */
  clear(addBackground?: boolean): void;

  /**
   * 添加路径
   * @param paths - 路径数据
   * @param options - 添加选项
   */
  addPaths(paths: unknown, options: unknown): void;

  /**
   * 添加圆形路径
   * @param circlePath - 圆形路径数据
   * @param options - 添加选项
   */
  addCirclePath(circlePath: unknown, options: unknown): void;

  /**
   * 更新变更后的状态
   * @param addedCurves - 添加的曲线
   * @param removedCurves - 移除的曲线
   * @param addedPoints - 添加的点
   * @param removedPoints - 移除的点
   * @param options - 更新选项
   */
  updateAfterChanges(
    addedCurves: Curve2d[],
    removedCurves: Curve2d[],
    addedPoints: Point2d[],
    removedPoints: Point2d[],
    options: unknown
  ): void;

  /**
   * 构建后处理
   */
  postBuild(): void;

  /**
   * 移除曲线
   * @param curves - 要移除的曲线
   * @param options - 移除选项
   * @param callback - 回调函数
   */
  removeCurves(curves: Curve2d[], options: unknown, callback?: () => void): void;

  /**
   * 移除面
   * @param face - 要移除的面
   */
  removeFace(face: Face2d): void;

  /**
   * 添加曲线路径
   * @param curves - 曲线数组
   * @param options - 添加选项
   */
  addCurvesPath(curves: Curve2d[], options: unknown): void;

  /**
   * 添加背景
   * @param options - 添加选项
   */
  addBackground(options?: AddBackgroundOptions): void;

  /**
   * 刷新内部边界
   * @protected
   */
  protected refreshBoundInternal(): void;

  /**
   * 复制面
   * @param offset - 偏移向量
   * @param sourceFace - 源面
   * @param coordinateMap - 坐标映射（可选）
   * @returns 复制的面
   */
  copyFace(
    offset: { x: number; y: number },
    sourceFace: Face2d,
    coordinateMap?: PointCoordinateMap
  ): Face2d;

  /**
   * 遍历所有面
   * @param callback - 回调函数
   * @param context - 上下文对象
   */
  forEachFace(callback: (face: Face2d) => void, context?: unknown): void;

  /**
   * 添加引导线
   * @param type - 引导线类型
   * @param options - 引导线选项
   */
  addGuideLine(type: unknown, options: unknown): void;

  /**
   * 移除引导线
   * @param guideLines - 要移除的引导线数组
   */
  removeGuideLines(guideLines: GuideLine2d[]): void;

  /**
   * 验证草图数据有效性
   * @returns 验证结果
   */
  verify(): boolean;

  /**
   * 字段变更回调
   * @param fieldName - 字段名
   * @param oldValue - 旧值
   * @param newValue - 新值
   * @protected
   */
  protected onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void;

  /**
   * 处理字段变更
   * @param fieldName - 字段名
   * @private
   */
  private _processFieldChanged(fieldName: string): void;

  /**
   * 分发面复制信号
   * @param sourceId - 源面ID
   * @param copyId - 复制面ID
   * @param sourceAffectedFaceInfo - 源面受影响信息
   * @param copiedAffectedFaceInfo - 复制面受影响信息
   */
  dispatchCopyFace2dSignal(
    sourceId: string,
    copyId: string,
    sourceAffectedFaceInfo: unknown,
    copiedAffectedFaceInfo: unknown
  ): void;

  /**
   * 分发面添加信号
   * @param faceId - 面ID
   */
  dispatchFace2dAddedSignal(faceId: string): void;

  /**
   * 分发构建完成信号
   * @param copyFacePropsPairs - 复制的面属性对
   */
  dispatchBuildCompleteSignal(copyFacePropsPairs: unknown): void;

  /**
   * 标记材质需要更新
   * @param options - 选项
   */
  dirtyMaterial(options?: DirtyMaterialOptions): void;

  /**
   * 应用变换（缩放、旋转、平移）
   * @param scaleX - X轴缩放
   * @param scaleY - Y轴缩放
   * @param translateX - X轴平移
   * @param translateY - Y轴平移
   * @param rotation - 旋转角度（弧度）
   */
  applyTransform(
    scaleX?: number,
    scaleY?: number,
    translateX?: number,
    translateY?: number,
    rotation?: number
  ): void;

  /**
   * 销毁草图对象
   */
  destroy(): void;

  /**
   * 镜像变换
   * @param matrix - 镜像矩阵
   */
  mirror(matrix: THREE.Matrix3): void;
}

/**
 * Sketch2d的IO处理器
 * 负责序列化和反序列化
 */
export declare class Sketch2d_IO extends Entity_IO {
  /**
   * 单例实例
   * @private
   */
  private static _Sketch2d_IO_instance: Sketch2d_IO;

  /**
   * 获取单例实例
   * @returns Sketch2d_IO实例
   */
  static instance(): Sketch2d_IO;

  /**
   * 导出草图数据
   * @param sketch - 草图对象
   * @param callback - 导出回调
   * @param includeChildren - 是否包含子对象
   * @param options - 导出选项
   * @returns 导出的数据数组
   */
  dump(
    sketch: Sketch2d,
    callback?: (data: unknown[], sketch: Sketch2d) => void,
    includeChildren?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * 加载草图数据
   * @param sketch - 草图对象
   * @param data - 数据对象
   * @param options - 加载选项
   */
  load(sketch: Sketch2d, data: unknown, options?: Record<string, unknown>): void;
}