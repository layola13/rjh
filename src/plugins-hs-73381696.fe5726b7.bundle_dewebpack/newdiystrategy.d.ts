/**
 * 新DIY策略模块
 * 处理自定义产品实例模型的材质吸取和应用
 */

import type { MaterialData } from 'HSCore.Material';
import type { CustomizedPMInstanceModel } from 'HSCore.Model';

/**
 * 材质信息接口
 */
interface MaterialInfo {
  /** 材质纹理URI */
  texture?: string;
  /** 材质颜色 */
  color?: string;
  /** 颜色模式：'blend' | 'normal' */
  colorMode?: 'blend' | 'normal';
  /** 混合颜色（当colorMode为blend时使用） */
  blendColor?: string;
  /** 查找ID */
  seekId?: string;
  [key: string]: unknown;
}

/**
 * 吸取目标接口
 */
interface SuckTarget {
  /** 实体对象 */
  entity: CustomizedPMInstanceModel | unknown;
  /** 网格ID */
  meshId: string;
  /** 网格名称 */
  meshName?: string;
}

/**
 * 应用目标接口
 */
interface ApplyTarget {
  /** 实体对象 */
  entity: CustomizedPMInstanceModel;
  /** 网格ID */
  meshId?: string;
  [key: string]: unknown;
}

/**
 * 吸取结果接口
 */
interface SuckResult {
  /** 材质数据 */
  materialData?: MaterialData;
  [key: string]: unknown;
}

/**
 * 撤销/重做数据接口
 */
interface UndoRedoData {
  /** 旧值 */
  oldValue?: unknown;
  /** 新值 */
  newValue?: unknown;
}

/**
 * 新DIY策略类
 * 实现材质的吸取、应用以及撤销/重做功能
 */
export declare class NewDiyStrategy {
  /** 策略类型标识 */
  readonly type: 'NewDiyStrategy';

  constructor();

  /**
   * 判断目标是否可以被吸取
   * @param target - 吸取目标对象
   * @returns 是否可吸取
   */
  isSuckable(target: SuckTarget): boolean;

  /**
   * 从目标吸取材质信息
   * @param target - 吸取目标对象
   * @returns 吸取的材质结果，如果无法吸取则返回undefined
   */
  suck(target: SuckTarget): SuckResult | undefined;

  /**
   * 判断材质是否可应用到目标
   * @param target - 应用目标对象
   * @param materialData - 材质数据
   * @returns 是否可应用
   */
  isAppliable(target: ApplyTarget, materialData: unknown): boolean;

  /**
   * 将材质应用到目标
   * @param target - 应用目标对象
   * @param materialData - 材质数据
   * @returns Promise，应用完成后resolve
   */
  apply(target: ApplyTarget, materialData: unknown): Promise<void>;

  /**
   * 获取撤销所需数据
   * @param target - 目标对象
   * @returns 撤销数据
   */
  getUndoData(target: ApplyTarget): unknown;

  /**
   * 获取重做所需数据
   * @param target - 目标对象
   * @returns 重做数据
   */
  getRedoData(target: ApplyTarget): unknown;

  /**
   * 执行撤销操作
   * @param target - 目标对象
   * @param undoData - 撤销数据
   */
  undo(target: ApplyTarget, undoData?: unknown): void;

  /**
   * 执行重做操作
   * @param target - 目标对象
   * @param redoData - 重做数据
   */
  redo(target: ApplyTarget, redoData?: unknown): void;

  /**
   * 获取材质信息（私有方法）
   * @param entity - 自定义产品实例模型
   * @param meshId - 网格ID
   * @returns 材质信息，如果不存在则返回undefined
   * @private
   */
  private _getMaterialInfo(
    entity: CustomizedPMInstanceModel,
    meshId: string
  ): MaterialInfo | undefined;

  /**
   * 获取铺贴信息（私有方法）
   * @param target - 吸取目标对象
   * @returns 铺贴信息，如果不存在则返回false或undefined
   * @private
   */
  private _getPaveInfo(target: SuckTarget): unknown;
}