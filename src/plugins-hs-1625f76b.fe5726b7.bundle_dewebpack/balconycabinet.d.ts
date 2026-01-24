/**
 * 家具分类模块
 * 
 * 该模块定义了室内设计和家具分类的类型声明，包含60多种家具类别。
 * 每个分类包含名称、分类ID和内容类型标识。
 * 
 * @module BalconyCabinet
 * @moduleId 475344
 */

/**
 * 家具分类项接口
 * 
 * 描述单个家具分类的数据结构
 */
export interface FurnitureCategoryItem {
  /** 家具分类中文名称 */
  name: string;
  
  /** 分类唯一标识符（UUID格式） */
  categoryId: string;
  
  /** 内容类型数组，描述该分类下的具体家具类型 */
  contentType: string[];
}

/**
 * 家具分类数组类型
 * 
 * 表示包含多个家具分类项的数组
 */
export type FurnitoryCategory = FurnitureCategoryItem[];

// ==================== 客厅家具 ====================

/** 多人沙发分类（包括沙发组合、双人/三人/多人沙发、L型/U型沙发、沙发床） */
export const MultiSeatSofa: FurnitoryCategory;

/** 咖啡桌/茶几分类 */
export const CoffeTable: FurnitoryCategory;

/** 角几/边几分类 */
export const SideTable: FurnitoryCategory;

/** 单人沙发分类（包括单人沙发、懒人沙发、贵妃椅、单椅） */
export const SingleSeatSofa: FurnitoryCategory;

/** 凳子/墩子分类 */
export const Stool: FurnitoryCategory;

/** 电视柜分类（包括电视柜及组合） */
export const TVCabinet: FurnitoryCategory;

/** 电视/投影仪分类（壁挂式、台式电视及投影仪） */
export const TVOrProjector: FurnitoryCategory;

/** 边柜分类 */
export const SideCabinet: FurnitoryCategory;

/** 地毯分类（包括普通地毯、满铺地毯、图案地毯、短毛地毯） */
export const Carpet: FurnitoryCategory;

/** 沙发分类（综合多人沙发和咖啡桌） */
export const Sofa: FurnitoryCategory;

// ==================== 餐厅家具 ====================

/** 餐桌分类（包括餐桌及餐桌椅组合） */
export const DiningTable: FurnitoryCategory;

/** 餐椅分类 */
export const DiningChair: FurnitoryCategory;

/** 餐边柜分类 */
export const Buffet: FurnitoryCategory;

/** 餐具分类 */
export const Tableware: FurnitoryCategory;

// ==================== 厨房家具与电器 ====================

/** 冰箱分类（包括冰箱和冰柜） */
export const Refrigerator: FurnitoryCategory;

/** 吊灯分类 */
export const Chandelier: FurnitoryCategory;

/** 咖啡机分类 */
export const CoffeeMachine: FurnitoryCategory;

/** 饮水机分类 */
export const WaterDispenser: FurnitoryCategory;

/** 整体橱柜分类（包括吊柜、地柜、转角柜、五角柜） */
export const KitchenCabinet: FurnitoryCategory;

/** 水槽分类（集成水槽、带/不带龙头水槽） */
export const Sink: FurnitoryCategory;

/** 水龙头分类 */
export const Faucet: FurnitoryCategory;

/** 洗碗机分类 */
export const Dishwasher: FurnitoryCategory;

/** 灶台分类（包括普通灶台和集成灶） */
export const GasStove: FurnitoryCategory;

/** 烤箱分类 */
export const Oven: FurnitoryCategory;

/** 蒸箱分类 */
export const SteamBox: FurnitoryCategory;

/** 烹饪用具分类（锅具及烧烤/烘焙用具） */
export const Pot: FurnitoryCategory;

/** 厨房电器分类（榨汁机、电饭煲、微波炉、净水器等） */
export const KitchenAppliance: FurnitoryCategory;

// ==================== 卫浴家具 ====================

/** 浴室柜分类（包括浴室柜及组合） */
export const BathroomCabinet: FurnitoryCategory;

/** 马桶分类（地排和墙排马桶） */
export const Toilet: FurnitoryCategory;

/** 淋浴房/淋浴隔断分类（全封闭和半开放淋浴房） */
export const ShowerPartition: FurnitoryCategory;

