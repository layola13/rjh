/**
 * 家具分类类型定义模块
 * @module FurnitureCategories
 * @description 定义各类家具的分类信息，包括名称、分类ID和内容类型
 */

/**
 * 家具分类项接口
 * @interface FurnitureCategoryItem
 */
export interface FurnitureCategoryItem {
  /** 家具分类的中文名称 */
  name: string;
  /** 唯一的分类标识符（UUID格式） */
  categoryId: string;
  /** 该分类包含的内容类型数组 */
  contentType: string[];
}

/**
 * 阳台柜分类
 * @description 阳台使用的储物柜
 */
export declare const BalconyCabinet: FurnitureCategoryItem[];

/**
 * 吧台/岛台分类
 * @description 厨房或商业空间的吧台、岛台家具
 */
export declare const Bar: FurnitureCategoryItem[];

/**
 * 浴室柜分类
 * @description 浴室使用的储物柜，包括单盆、双盆、壁挂式等
 */
export declare const BathroomCabinet: FurnitureCategoryItem[];

/**
 * 浴缸分类
 * @description 包括嵌入式和独立式浴缸
 */
export declare const Bathtub: FurnitureCategoryItem[];

/**
 * 床类分类
 * @description 各类床具，包括单人床、双人床、儿童床、婴儿床等
 */
export declare const Bed: FurnitureCategoryItem[];

/**
 * 床头柜分类
 * @description 放置在床边的小型储物柜
 */
export declare const BedsideTable: FurnitureCategoryItem[];

/**
 * 大屏幕分类
 * @description 投影仪等大屏显示设备
 */
export declare const BigScreen: FurnitureCategoryItem[];

/**
 * 书籍分类
 * @description 书本、杂志等阅读材料
 */
export declare const Book: FurnitureCategoryItem[];

/**
 * 书柜分类
 * @description 用于存放书籍的柜子，包括L型书柜等
 */
export declare const Bookcase: FurnitureCategoryItem[];

/**
 * 餐边柜分类
 * @description 餐厅使用的边柜
 */
export declare const Buffet: FurnitureCategoryItem[];

/**
 * 柜子通用分类
 * @description 各类柜子，包括书柜、酒柜、壁柜、边柜等
 */
export declare const Cabinet: FurnitureCategoryItem[];

/**
 * 收银台分类
 * @description 商业空间的收银设备和家具
 */
export declare const CashierDesk: FurnitureCategoryItem[];

/**
 * 地毯分类
 * @description 各类地毯，包括普通地毯、满铺地毯、图案地毯等
 */
export declare const Carpet: FurnitureCategoryItem[];

/**
 * 椅子通用分类
 * @description 各类椅子，包括休闲椅、书椅、电脑椅、餐椅、吧椅等
 */
export declare const Chair: FurnitureCategoryItem[];

/**
 * 吊灯分类
 * @description 天花板悬挂式灯具
 */
export declare const Chandelier: FurnitureCategoryItem[];

/**
 * 咖啡桌分类
 * @description 客厅用咖啡桌
 */
export declare const CoffeTable: FurnitureCategoryItem[];

/**
 * 咖啡机分类
 * @description 制作咖啡的电器设备
 */
export declare const CoffeeMachine: FurnitureCategoryItem[];

/**
 * 电脑分类
 * @description 台式或笔记本电脑
 */
export declare const Computer: FurnitureCategoryItem[];

/**
 * 桌面摆件分类
 * @description 桌面装饰品和饰品
 */
export declare const DesktopOrnament: FurnitureCategoryItem[];

/**
 * 餐椅分类
 * @description 餐厅使用的椅子
 */
export declare const DiningChair: FurnitureCategoryItem[];

/**
 * 餐桌分类
 * @description 餐厅使用的桌子，包括方形和圆形
 */
export declare const DiningTable: FurnitureCategoryItem[];

/**
 * 洗碗机分类
 * @description 厨房清洗餐具的电器
 */
export declare const Dishwasher: FurnitureCategoryItem[];

/**
 * 梳妆椅分类
 * @description 梳妆台配套的椅子或凳子
 */
export declare const DressingChair: FurnitureCategoryItem[];

/**
 * 梳妆台分类
 * @description 卧室梳妆使用的桌子，包括组合套装
 */
export declare const DressingTable: FurnitureCategoryItem[];

/**
 * 电子办公椅分类
 * @description 办公用电动或电竞椅（当前为空数组）
 */
export declare const EDeskChair: FurnitureCategoryItem[];

/**
 * 入户门分类
 * @description 各类入户门，包括单开门、双开门、子母门
 */
export declare const EntranceDoor: FurnitureCategoryItem[];

/**
 * 水龙头分类
 * @description 厨房或浴室用水龙头
 */
export declare const Faucet: FurnitureCategoryItem[];

/**
 * 健身器材分类
 * @description 室内健身使用的器材
 */
export declare const FitnessEquipment: FurnitureCategoryItem[];

/**
 * 落地灯分类
 * @description 放置在地面的灯具
 */
export declare const FloorLamp: FurnitureCategoryItem[];

/**
 * 燃气灶分类
 * @description 厨房用燃气灶台和集成灶
 */
export declare const GasStove: FurnitureCategoryItem[];

/**
 * 厨房电器分类
 * @description 各类厨房电器，包括榨汁机、咖啡机、电饭煲等
 */
export declare const KitchenAppliance: FurnitureCategoryItem[];

/**
 * 橱柜分类
 * @description 厨房橱柜系统，包括吊柜、地柜、转角柜等
 */
export declare const KitchenCabinet: FurnitureCategoryItem[];

