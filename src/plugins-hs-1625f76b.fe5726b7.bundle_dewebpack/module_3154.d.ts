/**
 * 材质批量应用事务
 * 用于将材质应用到相同模型的多个实体
 */
declare module 'module_3154' {
  import { HSCore } from '@hsf/core';

  /**
   * 材质数据映射表
   * Key: 材质槽位标识
   * Value: 材质数据对象
   */
  type MaterialDataMap = Map<string, unknown>;

  /**
   * 支持材质操作的实体接口
   */
  interface IMaterialEntity {
    /**
     * 获取材质列表
     * @returns 材质列表，每项为 [槽位ID, 材质数据] 元组
     */
    getMaterialList(): Array<[string, unknown]>;

    /**
     * 设置指定槽位的材质
     * @param slot - 材质槽位标识
     * @param material - 材质数据，undefined表示清除材质
     */
    setMaterial(slot: string, material: unknown | undefined): void;
  }

  /**
   * 材质批量应用事务类
   * 继承自HSCore事务基类，用于批量设置实体材质
   */
  export default class MaterialBatchTransaction extends HSCore.Transaction.Common.StateRequest {
    /**
     * 需要应用材质的实体列表
     */
    readonly entities: IMaterialEntity[];

    /**
     * 材质数据映射表
     */
    readonly materialDataMap: MaterialDataMap;

    /**
     * 构造函数
     * @param entities - 实体列表，默认空数组
     * @param materialDataMap - 材质数据映射表
     */
    constructor(entities?: IMaterialEntity[], materialDataMap?: MaterialDataMap);

    /**
     * 为单个实体设置材质
     * 如果materialDataMap为空，则清除实体所有材质
     * @param entity - 目标实体
     */
    setMaterials(entity: IMaterialEntity): void;

    /**
     * 批量为所有实体设置材质
     */
    setEntitiesMaterials(): void;

    /**
     * 提交事务
     * 执行材质应用操作并调用父类提交逻辑
     */
    onCommit(): void;

    /**
     * 是否可以事务化该字段
     * @returns 始终返回true
     */
    canTransactField(): boolean;

    /**
     * 获取事务描述信息
     * @returns 事务描述文本
     */
    getDescription(): string;

    /**
     * 获取事务分类
     * @returns 日志分组类型（内容操作）
     */
    getCategory(): string;
  }
}