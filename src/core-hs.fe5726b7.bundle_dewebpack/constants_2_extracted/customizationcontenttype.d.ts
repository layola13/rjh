/**
 * 定制化内容类型枚举
 * 定义了家具定制系统中所有可能的组件、功能和配件类型
 * @module CustomizationContentType
 */
export enum CustomizationContentType {
  /** 功能柜 */
  FunctionCabinet = "functionCabinet",
  
  /** 推拉门边柜 */
  SlidingDoorSideBoard = "slidingDoorSideBoard",
  
  /** 侧面装饰 */
  SideDecoration = "sideDecoration",
  
  /** 抽屉面板 */
  Drawer_Fascias = "drawer_fascias",
  
  /** 灶台 */
  Cooktop = "cooktop",
  
  /** 冰箱 */
  Refrigerator = "refrigerator",
  
  /** 嵌入式灯具 */
  EmbeddedLight = "embeddedLight",
  
  /** 台面 */
  Countertop = "countertop",
  
  /** 无滴水边 */
  NoDripEdge = "noDripEdge",
  
  /** 后挡板 */
  Backsplash = "backsplash",
  
  /** 柜体灯带 */
  CabLightStrip = "cabLightStrip",
  
  /** 铰链 */
  Hinge = "hinge",
  
  /** 墙板顶线 */
  WBTopLine = "wallboardTopLine",
  
  /** 墙板踢脚线 */
  WBToeKick = "wallboardToekick",
  
  /** 墙板腰线 */
  WBWaistLine = "wallboardWaistLine",
  
  /** 墙板框架 */
  WBFrame = "wallboardFrame",
  
  /** 墙板装饰 */
  WBDecoration = "wallboardDecoration",
  
  /** 参数化模型 */
  ParametricModel = "parametricModel",
  
  /** 三维模型 */
  ThreeDModel = "threeDModel",
  
  /** 其他 */
  Other = "other",
  
  /** 组 */
  Group = "group",
  
  /** 顶层 */
  TopLayer = "topLayer",
  
  /** 功能 */
  Function = "function",
  
  /** 组件 */
  Component = "component",
  
  /** 附件 */
  Appendix = "appendix",
  
  /** 嵌入式电器 */
  EmbeddedElectronics = "embedded_electronics",
  
  /** 五金件 */
  Hardware = "hardware",
  
  /** 小型五金件 */
  Hardware_Small = "hardware_Small",
  
  /** 功能性五金件 */
  Hardware_Function = "hardware_Function",
  
  /** 板材基材 */
  BoardBase = "boardBase",
  
  /** 定制门窗 */
  CustomDoorsAndWindows = "customDoorsAndWindows",
  
  /** 功能-挂衣杆 */
  Func_ClothesRail = "func_ClothesRail",
  
  /** 功能-水平板 */
  Func_HorizontalBoard = "func_HorizontalBoard",
  
  /** 功能-垂直板 */
  Func_VerticalBoard = "func_VerticalBoard",
  
  /** 功能-背板 */
  Func_BackBoard = "func_BackBoard",
  
  /** 装饰件 */
  Ornament = "ornament",
  
  /** 功能-未知 */
  Func_Unkown = "func_Unkown",
  
  /** 保护墙板 */
  ProtectWallBoard = "protectWallBoard",
  
  /** 功能-抽屉 */
  Func_Drawer = "func_Drawer",
  
  /** 功能-抽屉外层 */
  Func_Drawer_Outer = "func_Drawer_Outer",
  
  /** 功能-抽屉内层 */
  Func_Drawer_Inner = "func_Drawer_Inner",
  
  /** 功能-抽屉箱体 */
  Func_Drawer_Box = "func_Drawer_Box",
  
  /** 功能-抽屉面板 */
  Func_Drawer_Face = "func_Drawer_Face",
  
  /** 衣柜 */
  Wardrobe = "wardrobe",
  
  /** 橱柜 */
  Cupboard = "cupboard",
  
  /** 浴室柜 */
  BathroomCabinet = "bathroomCabinet",
  
  /** 系统柜 */
  SystemCabinet = "systemCabinet",
  
  /** 把手 */
  Handle = "handle",
  
  /** 五金尾件 */
  Hardware_Tail = "hardware_tail",
  
  /** 房间门 */
  RoomDoor = "RoomDoor",
  
  /** 柜门 */
  CabinetDoor = "CabinetDoor",
  
  /** 房间窗 */
  RoomWindow = "roomWindow",
  
  /** 榻榻米 */
  Tatami = "tatami",
  
  /** 通风-壁挂式 */
  VentilationWallAttached = "ventilation_wallattached",
  
