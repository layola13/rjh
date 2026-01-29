/**
 * CSS 模块导出类型定义
 * @description 反馈表单相关的样式模块，包含弹窗、表单布局、按钮交互等样式定义
 */

/**
 * 模块依赖导入
 */
import { CSSModuleExport } from './css-module-types';

/**
 * CSS 类名映射接口
 * @description 定义所有可用的 CSS 类名及其对应的哈希值
 */
export interface FeedbackStylesClassNames {
  /** 弹性居中布局 */
  flexCenter: string;
  /** 反馈单选按钮文本样式 */
  'setting-radio-button-text-feedback': string;
  /** 表单组反馈样式 */
  'form-group-feedback': string;
  /** 弹窗容器 */
  popupcontainer: string;
  /** 反馈对话框 */
  feedbackdialog: string;
  /** 弹窗窗口 */
  popupwindows: string;
  /** 窗口包装器 */
  windowWrapper: string;
  /** 窗口头部 */
  windowHeader: string;
  /** 标题 */
  title: string;
  /** 弹窗关闭按钮 */
  'popupwindow-close-btn': string;
  /** 窗口内容区域 */
  windowContents: string;
  /** 禁用文本选择样式 */
  noselect: string;
  /** 反馈表单主容器 */
  feedbackform: string;
  /** 反馈描述文本 */
  feeddescription: string;
  /** 反馈消息文本 */
  feedmsg: string;
  /** 左侧字段容器 */
  feedbackfieldleft: string;
  /** 右侧字段容器 */
  feedbackfieldright: string;
  /** 表单标题 */
  'form-title': string;
  /** 单选按钮卡片包装器 */
  'radio-button-card-wrapper': string;
  /** 单选按钮卡片右侧部分 */
  'radio-button-card-right-part': string;
  /** 设置单选按钮文本 */
  'setting-radio-button-text': string;
  /** 表单标签 */
  'form-label': string;
  /** 必填标签 */
  'label-required': string;
  /** 表单行内容 */
  'form-row-content': string;
  /** 反馈相机按钮 */
  'feedback-camera-btn': string;
  /** 反馈圆形按钮 */
  'feedback-circle': string;
  /** 反馈相机图标 */
  'feedback-camera': string;
  /** 设计名称长度提示 */
  'design-name-length': string;
  /** 错误提示文本 */
  'error-hints': string;
  /** 包含视频提示行（禁用状态） */
  'include-video-tips-row-disabled': string;
  /** 包含视频提示内容 */
  'include-video-tips-content': string;
  /** 包含视频提示图标 */
  'include-video-tips-image': string;
  /** 表单行 */
  'form-row': string;
  /** 表单控件 */
  'form-control': string;
  /** 操作按钮组 */
  actionbuttons: string;
  /** 发送反馈按钮 */
  sendfeedback: string;
  /** 文件输入标签 */
  fileInputLable: string;
  /** 下拉箭头 */
  caret: string;
  /** 发送中状态 */
  sending: string;
  /** 加入群组链接 */
  join: string;
  /** 钉钉图标 */
  dingding: string;
  /** 添加文件表单 */
  addFileForm: string;
  /** 文件列表 */
  files: string;
  /** 添加文件块 */
  addFileBlock: string;
  /** 添加按钮 */
  add: string;
  /** 文件块 */
  fileBlock: string;
  /** 加载图标 */
  loadingIcon: string;
  /** 错误提示 */
  errorHint: string;
  /** 移除按钮 */
  remove: string;
  /** 关闭按钮 */
  closeBtn: string;
  /** 反馈容器 */
  feedback: string;
  /** 用户调查图标 */
  usersurveyicon: string;
  /** 显示用户调查提示 */
  showUserSurveyToolTip: string;
  /** 提示文本 */
  toolTip: string;
  /** 提示图标 */
  toolTipImg: string;
  /** 反馈入口 */
  'feedback-entry': string;
  /** 反馈吉祥物 */
  'feedback-beaver': string;
  /** 吉祥物身体 */
  'beaver-body': string;
  /** 关闭按钮 */
  closebtn: string;
  /** 向上移动动画 */
  moveup: string;
  /** 吉祥物手部 */
  'beaver-hand': string;
  /** 反馈按钮组 */
  'feedback-btns': string;
  /** 反馈选项 */
  'feedback-item': string;
  /** 反馈分割线 */
  'feedback-divider': string;
  /** 反馈图标 */
  'feedback-icon': string;
  /** 反馈表单链接包装器 */
  'feedback-form-link-wrapper': string;
  /** 反馈表单链接 */
  'feedback-form-link': string;
  /** 全局英文样式 */
  'global-en': string;
  /** 反馈关闭图标 */
  'icon-feedback-close': string;
  /** 反馈关闭图标图片 */
  'icon-feedback-close-img': string;
  /** 反馈图标（英文版） */
  'icon-feedback': string;
}

