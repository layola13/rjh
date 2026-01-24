/**
 * 反馈块类型枚举
 */
export enum BlockTypeEnum {
  /** 单选块 */
  radioBlock = "radioBlock",
  /** 复选框块 */
  checkboxBlock = "checkboxBlock",
  /** 文本域块 */
  textareaBlock = "textareaBlock",
  /** 可编辑文本域块 */
  textareaeditBlock = "textareaeditBlock",
  /** 上传块 */
  uploadBlock = "uploadBlock",
  /** 文本块 */
  textBlock = "textBlock",
  /** 开关块 */
  switchBlock = "switchBlock",
  /** 值块 */
  valueBlock = "valueBlock",
  /** 按钮项块 */
  buttonItemBlock = "buttonItemBlock",
  /** 多分类选项块 */
  multipleCategoryOptions = "multipleCategoryOptions",
  /** 上传视频块 */
  uploadVideoBlock = "uploadVideoBlock"
}

/**
 * 反馈条目数据类型
 */
export type FeedbackDataType =
  | "MULTIPLE_OPTIONS"
  | "SINGLE_OPTION"
  | "TEXT"
  | "IMAGE"
  | "BUTTONITEM"
  | "MULTIPLE_CATEGORY_OPTIONS";

/**
 * 反馈条目数据类型到块类型的映射
 */
export const feedbackEntryDataTypeMap: Record<FeedbackDataType, BlockTypeEnum>;

/**
 * 反馈状态枚举
 */
export enum StateEnum {
  /** 已提交 */
  SUBMITTED = "SUBMITTED",
  /** 已关闭 */
  CLOSED = "CLOSED",
  /** 已完成 */
  COMPLETED = "COMPLETED",
  /** 处理中 */
  PROCESSING = "PROCESSING"
}

/**
 * 反馈状态到国际化key的映射
 */
export const feedbackStateMap: Record<StateEnum, string>;

/**
 * 选项项接口
 */
export interface OptionItem {
  /** 选项显示标签 */
  label: string;
  /** 选项值 */
  value: string;
}

/**
 * 文本域数据配置
 */
export interface TextareaData {
  /** 占位符文本 */
  placeholder: string;
}

/**
 * 上传块数据配置
 */
export interface UploadData {
  /** 最大上传数量 */
  maxLen: number;
}

/**
 * 基础块配置接口
 */
export interface BaseBlockConfig<T = unknown> {
  /** 块类型 */
  type: BlockTypeEnum;
  /** 字段名称 */
  name: string;
  /** 显示标签 */
  label: string;
  /** 是否必填 */
  required?: boolean;
  /** 块数据配置 */
  data: T;
}

/**
 * 单选块配置
 */
export interface RadioBlockConfig extends BaseBlockConfig<OptionItem[]> {
  type: BlockTypeEnum.radioBlock;
}

/**
 * 复选框块配置
 */
export interface CheckboxBlockConfig extends BaseBlockConfig<OptionItem[]> {
  type: BlockTypeEnum.checkboxBlock;
}

/**
 * 文本域块配置
 */
export interface TextareaBlockConfig extends BaseBlockConfig<TextareaData> {
  type: BlockTypeEnum.textareaBlock;
}

/**
 * 可编辑文本域块配置
 */
export interface TextareaEditBlockConfig extends BaseBlockConfig<TextareaData> {
  type: BlockTypeEnum.textareaeditBlock;
}

/**
 * 上传块配置
 */
export interface UploadBlockConfig extends BaseBlockConfig<UploadData> {
  type: BlockTypeEnum.uploadBlock;
}

/**
 * 反馈条目块配置类型联合
 */
export type FeedbackBlockConfig =
  | RadioBlockConfig
  | CheckboxBlockConfig
  | TextareaBlockConfig
  | TextareaEditBlockConfig
  | UploadBlockConfig;

/**
 * 反馈条目模态框配置数据
 * 包含问题类型、问题分类、问题描述、期望结果、上传图片等字段配置
 */
export const feedbackEntryModalData: readonly FeedbackBlockConfig[];

/**
 * 客户端录制频道名称
 */
export const clientRecordingChannel: "ClientRecording";

/**
 * 反馈条目模态框名称
 */
export const feedbackEntryModalName: "feedback-entry-modal";

/**
 * 反馈列表模态框名称
 */
export const feedbackListModalName: "feedback-list-modal";

/**
 * 反馈列表每页限制数量
 */
export const feedbackListLimit: 10;