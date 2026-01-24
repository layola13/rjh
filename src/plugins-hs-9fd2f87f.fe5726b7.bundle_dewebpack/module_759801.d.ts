/**
 * 户型图配置模块
 * 定义了户型图渲染的完整配置结构，包括尺寸、房间样式、墙体、门窗等元素
 */

/**
 * 户型图边距配置
 */
interface FloorplanSpan {
  /** 左侧边距（像素） */
  left: number;
  /** 右侧边距（像素） */
  right: number;
  /** 顶部边距（像素） */
  top: number;
  /** 底部边距（像素） */
  bottom: number;
}

/**
 * 房间类型枚举
 */
type RoomType =
  | 'LivingRoom'
  | 'Hallway'
  | 'DiningRoom'
  | 'LivingDiningRoom'
  | 'None'
  | 'Bedroom'
  | 'KidsRoom'
  | 'MasterBedroom'
  | 'SecondBedroom'
  | 'ElderlyRoom'
  | 'Library'
  | 'NannyRoom'
  | 'StorageRoom'
  | 'CloakRoom'
  | 'Balcony'
  | 'Courtyard'
  | 'Terrace'
  | 'Kitchen'
  | 'Bathroom'
  | 'MasterBathroom'
  | 'SecondBathroom'
  | 'LaundryRoom'
  | 'Stairwell'
  | 'Aisle'
  | 'Corridor'
  | 'Lounge'
  | 'Auditorium'
  | 'EquipmentRoom'
  | 'Garage'
  | 'OtherSpace'
  | 'Outdoors';

/**
 * 房间样式映射（房间类型到样式标识的映射）
 */
type RoomStyleMap = Record<RoomType, string>;

/**
 * 文本尺寸配置
 */
interface TextSizeConfig {
  /** 基础尺寸 */
  size: number;
  /** 内边距（负值表示向内收缩） */
  padding: number;
}

/**
 * 面积文本尺寸配置
 */
interface AreaTextSizeConfig {
  /** 基础尺寸 */
  size: number;
  /** 小内边距 */
  paddingSmall: number;
  /** 大内边距 */
  paddingBig: number;
}

/**
 * 房间配置
 */
interface RoomConfig {
  /** 房间样式映射表 */
  style: RoomStyleMap;
  /** 是否显示面积 */
  areaVisible: boolean;
  /** 面积文字大小 */
  areaFontSize: number;
  /** 面积文本尺寸配置 */
  areaTextSize: AreaTextSizeConfig;
  /** 字体颜色（十六进制） */
  fontColor: string;
  /** 字体描边颜色（十六进制） */
  fontOutlineColor: string;
  /** 边缘颜色（十六进制） */
  edgeColor: string;
  /** 边缘宽度（像素） */
  edgeWidth: number;
  /** 房间类型文字大小 */
  typeFontSize: number;
  /** 房间类型文本尺寸配置 */
  typeTextSize: TextSizeConfig;
  /** 文本描边宽度 */
  textStrokeWidth: number;
  /** 文本外描边宽度 */
  textOutlineStrokeWidth: number;
}

/**
 * 墙体配置
 */
interface WallConfig {
  /** 普通墙体颜色（十六进制） */
  normalColor: string;
  /** 承重墙颜色（十六进制） */
  loadBearingColor: string;
}

/**
 * 门配置
 */
interface DoorConfig {
  /** 是否可见 */
  visible: boolean;
  /** 颜色（十六进制） */
  color: string;
  /** 不透明度（0-1） */
  opacity: number;
  /** 入口宽度（像素） */
  entryWidth: number;
  /** 入口高度（像素） */
  entryHeight: number;
}

/**
 * 入口配置
 */
interface EntryConfig {
  /** 是否可见 */
  visible: boolean;
}

/**
 * 窗户配置
 */
interface WindowConfig {
  /** 是否可见 */
  visible: boolean;
  /** 描边颜色（十六进制） */
  strokeColor: string;
  /** 玻璃颜色（十六进制） */
  glassColor: string;
  /** 玻璃描边颜色（十六进制） */
  glassStrokeColor: string;
  /** 墙体颜色（十六进制） */
  wallColor: string;
}

/**
 * Logo配置
 */
interface LogoConfig {
  /** 是否可见 */
  visible: boolean;
  /** 宽度（像素） */
  sizeWidth: number;
  /** 高度（像素） */
  sizeHeight: number;
}

/**
 * 指南针配置
 */
interface CompassConfig {
  /** 是否可见 */
  visible: boolean;
  /** 宽度（像素） */
  sizeWidth: number;
  /** 高度（像素） */
  sizeHeight: number;
}

/**
 * 户型图完整配置
 */
export interface FloorplanConfig {
  /** 完整画布宽度（像素） */
  fullWidth: number;
  /** 完整画布高度（像素） */
  fullHeight: number;
  /** 户型图边距配置 */
  floorplanSpan: FloorplanSpan;
  /** 房间配置 */
  room: RoomConfig;
  /** 墙体配置 */
  wall: WallConfig;
  /** 门配置 */
  door: DoorConfig;
  /** 入口配置 */
  entry: EntryConfig;
  /** 窗户配置 */
  window: WindowConfig;
  /** Logo配置 */
  logo: LogoConfig;
  /** 指南针配置 */
  compass: CompassConfig;
}

/**
 * 户型图配置对象
 * 包含户型图渲染所需的所有配置参数
 */
declare const floorplanConfig: FloorplanConfig;

export default floorplanConfig;