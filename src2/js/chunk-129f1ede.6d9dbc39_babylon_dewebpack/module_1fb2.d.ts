/**
 * 型材角度类型
 * 表示型材连接的角度组合方式
 */
type AngleType = "45-45" | "45-90" | "90-90";

/**
 * 带标签的选项项
 */
interface LabelValueOption<T = string> {
  /** 选项值 */
  value: T;
  /** 显示标签 */
  label: string;
  /** 限制条件：仅适用于特定类型 */
  limits?: string[];
}

/**
 * 位置类型：上/下/左/右
 */
type SidePosition = "up" | "down" | "left" | "right";

/**
 * 宽高方向：0-宽度方向，1-高度方向
 */
type WidthHeightPosition = 0 | 1;

/**
 * 外框（Bar）配置
 */
interface BarConfig {
  /** 支持的角度类型 */
  angle: AngleType[];
  
  /** 型材类型列表 */
  type: LabelValueOption[];
  
  /** 型材类型映射表（值 -> 标签） */
  type_map: Record<string, string>;
  
  /** 轨道位置类型 */
  track_pos_type: LabelValueOption[];
  
  /** 中梃位置类型 */
  mullion_pos_type: LabelValueOption[];
  
  /** 规格位置类型 */
  spec_pos_type: LabelValueOption[];
  
  /** 边封盖板位置类型 */
  sideTrackFixed_pos_type: LabelValueOption[];
  
  /** 边封锁条位置类型 */
  sideTrackSlide_pos_type: LabelValueOption[];
  
  /** 外框位置类型 */
  frame_pos_type: LabelValueOption[];
  
  /** 固转框位置类型 */
  turningFrame_pos_type: LabelValueOption[];
  
  /** 边封拼盖板位置类型 */
  sideTrackCouple_pos_type: LabelValueOption[];
  
  /** 通用位置类型 */
  pos_type: LabelValueOption[];
  
  /** 位置类型映射表（编号 -> 标签） */
  pos_type_map: Record<string, string>;
  
  /** 边封侧面位置 */
  sideTrack_side_position: LabelValueOption<SidePosition>[];
  
  /** 侧面位置 */
  side_position: LabelValueOption<SidePosition>[];
  
  /** 侧面位置映射表 */
  side_position_map: Record<SidePosition, string>;
  
  /** 中梃宽高方向 */
  mullion_width_height_position: LabelValueOption<WidthHeightPosition>[];
  
  /** 中梃宽高方向映射表 */
  mullion_width_height_position_map: Record<string, string>;
}

/**
 * 对开扇配置
 */
interface DoubleSashConfig {
  /** 支持的角度类型 */
  angle: AngleType[];
  
  /** 不匹配类型列表 */
  no_match_type: LabelValueOption[];
  
  /** 扇型材类型 */
  type: LabelValueOption[];
  
  /** 扇型材类型映射表 */
  type_map: Record<string, string>;
  
  /** 规格位置类型 */
  spec_pos_type: LabelValueOption[];
  
  /** 位置类型 */
  pos_type: LabelValueOption[];
  
  /** 位置类型映射表 */
  pos_type_map: Record<string, string>;
  
  /** 扇压线位置类型 */
  sashBead_pos_type: LabelValueOption[];
  
  /** 扇压线位置类型映射表 */
  sashBead_pos_type_map: Record<string, string>;
  
  /** 侧面位置 */
  side_position: LabelValueOption<SidePosition>[];
  
  /** 侧面位置映射表 */
  side_position_map: Record<SidePosition, string>;
  
  /** 扇开启方式 */
  sash_assign_way: LabelValueOption<"DSI" | "DSO">[];
  
  /** 扇开启方式映射表 */
  sash_assign_way_map: Record<string, string>;
  
  /** 宽高方向 */
  width_height_position: LabelValueOption<WidthHeightPosition>[];
  
  /** 宽高方向映射表 */
  width_height_position_map: Record<string, string>;
}

/**
 * 折叠扇配置
 */
interface FoldSashConfig {
  /** 支持的角度类型 */
  angle: AngleType[];
  
  /** 不匹配类型列表 */
  no_match_type: LabelValueOption[];
  
  /** 扇型材类型 */
  type: LabelValueOption[];
  
  /** 扇型材类型映射表 */
  type_map: Record<string, string>;
  
  /** 位置类型 */
  pos_type: LabelValueOption[];
  
  /** 位置类型映射表 */
  pos_type_map: Record<string, string>;
  
  /** 扇压线位置类型 */
  sashBead_pos_type: LabelValueOption[];
  
  /** 扇压线位置类型映射表 */
  sashBead_pos_type_map: Record<string, string>;
  
  /** 侧面位置 */
  side_position: LabelValueOption<SidePosition>[];
  
  /** 侧面位置映射表 */
  side_position_map: Record<SidePosition, string>;
  
  /** 宽高方向 */
  width_height_position: LabelValueOption<WidthHeightPosition>[];
  
  /** 宽高方向映射表 */
  width_height_position_map: Record<string, string>;
}

