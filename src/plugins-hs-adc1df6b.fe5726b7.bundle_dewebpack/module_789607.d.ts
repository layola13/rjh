/**
 * 材质变更请求类
 * 用于处理3D模型面部材质的变更操作，支持撤销/重做功能
 */
declare class MaterialChangeRequest extends HSCore.Transaction.Request {
  /**
   * 材质数据
   */
  private materialData: unknown;

  /**
   * 目标面部对象
   */
  private face: Face;

  /**
   * 成型类型
   */
  private moldingType: string;

  /**
   * 保存的原始材质，用于撤销/重做操作
   */
  private _savedMaterial?: HSCore.Material.Material;

  /**
   * 构造函数
   * @param materialData - 新材质的数据
   * @param face - 要应用材质的面部对象
   * @param moldingType - 成型类型标识符
   */
  constructor(materialData: unknown, face: Face, moldingType: string);

  /**
   * 提交材质变更
   * 创建新材质并应用到目标面部
   */
  onCommit(): void;

  /**
   * 撤销材质变更
   * 恢复到之前保存的材质状态
   */
  onUndo(): void;

  /**
   * 重做材质变更
   * 重新应用之前保存的材质
   */
  onRedo(): void;

  /**
   * 内部方法：执行材质变更
   * @param material - 要应用的材质对象
   * @private
   */
  private _changeMaterial(material: HSCore.Material.Material): void;
}

/**
 * 面部对象接口
 * 表示3D模型中可以应用材质的面部区域
 */
interface Face {
  /**
   * 获取指定类型的成型对象列表
   * @param moldingType - 成型类型
   * @returns 成型对象数组
   */
  getMolding(moldingType: string): Molding[] | null | undefined;

  /**
   * 通知实体已修改
   * 触发相关的更新和重绘逻辑
   */
  onEntityDirty(): void;
}

/**
 * 成型对象接口
 * 代表面部的具体成型部分，可以持有材质
 */
interface Molding {
  /**
   * 当前应用的材质
   */
  material: HSCore.Material.Material;
}

/**
 * HSCore命名空间声明
 */
declare namespace HSCore {
  namespace Material {
    /**
     * 材质类
     */
    class Material {
      /**
       * 从数据创建材质实例
       * @param data - 材质数据
       * @returns 材质实例
       */
      static create(data: unknown): Material;
    }
  }

  namespace Transaction {
    /**
     * 请求基类
     * 提供事务操作的基础结构（提交、撤销、重做）
     */
    abstract class Request {
      /**
       * 提交操作
       */
      abstract onCommit(): void;

      /**
       * 撤销操作
       */
      abstract onUndo(): void;

      /**
       * 重做操作
       */
      abstract onRedo(): void;
    }
  }
}

export default MaterialChangeRequest;