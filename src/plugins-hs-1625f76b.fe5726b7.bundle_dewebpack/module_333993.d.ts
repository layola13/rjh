/**
 * 添加物品至画布的复合请求类
 * @module module_333993
 */

/**
 * 物品元数据信息
 */
interface ItemMeta {
  /** 产品类型 */
  productType?: HSCatalog.ProductTypeEnum;
  /** 内容类型 */
  contentType?: HSCatalog.ContentType;
}

/**
 * 三维向量（位置/旋转/缩放）
 */
interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * 材质映射表
 */
type MaterialMap = Map<string | number, unknown>;

/**
 * 添加内容请求类
 * 用于处理向画布添加各类物品（组件、模型、开口等）的事务请求
 * 
 * @extends HSCore.Transaction.Common.CompositeRequest
 */
export default class AddContentRequest extends HSCore.Transaction.Common.CompositeRequest {
  /**
   * 物品元数据
   * @private
   */
  private _meta: ItemMeta;

  /**
   * 物品位置坐标
   * @private
   */
  private _position: Vector3;

  /**
   * 物品旋转角度
   * @private
   */
  private _rotation: Vector3;

  /**
   * 物品缩放比例
   * @private
   */
  private _scale: Vector3;

  /**
   * 宿主对象
   * @private
   */
  private _host: unknown;

  /**
   * 材质映射表
   * @private
   */
  private _materialMap: MaterialMap;

  /**
   * 物品数据
   * @private
   */
  private _data: unknown;

  /**
   * 额外数据
   * @private
   */
  private _extraData: unknown;

  /**
   * 构造函数
   * 
   * @param meta - 物品元数据信息
   * @param position - 物品在三维空间中的位置坐标
   * @param rotation - 物品的旋转角度（欧拉角）
   * @param scale - 物品的缩放比例
   * @param host - 宿主对象，物品将附加到此对象上
   * @param materialMap - 材质映射表，可选，默认为空Map
   * @param data - 物品的附加数据
   * @param extraData - 额外的自定义数据
   */
  constructor(
    meta: ItemMeta,
    position: Vector3,
    rotation: Vector3,
    scale: Vector3,
    host: unknown,
    materialMap?: MaterialMap,
    data?: unknown,
    extraData?: unknown
  );

  /**
   * 提交请求
   * 根据物品的产品类型和内容类型，创建对应的添加请求并执行
   * 
   * 支持的产品类型：
   * - Assembly: 组件
   * - PAssembly: 参数化组件
   * - PAssemblyPackage: 参数化组件包
   * - DAssembly: 动态组件
   * - Model: 模型（包括开口、窗户、障碍物、梁等）
   * 
   * @returns 父类的 onCommit 执行结果
   */
  onCommit(): unknown;

  /**
   * 获取请求描述信息
   * 
   * @returns 返回固定字符串 "添加物品至画布"
   */
  getDescription(): string;

  /**
   * 获取请求分类
   * 
   * @returns 返回日志分组类型：内容操作
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * 全局命名空间：HSFPConstants
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  enum RequestType {
    AddContent = 'AddContent',
    AddAssembly = 'AddAssembly',
    AddPAssembly = 'AddPAssembly',
    AddPAssemblyPackage = 'AddPAssemblyPackage',
    AddDAssembly = 'AddDAssembly',
    AddParametricOpening = 'AddParametricOpening',
    AddOpening = 'AddOpening',
    AddCornerWindow = 'AddCornerWindow',
    AddBayWindow = 'AddBayWindow',
    AddCornerFlatWindow = 'AddCornerFlatWindow',
    AddPOrdinaryWindow = 'AddPOrdinaryWindow',
    AddStructure = 'AddStructure',
    AddBeam = 'AddBeam',
    AddMeshContent = 'AddMeshContent'
  }

  /**
   * 日志分组类型枚举
   */
  enum LogGroupTypes {
    ContentOperation = 'ContentOperation'
  }
}

/**
 * 全局命名空间：HSCatalog
 */
declare namespace HSCatalog {
  /**
   * 产品类型枚举
   */
  enum ProductTypeEnum {
    Assembly = 'Assembly',
    PAssembly = 'PAssembly',
    PAssemblyPackage = 'PAssemblyPackage',
    DAssembly = 'DAssembly',
    Model = 'Model'
  }

  /**
   * 内容类型枚举
   */
  enum ContentTypeEnum {
    ext_opening = 'ext_opening',
    CornerWindow = 'CornerWindow',
    BayWindow = 'BayWindow',
    CornerFlatWindow = 'CornerFlatWindow',
    POrdinaryWindow = 'POrdinaryWindow',
    ext_Obstacle = 'ext_Obstacle',
    Beam = 'Beam',
    MeshContent = 'MeshContent'
  }

  /**
   * 内容类型类
   */
  interface ContentType {
    /**
     * 检查是否为指定类型
     * @param type - 要检查的内容类型
     */
    isTypeOf(type: ContentTypeEnum): boolean;
  }
}

/**
 * 全局命名空间：HSCore
 */
declare namespace HSCore {
  namespace Transaction.Common {
    /**
     * 复合请求基类
     */
    class CompositeRequest {
      /** 管理器实例 */
      protected mgr: unknown;

      /**
       * 追加子请求
       * @param request - 子请求对象
       */
      protected append(request: unknown): unknown;

      /**
       * 创建请求
       * @param type - 请求类型
       * @param args - 请求参数数组
       */
      protected createRequest(type: HSFPConstants.RequestType, args: unknown[]): unknown;
    }
  }

  namespace Util.Content {
    /**
     * 判断是否为参数化开口
     * @param meta - 物品元数据
     */
    function isParametricOpening(meta: ItemMeta): boolean;

    /**
     * 判断是否为转角窗
     * @param meta - 物品元数据
     */
    function isCornerWindow(meta: ItemMeta): boolean;
  }
}