/**
 * 清除自定义模型材质请求类
 * 用于处理模型面材质的清除操作，支持撤销/重做功能
 */

import { HSCore } from './HSCore';

/**
 * 面材质数据结构
 */
interface FaceMaterialData {
  /** 面ID */
  faceId: number;
  /** 材质数据 */
  materialData: unknown;
}

/**
 * 混合绘制材质接口
 */
interface MixPaint {
  /** 清除材质数据 */
  clear(defaultMaterialData: unknown): void;
  /** 获取关联的面ID列表 */
  getFaceIds(): number[];
}

/**
 * 材质数据接口
 */
interface MaterialData {
  /** 混合绘制实例 */
  mixpaint?: MixPaint;
}

/**
 * 实体接口 - 表示可应用材质的3D模型实体
 */
interface IEntity {
  /** 获取指定面的材质 */
  getFaceMaterial(faceId: number): MaterialData;
  /** 移除指定面的材质 */
  removeFaceMaterial(faceId: number): void;
  /** 设置材质数据映射 */
  setMaterialData(materialMap: Map<number, unknown>): void;
  /** 获取默认材质数据 */
  getDefaultMaterialData(): unknown;
  /** 标记面材质为脏数据（需要更新） */
  dirtyFaceMaterial(faceIds: number[]): void;
}

/**
 * 混合绘制工具类接口
 */
interface IMixPaintUtil {
  /** 提取自定义模型面组ID */
  extractCustomizedModelFaceGroupIds(entity: IEntity, faceIds: number[]): number[];
}

/**
 * 材质刷工具类接口
 */
interface IMaterialBrushUtil {
  /** 获取DIY面材质转储数据 */
  getDiyFaceMaterialDump(entity: IEntity, faceIds: number[]): FaceMaterialData[];
  /** 设置DIY面材质转储数据 */
  setDiyFaceMaterialDump(entity: IEntity, dumpData: FaceMaterialData[]): void;
}

/**
 * 清除自定义模型材质请求
 * 继承自HSCore事务请求基类，实现材质清除的撤销/重做功能
 */
export declare class ClearCustomizedModelMaterialRequest extends HSCore.Transaction.Request {
  /** 目标实体 */
  private readonly _entity: IEntity;
  
  /** 目标面ID */
  private readonly _faceId: number;
  
  /** 操作前的材质状态快照 */
  private _befores: FaceMaterialData[];
  
  /** 操作后的材质状态快照 */
  private _afters: FaceMaterialData[];
  
  /** 混合绘制工具实例 */
  private readonly MixPaintUtil: IMixPaintUtil;
  
  /** 材质刷工具实例 */
  private readonly MaterialBrushUtil: IMaterialBrushUtil;

  /**
   * 构造函数
   * @param entity - 要操作的实体对象
   * @param faceId - 要清除材质的面ID
   */
  constructor(entity: IEntity, faceId: number);

  /**
   * 提交操作 - 执行材质清除
   * 保存操作前状态，清除指定面的材质，保存操作后状态
   */
  onCommit(): void;

  /**
   * 撤销操作 - 恢复到操作前状态
   */
  onUndo(): void;

  /**
   * 重做操作 - 恢复到操作后状态
   */
  onRedo(): void;
}