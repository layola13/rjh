/**
 * 属性栏UI组件类型枚举
 * 定义属性栏中可用的各种UI组件类型
 */
export enum IPropertybarUIComponentType {
  /** 材质选择器 */
  MATERIIAL = "MATERIIAL",
  /** 文本标签 */
  LABEL = "label",
  /** 布尔值控件 */
  BOOLEAN = "BOOLEAN",
  /** 浮点数输入 */
  FLOAT = "FLOAT",
  /** 型材选择器 */
  PROFILE = "PROFILE",
  /** 内容部件选择器 */
  CONTENT_PART = "CONTENT_PART",
  /** 复选框 */
  CHECKBOX = "CHECKBOX",
  /** 窗子部件选择器 */
  WIN_SUB_PART = "WIN_SUB_PART",
  /** 整数输入 */
  INTEGER = "INTEGER"
}

/**
 * 属性栏UI组件限制类型枚举
 * 定义对组件值的约束类型
 */
export enum IPropertybarUIComponentLimitType {
  /** 无限制 */
  NONE = "NONE",
  /** 区间限制（最小值-最大值） */
  INTERVAL = "INTERVAL"
}

/**
 * 属性栏编辑参数操作保持动作枚举
 * 定义编辑参数时可执行的各种材质和面操作
 */
export enum IPropertybarEditParametricopeingHoldAction {
  /** 分割面开关 */
  SplitFaceSwitch = "SplitFaceSwitch",
  /** A面材质开关 */
  AFaceMaterialSwitch = "AFaceMaterialSwitch",
  /** B面材质开关 */
  BFaceMaterialSwitch = "BFaceMaterialSwitch",
  /** A面材质替换 */
  AFaceMaterialReplace = "AFaceMaterialReplace",
  /** B面材质替换 */
  BFaceMaterialReplace = "BFaceMaterialReplace",
  /** 全部面材质替换 */
  AllFaceMaterialReplace = "AllFaceMaterialReplace"
}