export const none = "未命名";
export const Bathroom = "卫生间";
export const Bedroom = "卧室";
export const DiningRoom = "餐厅";
export const KidsRoom = "儿童房";
export const Kitchen = "厨房";
export const LivingRoom = "客厅";
export const Office = "办公室";
export const OtherRoom = "其他房间";
export const Outdoors = "户外";
export const PublicExterior = "商用/公用室外区域";
export const PublicInterior = "商用/公用室内区域";
export const ResidentialExterior = "住宅室外区域";
export const EntranceHallway = "入口和过厅";
export const ProductShowcase = "产品展示柜";
export const FloorPlan = "平面图";
export const Studio = "工作室";
export const Basement = "地下室";
export const HomeCinema = "家庭影院";
export const Library = "书房";
export const Den = "小房间";
export const Sketch = "草图";
export const LivingDiningRoom = "客餐厅";
export const Hallway = "门厅";
export const Balcony = "阳台";
export const MasterBedroom = "主卧";
export const SecondBedroom = "次卧";
export const ElderlyRoom = "老人房";
export const Lounge = "休闲厅";
export const Auditorium = "影视厅";
export const NannyRoom = "保姆间";
export const LaundryRoom = "洗衣间";
export const StorageRoom = "储藏间";
export const CloakRoom = "衣帽间";
export const MasterBathroom = "主卫";
export const SecondBathroom = "次卫";
export const Stairwell = "楼梯间";
export const Aisle = "过道";
export const Corridor = "走廊";
export const PorchBalcony = "玄关和阳台";
export const EquipmentRoom = "设备间";
export const Courtyard = "庭院";
export const Garage = "车库";
export const Terrace = "露台";
export const model_walltype_generic = "通用墙";
export const model_walltype_gypsum_generic = "轻钢龙骨石膏板墙";
export const model_walltype_brick_generic = "轻质砖墙";
export const model_walltype_concrete = "钢筋混凝土墙";

export type RoomType = 
  | "none"
  | "Bathroom"
  | "Bedroom"
  | "DiningRoom"
  | "KidsRoom"
  | "Kitchen"
  | "LivingRoom"
  | "Office"
  | "OtherRoom"
  | "Outdoors"
  | "PublicExterior"
  | "PublicInterior"
  | "ResidentialExterior"
  | "EntranceHallway"
  | "ProductShowcase"
  | "FloorPlan"
  | "Studio"
  | "Basement"
  | "HomeCinema"
  | "Library"
  | "Den"
  | "Sketch"
  | "LivingDiningRoom"
  | "Hallway"
  | "Balcony"
  | "MasterBedroom"
  | "SecondBedroom"
  | "ElderlyRoom"
  | "Lounge"
  | "Auditorium"
  | "NannyRoom"
  | "LaundryRoom"
  | "StorageRoom"
  | "CloakRoom"
  | "MasterBathroom"
  | "SecondBathroom"
  | "Stairwell"
  | "Aisle"
  | "Corridor"
  | "PorchBalcony"
  | "EquipmentRoom"
  | "Courtyard"
  | "Garage"
  | "Terrace"
  | "model_walltype_generic"
  | "model_walltype_gypsum_generic"
  | "model_walltype_brick_generic"
  | "model_walltype_concrete";

export const RoomLabels: Record<RoomType, string> = {
  none,
  Bathroom,
  Bedroom,
  DiningRoom,
  KidsRoom,
  Kitchen,
  LivingRoom,
  Office,
  OtherRoom,
  Outdoors,
  PublicExterior,
  PublicInterior,
  ResidentialExterior,
  EntranceHallway,
  ProductShowcase,
  FloorPlan,
  Studio,
  Basement,
  HomeCinema,
  Library,
  Den,
  Sketch,
  LivingDiningRoom,
  Hallway,
  Balcony,
  MasterBedroom,
  SecondBedroom,
  ElderlyRoom,
  Lounge,
  Auditorium,
  NannyRoom,
  LaundryRoom,
  StorageRoom,
  CloakRoom,
  MasterBathroom,
  SecondBathroom,
  Stairwell,
  Aisle,
  Corridor,
  PorchBalcony,
  EquipmentRoom,
  Courtyard,
  Garage,
  Terrace,
  model_walltype_generic,
  model_walltype_gypsum_generic,
  model_walltype_brick_generic,
  model_walltype_concrete
};