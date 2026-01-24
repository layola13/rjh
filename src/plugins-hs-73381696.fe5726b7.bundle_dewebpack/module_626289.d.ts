/**
 * 窗帘材质吸取策略
 * 负责处理窗帘实体的材质吸取、应用及撤销/重做操作
 */

import type { BaseStrategy } from './BaseStrategy';

/**
 * 吸取目标信息
 */
interface SuckTarget {
  /** 目标实体 */
  entity: HSCore.Model.Curtain;
  /** 网格ID */
  meshId: string;
}

/**
 * 应用目标信息
 */
interface ApplyTarget {
  /** 目标实体 */
  entity: HSCore.Model.Curtain;
  /** 网格ID */
  meshId: string;
}

/**
 * 吸取的材质信息
 */
interface SuckInfo {
  /** 材质数据 */
  materialData?: {
    /** 纹理URI */
    textureURI?: string;
    [key: string]: unknown;
  };
}

/**
 * 撤销/重做数据结构
 * key为窗帘组件枚举值，value为对应的材质数据
 */
type UndoRedoData = Partial<Record<
  keyof typeof HSCore.Model.CurtainComponentEnum,
  ReturnType<HSCore.Material.Material['getMaterialData']> | undefined
>>;

/**
 * 窗帘材质策略类
 * 继承自BaseStrategy，实现窗帘组件的材质吸取和应用功能
 */
declare class CurtainStrategy extends BaseStrategy {
  /** 策略类型标识 */
  readonly type: 'CurtainStrategy';

  constructor();

  /**
   * 判断目标是否可吸取
   * @param target - 吸取目标对象
   * @returns 如果目标是窗帘实体且包含有效材质则返回true
   */
  isSuckable(target: SuckTarget): boolean;

  /**
   * 吸取材质数据
   * @param target - 吸取目标对象
   * @returns 包含材质数据的对象，如果无法吸取则返回undefined
   */
  suck(target: SuckTarget): SuckInfo | undefined;

  /**
   * 判断材质是否可应用到目标
   * @param target - 应用目标对象
   * @param suckInfo - 吸取的材质信息
   * @returns 如果目标是窗帘实体且材质数据有效（包含非DataURL的纹理URI）则返回true
   */
  isAppliable(target: ApplyTarget, suckInfo?: SuckInfo): boolean;

  /**
   * 应用材质到目标
   * @param target - 应用目标对象
   * @param suckInfo - 吸取的材质信息
   * @returns 应用失败时返回false
   */
  apply(target: ApplyTarget, suckInfo: SuckInfo): boolean | void;

  /**
   * 获取撤销操作所需数据
   * @param target - 目标对象
   * @returns 当前所有组件的材质数据快照
   */
  getUndoData(target: { entity: HSCore.Model.Curtain }): UndoRedoData;

  /**
   * 获取重做操作所需数据
   * @param target - 目标对象
   * @returns 当前所有组件的材质数据快照
   */
  getRedoData(target: { entity: HSCore.Model.Curtain }): UndoRedoData;

  /**
   * 执行撤销操作
   * @param target - 目标对象
   * @param data - 撤销数据
   */
  undo(target: { entity: HSCore.Model.Curtain }, data: UndoRedoData): void;

  /**
   * 执行重做操作
   * @param target - 目标对象
   * @param data - 重做数据
   */
  redo(target: { entity: HSCore.Model.Curtain }, data: UndoRedoData): void;

  /**
   * 内部方法：执行撤销或重做操作
   * @param entity - 窗帘实体
   * @param data - 撤销/重做数据
   * @private
   */
  private _undoRedo(entity: HSCore.Model.Curtain, data: UndoRedoData): void;

  /**
   * 内部方法：获取撤销/重做数据
   * @param entity - 窗帘实体
   * @returns 所有组件的材质数据
   * @private
   */
  private _getUndoRedoData(entity: HSCore.Model.Curtain): UndoRedoData;

  /**
   * 内部方法：获取WebGL渲染实体
   * @param entity - 窗帘模型实体
   * @returns WebGL显示列表中的对应实体
   * @private
   */
  private _getWebglEntity(entity: HSCore.Model.Curtain): unknown;

  /**
   * 内部方法：根据网格ID获取组件名称
   * @param webglEntity - WebGL实体
   * @param meshId - 网格ID
   * @returns 匹配的组件名称，未找到则返回undefined
   * @private
   */
  private _getComponentNameByMeshId(
    webglEntity: any,
    meshId: string
  ): keyof typeof HSCore.Model.CurtainComponentEnum | undefined;

  /**
   * 内部方法：设置组件材质
   * @param entity - 窗帘实体
   * @param componentName - 组件名称
   * @param materialData - 材质数据，传入undefined则清空材质
   * @private
   */
  private _setComponentMaterial(
    entity: HSCore.Model.Curtain,
    componentName: keyof typeof HSCore.Model.CurtainComponentEnum,
    materialData: ReturnType<HSCore.Material.Material['getMaterialData']> | undefined
  ): void;
}

export default CurtainStrategy;