import { Signal } from '../signals';
import { EntityFlagEnum, Entity } from '../entity';
import { ParametricModelArray, ParametricModelArray_IO } from '../parametric-model';
import { GraphicsData, ClipPlane } from '../graphics';
import { EntityEventType } from '../events';
import { Matrix4 } from '../math';
import { NCPBackgroundWallContent } from './background-wall-content';
import { ObstacleInfo } from '../customized-feature';

/**
 * 数组变化事件数据
 */
export interface ArrayChangedEvent {
  type?: string;
  [key: string]: unknown;
}

/**
 * 裁剪事件数据
 */
export interface ClipEvent {
  type: EntityEventType.Clip;
}

/**
 * 几何体事件数据
 */
export interface GeometryEvent {
  type: EntityEventType.Geometry;
}

/**
 * 裁剪任务接口
 */
export interface ClipTask {
  /**
   * 执行裁剪任务
   * @param data - 输入的图形数据
   * @returns 裁剪后的图形数据
   */
  run(data: GraphicsData): GraphicsData;
  
  /**
   * 删除裁剪任务
   */
  delete(): void;
}

/**
 * 背景墙阵列的 I/O 处理类
 * 负责背景墙阵列的序列化和反序列化
 */
export declare class NCPBackgroundWallArray_IO extends ParametricModelArray_IO {
  /**
   * 获取单例实例
   */
  static instance(): NCPBackgroundWallArray_IO;
}

/**
 * 背景墙阵列模型类
 * 用于管理和渲染背景墙的阵列实例
 */
export declare class NCPBackgroundWallArray extends ParametricModelArray {
  /**
   * 数组变化信号
   * 当阵列内容发生变化时触发
   */
  signalArrayChanged: Signal<ArrayChangedEvent>;

  /**
   * 裁剪脏标记信号
   * 当需要重新计算裁剪几何体时触发
   */
  signalClipDirty: Signal<ClipEvent>;

  /**
   * 裁剪脏标记
   * @internal
   */
  private _dirtyClip: boolean;

  /**
   * 信号钩子管理器
   * @internal
   */
  private _signalHook: HSCore.Util.SignalHook;

  /**
   * 缓存的图形数据
   * @internal
   */
  private _graphicsData?: GraphicsData;

  /**
   * 裁剪任务
   * @internal
   */
  private _clipTask?: ClipTask;

  /**
   * 边界脏标记
   * @internal
   */
  private _boundDirty: boolean;

  /**
   * 构造背景墙阵列
   * @param id - 实体ID，默认为空字符串
   * @param parent - 父实体
   */
  constructor(id?: string, parent?: Entity);

  /**
   * 销毁实例，释放资源
   */
  destroy(): void;

  /**
   * 创建数组内容容器
   * @internal
   * @returns 背景墙内容实例
   */
  protected _createArrayContent(): NCPBackgroundWallContent;

  /**
   * 初始化阵列
   * @param config - 配置对象
   */
  initArray(config: unknown): void;

  /**
   * 检查是否启用裁剪
   * @internal
   * @returns 如果应启用裁剪则返回 true
   */
  protected _enableClip(): boolean;

  /**
   * 标记裁剪几何体为脏，需要重新计算
   * @param propagate - 是否传播事件
   */
  dirtyClipGeometry(propagate?: boolean): void;

  /**
   * 获取未裁剪的图形数据
   * @returns 包含面、边和内容的图形数据
   */
  getUnClippedGraphicsData(): GraphicsData;

  /**
   * 获取图形数据（同步）
   * 如果启用裁剪，将返回裁剪后的数据
   * @returns 图形数据
   */
  getGraphicsData(): GraphicsData;

  /**
   * 执行几何体裁剪
   * @internal
   * @param data - 输入的图形数据
   * @returns 裁剪后的图形数据
   */
  protected _clipGeom(data: GraphicsData): GraphicsData;

  /**
   * 转换变换矩阵数组
   * @param matrices - 输入的矩阵数组
   * @returns 转换后的矩阵数组
   */
  transformMatrixes(matrices: Matrix4[]): Matrix4[];

  /**
   * 获取图形数据（异步）
   * 如果启用裁剪，将返回裁剪后的数据
   * @returns Promise，解析为图形数据
   */
  getGraphicsDataAsync(): Promise<GraphicsData>;

  /**
   * 获取 I/O 处理器
   * @returns I/O 处理器实例
   */
  getIO(): NCPBackgroundWallArray_IO;
}

/**
 * 模块导出
 */
export { NCPBackgroundWallArray_IO, NCPBackgroundWallArray };