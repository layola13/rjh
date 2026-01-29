export interface TreeIdEnum {
  readonly GeneralCategoryRoot: string;
  readonly MyCategoryRoot: string;
  readonly CabinetCategoryRoot: string;
  readonly WardrobeCategoryRoot: string;
  readonly PaveCategoryRoot: string;
  readonly WaterJetTilesCategoryRoot: string;
  readonly CeilingCategoryRoot: string;
  readonly LightsCategoryRoot: string;
  readonly CabinetApplyCategoryRoot: string;
  readonly WardrobeApplyCategoryRoot: string;
  readonly MaterialReplaceCategoryRoot: string;
  readonly PremiumModelLibraryRoot: string;
  readonly OutdoorCategoryRoot: string;
  readonly RoofMaterialCategoryRoot: string;
}

export enum CustomAttributeIdEnum {
  specialTopic = "specialTopic",
  merchantModelLibrary = "merchantModelLibrary",
  myFavorites = "myfavorites",
  myOwnProducts = "myownproducts",
  myRecent = "myrecent",
  myPaid = "mypaid",
  modelHomePage = "homePage",
  teamBrandPage = "teamBrandPage",
  aiResult = "airesult",
  aiModeler = "aimodeler",
  aiMoodboard = "aimoodboard",
  aiMaterial = "aimaterial"
}

export enum MenuIdEnum {
  draw = "draw",
  layoutDesign = "layoutDesign",
  makeCustom = "makeCustom",
  styler = "styler",
  modelLibrary = "modelLibrary",
  premiumModelLibrary = "premiumModelLibrary",
  myModelLibrary = "myModelLibrary",
  agentEnterpriseModelLibrary = "agentEnterpriseModelLibrary",
  agentEnterpriseMaterialLibrary = "agentEnterpriseMaterialLibrary",
  enterpriseModelLibrary = "enterpriseModelLibrary",
  businessModelLibrary = "businessModelLibrary",
  tpzzModelLibrary = "tpzzModelLibrary"
}

export interface NotShowMiniTextInfoCardCategoryTypeEnum {
  construct: ReadonlyArray<HSCatalog.ContentTypeEnum | string>;
  furniture: ReadonlyArray<HSCatalog.ContentTypeEnum>;
  decoration: ReadonlyArray<HSCatalog.ContentTypeEnum>;
  lighting: ReadonlyArray<HSCatalog.ContentTypeEnum>;
}

export interface SceneType {
  Material: string;
  Model: string;
  Baseboard: HSCatalog.CategoryTypeEnum;
  Cornice: HSCatalog.CategoryTypeEnum;
  TopRail: HSCatalog.CategoryTypeEnum;
  SeamFiller: HSCatalog.CategoryTypeEnum;
  Pocket: HSCatalog.CategoryTypeEnum;
  WaterjetTiles: HSCatalog.CategoryTypeEnum;
  Concealedwork: HSCatalog.CategoryTypeEnum;
}

export interface Config {
  TreeIdEnum: TreeIdEnum;
  CustomAttributeIdEnum: typeof CustomAttributeIdEnum;
  MenuIdEnum: typeof MenuIdEnum;
  NotShowMiniTextInfoCardCategoryTypeEnum: NotShowMiniTextInfoCardCategoryTypeEnum;
  SceneType: SceneType;
}

import { HSCatalog } from './catalog-types';

