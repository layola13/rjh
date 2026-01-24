/**
 * CSS模块：消息框样式定义
 * 
 * 该模块导出消息框组件的完整样式表，包括：
 * - 消息框容器和遮罩层
 * - 弹窗动画效果
 * - 标题、内容、按钮布局
 * - 复选框自定义样式
 */

/**
 * CSS样式字符串常量
 * 包含消息框组件的所有样式规则
 */
export const msgBoxStyles: string;

/**
 * 消息框包装器类名
 */
export const MsgBoxWrapper: string;

/**
 * 消息框遮罩层类名
 */
export const MsgBoxOverLay: string;

/**
 * 消息框主体容器类名
 */
export const MsgBoxMain: string;

/**
 * 消息框头部区域类名
 */
export const MsgBoxHeader: string;

/**
 * 消息框内容区域类名
 */
export const MsgBoxContent: string;

/**
 * 消息框底部区域类名
 */
export const MsgBoxFooter: string;

/**
 * 消息框按钮容器类名
 */
export const MsgBoxBtns: string;

/**
 * 消息框复选框容器类名
 */
export const MsgBoxCheckBox: string;

/**
 * 消息框隐藏状态类名
 */
export const MsgBoxMainHide: string;

/**
 * CSS类名映射接口
 */
export interface CSSModule {
  /** 消息框包装器 - 全屏覆盖容器 */
  MsgBoxWrapper: string;
  
  /** 遮罩层 - 半透明黑色背景 */
  MsgBoxOverLay: string;
  
  /** 主体容器 - 居中弹窗 */
  MsgBoxMain: string;
  
  /** 头部区域 - 包含标题和关闭按钮 */
  MsgBoxHeader: string;
  
  /** 标题文本 */
  title: string;
  
  /** 关闭按钮 */
  closebtn: string;
  
  /** 内容区域 - 消息正文 */
  MsgBoxContent: string;
  
  /** 可选中文本 */
  selectable: string;
  
  /** 链接内容 */
  linkContent: string;
  
  /** 底部区域 - 包含按钮和复选框 */
  MsgBoxFooter: string;
  
  /** 按钮组容器 */
  MsgBoxBtns: string;
  
  /** 通用按钮样式 */
  'msgbox-button': string;
  
  /** 默认按钮样式（白色背景） */
  'msgbox-default-button': string;
  
  /** 主要按钮样式（蓝色渐变） */
  'msgbox-primary-button': string;
  
  /** 复选框容器 */
  MsgBoxCheckBox: string;
  
  /** 隐藏元素 */
  invisible: string;
  
  /** "不再显示"复选框 */
  dontShowInput: string;
  
  /** 已选中复选框 */
  isChkInput: string;
  
  /** 隐藏状态（缩放为0） */
  MsgBoxMainHide: string;
}

/**
 * 默认导出：CSS模块对象
 */
declare const styles: CSSModule;
export default styles;

/**
 * 关键动画帧：显示对话框
 * - 从缩放0到缩放1
 * - 从透明到不透明
 */
export type ShowDialogAnimation = '@keyframes show-dialog';

/**
 * 样式常量：Z-Index层级
 */
export const Z_INDEX_OVERLAY = 110;
export const Z_INDEX_DIALOG = 1001;
export const Z_INDEX_WRAPPER = 10000;

/**
 * 样式常量：对话框尺寸
 */
export const DIALOG_WIDTH = 500; // px
export const DIALOG_BORDER_RADIUS = 8; // px

/**
 * 样式常量：间距
 */
export const PADDING_HORIZONTAL = 40; // px
export const PADDING_VERTICAL_TOP = 40; // px
export const BUTTON_MIN_WIDTH = 88; // px
export const BUTTON_HEIGHT = 30; // px

/**
 * 样式常量：颜色
 */
export const COLOR_PRIMARY = '#327DFF';
export const COLOR_PRIMARY_HOVER = '#1763E6';
export const COLOR_TEXT_PRIMARY = '#19191E';
export const COLOR_TEXT_SECONDARY = '#333';
export const COLOR_BORDER = '#DCDCE1';
export const COLOR_OVERLAY = 'rgba(0, 0, 0, 0.3)';