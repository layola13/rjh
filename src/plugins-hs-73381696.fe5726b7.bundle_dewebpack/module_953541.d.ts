/**
 * 命令名称配置模块
 * 用于定义和管理各种命令的显示名称和触发规则
 */

/**
 * 命令持续时间映射类型
 * 将命令ID映射到其对应的中文描述
 */
export interface DurationCommandMap {
  /** 画造型 - 直线命令 */
  "sketch2d.cmd.CmdDrawLines": string;
  /** 画造型 - 矩形命令 */
  "sketch2d.cmd.CmdDrawRectangle": string;
  /** 画造型 - 多边形命令 */
  "sketch2d.cmd.CmdDrawRegularPolygon": string;
  /** 画造型 - 圆形命令 */
  "sketch2d.cmd.CmdDrawCircle": string;
  /** 画造型 - 倒角命令 */
  "sketch2d.cmd.CmdDrawFillet": string;
}

/**
 * 触发命令映射类型
 * 定义复合操作命令的名称映射
 */
export interface TriggerCommandMap {
  /** 复合操作 - 从目录中拖出物品至画布 */
  [HSFPConstants.CommandType.PlaceProduct]: string;
  /** 复合操作 - 打开了替换面板，替换物品 */
  [HSFPConstants.CommandType.SmartReplaceContent]: string;
  /** 复合操作 - 组合模型 */
  [HSFPConstants.CommandType.AddGroup]: string;
  /** 复合操作 - 复制粘贴模型 */
  [HSFPConstants.CommandType.PasteSequence]: string;
  /** 复合操作 - 复制操作 */
  [HSFPConstants.CommandType.DuplicateSequence]: string;
  /** 复合操作 - 快速复制灯光 */
  [HSFPConstants.CommandType.DuplicateManualLight]: string;
  /** 复合操作 - 创建新灯光 */
  [HSFPConstants.CommandType.PlaceLight]: string;
}

/**
 * 排除的命令类型列表
 * 这些命令不会被纳入统计或特殊处理
 */
export type ExcludedCommandType =
  | typeof HSFPConstants.CommandType.PointSelect
  | typeof HSFPConstants.CommandType.MoveCamera3D
  | typeof HSFPConstants.CommandType.MoveCamera
  | typeof HSFPConstants.CommandType.CmdRequestWrap
  | "hsw.cmd.CompositeCommand"
  | "hsw.cmd.SequenceCommand";

/**
 * 命令名称配置接口
 * 包含命令的持续时间映射、触发映射和排除列表
 */
export interface CommandNameConfig {
  /** 需要统计持续时间的命令映射 */
  duration: DurationCommandMap;
  /** 触发类命令的名称映射 */
  trigger: TriggerCommandMap;
  /** 需要排除的命令类型列表 */
  excludes: ReadonlyArray<ExcludedCommandType>;
}

/**
 * 命令名称配置对象
 * 导出的主配置，包含所有命令相关的元数据
 */
export declare const commandName: CommandNameConfig;