const TreeIdEnum: TreeIdEnum = {
  get GeneralCategoryRoot(): string {
    return HSApp.Config.DEFAULT_CATEGORY_TREE_ID;
  },
  get MyCategoryRoot(): string {
    return HSApp.Config.DEFAULT_MY_CATEGORY_TREE_ID;
  },
  get CabinetCategoryRoot(): string {
    return HSApp.Config.CABINET_CATEGORY_TREE_ID;
  },
  get WardrobeCategoryRoot(): string {
    return HSApp.Config.WARDROBE_CATEGORY_TREE_ID;
  },
  PaveCategoryRoot: "192bcf0c-d231-4ebb-8fbb-d147d428e7e7",
  WaterJetTilesCategoryRoot: "5e237350-61b0-46b2-9568-178158a66da8",
  CeilingCategoryRoot: "9f6ac6c5-1957-4789-8619-d2a5e816f13a",
  LightsCategoryRoot: "bf76fe95-1b38-458e-9235-8e876bf8fb01",
  CabinetApplyCategoryRoot: "63d813d7-6442-5a22-9ade-848e35543079",
  WardrobeApplyCategoryRoot: "97a58467-dfb3-5469-8e5b-634c45b4b851",
  MaterialReplaceCategoryRoot: "20a3b3c7-e75c-4b34-ba02-aa9c0446d2dd",
  PremiumModelLibraryRoot: "ccce6647-a18b-4945-8268-263a51222841",
  OutdoorCategoryRoot: "4d41f306-8eea-47e2-b098-bf38b6a68ceb",
  RoofMaterialCategoryRoot: "c72760a9-18e7-4f3f-a9be-ea357eb20b45"
};

const NotShowMiniTextInfoCardCategoryTypeEnum: NotShowMiniTextInfoCardCategoryTypeEnum = {
  construct: [
    HSCatalog.ContentTypeEnum.Door,
    HSCatalog.ContentTypeEnum.Window,
    HSCatalog.ContentTypeEnum.CornerWindow,
    HSCatalog.ContentTypeEnum.CornerFlatWindow,
    HSCatalog.ContentTypeEnum.BuildElement,
    "obstacle",
    "stair",
    HSCatalog.ContentTypeEnum.GeneralRug,
    HSCatalog.ContentTypeEnum.GeneralOnTheFloor,
    HSCatalog.ContentTypeEnum.GeneralOnTopOfOthers,
    HSCatalog.ContentTypeEnum.GeneralAttachToWall,
    HSCatalog.ContentTypeEnum.GeneralAttachToCeiling,
    HSCatalog.ContentTypeEnum.CustomizedBackgroundModel,
    HSCatalog.ContentTypeEnum.CabinetHandleType0,
    HSCatalog.ContentTypeEnum.CabinetHandleType1
  ],
  furniture: [
    HSCatalog.ContentTypeEnum.Sofa,
    HSCatalog.ContentTypeEnum.Bed,
    HSCatalog.ContentTypeEnum.Table,
    HSCatalog.ContentTypeEnum.MediaUnit,
    HSCatalog.ContentTypeEnum.Chair,
    HSCatalog.ContentTypeEnum.StorageUnit,
    HSCatalog.ContentTypeEnum.Armoire,
    HSCatalog.ContentTypeEnum.Accessory,
    HSCatalog.ContentTypeEnum.Shelf,
    HSCatalog.ContentTypeEnum.Cabinet,
    HSCatalog.ContentTypeEnum.OutdoorFurniture
  ],
  decoration: [
    HSCatalog.ContentTypeEnum.Rug,
    HSCatalog.ContentTypeEnum.Plants,
    HSCatalog.ContentTypeEnum.Art,
    HSCatalog.ContentTypeEnum.Mirror,
    HSCatalog.ContentTypeEnum.Recreation,
    HSCatalog.ContentTypeEnum.Curtain
  ],
  lighting: [
    HSCatalog.ContentTypeEnum.Lighting
  ]
};

const SceneType: SceneType = {
  Material: "2d",
  Model: "3d",
  Baseboard: HSCatalog.CategoryTypeEnum.SC_Baseboard,
  Cornice: HSCatalog.CategoryTypeEnum.SC_Cornice,
  TopRail: HSCatalog.CategoryTypeEnum.SC_Top_Rail,
  SeamFiller: HSCatalog.CategoryTypeEnum.SC_Seam_Filler,
  Pocket: HSCatalog.CategoryTypeEnum.SC_Pocket,
  WaterjetTiles: HSCatalog.CategoryTypeEnum.SC_Mixpaint_WaterjetTiles,
  Concealedwork: HSCatalog.CategoryTypeEnum.SC_Water_Electric_Mode
};

const config: Config = {
  TreeIdEnum,
  CustomAttributeIdEnum,
  MenuIdEnum,
  NotShowMiniTextInfoCardCategoryTypeEnum,
  SceneType
};

export default config;