  /** 通风-吊顶式 */
  VentilationCeilingAttached = "ventilation_ceilingattached",
  
  /** 通风-底部安装 */
  VentilationBottomAttached = "ventilation_bottomattached",
  
  /** 嵌入式消毒柜 */
  EmbeddedSterilizationCabinet = "embedded_sterilization_cabinet",
  
  /** 嵌入式洗碗机 */
  EmbeddedDishwasher = "embedded_dishwasher",
  
  /** 嵌入式烤箱 */
  EmbeddedOven = "embedded_oven",
  
  /** 嵌入式蒸箱 */
  EmbeddedSteamingoven = "embedded_steamingoven",
  
  /** 普通板材 */
  CommonBoard = "board",
  
  /** 裁切板 */
  CutBoard = "cutBoard",
  
  /** 移动板 */
  MoveBoard = "moveBoard",
  
  /** 玻璃板 */
  GlassBoard = "glassBoard",
  
  /** 竖直板 */
  VerticalBoard = "verticalBoard",
  
  /** 吊柜 */
  WallCabinet = "wallCabinet",
  
  /** 地柜 */
  FloorCabinet = "floorCabinet",
  
  /** 高柜 */
  HightCabinet = "hightCabinet",
  
  /** 半高柜 */
  HalfHightCabinet = "halfHightCabinet",
  
  /** 上柜 */
  UpCabinet = "upCabinet",
  
  /** 柜体踢脚线 */
  CabinetSkirting = "cabinetSkirting",
  
  /** 门-左手位 */
  DoorLeftHand = "leftHand",
  
  /** 门-右手位 */
  DoorRightHand = "rightHand",
  
  /** 衣柜-吊柜 */
  Wardrobe_WallCabinet = "wardrobe_WallCabinet",
  
  /** 衣柜-上柜 */
  Wardrobe_UpCabinet = "wardrobe_UpCabinet",
  
  /** 衣柜-下柜 */
  Wardrobe_DownCabinet = "wardrobe_DownCabinet",
  
  /** 衣柜-基础柜 */
  Wardrobe_Fundation = "wardrobe_Fundation",
  
  /** 橱柜-地柜 */
  Cupboard_FloorCabinet = "cupboard_FloorCabinet",
  
  /** 橱柜-吊柜 */
  Cupboard_WallCabinet = "cupboard_WallCabinet",
  
  /** 橱柜-台上柜 */
  Cupboard_OnStageCabinet = "cupboard_OnStageCabinet",
  
  /** 橱柜-高柜 */
  Cupboard_HightCabinet = "cupboard_HightCabinet",
  
  /** 橱柜-半高柜 */
  Cupboard_HalfHightCabinet = "cupboard_HalfHightCabinet",
  
  /** 橱柜-壁挂系统 */
  Cupboard_WallMountedSystem = "cupboard_WallMountedSystem",
  
  /** 浴室柜-落地柜 */
  BathroomCabinet_GroundFloorCabine = "bathroomCabinet_GroundFloorCabinet",
  
  /** 浴室柜-挂墙地柜 */
  BathroomCabinet_WallFloorCabinet = "bathroomCabinet_WallFloorCabinet",
  
  /** 浴室柜-镜柜 */
  BathroomCabinet_MirrorCabinet = "bathroomCabinet_MirrorCabinet",
  
  /** 系统柜-榻榻米 */
  SystemCabinet_Tatami = "tatami",
  
  /** 系统柜-书桌柜 */
  SystemCabinet_DeskCabinet = "systemCabinet_DeskCabinet",
  
  /** 系统柜-梳妆台柜 */
  SystemCabinet_DressingTableCabinet = "systemCabinet_DressingTableCabinet",
  
  /** 系统柜-折叠桌 */
  SystemCabinet_FoldingDesk = "systemCabinet_FoldingDesk",
  
  /** 系统柜-家用柜 */
  SystemCabinet_HouseHoldCabinet = "systemCabinet_HouseHoldCabinet",
  
  /** 系统柜-玄关柜 */
  SystemCabinet_BetweenHallCabinet = "systemCabinet_BetweenHallCabinet",
  
  /** 系统柜-电视柜 */
  SystemCabinet_TVStandCabinet = "systemCabinet_TVStandCabinet",
  
  /** 系统柜-酒柜 */
  SystemCabinet_Cellarette = "systemCabinet_Cellarette",
  
  /** 系统柜-阳台柜 */
  SystemCabinet_BalconyCabinet = "systemCabinet_BalconyCabinet",
  
  /** 系统柜-飘窗柜 */
  SystemCabinet_BayCabinet = "systemCabinet_BayCabinet",
  
