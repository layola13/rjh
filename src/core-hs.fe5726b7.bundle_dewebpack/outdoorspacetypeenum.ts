/**
 * 房间类型枚举
 * @description 定义室内各种房间和空间的类型常量
 */
export enum RoomTypeEnum {
  /** 走廊 */
  Hallway = "Hallway",
  /** 客厅 */
  LivingRoom = "LivingRoom",
  /** 餐厅 */
  DiningRoom = "DiningRoom",
  /** 客餐厅 */
  LivingDiningRoom = "LivingDiningRoom",
  /** 阳台 */
  Balcony = "Balcony",
  /** 卧室 */
  Bedroom = "Bedroom",
  /** 主卧 */
  MasterBedroom = "MasterBedroom",
  /** 次卧 */
  SecondBedroom = "SecondBedroom",
  /** 儿童房 */
  KidsRoom = "KidsRoom",
  /** 老人房 */
  ElderlyRoom = "ElderlyRoom",
  /** 衣帽间 */
  CloakRoom = "CloakRoom",
  /** 储藏室 */
  StorageRoom = "StorageRoom",
  /** 洗衣房 */
  LaundryRoom = "LaundryRoom",
  /** 保姆房 */
  NannyRoom = "NannyRoom",
  /** 厨房 */
  Kitchen = "Kitchen",
  /** 卫生间 */
  Bathroom = "Bathroom",
  /** 卫生间干区 */
  BathroomDryArea = "BathroomDryArea",
  /** 主卫 */
  MasterBathroom = "MasterBathroom",
  /** 次卫 */
  SecondBathroom = "SecondBathroom",
  /** 书房 */
  Library = "Library",
  /** 休息室 */
  Lounge = "Lounge",
  /** 礼堂 */
  Auditorium = "Auditorium",
  /** 设备间 */
  EquipmentRoom = "EquipmentRoom",
  /** 走廊 */
  Corridor = "Corridor",
  /** 过道 */
  Aisle = "Aisle",
  /** 露台 */
  Terrace = "Terrace",
  /** 楼梯间 */
  Stairwell = "Stairwell",
  /** 户外 */
  Outdoors = "Outdoors",
  /** 庭院 */
  Courtyard = "Courtyard",
  /** 车库 */
  Garage = "Garage",
  /** 入口 */
  Entrance = "Entrance",
  /** 开放空间 */
  Openspace = "Openspace",
  /** 其他房间 */
  OtherRoom = "OtherRoom",
  /** 办公室 */
  Office = "Office",
  /** 工作室 */
  Studio = "Studio",
  /** 公共室内 */
  PublicInterior = "PublicInterior",
  /** 公共室外 */
  PublicExterior = "PublicExterior",
  /** 住宅外部 */
  ResidentialExterior = "ResidentialExterior",
  /** 入口走廊 */
  EntranceHallway = "EntranceHallway",
  /** 地下室 */
  Basement = "Basement",
  /** 书房/小房间 */
  Den = "Den",
  /** 门廊阳台 */
  PorchBalcony = "PorchBalcony",
  /** 家庭影院 */
  HomeCinema = "HomeCinema",
  /** 平面图 */
  FloorPlan = "FloorPlan",
  /** 草图 */
  Sketch = "Sketch",
  /** 产品展示 */
  ProductShowcase = "ProductShowcase",
  /** 无 */
  none = "none"
}

/**
 * 户外空间类型枚举
 * @description 定义户外空间的类型常量
 */
export enum OutdoorSpaceTypeEnum {
  /** 其他空间 */
  OtherSpace = "OtherSpace",
  /** 无 */
  none = "none"
}