/**
 * 草坪分类
 * @description 户外草地材质
 */
export declare const Lawn: FurnitureCategoryItem[];

/**
 * 显示器分类
 * @description 电脑显示器（当前为空数组）
 */
export declare const Monitor: FurnitureCategoryItem[];

/**
 * 多人沙发分类
 * @description 各类多人座沙发，包括双人、三人、L型、U型沙发等
 */
export declare const MultiSeatSofa: FurnitureCategoryItem[];

/**
 * 办公桌分类
 * @description 办公空间使用的桌椅组合
 */
export declare const OfficeDesk: FurnitureCategoryItem[];

/**
 * 户外家具分类
 * @description 户外使用的家具和设施
 */
export declare const OutdoorFurniture: FurnitureCategoryItem[];

/**
 * 烤箱分类
 * @description 厨房烤箱，包括嵌入式和台式
 */
export declare const Oven: FurnitureCategoryItem[];

/**
 * 植物分类
 * @description 室内外植物，包括绿植、花卉、干枝等
 */
export declare const Plant: FurnitureCategoryItem[];

/**
 * 毛绒玩具分类
 * @description 儿童玩具和饰品
 */
export declare const PlushToy: FurnitureCategoryItem[];

/**
 * 水池分类
 * @description 户外水池（当前为空数组）
 */
export declare const Pool: FurnitureCategoryItem[];

/**
 * 锅具分类
 * @description 烹饪、烧烤、烘焙用具
 */
export declare const Pot: FurnitureCategoryItem[];

/**
 * 冰箱分类
 * @description 厨房冷藏冷冻电器
 */
export declare const Refrigerator: FurnitureCategoryItem[];

/**
 * 鞋柜分类
 * @description 玄关鞋柜
 */
export declare const ShoeCabinet: FurnitureCategoryItem[];

/**
 * 淋浴分类
 * @description 淋浴花洒设备
 */
export declare const Shower: FurnitureCategoryItem[];

/**
 * 淋浴隔断分类
 * @description 淋浴房和隔断，包括全封闭和半开放式
 */
export declare const ShowerPartition: FurnitureCategoryItem[];

/**
 * 边柜分类
 * @description 各类边柜和侧柜
 */
export declare const SideCabinet: FurnitureCategoryItem[];

/**
 * 边几分类
 * @description 角几、边几等小型桌子
 */
export declare const SideTable: FurnitureCategoryItem[];

/**
 * 单人沙发分类
 * @description 单座沙发，包括懒人沙发、贵妃椅等
 */
export declare const SingleSeatSofa: FurnitureCategoryItem[];

/**
 * 水槽分类
 * @description 厨房水槽，包括单槽、双槽、集成水槽等
 */
export declare const Sink: FurnitureCategoryItem[];

/**
 * 沙发通用分类
 * @description 包含多人沙发和咖啡桌的组合
 */
export declare const Sofa: FurnitureCategoryItem[];

/**
 * 运动器材分类
 * @description 室内运动和健身器材
 */
export declare const SportsEquipment: FurnitureCategoryItem[];

/**
 * 蒸箱分类
 * @description 厨房蒸箱，包括嵌入式和台式
 */
export declare const SteamBox: FurnitureCategoryItem[];

/**
 * 凳子分类
 * @description 各类凳子和墩子，包括脚凳、沙发凳等
 */
export declare const Stool: FurnitureCategoryItem[];

/**
 * 书桌分类
 * @description 学习或办公用书桌
 */
export declare const StudyDesk: FurnitureCategoryItem[];

/**
 * 学习桌分类
 * @description 学习用桌子和桌椅组合
 */
export declare const StudyTable: FurnitureCategoryItem[];

/**
 * 台灯分类
 * @description 桌面灯具
 */
export declare const TableLamp: FurnitureCategoryItem[];

/**
 * 餐具分类
 * @description 各类餐具和食具
 */
export declare const Tableware: FurnitureCategoryItem[];

/**
 * 茶具分类
 * @description 茶道用具
 */
export declare const TeaSet: FurnitureCategoryItem[];

/**
 * 茶桌分类
 * @description 喝茶用桌子
 */
export declare const TeaTable: FurnitureCategoryItem[];

/**
 * 马桶分类
 * @description 卫生间马桶，包括地排和墙排
 */
export declare const Toilet: FurnitureCategoryItem[];

/**
 * 毛巾架分类
 * @description 浴室毛巾架（当前为空数组）
 */
export declare const TowelRack: FurnitureCategoryItem[];

/**
 * 潮流摆件分类
 * @description 装饰摆件和凳子
 */
export declare const TrendOrnament: FurnitureCategoryItem[];

/**
 * 电视柜分类
 * @description 客厅电视柜和电视柜组合
 */
export declare const TVCabinet: FurnitureCategoryItem[];

/**
 * 电视/投影仪分类
 * @description 包括壁挂电视、台式电视和投影仪
 */
export declare const TVOrProjector: FurnitureCategoryItem[];

/**
 * 壁灯分类
 * @description 墙面安装的灯具
 */
export declare const WallLamp: FurnitureCategoryItem[];

/**
 * 衣柜分类
 * @description 各类衣柜，包括普通衣柜、简易衣柜、转角衣柜等
 */
export declare const Wardrobe: FurnitureCategoryItem[];

/**
 * 洗衣机分类
 * @description 洗衣设备，包括嵌入式和独立式
 */
export declare const WashingMachine: FurnitureCategoryItem[];

/**
 * 饮水机分类
 * @description 提供饮用水的电器设备
 */
export declare const WaterDispenser: FurnitureCategoryItem[];