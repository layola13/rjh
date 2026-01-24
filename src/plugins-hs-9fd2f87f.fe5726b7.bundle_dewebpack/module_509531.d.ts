/**
 * 定制化建模元数据处理模块
 * 负责处理用户自定义模型的元数据、命名索引管理和上下文菜单操作
 */

declare namespace hsw.plugin.customizedmodeling {
  /**
   * 元数据处理器
   * 管理各类定制化产品的索引计数和数据处理逻辑
   */
  export class MetaProcess {
    /**
     * 可用的背景墙索引计数器
     * @description 用于生成新背景墙的唯一编号
     */
    static availableFeatureWallIndex: number;

    /**
     * 可用的地台索引计数器
     * @description 用于生成新地台的唯一编号
     */
    static availablePlatformIndex: number;

    /**
     * 可用的固定家具索引计数器
     * @description 用于生成新固定家具的唯一编号
     */
    static availableFixedFurnitureIndex: number;

    /**
     * 可用的吊顶索引计数器
     * @description 用于生成新吊顶的唯一编号
     */
    static availableCeilingIndex: number;

    /**
     * 可用的地板索引计数器
     * @description 用于生成新地板的唯一编号
     */
    static availableFloorIndex: number;

    /**
     * 可用的家具索引计数器
     * @description 用于生成新家具的唯一编号
     */
    static availableFurnitureIndex: number;

    /**
     * 可用的个性化模型索引计数器
     * @description 用于生成新个性化模型的唯一编号
     */
    static availablePersonalizedModelIndex: number;

    /**
     * 处理产品元数据
     * @description 解析并转换原始产品数据，添加尺寸、材质贴图、上下文菜单等元信息
     * @param product - 待处理的产品对象
     * @param attribute - 产品属性对象
     * @returns 处理后的产品对象
     */
    static process<T extends CatalogProduct>(
      product: T,
      attribute: ProductAttribute
    ): T;

    /**
     * 迷你处理产品元数据
     * @description 为用户上传的定制化产品添加上下文菜单（编辑/删除）
     * @param product - 待处理的产品对象
     * @param attribute - 产品属性对象
     */
    static miniProcess(
      product: CatalogProduct,
      attribute: ProductAttribute
    ): void;

    /**
     * 获取可用的项目名称
     * @description 根据类别生成唯一的产品名称（如"我的定制1"、"我的定制2"）
     * @param category - 用户数据类别类型
     * @returns Promise，解析为生成的唯一名称
     */
    static getAvailableItemName(
      category: NWTK.api.catalog.UserDataCategoryType
    ): Promise<string>;

    /**
     * 产品操作集合
     */
    static action: {
      /**
       * 编辑产品
       * @description 显示产品重命名对话框
       * @param product - 要编辑的产品对象
       */
      edit(product: CatalogProduct): void;

      /**
       * 删除产品
       * @description 从目录中删除指定产品，显示加载提示和结果反馈
       * @param product - 要删除的产品对象
       * @param contentType - 产品内容类型
       */
      delete(
        product: CatalogProduct,
        contentType: HSCatalog.ContentType
      ): void;
    };
  }

  /**
   * 目录产品接口
   */
  interface CatalogProduct {
    /** 产品唯一标识符 */
    id: string;
    /** 产品名称 */
    name: string;
    /** 内容类型枚举 */
    contentType: HSCatalog.ContentType;
    /** 用户自由数据（包含模型信息、材质贴图等） */
    userFreeData?: UserFreeData;
    /** 定制化产品URL */
    customizedProductUrl?: string;
    /** 单位（米/厘米等） */
    unit?: string;
    /** X方向长度（米） */
    XLength?: number;
    /** Y方向长度（米） */
    YLength?: number;
    /** Z方向长度（米） */
    ZLength?: number;
    /** WebCAD文档数据 */
    webCADDocument?: unknown;
    /** 材质贴图映射表 */
    materialMap?: Record<string, unknown>;
    /** 产品参数 */
    parameters?: unknown;
    /** 是否可缩放 */
    isScalable?: boolean;
    /** 上下文菜单配置 */
    contextmenu?: ContextMenu;
    /** 产品状态码（0-正常，5-禁用等） */
    status?: number;
    /** 状态禁用提示文本 */
    statusDisableText?: string;
  }

  /**
   * 用户自由数据
   */
  interface UserFreeData {
    /** 模型信息 */
    modelInfo?: {
      /** 单位 */
      unit?: string;
      /** X方向长度 */
      XLength: number;
      /** Y方向长度 */
      YLength: number;
      /** Z方向长度 */
      ZLength: number;
    };
    /** 3D模型数据 */
    model3d?: unknown;
    /** 材质贴图映射 */
    materialMap?: Record<string, unknown>;
    /** 产品参数 */
    parameters?: unknown;
  }

  /**
   * 产品属性
   */
  interface ProductAttribute {
    /** 是否为用户上传 */
    isUserUpload: boolean;
  }

  /**
   * 上下文菜单配置
   */
  interface ContextMenu {
    /** 菜单名称 */
    name: string;
    /** 菜单项列表 */
    items: ContextMenuItem[];
  }

  /**
   * 上下文菜单项
   */
  interface ContextMenuItem {
    /** 菜单项ID */
    id: string;
    /** 显示名称 */
    name: string;
    /** 图标路径 */
    icon: string;
    /** 点击回调函数 */
    onclick: (product: CatalogProduct, ...args: unknown[]) => void;
  }
}

/**
 * 支持的定制化内容类型常量
 * @description 包含所有可处理的定制化产品类型枚举值
 */
declare const SUPPORTED_CUSTOMIZED_TYPES: readonly [
  typeof HSCatalog.ContentTypeEnum.CustomizedFeaturewall,
  typeof HSCatalog.ContentTypeEnum.CustomizedPlatform,
  typeof HSCatalog.ContentTypeEnum.CustomizedFixedFurniture,
  typeof HSCatalog.ContentTypeEnum.CustomizedCeiling,
  typeof HSCatalog.ContentTypeEnum.CustomizedFloor,
  typeof HSCatalog.ContentTypeEnum.CustomizedFurniture,
  typeof HSCatalog.ContentTypeEnum.CustomizedPersonalizedModel,
  typeof HSCatalog.ContentTypeEnum.SmartCustomizedCeiling,
  typeof HSCatalog.ContentTypeEnum.Flue,
  typeof HSCatalog.ContentTypeEnum.Riser,
  typeof HSCatalog.ContentTypeEnum.Beam,
  typeof HSCatalog.ContentTypeEnum.SewerPipeRound,
  typeof HSCatalog.ContentTypeEnum.SewerPipeSquare,
  typeof HSCatalog.ContentTypeEnum.ColumnDiyRound,
  typeof HSCatalog.ContentTypeEnum.ColumnDiySquare,
  typeof HSCatalog.ContentTypeEnum.CustomizedBackgroundModel,
  typeof HSCatalog.ContentTypeEnum.CustomizedWainscot,
  typeof HSCatalog.ContentTypeEnum.CustomizedPMInstanceModel
];