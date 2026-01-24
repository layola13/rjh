/**
 * 定制化参数键枚举
 * 用于标识定制家具的各种可配置参数
 */
export enum CustomizationParamKey {
  /** 尺寸 */
  Size = "size",
  /** 转角尺寸 */
  CornerSize = "cornerSize",
  /** 材质 */
  Material = "materail",
  /** 长度 */
  Length = "length",
  /** 高度 */
  Height = "height",
  /** 房间ID */
  RoomId = "roomId",
  /** 定制类型 */
  CustomizationType = "customType",
  /** 详情卡片数据 */
  DetailCardData = "detailCardData"
}

/**
 * 定制化内容类型枚举
 * 定义家具定制系统中所有支持的组件和装饰类型
 */
export enum CustomizationContentType {
  /** 其他类型 */
  Other = "other",
  /** 地柜 */
  FloorCabinet = "floorCabinet",
  /** 高柜 */
  HightCabinet = "hightCabinet",
  /** 吊柜 */
  WallCabinet = "wallCabinet",
  /** 上柜 */
  UpCabinet = "upCabinet",
  /** 推拉门侧板 */
  SlidingDoorSideBoard = "slidingDoorSideBoard",
  /** 侧装饰板 */
  SideDecoration = "sideDecoration",
  /** 前封板 */
  FrontCloseBoard = "frontCloseBoard",
  /** 顶封板 */
  TopCloseBoard = "topCloseBoard",
  /** 天花封板 */
  CeilingCloseBoard = "ceilingCloseBoard",
  /** 背景板 */
  BackgroundBoard = "backgroundBoard",
  /** 收纳板 */
  StorageBoard = "storageBoard",
  /** 带框前封板 */
  FrontCloseBoardWithFrame = "frontCloseBoardWithFrame",
  /** 两柜间顶封板 */
  TopCloseBoardBetweenTwo = "topCloseBoardBetweenTwo",
  /** 上封板 */
  UpCloseBoard = "upCloseBoard",
  /** 护墙板 */
  ProtectWallBoard = "protectWallBoard",
  /** 功能-横向隔板 */
  Func_HorizontalBoard = "func_HorizontalBoard",
  /** 功能-纵向隔板 */
  Func_VerticalBoard = "func_VerticalBoard",
  /** 功能-抽屉 */
  Func_Drawer = "func_Drawer",
  /** 功能-衣杆 */
  Func_ClothesRail = "func_ClothesRail",
  /** 功能-未知 */
  Func_Unkown = "func_Unkown",
  /** 抽屉面板 */
  Drawer_Fascias = "drawer_fascias",
  /** 推拉门 */
  SlidingDoor = "SlidingDoor",
  /** 推拉门扇 */
  SlidingDoorLeaf = "SlidingDoorLeaf",
  /** 侧挂门 */
  SideHungDoor = "SideHungDoor",
  /** 榻榻米门 */
  TatamiDoor = "TatamiDoor",
  /** 房间门 */
  RoomDoor = "RoomDoor",
  /** 房间窗户 */
  RoomWindow = "RoomWindow",
  /** 天花装饰 */
  CeilingOrnament = "ceilingOrnament",
  /** 墙面装饰 */
  WallOrnament = "wallOrnament",
  /** 顶部装饰 */
  AboveOrnament = "aboveOrnament",
  /** 水槽 */
  Sink = "sink",
  /** 顶线 */
  TopLine = "topLine",
  /** 踢脚线 */
  Skirting = "skirting",
  /** 灯线 */
  LightLine = "lightLine",
  /** 台面 */
  Countertop = "countertop",
  /** 防滴水边 */
  NoDripEdge = "noDripEdge",
  /** 挡水板 */
  Backsplash = "backsplash",
  /** 柜门把手类型0 */
  CabinetHandleType0 = "cbnt handle type 0",
  /** 灶台和炉灶 */
  RangeCooktop = "range & cooktop"
}