  /** 导轨 */
  Rail = "rail",
  
  /** 推拉门 */
  SlidingDoor = "SlidingDoor",
  
  /** 嵌入式推拉门 */
  EmbeddedSlidingDoor = "EmbeddedSlidingDoor",
  
  /** 外置推拉门 */
  ExternalSlidingDoor = "ExternalSlidingDoor",
  
  /** 推拉门扇 */
  SlidingDoorLeaf = "SlidingDoorLeaf",
  
  /** 侧开门 */
  SideHungDoor = "SideHungDoor",
  
  /** 榻榻米门 */
  TatamiDoor = "TatamiDoor",
  
  /** 墙板内凹角 */
  WBConcaveCorner = "wallboardConcaveCorner",
  
  /** 墙板外露角 */
  WBExporsedCorner = "wallboardExporsedCorner",
  
  /** 带框正面封板 */
  FrontCloseBoardWithFrame = "frontCloseBoardWithFrame",
  
  /** 两柜间顶部封板 */
  TopCloseBoardBetweenTwo = "topCloseBoardBetweenTwo",
  
  /** 上封板 */
  UpCloseBoard = "upCloseBoard",
  
  /** 顶封板 */
  TopCloseBoard = "topCloseBoard",
  
  /** 吊顶封板 */
  CeilingCloseBoard = "ceilingCloseBoard",
  
  /** 正面封板 */
  FrontCloseBoard = "frontCloseBoard",
  
  /** 房间单开侧开门 */
  RoomSingleSideHungDoor = "RoomSingleSideHungDoor",
  
  /** 房间双开侧开门 */
  RoomDoubleSideHungDoor = "RoomDoubleSideHungDoor",
  
  /** 房间子母门 */
  RoomParentChildDoor = "RoomParentChildDoor",
  
  /** 房间推拉门 */
  RoomSlidingDoor = "RoomSlidingDoor",
  
  /** 房间门袋 */
  RoomDoorPocket = "RoomDoorPocket",
  
  /** 厨房水槽柜 */
  KitchenWaterCabinet = "kitchenWaterCabinet",
  
  /** 淋浴房水柜 */
  ShowerRoomWaterCabinet = "showerRoomWaterCabinet",
  
  /** 油烟机顶柜 */
  HoodTopCabinet = "hoodTopCabinet",
  
  /** 灶台地柜 */
  CookTopFloorCabinet = "cookTopFloorCabinet",
  
  /** 嵌入式电器柜 */
  EmbeddedElectronicsCabinet = "EmbeddedElectronicsCabinet",
  
  /** 背板 */
  BackBoard = "backBoard",
  
  /** 背景板 */
  BackgroundBoard = "backgroundBoard",
  
  /** 储物板 */
  StorageBoard = "storageBoard",
  
  /** 吊顶装饰 */
  CeilingOrnament = "ceilingOrnament",
  
  /** 墙面装饰 */
  WallOrnament = "wallOrnament",
  
  /** 上方装饰 */
  AboveOrnament = "aboveOrnament",
  
  /** 水槽 */
  Sink = "sink",
  
  /** 顶线 */
  TopLine = "topLine",
  
  /** 踢脚线 */
  Skirting = "skirting",
  
  /** 灯线 */
  LightLine = "lightLine",
  
  /** 淋浴房 */
  ShowerRoom = "showerRoom",
  
  /** 台面挡水条 */
  CountertopWaterStopper = "countertopWaterStopper",
  
  /** 台面边缘 */
  CountertopEdge = "countertopEdge",
  
  /** 面板 */
  FasciaBoard = "fasciaBoard",
  
  /** 普通 */
  Normal = "normal",
  
  /** 橱柜-地柜层 */
  CupboardCabinetFloor = "cupboardCabinetFloor",
  
  /** 橱柜-上层 */
  CupboardCabinetUpper = "cupboardCabinetUpper",
  
  /** 橱柜-吊柜层 */
  CupboardCabinetWall = "cupboardCabinetWall",
  
  /** 衣柜-地柜层 */
  WardrobeCabinetFloor = "wardrobeCabinetFloor",
  
  /** 衣柜-上层 */
  WardrobeCabinetUpper = "wardrobeCabinetUpper",
  
  /** 衣柜-推拉门框架 */
  WardrobeCabinetSlidingDoorFrame = "wardrobeCabinetSlidingDoorFrame",
  
  /** 系统柜-地柜层 */
  SystemCabinetFloor = "systemCabinetFloor",
  
  /** 系统柜-上层 */
  SystemCabinetUpper = "systemCabinetUpper",
  
  /** 系统柜-吊柜层 */
  SystemCabinetWall = "systemCabinetWall"
}