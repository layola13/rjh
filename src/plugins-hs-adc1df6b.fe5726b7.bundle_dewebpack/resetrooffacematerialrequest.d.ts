/**
 * 重置参数化屋顶面材质请求
 * 用于管理屋顶面材质的重置操作，支持撤销/重做功能
 */

import { HSCore } from './HSCore';

/**
 * 材质数据接口
 * 描述面的默认材质信息
 */
interface MaterialData {
  /** 材质对象 */
  material: Material;
  /** 草图组件ID */
  sketchComId: string | number;
}

/**
 * 材质接口
 * 表示可克隆的材质对象
 */
interface Material {
  /** 克隆材质 */
  clone(): Material;
}

/**
 * 实体接口
 * 定义屋顶实体需要实现的材质相关方法
 */
interface RoofEntity {
  /**
   * 根据网格键获取面标签
   * @param meshKey - 网格键
   * @returns 面标签
   */
  getFaceTagByMeshKey(meshKey: string): string;

  /**
   * 根据标签设置面材质
   * @param tag - 面标签
   * @param material - 材质对象
   */
  setFaceMaterialByTag(tag: string, material: Material): void;

  /**
   * 设置材质数据
   * @param tag - 面标签
   * @param material - 材质对象
   * @param sketchComId - 草图组件ID
   */
  setMaterialData(tag: string, material: Material, sketchComId: string | number): void;

  /**
   * 移除面材质
   * @param faceId - 面ID
   */
  removeFaceMaterial(faceId: string): void;

  /**
   * 获取面的默认材质数据
   * @param faceId - 面ID
   * @returns 材质数据
   */
  getFaceDefaultMaterialData(faceId: string): Material;

  /**
   * 标记几何体为脏状态（需要更新）
   * @param faceIds - 可选的面ID数组
   */
  dirtyGeometry(faceIds?: string[]): void;

  /**
   * 标记裁剪几何体为脏状态
   */
  dirtyClipGeometry(): void;

  /**
   * 标记面材质为脏状态
   */
  dirtyFaceMaterials(): void;
}

/**
 * 重置屋顶面材质请求类
 * 继承自状态请求基类，实现材质重置的事务操作
 */
export declare class ResetRoofFaceMaterialRequest extends HSCore.Transaction.Common.StateRequest {
  /** 目标实体对象 */
  private _entity: RoofEntity;

  /** 需要重置材质的面ID列表 */
  private _faceIds: string[];

  /** 默认材质映射表（面标签 -> 材质数据） */
  private _defaultMaterialMap?: Map<string, MaterialData>;

  /** 面材质映射表（面标签 -> 材质对象） */
  private _facesMaterialMap?: Map<string, Material>;

  /**
   * 构造函数
   * @param entity - 屋顶实体对象
   * @param faceIds - 需要重置材质的面ID数组
   * @param defaultMaterialMap - 默认材质映射表
   * @param facesMaterialMap - 面材质映射表
   */
  constructor(
    entity: RoofEntity,
    faceIds: string[],
    defaultMaterialMap?: Map<string, MaterialData>,
    facesMaterialMap?: Map<string, Material>
  );

  /**
   * 提交操作时执行
   * 遍历所有面ID，根据优先级应用材质：
   * 1. 优先使用facesMaterialMap中的材质
   * 2. 其次使用defaultMaterialMap中的默认材质
   * 3. 最后使用实体自身的默认材质
   */
  onCommit(): void;

  /**
   * 获取操作描述
   * @returns 操作的中文描述
   */
  getDescription(): string;

  /**
   * 是否可以事务化字段
   * @returns 始终返回true，表示支持事务
   */
  canTransactField(): boolean;

  /**
   * 撤销操作时执行
   * 标记相关几何体和材质为脏状态，触发视图更新
   */
  onUndo(): void;

  /**
   * 重做操作时执行
   * 标记相关几何体和材质为脏状态，触发视图更新
   */
  onRedo(): void;
}