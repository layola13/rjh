/**
 * VDialog组件模块
 * 提供对话框/弹窗组件的类型定义
 * @module VDialog
 */

/**
 * VDialog组件类/接口
 * 用于创建和管理对话框UI组件
 */
export declare class VDialog {
  /**
   * 构造函数
   * @param options - 对话框配置选项
   */
  constructor(options?: VDialogOptions);
}

/**
 * VDialog配置选项接口
 */
export interface VDialogOptions {
  /** 对话框标题 */
  title?: string;
  /** 对话框内容 */
  content?: string;
  /** 是否显示遮罩层 */
  overlay?: boolean;
  /** 是否可通过点击遮罩层关闭 */
  closeOnOverlayClick?: boolean;
  /** 自定义CSS类名 */
  className?: string;
  /** 宽度 */
  width?: string | number;
  /** 高度 */
  height?: string | number;
}

/**
 * 默认导出VDialog组件
 */
export default VDialog;