/**
 * 推拉扇配置
 */
interface SlideSashConfig {
  /** 支持的角度类型 */
  angle: AngleType[];
  
  /** 不匹配类型列表 */
  no_match_type: LabelValueOption[];
  
  /** 扇型材类型 */
  type: LabelValueOption[];
  
  /** 扇型材类型映射表 */
  type_map: Record<string, string>;
  
  /** 规格位置类型 */
  spec_pos_type: LabelValueOption[];
  
  /** 位置类型 */
  pos_type: LabelValueOption[];
  
  /** 位置类型映射表 */
  pos_type_map: Record<string, string>;
  
  /** 扇压线位置类型 */
  sashBead_pos_type: LabelValueOption[];
  
  /** 扇压线位置类型映射表 */
  sashBead_pos_type_map: Record<string, string>;
  
  /** 侧面位置 */
  side_position: LabelValueOption<SidePosition>[];
  
  /** 侧面位置映射表 */
  side_position_map: Record<SidePosition, string>;
  
  /** 宽高方向 */
  width_height_position: LabelValueOption<WidthHeightPosition>[];
  
  /** 宽高方向映射表 */
  width_height_position_map: Record<string, string>;
}

/**
 * 平开扇配置
 */
interface SashConfig {
  /** 支持的角度类型 */
  angle: AngleType[];
  
  /** 不匹配类型列表 */
  no_match_type: LabelValueOption[];
  
  /** 扇型材类型 */
  type: LabelValueOption[];
  
  /** 扇型材类型映射表 */
  type_map: Record<string, string>;
  
  /** 规格位置类型 */
  spec_pos_type: LabelValueOption[];
  
  /** 位置类型 */
  pos_type: LabelValueOption[];
  
  /** 位置类型映射表 */
  pos_type_map: Record<string, string>;
  
  /** 防盗杆位置类型 */
  antiTheftMullion_pos_type: LabelValueOption[];
  
  /** 防盗杆位置类型映射表 */
  antiTheftMullion_pos_type_map: Record<string, string>;
  
  /** 扇压线位置类型 */
  sashBead_pos_type: LabelValueOption[];
  
  /** 扇压线位置类型映射表 */
  sashBead_pos_type_map: Record<string, string>;
  
  /** 侧面位置 */
  side_position: LabelValueOption<SidePosition>[];
  
  /** 侧面位置映射表 */
  side_position_map: Record<SidePosition, string>;
  
  /** 扇开启方式 */
  sash_assign_way: LabelValueOption<"IL" | "IR" | "IU" | "ID" | "IDL" | "IDR" | "OL" | "OR" | "OU" | "OUL" | "OUR" | "C">[];
  
  /** 扇开启方式映射表 */
  sash_assign_way_map: Record<string, string>;
  
  /** 宽高方向 */
  width_height_position: LabelValueOption<WidthHeightPosition>[];
  
  /** 宽高方向映射表 */
  width_height_position_map: Record<string, string>;
}

/**
 * 玻璃/纱网配置
 */
interface GlassConfig {
  /** 规格类型（固定） */
  spec_type: LabelValueOption[];
  
  /** 扇类型 */
  type: LabelValueOption[];
  
  /** 类型映射表 */
  type_map: Record<string, string>;
  
  /** 规格位置类型 */
  spec_pos_type: LabelValueOption[];
  
  /** 扇位置类型 */
  pos_type: LabelValueOption[];
  
  /** 规格位置类型映射表 */
  spec_pos_type_map: Record<string, string>;
  
  /** 扇位置类型映射表 */
  pos_type_map: Record<string, string>;
  
  /** 宽高方向 */
  width_height_position: LabelValueOption<WidthHeightPosition>[];
  
  /** 宽高方向映射表 */
  width_height_position_map: Record<string, string>;
}

/**
 * 配件配置
 */
interface AddonConfig {
  /** 规格类型（外框级） */
  spec_type: LabelValueOption[];
  
  /** 通用类型（扇级） */
  type: LabelValueOption[];
  
  /** 对开扇配件类型 */
  doubleSash_type: LabelValueOption[];
  
  /** 推拉扇配件类型 */
  slide_type: LabelValueOption[];
  
  /** 折叠扇配件类型 */
  fold_type: LabelValueOption[];
  
  /** 配件类型映射表 */
  type_map: Record<string, string>;
}

/**
 * 门窗系统配置数据模型
 * 包含外框、扇、玻璃、配件等全部配置
 */
interface WindowSystemConfig {
  /** 外框配置 */
  bar: BarConfig;
  
  /** 对开扇配置 */
  doubleSash: DoubleSashConfig;
  
  /** 折叠扇配置 */
  foldSash: FoldSashConfig;
  
  /** 推拉扇配置 */
  slideSash: SlideSashConfig;
  
  /** 平开扇配置 */
  sash: SashConfig;
  
  /** 玻璃/纱网配置 */
  glass: GlassConfig;
  
  /** 配件配置 */
  addon: AddonConfig;
}

declare const windowSystemConfig: WindowSystemConfig;

export default windowSystemConfig;