/** 花洒分类 */
export const Shower: FurnitoryCategory;

/** 浴缸分类（嵌入式和独立式） */
export const Bathtub: FurnitoryCategory;

/** 毛巾架分类 */
export const TowelRack: FurnitoryCategory;

// ==================== 卧室家具 ====================

/** 床分类（单人床、双人床、儿童床、婴儿床、高低床等） */
export const Bed: FurnitoryCategory;

/** 床头柜分类 */
export const BedsideTable: FurnitoryCategory;

/** 梳妆台分类（包括梳妆台及组合） */
export const DressingTable: FurnitoryCategory;

/** 梳妆椅/凳分类 */
export const DressingChair: FurnitoryCategory;

/** 衣柜分类（包括普通衣柜、简易衣柜、底柜、顶柜、转角柜等） */
export const Wardrobe: FurnitoryCategory;

// ==================== 照明灯具 ====================

/** 落地灯分类 */
export const FloorLamp: FurnitoryCategory;

/** 台灯分类 */
export const TableLamp: FurnitoryCategory;

/** 壁灯分类 */
export const WallLamp: FurnitoryCategory;

// ==================== 儿童家具 ====================

/** 儿童书桌椅分类 */
export const StudyDesk: FurnitoryCategory;

/** 毛绒玩具分类（包括玩具和儿童饰品） */
export const PlushToy: FurnitoryCategory;

// ==================== 休闲娱乐 ====================

/** 健身器材/运动器材分类 */
export const SportsEquipment: FurnitoryCategory;

/** 茶桌分类 */
export const TeaTable: FurnitoryCategory;

/** 椅子分类（包括休闲椅、书椅、电脑椅、按摩椅、餐椅、吧椅、中式椅等） */
export const Chair: FurnitoryCategory;

/** 茶具分类 */
export const TeaSet: FurnitoryCategory;

// ==================== 储物柜架 ====================

/** 柜子分类（书柜、酒柜、壁柜、角柜、边柜、斗柜、储物柜等） */
export const Cabinet: FurnitoryCategory;

/** 书桌分类（包括读书桌椅、书桌椅组合、书桌/书台） */
export const StudyTable: FurnitoryCategory;

/** 书柜分类 */
export const Bookcase: FurnitoryCategory;

/** 书本杂志分类 */
export const Book: FurnitoryCategory;

// ==================== 电子设备 ====================

/** 电脑分类 */
export const Computer: FurnitoryCategory;

/** 显示器分类 */
export const Monitor: FurnitoryCategory;

// ==================== 入户与收纳 ====================

/** 入户门分类（双开门、单开门、子母门） */
export const EntranceDoor: FurnitoryCategory;

/** 鞋柜分类 */
export const ShoeCabinet: FurnitoryCategory;

// ==================== 装饰品 ====================

/** 桌面摆件/装饰品分类 */
export const DesktopOrnament: FurnitoryCategory;

/** 潮流装饰品分类 */
export const TrendOrnament: FurnitoryCategory;

// ==================== 户外与景观 ====================

/** 户外家具分类（包括户外家具和游乐设备） */
export const OutdoorFurniture: FurnitoryCategory;

/** 植物分类（绿植、花卉、干枝） */
export const Plant: FurnitoryCategory;

/** 草坪分类 */
export const Lawn: FurnitoryCategory;

/** 泳池分类 */
export const Pool: FurnitoryCategory;

// ==================== 家电设备 ====================

/** 洗衣机分类 */
export const WashingMachine: FurnitoryCategory;

/** 大屏幕/投影设备分类 */
export const BigScreen: FurnitoryCategory;

// ==================== 阳台家具 ====================

/** 阳台柜分类 */
export const BalconyCabinet: FurnitoryCategory;

// ==================== 办公家具 ====================

/** 办公桌分类（包括办公桌椅和洽谈桌椅） */
export const OfficeDesk: FurnitoryCategory;

/** 办公桌椅组合分类 */
export const EDeskChair: FurnitoryCategory;

// ==================== 商业设施 ====================

/** 收银台分类 */
export const CashierDesk: FurnitoryCategory;

/** 吧台/岛台分类 */
export const Bar: FurnitoryCategory;

// ==================== 健身设备 ====================

/** 健身器材分类 */
export const FitnessEquipment: FurnitoryCategory;