/**
 * 材质数据更新事务请求
 * 用于撤销/重做系统中管理3D内容的材质变更
 */

/**
 * 材质映射表类型
 * 键为材质ID，值为材质数据对象
 */
type MaterialMap = Record<string, unknown>;

/**
 * 3D内容对象接口
 * 提供材质数据的设置能力
 */
interface IContent {
  /**
   * 设置材质数据
   * @param materials - 材质映射表
   */
  setMaterialData(materials: MaterialMap): void;
}

/**
 * 材质更新事务请求类
 * 继承自HSCore事务系统，支持提交、撤销和重做操作
 */
declare class MaterialUpdateTransactionRequest extends HSCore.Transaction.Request {
  /**
   * 要更新材质的3D内容对象
   */
  private readonly _content: IContent;

  /**
   * 原始材质映射表（用于撤销）
   */
  private readonly _originalMaterialMap: MaterialMap;

  /**
   * 更新后的材质映射表（用于提交和重做）
   */
  private readonly _updatedMaterialMap: MaterialMap;

  /**
   * 构造函数
   * @param content - 3D内容对象
   * @param originalMaterialMap - 修改前的材质数据
   * @param updatedMaterialMap - 修改后的材质数据
   */
  constructor(
    content: IContent,
    originalMaterialMap: MaterialMap,
    updatedMaterialMap: MaterialMap
  );

  /**
   * 内部方法：更新材质数据
   * @param materials - 要应用的材质映射表
   */
  private _updateMaterials(materials: MaterialMap): void;

  /**
   * 提交事务时调用
   * 应用更新后的材质数据
   */
  onCommit(): void;

  /**
   * 撤销事务时调用
   * 恢复原始材质数据
   */
  onUndo(): void;

  /**
   * 重做事务时调用
   * 重新应用更新后的材质数据
   */
  onRedo(): void;
}

export default MaterialUpdateTransactionRequest;