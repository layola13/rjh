/**
 * 目录树根节点ID枚举
 * 定义了各种分类目录的根节点标识符
 */
export interface TreeIdEnum {
  /** 通用分类树根节点ID，从应用配置动态获取 */
  readonly GeneralCategoryRoot: string;
  
  /** 我的分类树根节点ID，从应用配置动态获取 */
  readonly MyCategoryRoot: string;
  
  /** 橱柜分类树根节点ID，从应用配置动态获取 */
  readonly CabinetCategoryRoot: string;
  
  /** 衣柜分类树根节点ID，从应用配置动态获取 */
  readonly WardrobeCategoryRoot: string;
  
  /** 铺贴分类根节点ID */
  readonly PaveCategoryRoot: "192bcf0c-d231-4ebb-8fbb-d147d428e7e7";
  
  /** 水刀瓷砖分类根节点ID */
  readonly WaterJetTilesCategoryRoot: "5e237350-61b0-46b2-9568-178158a66da8";
  
  /** 吊顶分类根节点ID */
  readonly CeilingCategoryRoot: "9f6ac6c5-1957-4789-8619-d2a5e816f13a";
  
  /** 灯光分类根节点ID */
  readonly LightsCategoryRoot: "bf76fe95-1b38-458e-9235-8e876bf8fb01";
  
  /** 橱柜应用分类根节点ID */
  readonly CabinetApplyCategoryRoot: "63d813d7-6442-5a22-9ade-848e35543079";
  
  /** 衣柜应用分类根节点ID */
  readonly WardrobeApplyCategoryRoot: "97a58467-dfb3-5469-8e5b-634c45b4b851";
  
  /** 材质替换分类根节点ID */
  readonly MaterialReplaceCategoryRoot: "20a3b3c7-e75c-4b34-ba02-aa9c0446d2dd";
  
  /** 高级模型库根节点ID */
  readonly PremiumModelLibraryRoot: "ccce6647-a18b-4945-8268-263a51222841";
  
  /** 户外分类根节点ID */
  readonly OutdoorCategoryRoot: "4d41f306-8eea-47e2-b098-bf38b6a68ceb";
  
  /** 屋顶材质分类根节点ID */
  readonly RoofMaterialCategoryRoot: "c72760a9-18e7-4f3f-a9be-ea357eb20b45";
}

/**
 * 自定义属性ID枚举
 * 定义了各种特殊页面和功能的标识符
 */
export enum CustomAttributeIdEnum {
  /** 专题页面 */
  specialTopic = "specialTopic",
  
  /** 商家模型库 */
  merchantModelLibrary = "merchantModelLibrary",
  
  /** 我的收藏 */
  myFavorites = "myfavorites",
  
  /** 我的自有产品 */
  myOwnProducts = "myownproducts",
  
  /** 最近使用 */
  myRecent = "myrecent",
  
  /** 已购买内容 */
  myPaid = "mypaid",
  
  /** 模型主页 */
  modelHomePage = "homePage",
  
  /** 团队品牌页 */
  teamBrandPage = "teamBrandPage",
  
  /** AI搜索结果 */
  aiResult = "airesult",
  
  /** AI建模器 */
  aiModeler = "aimodeler",
  
  /** AI情绪板 */
  aiMoodboard = "aimoodboard",
  
  /** AI材质 */
  aiMaterial = "aimaterial"
}

/**
 * 菜单ID枚举
 * 定义了应用中各个主要功能模块的标识符
 */
export enum MenuIdEnum {
  /** 绘图功能 */
  draw = "draw",
  
  /** 布局设计 */
  layoutDesign = "layoutDesign",
  
  /** 定制制作 */
  makeCustom = "makeCustom",
  
  /** 样式设计器 */
  styler = "styler",
  
  /** 模型库 */
  modelLibrary = "modelLibrary",
  
  /** 高级模型库 */
  premiumModelLibrary = "premiumModelLibrary",
  
  /** 我的模型库 */
  myModelLibrary = "myModelLibrary",
  
  /** 代理企业模型库 */
  agentEnterpriseModelLibrary = "agentEnterpriseModelLibrary",
  
  /** 代理企业材质库 */
  agentEnterpriseMaterialLibrary = "agentEnterpriseMaterialLibrary",
  
  /** 企业模型库 */
  enterpriseModelLibrary = "enterpriseModelLibrary",
  
  /** 商业模型库 */
  businessModelLibrary = "businessModelLibrary",
  
  /** 第三方装修模型库 */
  tpzzModelLibrary = "tpzzModelLibrary"
}

/**
 * 不显示迷你文本信息卡的分类类型枚举
 * 按照模型类型分组的内容类型数组配置
 */
export interface NotShowMiniTextInfoCardCategoryTypeEnum {
  /** 建筑构造类型 - 包含门窗、楼梯、障碍物等基础建筑元素 */
  readonly construct: ReadonlyArray<string>;
  
  /** 家具类型 - 包含沙发、床、桌子、椅子等家具类别 */
  readonly furniture: ReadonlyArray<string>;
  
  /** 装饰类型 - 包含地毯、植物、艺术品、窗帘等装饰元素 */
  readonly decoration: ReadonlyArray<string>;
  
  /** 照明类型 - 包含各类灯具 */
  readonly lighting: ReadonlyArray<string>;
}

/**
 * 场景类型枚举
 * 定义了不同的材质和模型场景分类
 */
export interface SceneType {
  /** 2D材质类型 */
  readonly Material: "2d";
  
  /** 3D模型类型 */
  readonly Model: "3d";
  
  /** 踢脚线分类类型 */
  readonly Baseboard: string;
  
  /** 檐口/顶角线分类类型 */
  readonly Cornice: string;
  
  /** 顶轨分类类型 */
  readonly TopRail: string;
  
  /** 缝隙填充物分类类型 */
  readonly SeamFiller: string;
  
  /** 口袋门分类类型 */
  readonly Pocket: string;
  
  /** 水刀瓷砖分类类型 */
  readonly WaterjetTiles: string;
  
  /** 隐蔽工程(水电)模式分类类型 */
  readonly Concealedwork: string;
}

/**
 * 模块默认导出配置
 * 整合了所有分类和配置枚举
 */
export interface CatalogConfiguration {
  /** 目录树ID枚举 */
  readonly TreeIdEnum: TreeIdEnum;
  
  /** 自定义属性ID枚举 */
  readonly CustomAttributeIdEnum: typeof CustomAttributeIdEnum;
  
  /** 菜单ID枚举 */
  readonly MenuIdEnum: typeof MenuIdEnum;
  
  /** 不显示迷你文本信息卡的分类类型配置 */
  readonly NotShowMiniTextInfoCardCategoryTypeEnum: NotShowMiniTextInfoCardCategoryTypeEnum;
  
  /** 场景类型配置 */
  readonly SceneType: SceneType;
}

/**
 * 模块默认导出
 * 提供应用目录配置的统一访问接口
 */
declare const catalogConfiguration: CatalogConfiguration;

export default catalogConfiguration;