/**
 * CSS 模块导出结果
 * @description 包含 CSS 内容字符串和类名映射
 */
export interface FeedbackStylesModule extends CSSModuleExport {
  /** CSS 内容字符串数组 */
  content: Array<[string, string, string]>;
  /** 类名到哈希值的映射 */
  locals?: FeedbackStylesClassNames;
}

/**
 * 默认导出：反馈样式模块
 * @description Webpack css-loader 生成的 CSS 模块对象
 * @example
 * import styles from './feedback-styles';
 * const className = styles.feedbackform;
 */
declare const feedbackStyles: FeedbackStylesModule;

export default feedbackStyles;

/**
 * 模块导出函数签名
 * @param e - 模块导出对象
 * @param t - 模块类型标识
 * @param n - 模块加载器函数
 * @description Webpack 模块包装器，用于加载 CSS 样式模块及其依赖的图片资源
 */
export type WebpackModuleLoader = (
  e: { id: string; exports: FeedbackStylesModule },
  t: unknown,
  n: (moduleId: number) => string
) => void;

/**
 * 图片资源路径常量
 * @description 反馈表单中使用的图片资源模块 ID
 */
export const IMAGE_RESOURCES = {
  /** 相机图标资源 ID */
  CAMERA_ICON: 916825,
  /** 钉钉图标资源 ID */
  DINGDING_ICON: 322014,
} as const;

/**
 * 样式加载器依赖常量
 * @description 关联的 Webpack loader 模块 ID
 */
export const LOADER_DEPENDENCIES = {
  /** 图片资源加载器 */
  IMAGE_LOADER: 992716,
  /** CSS 样式加载器 */
  CSS_LOADER: 986380,
} as const;

/**
 * 响应式断点常量
 * @description 媒体查询使用的屏幕高度断点
 */
export const RESPONSIVE_BREAKPOINTS = {
  /** 最大内容高度（像素） */
  MAX_CONTENT_HEIGHT: 580,
  /** 屏幕高度断点（像素） */
  SCREEN_HEIGHT_BREAKPOINT: 680,
} as const;

/**
 * 表单尺寸常量
 * @description 表单元素的固定尺寸配置
 */
export const FORM_DIMENSIONS = {
  /** 单选按钮组宽度（像素） */
  RADIO_GROUP_WIDTH: 328,
  /** 单选按钮组高度（像素） */
  RADIO_GROUP_HEIGHT: 58,
  /** 单个单选按钮宽度（像素） */
  RADIO_BUTTON_WIDTH: 72,
  /** 单个单选按钮高度（像素） */
  RADIO_BUTTON_HEIGHT: 30,
  /** 文件上传块尺寸（像素） */
  FILE_BLOCK_SIZE: 80,
  /** 输入框宽度（像素） */
  INPUT_WIDTH: 312,
  /** 输入框高度（像素） */
  INPUT_HEIGHT: 30,
  /** 文本域高度（像素） */
  TEXTAREA_HEIGHT: 200,
} as const;