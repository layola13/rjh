/**
 * 硬装物品变换请求模块
 * 提供硬装物品的移动、缩放、旋转等操作功能
 */

import { MathUtil } from './MathUtil';
import { HSCore } from './HSCore';

/**
 * 操作类型枚举
 * 定义了硬装物品可执行的各种变换操作类型
 */
export enum OptionTypeEnum {
  /** 平移操作 */
  Translate = 'translate',
  /** 单独变换操作（包含位置、旋转、缩放） */
  TransformAlone = 'transformAlone',
  /** 多重缩放操作 */
  MultipleScale = 'multipleScale',
  /** 替换父级层 */
  ReplaceParent = 'replaceParent',
  /** 替换宿主 */
  ReplaceHost = 'replaceHost'
}

/**
 * 三维向量接口
 * 表示空间中的位置、缩放或旋转
 */
export interface Vector3D {
  /** X轴分量 */
  x: number;
  /** Y轴分量 */
  y: number;
  /** Z轴分量 */
  z: number;
}

/**
 * 可变换的内容实体接口
 * 定义了支持空间变换的对象必须实现的属性和方法
 */
export interface TransformableContent {
  /** X轴位置坐标 */
  x: number;
  /** Y轴位置坐标 */
  y: number;
  /** Z轴位置坐标 */
  z: number;
  /** X轴缩放比例 */
  XScale: number;
  /** Y轴缩放比例 */
  YScale: number;
  /** Z轴缩放比例 */
  ZScale: number;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
  
  /** 替换父级层（可选） */
  replaceParent?(parentLayer: unknown): void;
  /** 获取宿主对象（可选） */
  getHost?(): unknown;
  /** 分配到指定宿主（可选） */
  assignTo?(host: unknown): void;
}

/**
 * 位置信息接口
 * 支持向量加法运算
 */
export interface Position extends Vector3D {
  /** 将当前位置与偏移量相加 */
  added(offset: Vector3D): Position;
}

/**
 * 移动实体数据结构
 * 记录实体的原始状态用于撤销/重做
 */
export interface MoveEntity {
  /** 要操作的内容实体 */
  content: TransformableContent;
  /** 原始位置 */
  position: Position;
  /** 原始缩放 */
  scale: Vector3D;
}

/**
 * 平移操作参数
 */
export interface TranslateParams {
  /** 位置偏移量 */
  offset: Vector3D;
}

/**
 * 单个实体的变换参数
 */
export interface EntityTransform {
  /** 目标内容实体 */
  content: TransformableContent;
  /** 新的缩放值（可选） */
  scale?: Vector3D;
  /** 新的旋转值（可选） */
  rotation?: Vector3D;
  /** 新的位置值（可选） */
  position?: Vector3D;
}

/**
 * 单独变换操作参数
 */
export interface TransformAloneParams {
  /** 变换数据数组 */
  trans: EntityTransform[];
}

/**
 * 多重缩放操作参数
 */
export interface MultipleScaleParams {
  /** 缩放中心点 */
  center: Vector3D;
  /** 缩放比例 */
  scale: Vector3D;
}

/**
 * 替换父级操作参数
 */
export interface ReplaceParentParams {
  /** 新的父级层 */
  parentLayer: unknown;
}

/**
 * 替换宿主操作参数
 */
export interface ReplaceHostParams {
  /** 新的宿主对象 */
  host: unknown;
}

/**
 * 操作参数联合类型
 */
export type OperationParams =
  | TranslateParams
  | TransformAloneParams
  | MultipleScaleParams
  | ReplaceParentParams
  | ReplaceHostParams;

/**
 * 硬装物品变换请求类
 * 继承自状态请求基类，实现硬装物品的各种变换操作
 * 支持撤销/重做功能
 */
export declare class TransformInHardDecorationRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 存储需要移动的实体列表及其原始状态
   * @private
   */
  private _moveEntities: MoveEntity[];

  /**
   * 构造函数
   * @param moveEntities - 需要操作的实体列表
   */
  constructor(moveEntities: MoveEntity[]);

  /**
   * 提交操作时的回调
   * 更新所有内容并返回空数组
   * @returns 空数组
   */
  onCommit(): unknown[];

  /**
   * 接收操作请求的处理方法
   * @param operationType - 操作类型
   * @param params - 操作参数
   * @returns 是否处理成功
   */
  onReceive(operationType: OptionTypeEnum, params: OperationParams): boolean;

  /**
   * 移动内容实体
   * @param offset - 位置偏移量
   * @private
   */
  private _moveContent(offset: Vector3D): void;

  /**
   * 对多个内容进行缩放
   * @param center - 缩放中心点
   * @param scale - 缩放比例
   * @private
   */
  private _scaleMultiContents(center: Vector3D, scale: Vector3D): void;

  /**
   * 变换内容实体（位置、旋转、缩放）
   * @param transforms - 变换数据数组
   * @private
   */
  private _transFormContent(transforms: EntityTransform[]): void;

  /**
   * 替换所有实体的父级层
   * @param parentLayer - 新的父级层
   * @private
   */
  private _replaceParent(parentLayer: unknown): void;

  /**
   * 替换所有实体的宿主
   * @param host - 新的宿主对象
   * @private
   */
  private _replaceHost(host: unknown): void;

  /**
   * 设置实体的位置
   * 仅在值变化时更新，避免不必要的触发
   * @param content - 目标内容实体
   * @param position - 新位置
   * @private
   */
  private _setPosition(content: TransformableContent, position: Vector3D): void;

  /**
   * 设置实体的缩放
   * 仅在值变化时更新，避免不必要的触发
   * @param content - 目标内容实体
   * @param scale - 新缩放值
   * @private
   */
  private _setScale(content: TransformableContent, scale: Vector3D): void;

  /**
   * 设置实体的旋转
   * 仅在值变化时更新，避免不必要的触发
   * @param content - 目标内容实体
   * @param rotation - 新旋转值
   * @private
   */
  private _setRotation(content: TransformableContent, rotation: Vector3D): void;

  /**
   * 更新内容实体
   * 处理背景墙的几何更新和子模型刷新
   * @private
   */
  private _updateContent(): void;

  /**
   * 更新墙面装配边界
   * 刷新所有受影响的墙面装配父级的位置和边界
   * @private
   */
  private _updateWallFaceAssemblyBound(): void;

  /**
   * 撤销操作
   * 恢复到操作前的状态
   */
  undo(): void;

  /**
   * 重做操作
   * 重新应用已撤销的操作
   */
  redo(): void;

  /**
   * 获取操作描述
   * @returns 操作的文本描述
   */
  getDescription(): string;

  /**
   * 获取操作类别
   * @returns 日志分组类型（内容操作）
   */
  getCategory(): string;
}