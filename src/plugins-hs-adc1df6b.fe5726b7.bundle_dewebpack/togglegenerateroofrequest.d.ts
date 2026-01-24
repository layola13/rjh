/**
 * 屋顶生成切换请求
 * 用于在编辑器中切换生成参数化屋顶的事务请求
 */

import { HSCore } from 'path-to-hscore';

/**
 * 屋顶元数据配置接口
 */
interface RoofMetadata {
  // 根据实际使用补充具体字段
  [key: string]: unknown;
}

/**
 * 循环信息接口
 * 包含用于生成屋顶的闭合循环数据
 */
interface LoopInfo {
  /** 闭合循环对象 */
  loop: {
    /** 实际循环点数据 */
    loop: unknown;
  };
}

/**
 * 图层对象类型
 */
type Layer = unknown; // 替换为实际的Layer类型

/**
 * 屋顶对象类型
 */
type Roof = HSCore.Model.NCustomizedParametricRoof;

/**
 * 切换生成屋顶请求类
 * 继承自状态请求基类，用于处理屋顶的创建、删除和重建操作
 */
export declare class ToggleGenerateRoofRequest extends HSCore.Transaction.Common.StateRequest {
  /** 屋顶元数据配置 */
  private _meta: RoofMetadata;
  
  /** 所属图层 */
  private _layer: Layer;
  
  /** 循环信息 */
  private _loopInfo: LoopInfo;
  
  /** 房间高度（单位：米或其他长度单位） */
  private _roomHeight: number;
  
  /** 关联的墙体ID列表 */
  private _linkWallIds: string[];
  
  /** 旧的屋顶对象（将被替换） */
  oldRoof: Roof;
  
  /** 新创建的屋顶对象 */
  roof?: Roof;

  /**
   * 构造函数
   * @param oldRoof - 待替换的旧屋顶对象
   * @param meta - 屋顶元数据配置
   * @param layer - 目标图层
   * @param loopInfo - 屋顶边界循环信息
   * @param roomHeight - 房间高度
   * @param linkWallIds - 关联墙体ID数组
   */
  constructor(
    oldRoof: Roof,
    meta: RoofMetadata,
    layer: Layer,
    loopInfo: LoopInfo,
    roomHeight: number,
    linkWallIds: string[]
  );

  /**
   * 提交事务时执行
   * 删除旧屋顶及其开口，创建新屋顶
   * @returns 新创建的屋顶对象
   */
  onCommit(): Roof;

  /**
   * 创建新的屋顶内容
   * @private
   * @returns 新创建的参数化屋顶对象
   */
  private _createContent(): Roof;

  /**
   * 是否可以执行字段事务
   * @returns 始终返回 true
   */
  canTransactField(): boolean;
}