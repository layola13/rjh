/**
 * 内容尺寸调整请求
 * 用于处理模型内容（门窗、楼板开洞等）的尺寸调整操作
 */

import { HSCore } from './core';
import { HSFPConstants } from './constants';
import { HSCatalog } from './catalog';

/**
 * 三维坐标或尺寸
 */
interface Vector3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 部分三维坐标（可选字段）
 */
interface PartialVector3D {
  x?: number;
  y?: number;
  z?: number;
}

/**
 * 尺寸调整规格
 * 包含新的尺寸和位置信息
 */
interface ResizeSpec {
  /** X方向尺寸 */
  XSize: number;
  /** Y方向尺寸 */
  YSize: number;
  /** Z方向尺寸 */
  ZSize: number;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** 拱形高度（仅开洞类型） */
  archHeight?: number;
}

/**
 * 楼板开洞变换参数
 */
interface SlabHoleTransform {
  /** X位置 */
  xPos: number;
  /** Y位置 */
  yPos: number;
  /** X缩放比例 */
  xScale: number;
  /** Y缩放比例 */
  yScale: number;
}

/**
 * 请求组合数据
 */
interface ComposeRequestData {
  /** 请求类型 */
  type: string;
  /** 请求数据：[内容对象, 目标尺寸, 偏移量] */
  data: [HSCore.Model.Content, PartialVector3D, PartialVector3D?];
}

/**
 * 可调整尺寸的内容类型
 */
type ResizableContent =
  | HSCore.Model.Content
  | HSCore.Model.Opening
  | HSCore.Model.NCustomizedBeam
  | HSCore.Model.NCustomizedStructure;

/**
 * 内容尺寸调整请求类
 * 继承自状态请求基类，支持撤销/重做操作
 */
export default class ResizeContentRequest extends HSCore.Transaction.Common.StateRequest {
  /** 待调整的内容对象 */
  private readonly _content: ResizableContent;
  
  /** 尺寸调整规格 */
  private _resizeSpec: ResizeSpec;
  
  /** 目标尺寸 */
  private _targetSize: Vector3D;
  
  /** 位置偏移量 */
  private _offset: Vector3D;
  
  /** 楼板开洞影响的墙面集合 */
  private _slabOpeningAffectedWallFaces?: HSCore.Model.WallFace[];

  /**
   * 构造函数
   * @param content - 要调整尺寸的内容对象
   * @param targetSize - 目标尺寸（可选，部分字段）
   * @param offset - 位置偏移量（可选）
   */
  constructor(
    content: ResizableContent,
    targetSize?: PartialVector3D,
    offset?: PartialVector3D
  );

  /**
   * 提交事务
   * 应用尺寸调整并更新相关几何体
   * @returns 调整后的内容对象
   */
  onCommit(): ResizableContent;

  /**
   * 撤销操作
   */
  onUndo(): void;

  /**
   * 重做操作
   */
  onRedo(): void;

  /**
   * 尝试将另一个请求组合到当前请求
   * @param request - 待组合的请求对象
   * @returns 是否成功组合
   */
  onCompose(request: ComposeRequestData): boolean;

  /**
   * 获取组合规格
   * @returns [内容对象, 目标尺寸, 偏移量]
   */
  getComposeSpec(): [ResizableContent, Vector3D, Vector3D];

  /**
   * 获取尺寸调整规格
   * @param content - 内容对象
   * @param targetSize - 目标尺寸
   * @param offset - 偏移量
   * @returns 调整规格对象
   */
  private _getResizeSpec(
    content: ResizableContent,
    targetSize?: PartialVector3D,
    offset?: PartialVector3D
  ): ResizeSpec;

  /**
   * 获取恢复规格（用于撤销操作）
   * @param content - 内容对象
   * @returns 当前状态的规格对象
   */
  private _getRestoreSpec(content: ResizableContent): ResizeSpec;

  /**
   * 应用尺寸调整规格
   * @param applyFunc - 应用函数
   */
  private _applyResizeSpec(
    applyFunc: (content: ResizableContent, spec: ResizeSpec) => ResizeSpec | void
  ): void;

  /**
   * 为内容对象应用尺寸调整规格
   * @param content - 内容对象
   * @param spec - 调整规格
   * @returns 原始规格（用于撤销）
   */
  private _applyResizeSpecForContent(
    content: ResizableContent,
    spec: ResizeSpec
  ): ResizeSpec;

  /**
   * 恢复内容对象的尺寸规格
   * @param content - 内容对象
   * @param spec - 要恢复的规格
   * @returns 当前规格（用于重做）
   */
  private _restoreResizeSpecForContent(
    content: ResizableContent,
    spec: ResizeSpec
  ): ResizeSpec;

  /**
   * 更新楼板开洞影响的墙面
   * 计算并标记受影响的墙面几何体为脏状态
   */
  updateSlabHoleAffectedWalls(): void;

  /**
   * 更新楼板开洞影响的楼板
   * 标记受影响的天花板和地板几何体为脏状态
   */
  updateSlabHoleAffectedSlabs(): void;

  /**
   * 是否可以事务化字段
   * @returns 总是返回 true
   */
  canTransactField(): boolean;

  /**
   * 获取操作描述
   * @returns 操作描述文本
   */
  getDescription(): string;

  /**
   * 获取操作分类
   * @returns 日志分组类型
   */
  getCategory(): string;
}