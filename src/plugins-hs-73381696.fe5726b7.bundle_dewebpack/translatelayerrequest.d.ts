/**
 * 楼层平移请求
 * 负责处理楼层及其所有子元素的平移操作
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import { isLayerSlabsEdited } from './utilities';

/**
 * 平移操作的目标对象集合
 */
interface TranslateTargets {
  /** 目标楼层 */
  layer: HSCore.Model.Layer | undefined;
  /** 楼板集合 */
  slabs: HSCore.Model.FloorSlab[];
  /** 墙体集合 */
  walls: HSCore.Model.Wall[];
  /** 结构元素集合 */
  structures: HSCore.Model.Structure[];
  /** 梁集合 */
  beams: HSCore.Model.Beam[];
  /** 草图模型集合 */
  sketchmodels: HSCore.Model.NCustomizedSketchModel[];
  /** 参数化开口集合 */
  parametricopenings: HSCore.Model.ParametricOpening[];
  /** 面集合 */
  faces: Set<HSCore.Model.Face>;
  /** 开口集合 */
  openings: HSCore.Model.Opening[];
  /** 内容集合 */
  contents: HSCore.Model.Content[];
  /** 动态内容集合 */
  dcontents: (HSCore.Model.DAssembly | HSCore.Model.DContent | HSCore.Model.DExtruding | HSCore.Model.DHole | HSCore.Model.DWindow | HSCore.Model.DSweep)[];
  /** 辅助线集合 */
  auxiliaryLines: HSCore.Model.AuxiliaryLine[];
}

/**
 * 平移偏移量
 */
interface TranslateOffset {
  /** X轴偏移 */
  x: number;
  /** Y轴偏移 */
  y: number;
}

/**
 * 楼层平移请求类
 * 继承自StateRequest，实现楼层及其所有子元素的平移功能
 */
export declare class TranslateLayerRequest extends HSCore.Transaction.Common.StateRequest {
  /** 目标楼层 */
  targetLayer: HSCore.Model.Layer;
  
  /** 2D草图 */
  sketch2d: unknown;
  
  /** 平移偏移量 */
  offset: TranslateOffset;
  
  /** 内部目标对象集合 */
  private _targets: TranslateTargets | undefined;
  
  /** 平面图引用 */
  private _floorplan: HSCore.Model.Floorplan;

  /**
   * 构造函数
   * @param floorplan - 平面图对象
   * @param targetLayer - 要平移的目标楼层
   * @param offset - 平移偏移量
   */
  constructor(
    floorplan: HSCore.Model.Floorplan,
    targetLayer: HSCore.Model.Layer,
    offset: TranslateOffset
  );

  /**
   * 执行平移请求
   * 主流程：重置 -> 收集 -> 平移
   */
  doRequest(): void;

  /**
   * 重置目标对象集合
   * 初始化所有目标数组和集合为空
   * @private
   */
  private _reset(): void;

  /**
   * 收集需要平移的所有对象
   * 遍历目标楼层，收集所有子元素
   * @private
   */
  private _collect(): void;

  /**
   * 检查楼层楼板是否已被编辑
   * @returns 楼板是否被编辑
   * @private
   */
  private _isLayerSlabsEdited(): boolean;

  /**
   * 执行平移操作
   * 对所有收集到的对象应用偏移量
   * @returns 操作是否成功
   * @private
   */
  private _translate(): boolean;

  /**
   * 刷新参数化模型
   * 重新初始化所有参数化模型
   */
  refreshParametricModel(): void;

  /**
   * 重建目标楼层
   * 重新构建楼层的房间和空间
   * @private
   */
  private _rebuildTargetLayer(): void;

  /**
   * 提交事务时的回调
   * 执行平移并自动适配面装饰线
   */
  onCommit(): void;

  /**
   * 撤销操作时的回调
   * 刷新模型并清除选择
   */
  onUndo(): void;

  /**
   * 重做操作时的回调
   * 刷新模型并清除选择
   */
  onRedo(): void;

  /**
   * 是否可以进行字段事务
   * @returns 始终返回true
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
  getCategory(): HSFPConstants.LogGroupTypes;
}