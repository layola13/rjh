/**
 * 户型图渲染配置
 * 定义了户型图的尺寸、样式、房间类型、墙体、门窗等所有渲染相关的配置项
 */

/**
 * 房间类型枚举
 */
export type RoomType =
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
 * 材质样式类型
 */
export type MaterialStyle = 'm1' | 'm2' | 'm3' | 'm4' | 'm5' | 'm6';

/**
 * 间距配置
 */
export interface SpacingConfig {
  /** 左边距 */
  left: number;
  /** 右边距 */
  right: number;
  /** 上边距 */
  top: number;
  /** 下边距 */
  bottom: number;
}

/**
 * 文本尺寸配置
 */
export interface TextSizeConfig {
  /** 字体大小 */
  size: number;
  /** 内边距（负值表示收缩） */
  padding: number;
}

/**
 * 区域文本尺寸配置
 */
export interface AreaTextSizeConfig {
  /** 字体大小 */
  size: number;
  /** 小尺寸内边距 */
  paddingSmall: number;
  /** 大尺寸内边距 */
  paddingBig: number;
}

/**
 * 房间样式配置
 */
export interface RoomConfig {
  /** 房间类型到材质样式的映射 */
  style: Record<RoomType, MaterialStyle>;
  /** 是否显示面积 */
  areaVisible: boolean;
  /** 面积字体大小 */
  areaFontSize: number;
  /** 面积文本尺寸配置 */
  areaTextSize: AreaTextSizeConfig;
  /** 字体颜色 */
  fontColor: string;
  /** 字体描边颜色 */
  fontOutlineColor: string;
  /** 边缘颜色 */
  edgeColor: string;
  /** 边缘宽度 */
  edgeWidth: number;
  /** 房间类型字体大小 */
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
export interface WallConfig {
  /** 普通墙体颜色 */
  normalColor: string;
  /** 承重墙颜色 */
  loadBearingColor: string;
}

/**
 * 门配置
 */
export interface DoorConfig {
  /** 是否可见 */
  visible: boolean;
  /** 门颜色 */
  color: string;
  /** 不透明度 */
  opacity: number;
  /** 入口宽度 */
  entryWidth: number;
  /** 入口高度 */
  entryHeight: number;
}

/**
 * 窗户配置
 */
export interface WindowConfig {
  /** 是否可见 */
  visible: boolean;
  /** 窗框描边颜色 */
  strokeColor: string;
  /** 玻璃颜色 */
  glassColor: string;
  /** 玻璃描边颜色 */
  glassStrokeColor: string;
  /** 墙体颜色 */
  wallColor: string;
}

/**
 * 入口配置
 */
export interface EntryConfig {
  /** 是否可见 */
  visible: boolean;
}

/**
 * Logo配置
 */
export interface LogoConfig {
  /** 是否可见 */
  visible: boolean;
  /** Logo宽度 */
  sizeWidth: number;
  /** Logo高度 */
  sizeHeight: number;
}

/**
 * 指南针配置
 */
export interface CompassConfig {
  /** 是否可见 */
  visible: boolean;
  /** 指南针宽度 */
  sizeWidth: number;
  /** 指南针高度 */
  sizeHeight: number;
}

/**
 * 尺寸标注层级显示配置
 */
export interface DimensionLevelsConfig {
  /** 一级尺寸标注 */
  first: boolean;
  /** 二级尺寸标注 */
  second: boolean;
  /** 三级尺寸标注 */
  third: boolean;
}

/**
 * 尺寸标注阈值配置
 */
export interface DimensionThresholdConfig {
  /** 一级阈值 */
  first: number;
  /** 二级阈值 */
  second: number;
}

/**
 * 尺寸标注配置
 */
export interface DimensionConfig {
  /** 显示层级配置 */
  showLevels: DimensionLevelsConfig;
  /** 阈值配置 */
  threshold: DimensionThresholdConfig;
  /** 基准偏移量 */
  offsetBase: number;
  /** 层级间距 */
  levelSpan: number;
  /** 内部延伸长度 */
  innerExtend: number;
  /** 外部延伸长度 */
  outerExtend: number;
  /** 是否显示端点 */
  showEndPoint: boolean;
  /** 字体大小 */
  fontSize: number;
  /** 文本偏移量 */
  textOffset: number;
  /** 文本颜色 */
  textColor: string;
}

/**
 * 户型图渲染配置
 */
export interface FloorplanRenderConfig {
  /** 完整宽度 */
  fullWidth: number;
  /** 完整高度 */
  fullHeight: number;
  /** 材质标题高度 */
  materialTitleHeight: number;
  /** 户型图边距 */
  floorplanSpan: SpacingConfig;
  /** 画框边距 */
  frameSpan: SpacingConfig;
  /** 房间配置 */
  room: RoomConfig;
  /** 墙体配置 */
  wall: WallConfig;
  /** 门配置 */
  door: DoorConfig;
  /** 窗户配置 */
  window: WindowConfig;
  /** 入口配置 */
  entry: EntryConfig;
  /** Logo配置 */
  logo: LogoConfig;
  /** 指南针配置 */
  compass: CompassConfig;
  /** 尺寸标注配置 */
  dimension: DimensionConfig;
}

declare const config: FloorplanRenderConfig;
export default config;