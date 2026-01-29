export enum BlockTypeEnum {
  radioBlock = "radioBlock",
  checkboxBlock = "checkboxBlock",
  textareaBlock = "textareaBlock",
  textareaeditBlock = "textareaeditBlock",
  uploadBlock = "uploadBlock",
  textBlock = "textBlock",
  switchBlock = "switchBlock",
  valueBlock = "valueBlock",
  buttonItemBlock = "buttonItemBlock",
  multipleCategoryOptions = "multipleCategoryOptions",
  uploadVideoBlock = "uploadVideoBlock",
}

export enum StateEnum {
  SUBMITTED = "SUBMITTED",
  CLOSED = "CLOSED",
  COMPLETED = "COMPLETED",
  PROCESSING = "PROCESSING",
}

type FeedbackDataType =
  | "MULTIPLE_OPTIONS"
  | "SINGLE_OPTION"
  | "TEXT"
  | "IMAGE"
  | "BUTTONITEM"
  | "MULTIPLE_CATEGORY_OPTIONS";

export const feedbackEntryDataTypeMap: Record<FeedbackDataType, BlockTypeEnum> = {
  MULTIPLE_OPTIONS: BlockTypeEnum.checkboxBlock,
  SINGLE_OPTION: BlockTypeEnum.radioBlock,
  TEXT: BlockTypeEnum.textareaBlock,
  IMAGE: BlockTypeEnum.uploadBlock,
  BUTTONITEM: BlockTypeEnum.buttonItemBlock,
  MULTIPLE_CATEGORY_OPTIONS: BlockTypeEnum.multipleCategoryOptions,
};

export const feedbackStateMap: Record<StateEnum, string> = {
  [StateEnum.SUBMITTED]: "plugin_feedback_list_state_submitted",
  [StateEnum.CLOSED]: "plugin_feedback_list_state_closed",
  [StateEnum.COMPLETED]: "plugin_feedback_list_state_completed",
  [StateEnum.PROCESSING]: "plugin_feedback_list_state_processing",
};

interface OptionItem {
  label: string;
  value: string;
}

interface RadioBlockConfig {
  type: BlockTypeEnum.radioBlock;
  name: string;
  label: string;
  data: OptionItem[];
  required?: boolean;
}

interface CheckboxBlockConfig {
  type: BlockTypeEnum.checkboxBlock;
  name: string;
  label: string;
  required: boolean;
  data: OptionItem[];
}

interface TextareaEditBlockConfig {
  type: BlockTypeEnum.textareaeditBlock;
  name: string;
  label: string;
  required: boolean;
  data: {
    placeholder: string;
  };
}

interface TextareaBlockConfig {
  type: BlockTypeEnum.textareaBlock;
  name: string;
  label: string;
  data: {
    placeholder: string;
  };
  required?: boolean;
}

interface UploadBlockConfig {
  type: BlockTypeEnum.uploadBlock;
  name: string;
  label: string;
  data: {
    maxLen: number;
  };
  required?: boolean;
}

type FeedbackModalBlockConfig =
  | RadioBlockConfig
  | CheckboxBlockConfig
  | TextareaEditBlockConfig
  | TextareaBlockConfig
  | UploadBlockConfig;

export const feedbackEntryModalData: FeedbackModalBlockConfig[] = [
  {
    type: BlockTypeEnum.radioBlock,
    name: "issueType",
    label: "问题类型",
    data: [
      {
        label: "缺陷",
        value: "BUG",
      },
      {
        label: "需求",
        value: "REQMT",
      },
    ],
  },
  {
    type: BlockTypeEnum.checkboxBlock,
    name: "type",
    label: "问题分类",
    required: true,
    data: [
      {
        label: "户型绘制",
        value: "type1",
      },
      {
        label: "墙体吸附",
        value: "type2",
      },
      {
        label: "属性面板",
        value: "type3",
      },
      {
        label: "工具栏",
        value: "type4",
      },
      {
        label: "标尺",
        value: "type5",
      },
      {
        label: "模型相关",
        value: "type6",
      },
      {
        label: "灵感库",
        value: "type7",
      },
      {
        label: "视图",
        value: "type8",
      },
      {
        label: "搜索",
        value: "type9",
      },
      {
        label: "左键菜单",
        value: "type10",
      },
      {
        label: "漫游相机",
        value: "type11",
      },
      {
        label: "其他",
        value: "type12",
      },
    ],
  },
  {
    type: BlockTypeEnum.textareaeditBlock,
    name: "content",
    required: true,
    label: "问题描述（支持文字和图片）",
    data: {
      placeholder: "请输入问题描述",
    },
  },
  {
    type: BlockTypeEnum.textareaBlock,
    name: "extraData.expectedResult",
    label: "期望结果",
    data: {
      placeholder: "请输入期望结果",
    },
  },
  {
    type: BlockTypeEnum.uploadBlock,
    name: "extraData.image",
    label: "上传图片（最多上传三张，选填）",
    data: {
      maxLen: 3,
    },
  },
];

export const clientRecordingChannel = "ClientRecording";

export const feedbackEntryModalName = "feedback-entry-modal";

export const feedbackListModalName = "feedback-list-modal";

export const feedbackListLimit = 10;