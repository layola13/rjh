/**
 * 房间类型和墙体类型的本地化字符串映射
 * 用于室内设计和建筑建模应用的类型定义
 */

/**
 * 房间类型枚举键
 */
export type RoomTypeKey =
  | 'none'
  | 'Bathroom'
  | 'Bedroom'
  | 'DiningRoom'
  | 'KidsRoom'
  | 'Kitchen'
  | 'LivingRoom'
  | 'Office'
  | 'OtherRoom'
  | 'Outdoors'
  | 'PublicExterior'
  | 'PublicInterior'
  | 'ResidentialExterior'
  | 'EntranceHallway'
  | 'ProductShowcase'
  | 'FloorPlan'
  | 'Studio'
  | 'Basement'
  | 'HomeCinema'
  | 'Library'
  | 'Den'
  | 'Sketch'
  | 'LivingDiningRoom'
  | 'Hallway'
  | 'Balcony'
  | 'MasterBedroom'
  | 'SecondBedroom'
  | 'ElderlyRoom'
  | 'Lounge'
  | 'Auditorium'
  | 'NannyRoom'
  | 'LaundryRoom'
  | 'StorageRoom'
  | 'CloakRoom'
  | 'MasterBathroom'
  | 'SecondBathroom'
  | 'Stairwell'
  | 'Aisle'
  | 'Corridor'
  | 'PorchBalcony'
  | 'EquipmentRoom'
  | 'Courtyard'
  | 'Garage'
  | 'Terrace';

/**
 * 墙体类型枚举键
 */
export type WallTypeKey =
  | 'model_walltype_generic'
  | 'model_walltype_gypsum_generic'
  | 'model_walltype_brick_generic'
  | 'model_walltype_concrete';

/**
 * 所有可用的本地化键类型
 */
export type LocalizationKey = RoomTypeKey | WallTypeKey;

/**
 * 房间类型和墙体类型的本地化字符串映射表
 * 包含中文翻译的所有室内空间类型和墙体材料类型
 */
export interface RoomAndWallTypeLocalization {
  /** 未命名 */
  none: string;
  /** 卫生间 */
  Bathroom: string;
  /** 卧室 */
  Bedroom: string;
  /** 餐厅 */
  DiningRoom: string;
  /** 儿童房 */
  KidsRoom: string;
  /** 厨房 */
  Kitchen: string;
  /** 客厅 */
  LivingRoom: string;
  /** 办公室 */
  Office: string;
  /** 其他房间 */
  OtherRoom: string;
  /** 户外 */
  Outdoors: string;
  /** 商用/公用室外区域 */
  PublicExterior: string;
  /** 商用/公用室内区域 */
  PublicInterior: string;
  /** 住宅室外区域 */
  ResidentialExterior: string;
  /** 入口和过厅 */
  EntranceHallway: string;
  /** 产品展示柜 */
  ProductShowcase: string;
  /** 平面图 */
  FloorPlan: string;
  /** 工作室 */
  Studio: string;
  /** 地下室 */
  Basement: string;
  /** 家庭影院 */
  HomeCinema: string;
  /** 书房 */
  Library: string;
  /** 小房间 */
  Den: string;
  /** 草图 */
  Sketch: string;
  /** 客餐厅 */
  LivingDiningRoom: string;
  /** 门厅 */
  Hallway: string;
  /** 阳台 */
  Balcony: string;
  /** 主卧 */
  MasterBedroom: string;
  /** 次卧 */
  SecondBedroom: string;
  /** 老人房 */
  ElderlyRoom: string;
  /** 休闲厅 */
  Lounge: string;
  /** 影视厅 */
  Auditorium: string;
  /** 保姆间 */
  NannyRoom: string;
  /** 洗衣间 */
  LaundryRoom: string;
  /** 储藏间 */
  StorageRoom: string;
  /** 衣帽间 */
  CloakRoom: string;
  /** 主卫 */
  MasterBathroom: string;
  /** 次卫 */
  SecondBathroom: string;
  /** 楼梯间 */
  Stairwell: string;
  /** 过道 */
  Aisle: string;
  /** 走廊 */
  Corridor: string;
  /** 玄关和阳台 */
  PorchBalcony: string;
  /** 设备间 */
  EquipmentRoom: string;
  /** 庭院 */
  Courtyard: string;
  /** 车库 */
  Garage: string;
  /** 露台 */
  Terrace: string;
  /** 通用墙 */
  model_walltype_generic: string;
  /** 轻钢龙骨石膏板墙 */
  model_walltype_gypsum_generic: string;
  /** 轻质砖墙 */
  model_walltype_brick_generic: string;
  /** 钢筋混凝土墙 */
  model_walltype_concrete: string;
}

/**
 * 导出的本地化对象
 */
declare const localization: RoomAndWallTypeLocalization;

export default localization;